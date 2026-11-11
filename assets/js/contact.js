/* ======================================================================================== */
/*                           Formulaire de la page Contact                                  */
/* ======================================================================================== */

/*
 * La validation sert a AIDER le visiteur (oubli, faute de frappe).
 * Elle ne protege pas le site : tout code du navigateur peut etre contourne.
 * La securite et l'anti-spam sont geres par Formspree (dont le champ piege "_gotcha").
 *
 * Tout le code est DANS le DOMContentLoaded : dans un <script> classique (pas un module),
 * les const declarees au premier niveau deviennent globales et partagees avec portfolio.js.
 * Les enfermer dans cette fonction evite tout conflit de noms entre les fichiers.
 */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    // Ce fichier n'est charge que sur contact.html, mais on se protege si ce n'est plus le cas
    if (!form) return;

    // Adresse Formspree qui recoit les messages et les transfere par email
    const FORMSPREE_URL = "https://formspree.io/f/xaneaygb";

    // \p{L} = n'importe quelle lettre de n'importe quelle langue (á, ő, é, ñ...).
    // Le drapeau "u" (Unicode) est obligatoire pour utiliser \p{L}.
    const NAME_PATTERN = /^[\p{L}\s'-]{2,50}$/u;
    // Volontairement simple : texte @ texte . au moins 2 caracteres, sans espace
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // ------------------------------------------------------------------------
    // 1. Regles de validation : chaque regle renvoie un message d'erreur, ou "" si c'est correct
    // ------------------------------------------------------------------------

    function validateName(value, label) {
        if (!value) return `Le ${label} est obligatoire.`;
        if (!NAME_PATTERN.test(value)) {
            return `Le ${label} doit contenir de 2 à 50 lettres (espaces, tirets et apostrophes acceptés).`;
        }
        return "";
    }

    function validateEmail(value) {
        if (!value) return "L'email est obligatoire.";
        if (!EMAIL_PATTERN.test(value)) return "Format d'email invalide (exemple : nom@domaine.fr).";
        return "";
    }

    // Textes libres (sujet, message) : seule la longueur compte, tous les caracteres sont acceptes
    function validateLength(value, label, min, max) {
        if (!value) return `Le ${label} est obligatoire.`;
        if (value.length < min || value.length > max) {
            return `Le ${label} doit contenir entre ${min} et ${max} caractères.`;
        }
        return "";
    }

    // Association "attribut name du champ" -> regle a appliquer
    const VALIDATORS = {
        nom: (value) => validateName(value, "nom"),
        prenom: (value) => validateName(value, "prénom"),
        email: validateEmail,
        sujet: (value) => validateLength(value, "sujet", 5, 100),
        message: (value) => validateLength(value, "message", 10, 1000),
    };

    // ------------------------------------------------------------------------
    // 2. Affichage de la validation (classes Bootstrap is-valid / is-invalid)
    // ------------------------------------------------------------------------

    // Valide un champ : bordure jaune (is-valid) ou rouge (is-invalid) + message sous le champ
    function validateField(field) {
        const error = VALIDATORS[field.name](field.value.trim());

        field.classList.toggle("is-invalid", error !== "");
        field.classList.toggle("is-valid", error === "");
        // textContent et non innerHTML : le texte est insere tel quel, jamais interprete comme du HTML
        field.nextElementSibling.textContent = error;

        return error === "";
    }

    // La case de consentement doit etre cochee (RGPD) ; son message est deja ecrit dans le HTML
    function validateConsent(checkbox) {
        checkbox.classList.toggle("is-invalid", !checkbox.checked);
        return checkbox.checked;
    }

    // ------------------------------------------------------------------------
    // 3. Elements de la page et fonctions d'affichage
    // ------------------------------------------------------------------------

    const submitButton = document.getElementById("submit-btn");
    const formStatus = document.getElementById("form-status");
    const consent = document.getElementById("consentement");
    // form.elements[name] retrouve un champ par son attribut name ; le piege _gotcha n'est pas dans la liste
    const fields = Object.keys(VALIDATORS).map((name) => form.elements[name]);

    // Message global sous le bouton : "success" en jaune (couleur du portfolio), "danger" en rouge
    function showStatus(type, text) {
        const alertClass = type === "success" ? "alert-portfolio" : "alert-danger";
        formStatus.className = `alert ${alertClass} mt-2 mb-0`;
        formStatus.textContent = text;
    }

    // Vide le message (la zone reste dans la page pour que les lecteurs d'ecran l'annoncent ensuite)
    function clearStatus() {
        formStatus.className = "";
        formStatus.textContent = "";
    }

    // Bouton en cours d'envoi : desactive (pas de double envoi) + roue de chargement
    function setLoading(isLoading) {
        submitButton.disabled = isLoading;
        submitButton.innerHTML = isLoading
            ? '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Envoi en cours...'
            : "Envoyer";
    }

    // Apres un envoi reussi : retire les bordures jaunes et rouges
    function resetValidationStyles() {
        form.querySelectorAll(".is-valid, .is-invalid").forEach((element) => {
            element.classList.remove("is-valid", "is-invalid");
        });
    }

     // ------------------------------------------------------------------------
    // 4. Evenements
    // ------------------------------------------------------------------------

    fields.forEach((field) => {
        // En quittant le champ : on le valide
        field.addEventListener("blur", () => validateField(field));
        // Pendant la frappe : on revalide seulement un champ deja en erreur,
        // pour que le rouge disparaisse des que la saisie devient correcte
        field.addEventListener("input", () => {
            if (field.classList.contains("is-invalid")) validateField(field);
        });
    });

    consent.addEventListener("change", () => validateConsent(consent));

    form.addEventListener("submit", async (event) => {
        // Empeche le rechargement de la page : c'est fetch qui envoie
        event.preventDefault();
        clearStatus();

        // map() valide TOUS les champs (toutes les erreurs s'affichent d'un coup),
        // puis every() verifie qu'ils sont tous corrects.
        // fields.every(validateField) s'arreterait au premier champ faux.
        const areFieldsValid = fields.map(validateField).every(Boolean);
        const isConsentValid = validateConsent(consent);

        if (!areFieldsValid || !isConsentValid) {
            // Place le curseur sur le premier champ en erreur
            form.querySelector(".is-invalid")?.focus();
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(FORMSPREE_URL, {
                method: "POST",
                body: new FormData(form),
                // Demande a Formspree une reponse JSON au lieu de rediriger vers sa propre page
                headers: { Accept: "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Formspree a répondu avec le code ${response.status}`);
            }

            form.reset();
            resetValidationStyles();
            showStatus("success", "Merci, votre message a bien été envoyé. Je vous répondrai rapidement.");
        } catch (error) {
            console.error("Erreur d'envoi du formulaire :", error);
            showStatus("danger", "L'envoi a échoué. Veuillez réessayer dans quelques instants.");
        } finally {
            // finally s'execute dans tous les cas, succes ou erreur
            setLoading(false);
        }
    });
});
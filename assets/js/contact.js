/*======================================================================================== */
/*                           UJ   Formulaire sur la page Contact */
/* ======================================================================================== */

// nettoyage des inputs pour éviter les injections XSS et SQL
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    // supprimer les espaces au début et à la fin
    input = input.trim();
    
    // Supprimer les balises HTML/XML
    //<....> balise remplacé par  ''
    // [^>]* : correspond à n'importe quel caractère sauf '>' (zéro ou plusieurs fois)
    input = input.replace(/<[^>]*>/g, '');
    
    // Supprimer les caractères de contrôle dangereux
    // \x00-\x1F : caractères de contrôle ASCII de 0 à 31
    // \x7F : caractère de contrôle DEL
    // ex: "Hello\nWorld" → "HelloWorld" ou "ABC\u0000DEF" → "ABCDEF" ...
    input = input.replace(/[\x00-\x1F\x7F]/g, '');
    
    return input;
}


//détection d'injection SQL
function containsSQLInjection(input) {
    if (typeof input !== 'string') return false;
    
    // Patterns SQL dangereux
    // \b : délimiteur de mot
    // i : insensible à la casse
    // \s+ espaces obligatoires après OR/AND
    // \d+ un ou plusieurs chiffres
    // \s* espaces optionnels autour de =
    const sqlPatterns = [
        /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bCREATE\b|\bALTER\b)/i,
        /(\bUNION\b.*\bSELECT\b)/i,
        /(\bOR\b\s+\d+\s*=\s*\d+)/i,
        /(\bAND\b\s+\d+\s*=\s*\d+)/i,
        /(--|\#|\/\*|\*\/)/,       //pour les commentaires SQL
        /(\bEXEC\b|\bEXECUTE\b)/i,
        /(\';|\"\;)/,           // fin de requête SQL
        /(\bxp_|\bsp_)/i,
        /(\bSLEEP\b|\bBENCHMARK\b)/i        // attaques par temporisation
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
}


//détection d'injection XSS 
function containsXSS(input) {
    if (typeof input !== 'string') return false;
    
    // Patterns XSS dangereux
    const xssPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /<iframe[^>]*>.*?<\/iframe>/gi,
        /<object[^>]*>.*?<\/object>/gi,
        /<embed[^>]*>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi, // onclick, onload, onerror, etc.
        /<img[^>]*onerror/gi,
        /vbscript:/gi,
        /data:text\/html/gi,
        /<svg[^>]*onload/gi
    ];
    
    return xssPatterns.some(pattern => pattern.test(input));
}

//validation nom/prénom
function validateNom(nom, fieldName = "nom"){

    const errors = [];

     // vérifier la longueur
    if (nom.length < 2 || nom.length > 50) {
          errors.push(`Le ${fieldName} doit contenir entre 2 et 50 caractères`);
    }

    //vérifier que username contient seulement des caractères autorisés
    // const usernameRegex = /^[A-ZÀÂÆÇÉÈÊËÏÎÔÙÛÜ][a-zA-Zàâæçéèêëïîôùûüÿ\s\-]{1,49}$/;
    const nomRegex = /^[a-zA-ZàâæçéèêëïîôùûüÿÀÂÆÇÉÈÊËÏÎÔÙÛÜ\s\-']{2,50}$/;
    if(!nomRegex.test(nom)){
        errors.push(`Le ${fieldName} ne peut contenir que des lettres, des espaces, des tirets et des apostrophes`);
    }

    // détecter les tentatives d'injectionSQL dans username
    if (containsSQLInjection(nom)) {
        // errors.push(`Le ${fieldName} contient des caractères invalides (SQL)`);
        errors.push(`Le ${fieldName} contient des caractères non autorisés`);
    }

    //détecter les tentatives d'injection XSS dans username
    if (containsXSS(nom)) {
        // errors.push(`Le ${fieldName} contient des caractères invalides (XSS)`);
        errors.push(`Le ${fieldName} contient des caractères non autorisés`);
    }

    return errors;
}

//validation email
function validateEmail(email) {
    const errors = [];
    
    if (!email || email.trim() === '') {
        errors.push("L'email est obligatoire");
        return errors;
    }
    
    // vérifier la longueur
    if (email.length > 100) {
        errors.push("L'email est trop long");
    }
    
    // vérifier le format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,10}$/;
    if (!emailRegex.test(email)) {
        errors.push("Format d'email invalide");
    }
    
    // vérifier les injections
    if (containsSQLInjection(email)) {
        // errors.push("L'email contient des caractères invalides (SQL)");
        errors.push("L'email contient des caractères non autorisés");
    }
    
    if (containsXSS(email)) {
        // errors.push("L'email contient des caractères invalides (XSS)");
        errors.push("L'email contient des caractères non autorisés");
    }
    
    return errors;
}

// fonction"générale" pour valider les champs
function validerField(inputId, validateFn){
    const input = document.getElementById(inputId);
    const feedback = input.nextElementSibling;
    const value = sanitizeInput(input.value);

    const errors = validateFn(value);

    if(errors.length > 0){
        feedback.innerHTML = errors[0];
        feedback.classList.remove("text-success");
        feedback.classList.add("text-danger");
        input.classList.remove("megfelelo");
        input.classList.add("nem-megfelelo");
        return false;
    }else{
        feedback.innerHTML = " ";
        feedback.classList.remove("text-danger");
        feedback.classList.add("text-success");
        input.classList.remove("nem-megfelelo");
        input.classList.add("megfelelo");
        return true;
    }
}

//valider le champ nom
const validNom = () => {
    return validerField("nom", (value) => {
        if(!value || value.trim() ===''){
            return ["Le nom est obligatoire"];
        }
        return validateNom (value, "nom");
    });
};

//valider le champ prenom
const validPrenom = () => {
    return validerField("prenom", (value) => {
        if(!value || value.trim() ===''){
            return ["Le prénom est obligatoire"];
        }
        return validateNom (value, "prénom");
    });
};

//valider email
const validEmail = () => {
    return validerField("email", (value) => {
        return validateEmail(value);
    });
};

//valider sujet
const validSujet = () => {
    return validerField("sujet", (value) => {
        const errors = [];
        
        if (!value || value.trim() === '') {
            errors.push("Le sujet est obligatoire");
            return errors;
        }
        
        if (value.length < 5 || value.length > 100) {
            errors.push("Le sujet doit contenir entre 5 et 100 caractères");
        }
        
        // vérifier les caractères autorisés (lettres, chiffres, espaces, ponctuation courante)
        const sujetRegex = /^[a-zA-ZàâæçéèêëïîôùûüÿÀÂÆÇÉÈÊËÏÎÔÙÛÜ0-9\s\-'.,!?]{5,100}$/;
        if (!sujetRegex.test(value)) {
            errors.push("Le sujet contient des caractères non autorisés");
        }
        
        if (containsSQLInjection(value)) {
            // errors.push("Le sujet contient des caractères invalides (SQL)");
            errors.push("Le sujet contient des caractères non autorisés");
        }
        
        if (containsXSS(value)) {
            // errors.push("Le sujet contient des caractères invalides (XSS)");
            errors.push("Le sujet contient des caractères non autorisés");
        }
        
        return errors;
    });
};

//valider message
const validMessage = () => {
    return validerField("message", (value) => {
        const errors = [];
        
        if (!value || value.trim() === '') {
            errors.push("Le message est obligatoire");
            return errors;
        }
        
        if (value.length < 10 || value.length > 1000) {
            errors.push("Le message doit contenir entre 10 et 1000 caractères");
        }
        
        if (containsSQLInjection(value)) {
            // errors.push("Le message contient des caractères invalides (SQL)");
            errors.push("Le message contient des caractères non autorisés");
        }
        
        if (containsXSS(value)) {
            // errors.push("Le message contient des caractères invalides (XSS)");
            errors.push("Le message contient des caractères non autorisés");
        }
        
        return errors;
    });
};


//valider checkbox
const validCheckbox = function(){
    const inputCheckBox = document.getElementById("egyetertes");
    return inputCheckBox.checked;
}


//afficher / masquer le message d'erreur du checkbox
function showCheckboxError(show) {
    let errorElement = document.getElementById("checkbox-error");
    if (!errorElement) {
        errorElement = document.createElement("p");
        errorElement.id = "checkbox-error";
        errorElement.classList.add("text-danger", "text-center", "fst-italic", "mt-2");
        const checkboxWrapper = document.querySelector(".costum-check");
        checkboxWrapper.insertAdjacentElement("afterend", errorElement); // ← était "errorEl"
    }
    errorElement.textContent = show
        ? "Vous devez accepter que vos données servent uniquement à vous recontacter."
        : "";
}


//réinitialiser tous les styles de validation
function resetValidationStyles(form) {

    form.querySelectorAll(".megfelelo, .nem-megfelelo").forEach(element => {
        element.classList.remove("megfelelo", "nem-megfelelo");
    });

    form.querySelectorAll("small").forEach(small => {
        small.textContent = "";
        small.classList.remove("text-danger", "text-success");
    });

    showCheckboxError(false); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

//afficher le message de confirmation
function showConfirmation(){
    const confirmation = document.getElementById("form-confirmation");
    confirmation.classList.remove("hidden");
    confirmation.classList.add("visible");

    //masquer le message après 5 secondes
    setTimeout(() => {
        confirmation.classList.remove("visible");
        confirmation.classList.add("hidden");
    }, 5000);
}

//gestion de l'état du bouton de soumission
function setSubmitBtnLoading(isLoading, submitBtn){
    if(isLoading){
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Envoi en cours...';
    }else{
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Envoyer';
    }
}

//DOMContentLoaded => attendre que le DOM soit chargé html
//window.onload => attendre que toute la page soit chargée (html, css, js, images...)

//initialisation des événements de validation
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#contact-form");
    const submitBtn = document.querySelector("#submit-btn");

    //blur => validation en temps réel sur perte de focus
    form.nom.addEventListener("blur", validNom);
    form.prenom.addEventListener("blur", validPrenom);
    form.email.addEventListener("blur", validEmail);
    form.sujet.addEventListener("blur",validSujet);
    form.message.addEventListener("blur",validMessage);

    //validation immédiate pour le checkbox
    form.egyetertes.addEventListener("change", () => {
        if(validCheckbox()){
            // alert("Vous devez accepter que vos données servent uniquement à vous recontacter.");
            showCheckboxError(false);
        }else{
            showCheckboxError(true);
        }
    });



    //gestion de le soumission du formulaire
    form.addEventListener("submit", async function(e) {

        //empêche le rechargement de page
        e.preventDefault();

        // Validation complète du formulaire
        const isNomValid = validNom();
        const isPrenomValid = validPrenom();
        const isEmailValid = validEmail();
        const isSujetValid = validSujet();
        const isMessageValid = validMessage();
        const isCheckboxValid = validCheckbox();

        //afficher le message d'erreur chackbox sans vider le formulaire
        if(!isCheckboxValid){
            showCheckboxError(true);
        }else{
            showCheckboxError(false);
        }

        if (isNomValid && isPrenomValid && isEmailValid && isSujetValid && isMessageValid && isCheckboxValid) {

            try{
                //valider le spinner
                setSubmitBtnLoading(true, submitBtn);

                const formData = new FormData(this);

                const response = await fetch("https://formspree.io/f/xaneaygb", {

                    method: "POST", 
                    body: formData,
                    headers: {
                        'Accept' : 'application/json'
                    }
                });

                if(response.ok){

                    //afficher la confirmation
                    showConfirmation();

                    //réinitialiser le formulaie
                    form.reset();
                    resetValidationStyles(form);
                }else{
                    const data = await response.json();

                    // throw => interrompre le fonctionnement normal et "donne" le control au catch
                    throw new Error(data.error || "Erreur lors de l'envoi.");
                    
                }
            } catch (error){
                console.error("Erreur Formspree: ", error);
                alert("Une erreur est survenu lors de l'envoi. Veuillez réessayer.")
            } finally {

                //désactiver le spinner
                setSubmitBtnLoading(false, submitBtn);
            }

        }else {
            console.warn("Formulaire invalide !");
        } 
    });
});

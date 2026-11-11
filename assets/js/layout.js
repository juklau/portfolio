/* ======================================================================================== */
/*                En-tete (menu) et pied de page communs a toutes les pages                 */
/* ======================================================================================== */

/*
 * Le menu et le pied de page ne sont ecrits qu'ICI. Chaque page HTML contient seulement
 * <header id="header"></header> et <footer id="site-footer"></footer>, remplis par ce script.
 * Ajouter, renommer ou retirer une page = modifier UNE ligne dans NAV_ITEMS.
 *
 * Ce fichier doit etre charge AVANT portfolio.js : portfolio.js cherche les liens du menu
 * (lien actif, dropdowns sur mobile) au DOMContentLoaded, ils doivent donc deja exister.
 *
 * Tout est dans une fonction executee immediatement, (function () { ... })() :
 * dans un <script> classique, les const du premier niveau seraient globales et partagees
 * avec portfolio.js. Ici, elles restent privees a ce fichier.
 */
(function () {
    const LINKEDIN_URL = "https://www.linkedin.com/in/klaudia-juhasz-a165002bb/";
    const GITHUB_URL = "https://github.com/juklau";
    const FIGMA_URL = "https://www.figma.com/design/QMpU6uu0tGXpdInYixZ798/Mon_portfolio?node-id=1-2&p=f&t=4kfGd9vv8Z0PAOW0-0";

    // ------------------------------------------------------------------------
    // 1. Liste des pages : source unique du menu ET de la 1re ligne du pied de page
    //    "children" = sous-menu deroulant
    // ------------------------------------------------------------------------
    const NAV_ITEMS = [
        { label: "Accueil", href: "index.html" },
        { label: "Stages", href: "stages.html" },
        {
            label: "Projets",
            href: "projets.html",
            children: [
                { label: "Compétences", href: "projets.html" },
                { label: "ClassCord Client", href: "rp-chat.html" },
                { label: "Mini-CRM", href: "rp-gestion_contacts.html" },
                { label: "MédiaStock", href: "rp-mediastock.html" },
                { label: "CryptoVault", href: "rp-cryptovault.html" },
                { label: "Météo", href: "rp-meteo_api.html" },
                { label: "RoomBooking", href: "rp-roombooking.html" },
            ],
        },
        {
            label: "La veille",
            href: "veille.html",
            children: [
                { label: "IA & surdité", href: "veille-sourds.html" },
                { label: "IA & vision", href: "veille-aveugle.html" },
                { label: "Cybermenace", href: "veille-cybermenace.html" },
            ],
        },
        // Page retiree apres l'examen du BTS : decommenter la ligne pour la remettre
        // { label: "Synthèse", href: "synthese.html" },
        { label: "CV", href: "CV.html" },
        { label: "Contact", href: "contact.html" },
    ];

    // 2e ligne du pied de page (liens qui ne sont pas dans le menu)
    const FOOTER_LEGAL = [
        { label: "Mentions légales", href: "mentions-legales.html" },
        { label: "Plan du site", href: "plan-du-site.html" },
    ];


    // ------------------------------------------------------------------------
    // 2. En-tete
    // ------------------------------------------------------------------------

    /**
     * Un element du menu : lien simple, ou lien + sous-menu deroulant.
     * Le lien actif (classe "active") est ajoute ensuite par portfolio.js.
     */
    function renderNavItem(item) {
        if (!item.children) {
            return `
                <li class="nav-item">
                    <a class="nav-link text-white" href="${item.href}">${item.label}</a>
                </li>`;
        }

        const subLinks = item.children
            .map((child) => `<li><a class="dropdown-item text-white" href="${child.href}">${child.label}</a></li>`)
            .join("");

        return `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-white" href="${item.href}" role="button" aria-expanded="false">${item.label}</a>
                <ul class="dropdown-menu border-0">${subLinks}</ul>
            </li>`;
    }

    function renderHeader() {
        const links = NAV_ITEMS.map(renderNavItem).join("");

        return `
            <nav class="navbar navbar-expand-md bg-dark p-4" data-bs-theme="dark">
                <div class="container d-flex justify-content-between">
                    <a class="navbar-brand" href="index.html">Klaudia Juhasz</a>
                    <div class="d-flex align-items-center gap-2">
                        <a href="${LINKEDIN_URL}" class="text-white" target="_blank" rel="noopener noreferrer" title="Lien vers mon profil LinkedIn">
                            <i class="fab fa-linkedin fa-2xl"></i>
                        </a>
                        <button id="theme-toggle" class="btn border-0 text-white p-1" title="Changer de thème" aria-label="Changer de thème">
                            <i class="bi bi-sun-fill fs-5" id="theme-icon"></i>
                        </button>
                        <button class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Ouvrir le menu">
                            <span class="text-white" id="menu-btn"><i class="bi bi-list"></i></span>
                        </button>
                    </div>

                    <div class="offcanvas offcanvas-start menu-ouvert" tabindex="-1" id="navbarSupportedContent" aria-labelledby="navbarSupportedContentLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title text-white" id="navbarSupportedContentLabel">Menu</h5>
                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Fermer le menu"></button>
                        </div>
                        <div class="offcanvas-body navbarmenu">
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">${links}</ul>
                        </div>
                    </div>
                </div>
            </nav>`;
    }

     // ------------------------------------------------------------------------
    // 3. Pied de page
    // ------------------------------------------------------------------------

    function renderFooterLink(item) {
        return `
            <div class="col-12 col-md-auto py-1 footer-menu">
                <h6 class="font-weight-bold mx-2">
                    <a href="${item.href}" class="text-white text-decoration-none">${item.label}</a>
                </h6>
            </div>`;
    }

    function renderFooterRow(items, rowClass) {
        return `
            <div class="row g-0 ${rowClass} col-12 justify-content-center">
                <div class="col-6 col-md-12 d-flex flex-column flex-md-row justify-content-center">
                    ${items.map(renderFooterLink).join("")}
                </div>
            </div>`;
    }

    function renderFooter() {
        // l'annee se met a jour toute seule
        const year = new Date().getFullYear();

        return `
            <div class="container-fluid border-top border-secondary">
                <section class="pt-3">
                    ${renderFooterRow(NAV_ITEMS, "pt-3")}
                    ${renderFooterRow(FOOTER_LEGAL, "py-3")}
                </section>

                <hr class="my-2" />

                <section class="py-3">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-8">
                            <p><strong>Designed by Klaudia Juhasz</strong></p>
                        </div>
                    </div>
                </section>

                <section class="container-fluid text-center pb-3">
                    <a href="${LINKEDIN_URL}" class="text-white me-4" target="_blank" rel="noopener noreferrer" title="Lien vers mon profil LinkedIn"><i class="fab fa-linkedin fa-2xl"></i></a>
                    <a href="${FIGMA_URL}" class="text-white me-4" target="_blank" rel="noopener noreferrer" title="Lien vers mon compte Figma"><img src="assets/images/figma-logo.webp" class="rounded-circle" id="figma-logo" alt="logo Figma"></a>
                    <a href="${GITHUB_URL}" class="text-white me-4" target="_blank" rel="noopener noreferrer" title="Lien vers mon GitHub"><i class="fab fa-github fa-2xl"></i></a>
                </section>
            </div>
            <div class="text-center py-3 bg-black">© ${year} Copyright</div>

            <!-- Scroll Top (gere par portfolio.js) -->
            <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center" aria-label="Revenir en haut de la page"><i class="bi bi-arrow-up-short"></i></a>`;
    }

     // ------------------------------------------------------------------------
    // 4. Insertion dans la page
    // Le script est place en bas du <body> : <header> et <footer> existent deja.
    // ------------------------------------------------------------------------
    document.getElementById("header").innerHTML = renderHeader();
    document.getElementById("site-footer").innerHTML = renderFooter();
})();
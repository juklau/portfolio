// /* ======================================================================================== */
// /*                       Carousel sur les pages de Projets*/
// /* ======================================================================================== */

document.addEventListener("DOMContentLoaded", () => {


    const pageActuelle = window.location.pathname.includes("ppe-gestion_contacts.html") || 
                        window.location.pathname.includes("ppe-chat.html") || 
                        window.location.pathname.includes("ppe-mediastock.html") ||
                        window.location.pathname.includes("stage1.html") ||
                        window.location.pathname.includes("stage2.html");

    // const isProjetsPage = window.location.pathname.includes("projets.html");

    // function isVisibleSurEcran(element) {
    //     const rect = element.getBoundingClientRect();
    //     return (
    //         rect.top >= 0 &&
    //         rect.left >= 0 &&
    //         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    //     );
    // }


    const breakpointsConfig = {
        0: {
            slidesPerView: 1
        },
        900: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: pageActuelle ? 2 : 3
        }
    };


    // // vérifier sur le projet.html is #mes-rp est visible
    // if (isProjetsPage) {
    // const mesRpSection = document.getElementById("mes-rp");
    
    // if (mesRpSection && isVisibleSurEcran(mesRpSection)) {
    //     breakpointsConfig[1200].slidesPerView = 2;
    //     }
    // }

    new Swiper('.slider-wrapper', {
    
        loop: true,
        spaceBetween: 15,
    
        // Pagination bullets
        //pagination = tourner la page
        pagination: {
        el: '.slider-wrapper .swiper-pagination',
        clickable: true,
        //afin d'avoir quelques puces visible "dynamiquement"
        dynamicBullets: true,
        },
    
        // Navigation arrows
        navigation: {
        nextEl: '.slider-wrapper .swiper-button-next',
        prevEl: '.slider-wrapper .swiper-button-prev',
        },

        
        //responsive breakpoints
        //selon la taille d'écran combien outil-item va s'afficher
        breakpoints: breakpointsConfig
    });

});
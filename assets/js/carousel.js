// /* ======================================================================================== */
// /*                       Carousel sur la page de Projets*/
// /* ======================================================================================== */

const pageActuelle = window.location.pathname.includes("ppe-gestion_contacts.html");
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

new Swiper('.slider-wrapper', {
   
    loop: true,
    spaceBetween: 15,
  
    // Pagination bullets
    //pagination = tourner la page
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      //afin d'avoir quelques puces visible "dynamiquement"
      dynamicBullets: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    
    //responsive breakpoints
    //selon la taille d'écran combien outil-item va s'afficher
    breakpoints: breakpointsConfig
});
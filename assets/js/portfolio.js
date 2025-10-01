/* ======================================================================================== */
/*                          Affichage de fênetre "active"
/* ======================================================================================== */

document.addEventListener("DOMContentLoaded", function(){
    let navLinks = document.querySelectorAll(".nav-link")
    let dropdownItems = document.querySelectorAll(".dropdown-menu .dropdown-item");
    let currentUrl = window.location.href.split("#")[0];

    navLinks.forEach(link => { //!!!!!
        //link.href.split("#") =>szetvalasztja par "#" les elements GPI.html#GLPI 
        // => "GPI.html" + "GLPI"
        //on compare le [0] elemenet => "GPI.html" avec l'adresse de window

        if(link.href.split("#")[0] === currentUrl){
            link.classList.add("active");
        }
    });

    // si un page "ppe-" est active => dans le menu "projets.html" sera active
    if(window.location.href.includes("ppe")){
        navLinks.forEach(link => {
            if(link.href.includes("projets.html")){
                link.classList.add("active")
            }
        })
    }

    // si un page "type_veille" est active => dans le menu "veille.html" sera active
    if(window.location.href.includes("veille")){
        navLinks.forEach(link => {
            if(link.href.includes("veille.html")){
                link.classList.add("active")
            }
        })
    }

    // si un "dropdown" est active => dans le menu "son parent" sera active
    dropdownItems.forEach(item => {
        item.addEventListener("click", function(){
            if(item.href.split("#")[0] === currentUrl){
                // trouver le parent de l'enfant
                let parentDropdown = this.closest(".dropdown");
                if(parentDropdown){
                    parentDropdown.querySelectorAll(".nav-link").classList.add(active);
                }
            }
        })
    });
});

/* ======================================================================================== */
/*                         Affichage "timeline" page: accueil
/* ======================================================================================== */

// Au scroll:  ajouter la classe "show" quand l'élément est visible dans la fenêtre
function revealOnScroll() {
    const itemsLeft = document.querySelectorAll('.hidden-left');
    const itemsRight = document.querySelectorAll('.hidden-right');
    // récupération la hauteur visible de la fenetre
    const windowHeight = window.innerHeight;

    itemsLeft.forEach(item => {
        const rect = item.getBoundingClientRect(); //position de l'élément par rapport au haut du vieuwport
        if (rect.top < windowHeight * 0.7) {
            item.classList.add('show');
        }
    });

    itemsRight.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < windowHeight * 0.7) {
            item.classList.add('show');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* ======================================================================================== */
/*                          Activation du bouton "scroll top"*/
/* ======================================================================================== */

window.addEventListener("scroll", function(){
    let scrollTopBtn = document.getElementById("scroll-top");

    if(window.scrollY > 200){
        scrollTopBtn.classList.add("active");
    }else{
        scrollTopBtn.classList.remove("active");
    }
});

/* ======================================================================================== */
/*                          Activation "flip" des cards 
/* ======================================================================================== */


/* ====================  Utilisation des boutons de competence sur la page Projets ==========================*/

//if pour éviter que ça soit null ==> sans ça il ne fonctionne pas!!!
//btn vers mon tableau de compétence que je n'ai pas encore
// if((document.getElementById("competence-btn")) !== null) {
//     document.getElementById("competence-btn").onclick = function(){
//             window.location.href = "page-error.html";
//     };
// };

/* ======================================================================================== */
/*                          Activation "flip" des cards 
/* ======================================================================================== */

document.querySelectorAll(".flip-card").forEach(card => {
    // card.addEventListener("mouseenter", function(){
    //     card.classList.add("flipped");
    // });

    // card.addEventListener("mouseleave", function(){
    //     card.classList.remove("flipped");
    // })

    card.addEventListener("click", function(){
        card.classList.toggle("flipped");
    })
});

/* ======================================================================================== */
/*                          Activation effet JUSTE une fois
/* ======================================================================================== */

AOS.init({
    // fonctionnement l'effet que pendant le chargement et il ne se répéte pas
    once: true,
    duration: 1500, 

    // désactiver l'effet sur mobil
    disable: function() {
    return window.innerWidth < 576;
  }
});

/* ======================================================================================== */
/*                          ZOOM Image
/* ======================================================================================== */

document.querySelectorAll(".CRM-image, .Chat-image").forEach(img =>{
    img.addEventListener("click", function(){
        const isZoomed = img.classList.contains("zoomed");

        document.querySelectorAll(".CRM-image.zoomed, .Chat-image.zoomed").forEach(el =>{
            el.classList.remove("zoomed");
        });

        if(!isZoomed){
            img.classList.add("zoomed");
        }
    });
});
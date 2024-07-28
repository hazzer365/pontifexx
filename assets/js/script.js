'use strict';


/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

function initMap() {
  const myLatlng = { lat: -25.363, lng: 131.044 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatlng,
  });
  const marker = new google.maps.Marker({
    position: myLatlng,
    map,
    title: "Click to zoom",
  });

  map.addListener("center_changed", () => {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(() => {
      map.panTo(marker.getPosition());
    }, 3000);
  });
  marker.addListener("click", () => {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
}

window.initMap = initMap;

document.addEventListener('DOMContentLoaded', function() {
  // Inicializa EmailJS con tu user_id
  emailjs.init('hbfib5vK7ZjTsK7vK'); // Tu user_id de EmailJS

  // Obtén el formulario por su ID
  const form = document.getElementById('contact-form');
  
  // Asegúrate de que el formulario existe
  if (form) {
      // Añade un manejador de eventos para el envío del formulario
      form.addEventListener('submit', function(event) {
          event.preventDefault(); // Evita el envío del formulario por defecto

          // Envía el correo usando EmailJS
          emailjs.sendForm('service_45qj2rj', 'template_cmv6o4v', form)
              .then(function(response) {
                  console.log('Success:', response.status, response.text);
                  alert('Tu mensaje ha sido enviado con éxito.');
              }, function(error) {
                  console.log('Error:', error);
                  alert('Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.');
              });
      });
  } else {
      console.error('Formulario con ID "contact-form" no encontrado.');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var linkInstagram = document.getElementById('facebook');
  if (linkInstagram) {
    linkInstagram.addEventListener('click', function(event) {
      // Enviar el evento a Google Tag Manager
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'click_enlace_facebook'
      });
      
      // Prevenir la navegación inmediata
      event.preventDefault();

      // Esperar 1 segundo antes de abrir el enlace en una nueva ventana
      setTimeout(function() {
        // Abre el enlace en una nueva ventana
        window.open(linkInstagram.href, '_blank');
      }, 1000);
    });
  }
});

 
  
  document.addEventListener('DOMContentLoaded', function() {
    var linkInstagram = document.getElementById('instagram');
    if (linkInstagram) {
      linkInstagram.addEventListener('click', function(event) {
        // Enviar el evento a Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'click_enlace_instagram'
        });
        
        // Prevenir la navegación inmediata
        event.preventDefault();
  
        // Esperar 1 segundo antes de abrir el enlace en una nueva ventana
        setTimeout(function() {
          // Abre el enlace en una nueva ventana
          window.open(linkInstagram.href, '_blank');
        }, 1000);
      });
    }
  });
  


  document.addEventListener('DOMContentLoaded', function() {
    var linkTikTok = document.getElementById('tiktok');
    if (linkTikTok) {
      linkTikTok.addEventListener('click', function(event) {
        // Enviar el evento a Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'click_enlace_tiktok'
        });
        
        // Prevenir la navegación inmediata
        event.preventDefault();
  
        // Esperar 1 segundo antes de abrir el enlace en una nueva ventana
        setTimeout(function() {
          // Abre el enlace en una nueva ventana
          window.open(linkTikTok.href, '_blank');
        }, 1000);
      });
    }
  });
  




  document.addEventListener('DOMContentLoaded', function() {
    var linkLinkedIn = document.getElementById('linkedin');
    if (linkLinkedIn) {
      linkLinkedIn.addEventListener('click', function(event) {
        // Enviar el evento a Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'click_enlace_linkedin'
        });
        
        // Prevenir la navegación inmediata
        event.preventDefault();
  
        // Esperar 1 segundo antes de abrir el enlace en una nueva ventana
        setTimeout(function() {
          // Abre el enlace en una nueva ventana
          window.open(linkLinkedIn.href, '_blank');
        }, 1000);
      });
    }
  });
  



  document.addEventListener('DOMContentLoaded', function() {
    var linkGoogleMaps = document.getElementById('google-maps');
    if (linkGoogleMaps) {
      linkGoogleMaps.addEventListener('click', function(event) {
        // Enviar el evento a Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'click_enlace_google_maps'
        });
        
        // Prevenir la navegación inmediata
        event.preventDefault();
  
        // Esperar 1 segundo antes de abrir el enlace en una nueva ventana
        setTimeout(function() {
          // Abre el enlace en una nueva ventana
          window.open(linkGoogleMaps.href, '_blank');
        }, 1000);
      });
    }
  });
  

  document.addEventListener('DOMContentLoaded', function() {
    var linkTelefono = document.getElementById('telefono');
    if (linkTelefono) {
      linkTelefono.addEventListener('click', function(event) {
        // Enviar el evento a Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'click_enlace_telefono'
        });
        // Opcional: Esperar 1 segundo antes de permitir la navegación
        setTimeout(function() {
          window.location.href = linkTelefono.href;
        }, 1000);
        // Prevenir la navegación inmediata
        event.preventDefault();
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    var linkCorreo = document.getElementById('correo');
    if (linkCorreo) {
      linkCorreo.addEventListener('click', function(event) {
        // Enviar el evento a Google Tag Manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'click_enlace_correo'
        });
        // Opcional: Esperar 1 segundo antes de permitir la navegación
        setTimeout(function() {
          window.location.href = linkCorreo.href;
        }, 1000);
        // Prevenir la navegación inmediata
        event.preventDefault();
      });
    }
  });




/*
function iniciarMap(){
  var coord = {lat:-110.9990309 ,lng: -110.9964506};
  var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 10,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}
  */
 
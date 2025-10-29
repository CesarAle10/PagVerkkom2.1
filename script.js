// script.js - Carrusel funcional
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carruselTrack");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const puntosContainer = document.getElementById("puntos");

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Crear puntos
  for (let i = 0; i < totalSlides; i++) {
    const punto = document.createElement("div");
    punto.classList.add("punto");
    if (i === 0) punto.classList.add("active");
    punto.addEventListener("click", () => goToSlide(i));
    puntosContainer.appendChild(punto);
  }

  const puntos = document.querySelectorAll(".punto");

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });
    puntos.forEach((punto, index) => {
      punto.classList.toggle("active", index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  updateCarousel();
});






















// === AUTO SCROLL + DETENER CON CLIC ===
const seccionesIndex = ['Inicio', 'video', 'Servicios', 'contact-banner', 'about'];
const seccionesAyuda = ['Inicio', 'bot']; // ← AÑADÍ #bot

let indice = 0;
let intervalo = null;
let autoScrollActivo = true;

function getSecciones() {
  const pagina = document.body.dataset.pagina || 'index';
  return pagina === 'ayuda' ? seccionesAyuda : seccionesIndex;
}

function scrollSiguiente() {
  if (!autoScrollActivo) return;

  const secciones = getSecciones();
  const siguiente = document.getElementById(secciones[indice]);
  if (siguiente) {
    const header = document.querySelector('.header');
    const headerAltura = header ? header.offsetHeight : 0;
    const y = siguiente.offsetTop - headerAltura - 20;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
  indice = (indice + 1) % secciones.length;
}

function iniciarAutoScroll() {
  if (intervalo) clearInterval(intervalo);
  intervalo = setInterval(scrollSiguiente, 10000); // 10 SEGUNDOS
}

function detenerAutoScroll() {
  autoScrollActivo = false;
  if (intervalo) clearInterval(intervalo);
}

window.addEventListener('load', function() {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 600);
    }, 2000);
  }

  iniciarAutoScroll();

  // DETENER AL HACER CLIC EN MENÚ
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', detenerAutoScroll);
  });

  // DETENER AL HACER SCROLL MANUAL
  let timeout;
  window.addEventListener('wheel', () => {
    detenerAutoScroll();
    clearTimeout(timeout);
    timeout = setTimeout(() => autoScrollActivo = true, 15000);
  }, { passive: true });

  window.addEventListener('touchstart', () => {
    detenerAutoScroll();
    clearTimeout(timeout);
    timeout = setTimeout(() => autoScrollActivo = true, 15000);
  });
});
// Carrusel de paquetes
  document.addEventListener('DOMContentLoaded', () => {
    const categorias = document.querySelectorAll('.categoria');
    const paquetes = document.querySelectorAll('.paquete');

    function mostrarCategoria(categoria) {
      paquetes.forEach(p => {
        p.style.display = (p.dataset.categoria === categoria) ? 'flex' : 'none';
      });
    }

    categorias.forEach(cat => {
      cat.addEventListener('click', () => {
        categorias.forEach(c => c.classList.remove('active'));
        cat.classList.add('active');
        mostrarCategoria(cat.dataset.categoria);
      });
    });

    mostrarCategoria('fibra');
  });




















// Abansar los baners
const seccionesIndex = ['Inicio', 'Imagenes', 'Servicios', 'contact-banner', 'about'];
const seccionesAyuda = ['Inicio', 'bot']; 
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
    const y = siguiente.offsetTop - headerAltura - 1;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
  indice = (indice + 1) % secciones.length;
}
function iniciarAutoScroll() {
  if (intervalo) clearInterval(intervalo);
  intervalo = setInterval(scrollSiguiente, 3000); // 10 SEGUNDOS
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
  // Detener al hacer ckic
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', detenerAutoScroll);
  });
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




















// === CARRUSEL DE IMÁGENES (NO CHOCA CON PAQUETES) ===
let imgIndex2 = 0;
const imgSlides2 = document.querySelectorAll('#carruselImgTrack2 .slide-img');
const puntosImg2 = document.getElementById('puntosImg2');
const prevImgBtn2 = document.getElementById('prevImgBtn2');
const nextImgBtn2 = document.getElementById('nextImgBtn2');

function showImgSlide2(n) {
  imgSlides2.forEach((slide, i) => {
    slide.classList.toggle('active', i === n);
  });
  document.querySelectorAll('#puntosImg2 span').forEach((punto, i) => {
    punto.classList.toggle('active', i === n);
  });
  document.getElementById('carruselImgTrack2').style.transform = `translateX(-${n * 100}%)`;
}

// CREAR PUNTOS
imgSlides2.forEach((_, i) => {
  const span = document.createElement('span');
  span.addEventListener('click', () => {
    imgIndex2 = i;
    showImgSlide2(imgIndex2);
  });
  puntosImg2.appendChild(span);
});
showImgSlide2(0);

// FLECHAS
prevImgBtn2.addEventListener('click', () => {
  imgIndex2 = (imgIndex2 - 1 + imgSlides2.length) % imgSlides2.length;
  showImgSlide2(imgIndex2);
});

nextImgBtn2.addEventListener('click', () => {
  imgIndex2 = (imgIndex2 + 1) % imgSlides2.length;
  showImgSlide2(imgIndex2);
});


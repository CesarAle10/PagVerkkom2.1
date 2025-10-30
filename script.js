// Carrusel de paquetes
document.addEventListener("DOMContentLoaded", () => {
  const categorias = document.querySelectorAll('.categoria');
  const descripcion = document.getElementById('descripcionCategoria');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const puntosContainer = document.getElementById('puntos');
  let currentCategoria = 'fibra';
  let currentIndex = 0;
  let filteredSlides = [];
  const descripciones = {
    fibra: "¡Todo en uno, sin complicaciones! Conecta tu hogar o negocio con la mejor tecnología y disfruta de nuestro servicio sin preocupaciones.",
    antena: "Conexión inalámbrica confiable y rápida. Ideal para zonas donde la fibra aún no llega. ¡Sin cables, sin límites!"
  };
  function filtrarSlides(categoria) {
    filteredSlides = Array.from(slides).filter(s => s.dataset.tipo === categoria);
    currentIndex = 0;
    updateCarrusel();
    updatePuntos();
  }
  function updateCarrusel() {
    slides.forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none';
    });
    if (filteredSlides.length > 0) {
      const activeSlide = filteredSlides[currentIndex];
      activeSlide.classList.add('active');
      activeSlide.style.display = 'flex';
    }
  }
  function updatePuntos() {
    puntosContainer.innerHTML = '';
    if (filteredSlides.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      return;
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }
    filteredSlides.forEach((_, i) => {
      const punto = document.createElement('div');
      punto.classList.add('punto');
      if (i === currentIndex) punto.classList.add('active');
      punto.addEventListener('click', () => {
        currentIndex = i;
        updateCarrusel();
        updatePuntos();
      });
      puntosContainer.appendChild(punto);
    });
  }
  prevBtn.addEventListener('click', () => {
    if (filteredSlides.length <= 1) return;
    currentIndex = (currentIndex - 1 + filteredSlides.length) % filteredSlides.length;
    updateCarrusel();
    updatePuntos();
  });
  nextBtn.addEventListener('click', () => {
    if (filteredSlides.length <= 1) return;
    currentIndex = (currentIndex + 1) % filteredSlides.length;
    updateCarrusel();
    updatePuntos();
  });
  categorias.forEach(cat => {
    cat.addEventListener('click', () => {
      categorias.forEach(c => c.classList.remove('active'));
      cat.classList.add('active');
      currentCategoria = cat.dataset.categoria;
      descripcion.textContent = descripciones[currentCategoria];
      filtrarSlides(currentCategoria);
    });
  });
  filtrarSlides('fibra');
});





















// Abansar los baners
const seccionesIndex = ['Inicio', 'video', 'Servicios', 'contact-banner', 'about'];
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
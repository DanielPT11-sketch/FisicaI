let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateSlide() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    // Ocultar suavemente el botón "Anterior" en la primera diapositiva sin alterar la posición
    if (currentSlide === 0) {
        prevBtn.style.visibility = 'hidden';
        prevBtn.style.opacity = '0';
        prevBtn.style.pointerEvents = 'none';
    } else {
        prevBtn.style.visibility = 'visible';
        prevBtn.style.opacity = '1';
        prevBtn.style.pointerEvents = 'auto';
    }

    // Ocultar suavemente el botón "Siguiente" en la última diapositiva sin alterar la posición
    if (currentSlide === slides.length - 1) {
        nextBtn.style.visibility = 'hidden';
        nextBtn.style.opacity = '0';
        nextBtn.style.pointerEvents = 'none';
    } else {
        nextBtn.style.visibility = 'visible';
        nextBtn.style.opacity = '1';
        nextBtn.style.pointerEvents = 'auto';
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = 0;
    } else if (currentSlide >= slides.length) {
        currentSlide = slides.length - 1;
    }
    updateSlide();
}

// Navegación con teclado (Flechas izquierda y derecha)
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        if (currentSlide < slides.length - 1) changeSlide(1);
    } else if (event.key === 'ArrowLeft') {
        if (currentSlide > 0) changeSlide(-1);
    }
});

// Inicializar el estado de los botones al cargar la página
updateSlide();
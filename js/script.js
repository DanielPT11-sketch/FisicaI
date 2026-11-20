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

// Cálculo automático para la Demostración del Experimento (Diapositiva 12)
function calcularExperimento() {
    const fInput = document.getElementById('exp-f');
    const dInput = document.getElementById('exp-d');
    const thetaInput = document.getElementById('exp-theta');
    const tInput = document.getElementById('exp-t');
    const mInput = document.getElementById('exp-m');

    if (!fInput || !dInput || !thetaInput || !tInput || !mInput) return;

    const F = parseFloat(fInput.value) || 0;
    const d = parseFloat(dInput.value) || 0;
    const thetaGrados = parseFloat(thetaInput.value) || 0;
    const dt = parseFloat(tInput.value);
    const m = parseFloat(mInput.value);

    const thetaRad = thetaGrados * (Math.PI / 180);
    const W = F * d * Math.cos(thetaRad);
    const P = dt > 0 ? W / dt : 0;
    const I = dt > 0 ? F * dt : 0;
    const vf = m > 0 ? I / m : 0;

    document.getElementById('exp-out-w').textContent = `${W.toFixed(2)} J`;
    document.getElementById('exp-out-p').textContent = `${P.toFixed(2)} W`;
    document.getElementById('exp-out-i').textContent = `${I.toFixed(2)} N·s`;
    document.getElementById('exp-out-vf').textContent = `${vf.toFixed(2)} m/s`;
}

// Navegación con teclado (Flechas izquierda y derecha, evitando conflicto al escribir en inputs)
document.addEventListener('keydown', function(event) {
    if (document.activeElement && document.activeElement.tagName === 'INPUT') {
        return;
    }

    if (event.key === 'ArrowRight') {
        if (currentSlide < slides.length - 1) changeSlide(1);
    } else if (event.key === 'ArrowLeft') {
        if (currentSlide > 0) changeSlide(-1);
    }
});

// Escuchar cambios en los campos del experimento en tiempo real
['exp-f', 'exp-d', 'exp-theta', 'exp-t', 'exp-m'].forEach((id) => {
    const inputEl = document.getElementById(id);
    if (inputEl) {
        inputEl.addEventListener('input', calcularExperimento);
    }
});

// Inicializar el estado de los botones y los resultados al cargar la página
updateSlide();
calcularExperimento();
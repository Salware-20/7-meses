let corazonesRestantes = 5;

document.body.addEventListener('touchstart', mostrarPoema);
document.body.addEventListener('click', mostrarPoema);

function mostrarPoema() {
    const poema = document.getElementById('poema');
    poema.style.display = 'block';
    setTimeout(() => {
        poema.style.opacity = '1';
    }, 10);
    document.body.removeEventListener('touchstart', mostrarPoema);
    document.body.removeEventListener('click', mostrarPoema);
    generarCorazones();
}

function generarCorazones() {
    for (let i = 0; i < corazonesRestantes; i++) {
        const corazon = document.createElement('div');
        corazon.className = 'corazon';
        corazon.innerHTML = '❤️';
        corazon.style.left = Math.random() * 100 + '%';
        corazon.style.top = Math.random() * 100 + '%';
        corazon.addEventListener('click', explotar);
        corazon.addEventListener('touchstart', explotar);
        document.body.appendChild(corazon);
    }
}

function explotar(e) {
    const corazon = e.target;
    const rect = corazon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 10; i++) {
        crearParticula(centerX, centerY);
    }

    corazon.style.transform = 'scale(0)';
    corazon.style.opacity = '0';
    setTimeout(() => corazon.remove(), 300);
    
    corazonesRestantes--;

    if (corazonesRestantes === 0) {
        setTimeout(mostrarMensajeFinal, 1000);
    }
}

function crearParticula(x, y) {
    const particula = document.createElement('div');
    particula.className = 'particula';
    particula.style.left = x + 'px';
    particula.style.top = y + 'px';
    document.body.appendChild(particula);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 5 + 2;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;

    let opacity = 1;
    const animacion = setInterval(() => {
        x += dx;
        y += dy;
        opacity -= 0.02;
        particula.style.left = x + 'px';
        particula.style.top = y + 'px';
        particula.style.opacity = opacity;

        if (opacity <= 0) {
            clearInterval(animacion);
            particula.remove();
        }
    }, 20);
}

function mostrarMensajeFinal() {
    document.body.style.background = 'linear-gradient(45deg, #F6FCFE, #0F738A)';
    document.getElementById('poema').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('poema').style.display = 'none';
        const mensajeFinal = document.getElementById('mensaje-final');
        mensajeFinal.style.display = 'block';
        setTimeout(() => {
            mensajeFinal.style.opacity = '1';
            mensajeFinal.style.transform = 'scale(1)';
        }, 50);
    }, 1000);
}
// Script para el menú hamburguesa
const btn = document.getElementById('btn-menu');
const menu = document.getElementById('menu-links');
const nav = document.getElementById('menu-sticky');

btn.addEventListener('click', () => {
    menu.classList.toggle('translate-x-full');
});

function checkScroll() {
    if (window.scrollY > 20) {
        // Cuando no estás arriba: Color vinotinto y sombra
        nav.classList.add('bg-[#7F0039]', 'shadow-md');
    } else {
        // Cuando estás puro arriba: transparente
        nav.classList.remove('bg-[#7F0039]', 'shadow-md');
    }
}

window.addEventListener('scroll', checkScroll);

document.addEventListener('DOMContentLoaded', checkScroll);

// Script para el video de fondo
function activarVideoLimpio() {
    const iframe = document.getElementById('videoAerocaribe');
    const btn = document.getElementById('btn-contenedor');

    // Actualizamos el SRC para activar sonido y controles, pero manteniendo limpieza
    let cleanSrc = "https://www.youtube.com/embed/mjpmjFaJlBs?autoplay=1&mute=0&controls=1&cc_load_policy=0&iv_load_policy=3&enablejsapi=1";

    iframe.src = cleanSrc;
    iframe.classList.remove('pointer-events-none', 'brightness-75');
    iframe.classList.add('brightness-100');

    // Ocultamos el botón para que el video sea el protagonista total
    btn.style.opacity = '0';
    setTimeout(() => btn.style.display = 'none', 500);
}

// Script para el formulario de contacto
const form = document.getElementById('contactForm');
const inputEmail = document.getElementById('email');
const inputNombre = document.getElementById('nombre');

const errFormato = document.getElementById('error-formato');
const errEmailVacio = document.getElementById('error-email-vacio');
const errNombre = document.getElementById('error-nombre');

// 1. VALIDACIÓN EN VIVO SOLO PARA EL FORMATO DE CORREO
inputEmail.addEventListener('input', function () {
    const val = inputEmail.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (val.length > 0) {
        errEmailVacio.classList.add('hidden'); // Si escribe, quitamos el aviso de "vacío"
        if (!regex.test(val)) {
            errFormato.classList.remove('hidden');
            inputEmail.classList.add('border-red-500');
        } else {
            errFormato.classList.add('hidden');
            inputEmail.classList.remove('border-red-500');
        }
    } else {
        errFormato.classList.add('hidden');
        inputEmail.classList.remove('border-red-500');
    }
});

// 2. VALIDACIÓN AL ENVIAR (Solo Nombre y Correo)
form.addEventListener('submit', function (e) {
    e.preventDefault();
    let esValido = true;

    // Validar Nombre
    if (inputNombre.value.trim() === "") {
        errNombre.classList.remove('hidden');
        inputNombre.classList.add('border-red-500');
        esValido = false;
    } else {
        errNombre.classList.add('hidden');
        inputNombre.classList.remove('border-red-500');
    }

    // Validar Email vacío
    if (inputEmail.value.trim() === "") {
        errEmailVacio.classList.remove('hidden');
        inputEmail.classList.add('border-red-500');
        esValido = false;
    }

    // Verificar que si hay algo en el email, el formato sea correcto
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (esValido && regex.test(inputEmail.value)) {
        const modal = document.getElementById('successModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        form.reset();
    }
});

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}
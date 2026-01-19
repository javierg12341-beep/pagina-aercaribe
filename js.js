// Script para el menú hamburguesa y submenús
document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('btn-menu');
    const menuLinks = document.getElementById('menu-links');
    const iconoMenu = document.getElementById('icono-menu');
    const navSticky = document.getElementById('menu-sticky');
    const dropdowns = document.querySelectorAll('.dropdown-container');

    // --- MENÚ HAMBURGUESA ---
    btnMenu.addEventListener('click', () => {
        const isHidden = menuLinks.classList.toggle('translate-x-full');
        if (!isHidden) {
            iconoMenu.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            document.body.style.overflow = 'hidden';
        } else {
            iconoMenu.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />';
            document.body.style.overflow = 'auto';
            cerrarTodosLosSubmenus();
        }
    });

    // ---SUBMENÚS ---
    dropdowns.forEach(container => {
        const btn = container.querySelector('.submenu-btn');
        const content = container.querySelector('.submenu-content');
        const flecha = container.querySelector('.flecha');

        // DESKTOP: Hover
        container.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 768) {
                content.classList.remove('hidden');
                content.classList.add('flex');
                flecha.classList.add('rotate-180');
            }
        });

        container.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 768) {
                content.classList.add('hidden');
                content.classList.remove('flex');
                flecha.classList.remove('rotate-180');
            }
        });

        // MÓVIL evento al hacer Click en el Acordeón)
        btn.addEventListener('click', (e) => {
            if (window.innerWidth < 768) {
                e.preventDefault();
                e.stopPropagation();

                const yaAbierto = !content.classList.contains('hidden');

                cerrarTodosLosSubmenus();

                if (!yaAbierto) {
                    content.classList.remove('hidden');
                    content.classList.add('flex');
                    flecha.classList.add('rotate-180');
                }
            }
        });
    });

    function cerrarTodosLosSubmenus() {
        document.querySelectorAll('.submenu-content').forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('flex');
        });
        document.querySelectorAll('.flecha').forEach(f => f.classList.remove('rotate-180'));
    }

    // --- 3. STICKY HEADER ---
    function handleScroll() {
        if (window.scrollY > 20) {
            navSticky.classList.add('bg-[#7F0039]', 'shadow-md');
        } else {
            navSticky.classList.remove('bg-[#7F0039]', 'shadow-md');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Resetear al cambiar tamaño de pantalla
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            cerrarTodosLosSubmenus();
            menuLinks.classList.add('translate-x-full');
            document.body.style.overflow = 'auto';
            iconoMenu.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />';
        }
    });
});

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
// JavaScript para la página web de DEVSA

// Función para smooth scrolling en navegación
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para navbar fija

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cerrar navbar en móvil al hacer click en un enlace
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });

    // Animación de aparición para las cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todas las cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Destacar enlace activo en navegación
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remover clase activa de todos los enlaces
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Agregar clase activa al enlace correspondiente
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Escuchar scroll para destacar enlace activo
    window.addEventListener('scroll', highlightNavLink);

    // Efecto de typing para el título principal
    const title = document.querySelector('header h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid white';

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            } else {
                // Remover cursor después de completar
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        }

        // Iniciar efecto después de un pequeño delay
        setTimeout(typeWriter, 500);
    }

    // Contador animado para estadísticas (si se agregan en el futuro)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // Efecto parallax suave para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Validación simple para formularios (si se agregan)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Función para mostrar notificaciones toast
    function showToast(message, type = 'info') {
        // Crear elemento toast
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        // Agregar al DOM
        document.body.appendChild(toast);

        // Inicializar y mostrar toast
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();

        // Remover del DOM después de que se oculte
        toast.addEventListener('hidden.bs.toast', function() {
            document.body.removeChild(toast);
        });
    }

    // Lazy loading para imágenes (si se agregan)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Función para copiar texto al portapapeles
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            showToast('Texto copiado al portapapeles', 'success');
        }).catch(function() {
            showToast('Error al copiar texto', 'danger');
        });
    }

    // Agregar funcionalidad de copia a información de contacto
    const contactInfo = document.querySelectorAll('#contacto a[href^="mailto:"], #contacto a[href^="tel:"]');
    contactInfo.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim();
            copyToClipboard(text);
        });
    });

    console.log('DEVSA Website - JavaScript cargado correctamente');
});

// Función para cambiar tema (modo oscuro/claro) - para implementación futura
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Cargar tema guardado
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Función para analytics (Google Analytics, etc.)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Función para optimizar rendimiento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce a eventos de scroll
const debouncedScroll = debounce(function() {
    // Funciones que se ejecutan en scroll
}, 100);

window.addEventListener('scroll', debouncedScroll);
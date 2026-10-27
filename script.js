/**
 * Portfolio Personal - Javier Castro Muriana
 * Estética Dark Tech Premium (Inspirado en la referencia)
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. MENÚ DE NAVEGACIÓN MÓVIL
    // =========================================================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('open')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Cerrar menú al hacer clic en un enlace de navegación
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Cerrar menú al hacer clic fuera del menú
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // =========================================================================
    // 2. RESALTAR ENLACE ACTIVO SEGÚN LA SECCIÓN (SCROLLSPY)
    // =========================================================================
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveNavLink() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);
    highlightActiveNavLink();

    // =========================================================================
    // 3. PESTAÑAS (TABS) DE TRAYECTORIA: EXPERIENCIA / EDUCACIÓN
    // =========================================================================
    const tabButtons = document.querySelectorAll('.resume-tab-btn');
    const tabPanes = document.querySelectorAll('.resume-tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Quitar clase activa de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Activar botón pulsado
            button.classList.add('active');

            // Activar contenido correspondiente
            const activePane = document.getElementById(`pane-${targetTab}`);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });

    // =========================================================================
    // 4. BOTÓN FLOTANTE "VOLVER ARRIBA"
    // =========================================================================
    const scrollTopBtn = document.getElementById('scroll-top');

    function toggleScrollTopBtn() {
        if (!scrollTopBtn) return;
        if (window.scrollY > 350) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', toggleScrollTopBtn);

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =========================================================================
    // 5. FORMULARIO DE CONTACTO INTERACTIVO
    // =========================================================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showStatusMessage('Por favor, rellena todos los campos.', 'error');
                return;
            }

            // Simular estado de envío
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Enviando mensaje...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;

                showStatusMessage(
                    `¡Gracias, ${name}! Tu mensaje ha sido registrado correctamente. Te responderé a la brevedad.`,
                    'success'
                );

                // Crear enlace mailto directo opcional
                const mailtoLink = `mailto:javiercastromuriana2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Hola Javier,\n\nSoy " + name + " (" + email + ").\n\n" + message)}`;
                
                const openClient = confirm("¿Deseas abrir tu gestor de correo para enviar el mensaje directamente a Javier?");
                if (openClient) {
                    window.location.href = mailtoLink;
                }

                contactForm.reset();

                setTimeout(() => {
                    if (formStatus) {
                        formStatus.textContent = '';
                        formStatus.className = 'form-status';
                    }
                }, 8000);
            }, 800);
        });
    }

    function showStatusMessage(text, type) {
        if (!formStatus) return;
        formStatus.textContent = text;
        formStatus.className = `form-status ${type}`;
    }

    // =========================================================================
    // 6. AÑO ACTUAL EN EL FOOTER
    // =========================================================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

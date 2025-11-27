/* Mockup Website/assets/js/animations.js */
/* Scroll-triggered animations and dynamic effects */

document.addEventListener("DOMContentLoaded", function () {

    // ===================================================
    // 1. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ===================================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));


    // ===================================================
    // 2. NAVBAR SCROLL EFFECT (Glassmorphism on scroll)
    // ===================================================

    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }


    // ===================================================
    // 3. PARALLAX EFFECT FOR HERO SECTION
    // ===================================================

    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            // Move background slower than scroll
            heroSection.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
        });
    }


    // ===================================================
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    // ===================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Ignore empty anchors and modal triggers
            if (href === '#' || this.hasAttribute('data-bs-toggle')) {
                return;
            }

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for navbar height

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ===================================================
    // 5. ADD FLOATING ANIMATION TO ICONS
    // ===================================================

    const iconElements = document.querySelectorAll('section .bi.fs-1, section .bi.fs-2');
    iconElements.forEach((icon, index) => {
        // Add stagger delay
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('float-icon');
    });


    // ===================================================
    // 6. CARD STAGGER ANIMATION
    // ===================================================

    const cardGrids = document.querySelectorAll('.row.g-4');

    cardGrids.forEach(grid => {
        const cards = grid.querySelectorAll('.col-lg-3, .col-lg-4, .col-md-4, .col-md-6');

        cards.forEach((card, index) => {
            card.classList.add('scroll-animate');
            // Stagger delay is handled by CSS nth-child selectors
        });
    });


    // ===================================================
    // 7. BUTTON HOVER RIPPLE EFFECT
    // ===================================================

    const buttons = document.querySelectorAll('.btn-primary, .btn-whatsapp');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function (e) {
            // Add subtle scale on hover (already in CSS, but we can add extra effects here)
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });


    // ===================================================
    // 8. ANIMATED COUNTER (Optional - for statistics)
    // ===================================================

    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Example usage: Add class 'counter' to elements with data-target attribute
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));


    // ===================================================
    // 9. LAZY LOAD IMAGES (Performance optimization)
    // ===================================================

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }


    // ===================================================
    // 10. THEME SWITCHER ANIMATION ENHANCEMENT
    // ===================================================

    const themeSwitcher = document.getElementById('theme-switcher');

    if (themeSwitcher) {
        themeSwitcher.addEventListener('change', function () {
            // Add a brief fade effect during theme transition
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        });
    }


    // ===================================================
    // 11. FORM INPUT FOCUS ANIMATIONS
    // ===================================================

    const formInputs = document.querySelectorAll('.form-control, .form-select');

    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });
    });


    // ===================================================
    // 12. TESTIMONIAL CARDS HOVER EFFECT
    // ===================================================

    const testimonialCards = document.querySelectorAll('.card');

    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Add subtle tilt effect
            this.style.transform = 'translateY(-5px) rotateX(2deg)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });

});


// ===================================================
// 13. PAGE LOAD ANIMATION
// ===================================================

window.addEventListener('load', () => {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

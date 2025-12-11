/* ========================================
   CampoVivo Landing Page - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                element.style.animationPlayState = 'running';
                element.classList.add('active');
            }
        });
    };
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.remove('active');
            if (navDots[i]) navDots[i].classList.remove('active');
        });
        if (testimonials[index]) testimonials[index].classList.add('active');
        if (navDots[index]) navDots[index].classList.add('active');
    }

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 6000);

    // Mobile Features Highlight
    const mobileFeatures = document.querySelectorAll('.mobile-feature');
    let currentFeature = 0;

    function highlightFeature(index) {
        mobileFeatures.forEach(f => f.classList.remove('active'));
        if (mobileFeatures[index]) mobileFeatures[index].classList.add('active');
    }

    mobileFeatures.forEach((feature, index) => {
        feature.addEventListener('mouseenter', () => {
            currentFeature = index;
            highlightFeature(currentFeature);
        });
    });

    setInterval(() => {
        currentFeature = (currentFeature + 1) % mobileFeatures.length;
        highlightFeature(currentFeature);
    }, 4000);

    // Parallax Effect for Hero
    const heroImages = document.querySelectorAll('.hero-image');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroImages.forEach((img, index) => {
            const speed = 0.1 + (index * 0.05);
            img.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Ratings Counter Animation
    const ratingScores = document.querySelectorAll('.rating-score');
    let ratingsAnimated = false;
    const ratingsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !ratingsAnimated) {
                ratingsAnimated = true;
                ratingScores.forEach(score => {
                    const value = parseFloat(score.textContent);
                    score.textContent = '0';
                    let current = 0;
                    const increment = value / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= value) {
                            score.textContent = value.toFixed(1);
                            clearInterval(timer);
                        } else {
                            score.textContent = current.toFixed(1);
                        }
                    }, 30);
                });
            }
        });
    }, { threshold: 0.5 });
    ratingScores.forEach(score => ratingsObserver.observe(score.parentElement));

    // QR Widget Hover
    const qrWidget = document.querySelector('.qr-widget');
    if (qrWidget) {
        qrWidget.addEventListener('mouseenter', () => qrWidget.style.transform = 'scale(1.1)');
        qrWidget.addEventListener('mouseleave', () => qrWidget.style.transform = 'scale(1)');
    }

    console.log('%c🌱 CampoVivo', 'font-size: 24px; font-weight: bold; color: #22C55E;');
});

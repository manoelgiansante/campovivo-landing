// CampoVivo Landing Page - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Scroll Reveal Animation
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, observerOptions);

    document.querySelectorAll('.feature-row, .mobile-feature, .testimonial-slide, .chart-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.pageYOffset > 100 ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none';
    });

    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => slide.style.display = i === index ? 'grid' : 'none');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    dots.forEach((dot, index) => dot.addEventListener('click', () => { currentSlide = index; showSlide(currentSlide); }));
    setInterval(() => { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); }, 6000);

    // Chart animation
    const chartSvg = document.querySelector('.chart-svg');
    if (chartSvg) {
        new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chartSvg.querySelectorAll('path').forEach((path, i) => {
                        const length = path.getTotalLength();
                        path.style.strokeDasharray = length;
                        path.style.strokeDashoffset = length;
                        path.style.animation = `drawLine 1.5s ease-out ${i * 0.2}s forwards`;
                    });
                }
            });
        }, { threshold: 0.5 }).observe(chartSvg);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes drawLine { to { stroke-dashoffset: 0; } }
        .fade-in { opacity: 0; transform: translateY(30px); transition: all 0.6s ease-out; }
        .fade-in.visible { opacity: 1; transform: translateY(0); }
        .nav.active { display: flex !important; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: white; padding: 20px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
    `;
    document.head.appendChild(style);

    // Parallax for hero devices
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.device').forEach((device, i) => {
            device.style.transform = `translateY(${scrolled * (0.1 + i * 0.05)}px)`;
        });
    });

    // Counter animation for ratings
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.textContent);
                let current = 0;
                const timer = setInterval(() => {
                    current += target / 50;
                    if (current >= target) { entry.target.textContent = target.toFixed(1); clearInterval(timer); }
                    else entry.target.textContent = current.toFixed(1);
                }, 30);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.rating-score').forEach(rating => counterObserver.observe(rating));
});

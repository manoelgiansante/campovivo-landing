// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    
    // Create mobile menu if it doesn't exist
    let mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenu) {
      mobileMenu = document.createElement('div');
      mobileMenu.className = 'mobile-menu';
      mobileMenu.innerHTML = `
        <div class="mobile-menu-content">
          <a href="#features">Recursos</a>
          <a href="#how-it-works">Como Funciona</a>
          <a href="#pricing">Planos</a>
          <a href="#contact">Contato</a>
          <div class="mobile-menu-actions">
            <a href="#" class="btn btn-ghost">Entrar</a>
            <a href="#" class="btn btn-primary">Começar Grátis</a>
          </div>
        </div>
      `;
      document.body.appendChild(mobileMenu);
      
      // Add styles for mobile menu
      const style = document.createElement('style');
      style.textContent = `
        .mobile-menu {
          position: fixed;
          top: var(--header-height);
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .mobile-menu.active {
          opacity: 1;
          visibility: visible;
        }
        
        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          gap: 1rem;
        }
        
        .mobile-menu-content a {
          font-size: 1.25rem;
          font-weight: 500;
          padding: 1rem;
          border-bottom: 1px solid var(--color-border);
        }
        
        .mobile-menu-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
          opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
      `;
      document.head.appendChild(style);
      
      // Close menu when clicking links
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
        });
      });
    }
    
    mobileMenu.classList.toggle('active');
  });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Header Scroll Effect =====
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = 'var(--shadow-md)';
  } else {
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ===== Animate Elements on Scroll =====
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .feature-card,
  .step-card,
  .pricing-card,
  .testimonial-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .feature-card.animate-in,
  .step-card.animate-in,
  .pricing-card.animate-in,
  .testimonial-card.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(animationStyles);

// Observe elements
document.querySelectorAll('.feature-card, .step-card, .pricing-card, .testimonial-card').forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(el);
});

// ===== Form Submission =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      // Show success message
      contactForm.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style="margin: 0 auto 1rem;">
            <circle cx="32" cy="32" r="32" fill="#DCFCE7"/>
            <path d="M44 24L28 40L20 32" stroke="#22C55E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3 style="margin-bottom: 0.5rem;">Mensagem Enviada!</h3>
          <p style="color: var(--color-text-light);">Entraremos em contato em breve.</p>
        </div>
      `;
    }, 1500);
  });
}

// ===== Stats Counter Animation =====
const statsSection = document.querySelector('.hero-stats');

if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statsObserver.observe(statsSection);
}

function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const text = stat.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    
    let current = 0;
    const increment = number / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= number) {
        current = number;
        clearInterval(timer);
      }
      
      let displayValue = Math.floor(current).toLocaleString('pt-BR');
      if (hasPlus) displayValue += '+';
      if (hasPercent) displayValue += '%';
      
      stat.textContent = displayValue;
    }, stepTime);
  });
}

// ===== Pricing Toggle (if needed) =====
// This can be expanded to add monthly/yearly toggle

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  // Add loaded class to body for initial animations
  document.body.classList.add('loaded');
  
  console.log('CampoVivo Landing Page loaded successfully!');
});

/**
 * KAA 한국자동차협회 - Main JS
 * Premium Mobility Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initCounters();
  initCalculator();
  init3DCardTilt();
  initParticles();
  initMobileNav();
});


// ═══════════════════════════════════
// NAVBAR SCROLL EFFECT
// ═══════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  }, { passive: true });
}


// ═══════════════════════════════════
// MOBILE NAVIGATION
// ═══════════════════════════════════
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}


// ═══════════════════════════════════
// SCROLL REVEAL ANIMATIONS
// ═══════════════════════════════════
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
  
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Don't unobserve to allow re-animation if needed
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}


// ═══════════════════════════════════
// NUMBER COUNTER ANIMATION
// ═══════════════════════════════════
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.count);
  const duration = 2000;
  const startTime = performance.now();
  const suffix = element.textContent.replace(/[0-9,]/g, '').trim();
  const isLarge = target >= 1000;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(eased * target);

    if (isLarge) {
      element.textContent = current.toLocaleString() + suffix;
    } else {
      element.textContent = current + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}


// ═══════════════════════════════════
// SAVINGS CALCULATOR
// ═══════════════════════════════════
function initCalculator() {
  const kmInput = document.getElementById('monthlyKm');
  const priceInput = document.getElementById('fuelPrice');
  const savingsEl = document.getElementById('savingsValue');

  if (!kmInput || !priceInput || !savingsEl) return;

  function calculateSavings() {
    const monthlyKm = parseFloat(kmInput.value) || 0;
    const fuelPrice = parseFloat(priceInput.value) || 0;
    
    // Assume 12km/L average fuel efficiency
    const fuelEfficiency = 12;
    const monthlyFuelLiters = monthlyKm / fuelEfficiency;
    const monthlyFuelCost = monthlyFuelLiters * fuelPrice;
    
    // Platinum = 15% discount on fuel + 30% on gifticons (estimated ₩20,000/month)
    const fuelSavings = monthlyFuelCost * 0.15;
    const gifticonSavings = 20000 * 0.3;
    const insuranceSavings = 5000; // estimated monthly savings
    
    const monthlySavings = fuelSavings + gifticonSavings + insuranceSavings;
    const annualSavings = Math.round(monthlySavings * 12);

    animateSavingsValue(savingsEl, annualSavings);
  }

  let currentDisplayValue = 0;

  function animateSavingsValue(element, targetValue) {
    const startValue = currentDisplayValue;
    const diff = targetValue - startValue;
    const duration = 800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + diff * eased);
      
      element.textContent = '₩' + current.toLocaleString();
      currentDisplayValue = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  kmInput.addEventListener('input', calculateSavings);
  priceInput.addEventListener('input', calculateSavings);
  
  // Initial calculation
  calculateSavings();
}


// ═══════════════════════════════════
// 3D CARD TILT EFFECT
// ═══════════════════════════════════
function init3DCardTilt() {
  const heroCard = document.getElementById('heroCard');
  if (!heroCard) return;

  document.addEventListener('mousemove', (e) => {
    const rect = heroCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    
    const rotateX = deltaY * -8;
    const rotateY = deltaX * 8;

    heroCard.querySelector('.card-3d-front').style.transform = 
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // Reset on mouse leave
  heroCard.addEventListener('mouseleave', () => {
    heroCard.querySelector('.card-3d-front').style.transform = 
      'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  });

  // Tilt cards in grid
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      card.style.transform = `perspective(800px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


// ═══════════════════════════════════
// PARTICLE BACKGROUND
// ═══════════════════════════════════
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (10 + Math.random() * 15) + 's';
    
    const size = 1 + Math.random() * 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.opacity = 0.1 + Math.random() * 0.3;

    container.appendChild(particle);
  }
}


// ═══════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navbarHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

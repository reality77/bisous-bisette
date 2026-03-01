/* =============================================
   BISOUS BISETTE — Interactions
   ============================================= */

'use strict';

// ===== NAVIGATION =====
const header     = document.getElementById('site-header');
const navToggle  = document.getElementById('nav-toggle');
const navLinks   = document.getElementById('nav-links');

// Scroll shadow on header
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== PRODUCT TABS =====
const tabs         = document.querySelectorAll('.tab');
const earringsGrid = document.getElementById('earrings');
const ringsGrid    = document.getElementById('rings');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      t.classList.remove('tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('tab--active');
    tab.setAttribute('aria-selected', 'true');

    if (tab.dataset.tab === 'earrings') {
      earringsGrid.classList.remove('products-grid--hidden');
      ringsGrid.classList.add('products-grid--hidden');
    } else {
      ringsGrid.classList.remove('products-grid--hidden');
      earringsGrid.classList.add('products-grid--hidden');
    }

    // Re-trigger reveal for newly visible cards
    revealVisibleElements();
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function revealVisibleElements() {
  document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(el => {
    revealObserver.observe(el);
  });
}

revealVisibleElements();

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletter-form');
const nlSuccess      = document.getElementById('nl-success');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');

    if (!emailInput.value || !emailInput.checkValidity()) {
      emailInput.focus();
      nlSuccess.style.color = '#FFCDD2';
      nlSuccess.textContent = '⚠️ Merci de saisir une adresse e-mail valide.';
      return;
    }

    nlSuccess.style.color = '';
    nlSuccess.textContent = '🎉 Merci ! Tu fais partie de la famille Bisous Bisette.';
    emailInput.value = '';
    setTimeout(() => { nlSuccess.textContent = ''; }, 5000);
  });
}

// ===== CONTACT FORM =====
const contactForm    = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = contactForm.querySelector('#name');
    const email   = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');

    if (!name.value.trim()) {
      contactSuccess.style.color = 'var(--coral)';
      contactSuccess.textContent = '⚠️ Merci de renseigner votre prénom.';
      name.focus();
      return;
    }
    if (!email.checkValidity()) {
      contactSuccess.style.color = 'var(--coral)';
      contactSuccess.textContent = '⚠️ Merci de saisir une adresse e-mail valide.';
      email.focus();
      return;
    }
    if (!message.value.trim()) {
      contactSuccess.style.color = 'var(--coral)';
      contactSuccess.textContent = '⚠️ Merci d\'écrire votre message.';
      message.focus();
      return;
    }

    contactSuccess.style.color = '';
    contactSuccess.textContent = '✦ Message envoyé ! On vous répond très vite avec amour 💌';
    contactForm.reset();
    setTimeout(() => { contactSuccess.textContent = ''; }, 6000);
  });
}

// ===== SMOOTH SCROLL (for older browsers) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

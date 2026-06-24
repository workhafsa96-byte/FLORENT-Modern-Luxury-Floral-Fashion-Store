/* =========================================================
   FLORENT — Luxury Floral & Fashion Store
   Vanilla JavaScript — Interactivity Layer
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar: solid background on scroll ---------- */
  const navbar = document.getElementById('navbar');
  const toggleNavbarState = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  toggleNavbarState();
  window.addEventListener('scroll', toggleNavbarState, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Scroll reveal animations (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 90}ms`;
    revealObserver.observe(el);
  });

  /* ---------- Toast helper ---------- */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  /* ---------- Cart: quick-add buttons ---------- */
  const cartCountEl = document.getElementById('cartCount');
  let cartCount = 0;

  document.querySelectorAll('.quick-add').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount += 1;
      cartCountEl.textContent = cartCount;
      const productName = btn.dataset.product || 'Item';
      showToast(`${productName} added to cart`);
    });
  });

  /* ---------- Newsletter form ---------- */
  const newsForm = document.getElementById('newsForm');
  const newsMsg = document.getElementById('newsMsg');

  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsEmail');
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      newsMsg.textContent = 'Please enter a valid email address.';
      newsMsg.style.color = '#e08a7d';
      return;
    }

    newsMsg.style.color = '';
    newsMsg.textContent = `Thanks! ${email} has been subscribed for 10% off.`;
    emailInput.value = '';
    showToast('You are now on the FLORENT list 🌿');
  });

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const message = document.getElementById('cMessage').value.trim();

    if (!name || !isValidEmail(email) || !message) {
      formMsg.textContent = 'Please fill in all required fields with a valid email.';
      formMsg.style.color = '#c0584b';
      return;
    }

    formMsg.style.color = '';
    formMsg.textContent = `Thank you, ${name}! We'll get back to you within one business day.`;
    contactForm.reset();
    showToast('Message sent successfully');
  });

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  /* ---------- Back to top button ---------- */
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 480) toTop.classList.add('show');
    else toTop.classList.remove('show');
  }, { passive: true });

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Search icon (demo behavior) ---------- */
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', () => {
    showToast('Search coming soon — connect a product API to enable this.');
  });

});
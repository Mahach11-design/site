// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE DRAWER ──
const burger      = document.getElementById('burger');
const drawer      = document.getElementById('mobileDrawer');
const overlay     = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
  drawer.classList.add('open');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
  burger.classList.add('active');
}

function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
  burger.classList.remove('active');
}

burger.addEventListener('click', () => {
  drawer.classList.contains('open') ? closeDrawer() : openDrawer();
});

overlay.addEventListener('click', closeDrawer);
drawerClose.addEventListener('click', closeDrawer);

document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});

// ── REVEAL ON SCROLL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      setTimeout(() => {
        el.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(el);
    }
  });
}, {
  threshold: 0.10,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ── SERVICE CARDS: каскадное появление через Observer ──
if (window.innerWidth <= 1024) {

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        // каждая следующая карточка появляется с небольшой задержкой
        const idx = Array.from(document.querySelectorAll('.service-card')).indexOf(card);
        setTimeout(() => {
          card.classList.add('card-visible');
        }, idx * 90);
        cardObserver.unobserve(card);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.service-card').forEach(card => {
    cardObserver.observe(card);
  });
}

// ── PORTFOLIO ITEMS: фото + текст через Observer ──
if (window.innerWidth <= 1024) {

  const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('item-visible');
        portfolioObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -20px 0px'
  });

  document.querySelectorAll('.portfolio-item').forEach(item => {
    portfolioObserver.observe(item);
  });
}

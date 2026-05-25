// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE DRAWER ──
const burger       = document.getElementById('burger');
const drawer       = document.getElementById('mobileDrawer');
const overlay      = document.getElementById('drawerOverlay');
const drawerClose  = document.getElementById('drawerClose');

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
const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry, i) => {

    if (entry.isIntersecting) {

      const el = entry.target;

      setTimeout(() => {
        el.classList.add('visible');
      }, i * 120);

      observer.unobserve(el);
    }

  });

}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});



// ── MOBILE ONLY: PORTFOLIO SCROLL ANIMATIONS ──

if (window.innerWidth <= 1024) {

  const portfolioItems =
    document.querySelectorAll('.portfolio-item');

  function updatePortfolioAnimations() {

    const windowHeight = window.innerHeight;

    portfolioItems.forEach(item => {

      const rect = item.getBoundingClientRect();

      let progress =
        1 - ((rect.top + rect.height * 0.2) / windowHeight);

      progress =
        Math.max(0, Math.min(progress, 1));

      const eased =
        progress * progress * (3 - 2 * progress);

      const bg =
        item.querySelector('.portfolio-bg');

      const info =
        item.querySelector('.portfolio-info');

      if (bg) {

        const scale =
          1 + (eased * 0.08);

        const opacity =
          0.72 + (eased * 0.28);

        bg.style.transform =
          `scale(${scale})`;

        bg.style.opacity =
          opacity;

        bg.style.filter =
          `brightness(${0.72 + eased * 0.28})`;
      }

      if (info) {

        const translate =
          60 - (eased * 60);

        info.style.transform =
          `translateY(${translate}px)`;

        info.style.opacity =
          eased;
      }

    });

  }

  window.addEventListener(
    'scroll',
    updatePortfolioAnimations,
    { passive: true }
  );

  updatePortfolioAnimations();
}

// ── MOBILE: SERVICE CARD PROGRESS ──

if (window.innerWidth <= 1024) {

  const serviceCards =
    document.querySelectorAll('.service-card');

  function updateServiceCards() {

    const windowHeight = window.innerHeight;

    serviceCards.forEach(card => {

      const rect = card.getBoundingClientRect();

      let progress =
        1 - ((rect.top + rect.height * 0.15) / windowHeight);

      progress =
        Math.max(0, Math.min(progress, 1));

      const eased =
        progress * progress * (3 - 2 * progress);

      card.style.setProperty(
        '--progress',
        eased
      );

      const translateY =
        40 - (eased * 40);

      card.style.transform =
        `translateY(${translateY}px)`;

      card.style.opacity =
        0.3 + (eased * 0.7);

      const num =
        card.querySelector('.service-num');

      if (num) {

        num.style.color =
          `rgba(196,169,109,${eased * 0.12})`;

        num.style.transform =
          `translateY(${12 - eased * 12}px)`;
      }

    });

  }

  window.addEventListener(
    'scroll',
    updateServiceCards,
    { passive: true }
  );

  updateServiceCards();
}

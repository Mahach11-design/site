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
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ── SCROLL ANIMATIONS: PORTFOLIO ──
// Только для телефонов и планшетов
if (window.innerWidth <= 1024) {

  const portfolioObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry, i) => {

      if (entry.isIntersecting) {

        const item = entry.target;

        setTimeout(() => {
          item.classList.add('mobile-active');
        }, i * 120);

        portfolioObserver.unobserve(item);
      }

    });

  }, { threshold: 0.25 });

  document.querySelectorAll('.portfolio-item').forEach(el => {
    portfolioObserver.observe(el);
  });

}
// ── SCROLL ANIMATIONS: SERVICE CARDS ──
// Золотая линия и подсветка номера при скролле
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const num  = card.querySelector('.service-num');
      const line = card.querySelector('.service-card-line'); // псевдо-элемент через класс

      setTimeout(() => {
        card.classList.add('scroll-active');
        // Через 1.5s убираем анимацию — hover всё равно работает
        setTimeout(() => card.classList.remove('scroll-active'), 1500);
      }, i * 100);

      serviceObserver.unobserve(card);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.service-card').forEach(el => serviceObserver.observe(el));

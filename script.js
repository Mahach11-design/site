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
// ── SCROLL PROGRESS: SERVICE CARDS ──

const serviceCards = document.querySelectorAll('.service-card');

function updateServiceCards() {

  const windowHeight = window.innerHeight;

  serviceCards.forEach(card => {

    const rect = card.getBoundingClientRect();

    // Когда карточка входит в экран
    const visible = 1 - (rect.top / windowHeight);

    // Ограничиваем 0 → 1
    const progress = Math.max(0, Math.min(visible, 1));

    // Заполняем линию
    card.style.setProperty('--progress', progress);

    // Поднимаем карточку плавно
    const translateY = 30 - (progress * 30);

    card.style.transform = `translateY(${translateY}px)`;

    // Плавное появление
    card.style.opacity = progress;

    // Номер карточки
    const num = card.querySelector('.service-num');

    if (num) {

      num.style.color =
        `rgba(196,169,109,${progress * 0.12})`;

      num.style.transform =
        `translateY(${10 - progress * 10}px)`;
    }

  });

}

window.addEventListener('scroll', updateServiceCards);

updateServiceCards();

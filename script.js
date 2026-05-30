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
document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

// ── REVEAL (заголовки, секции) — одноразовый ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ── MOBILE ANIMATIONS ──────────────────────────────
if (window.innerWidth <= 1024) {

  // Отслеживаем направление скролла
  let lastScrollY = window.scrollY;
  let scrollDir = 'down';
  window.addEventListener('scroll', () => {
    scrollDir = window.scrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = window.scrollY;
  }, { passive: true });


  // ── SERVICE CARDS — двунаправленная ──
  const cards = Array.from(document.querySelectorAll('.service-card'));

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;
      const idx  = cards.indexOf(card);

      if (entry.isIntersecting) {
        // убираем класс ухода, добавляем видимость с каскадом
        card.classList.remove('card-exit');
        setTimeout(() => card.classList.add('card-visible'), idx * 75);

      } else {
        // карточка ушла — смотрим направление
        card.classList.remove('card-visible');
        if (scrollDir === 'up') {
          // уходит вверх — плавный exit
          card.classList.add('card-exit');
        }
        // вниз — просто исчезает (вернётся когда снова появится)
      }
    });
  }, {
    // срабатывает когда карточка видна хотя бы на 20%
    threshold: [0, 0.2],
  });

  cards.forEach(card => cardObserver.observe(card));


  // ── PORTFOLIO ITEMS — двунаправленная ──
  const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));

  const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const item = entry.target;

      if (entry.isIntersecting) {
        item.classList.remove('item-exit');
        // небольшая задержка чтобы браузер успел убрать exit-класс
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            item.classList.add('item-visible');
          });
        });

      } else {
        item.classList.remove('item-visible');
        if (scrollDir === 'up') {
          item.classList.add('item-exit');
        }
      }
    });
  }, {
    // два порога: 0 — ушёл, 0.22 — показался достаточно
    threshold: [0, 0.22],
  });

  portfolioItems.forEach(item => portfolioObserver.observe(item));

}
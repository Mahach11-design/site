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

// Закрыть по ссылке внутри drawer
document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

// Закрыть по Escape
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

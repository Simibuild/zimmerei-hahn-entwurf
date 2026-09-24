document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.createElement('div');
  overlay.id = 'lightbox';
  overlay.className = 'fixed inset-0 z-[100] hidden items-center justify-center bg-black/90 p-4 sm:p-8 cursor-zoom-out';
  overlay.innerHTML = '<img class="max-h-[90vh] max-w-[92vw] rounded-xl shadow-2xl" src="" alt="">' +
    '<button aria-label="Schließen" class="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-2xl">&times;</button>';
  document.body.appendChild(overlay);
  const img = overlay.querySelector('img');

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => {
      img.src = el.getAttribute('data-lightbox');
      img.alt = el.getAttribute('alt') || '';
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
    });
  });

  const close = () => { overlay.classList.add('hidden'); overlay.classList.remove('flex'); };
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  const backLink = document.getElementById('back-link');
  if (backLink) {
    const cameFromSite = document.referrer && document.referrer.indexOf(location.origin) === 0;
    if (cameFromSite && window.history.length > 1) {
      backLink.addEventListener('click', (e) => {
        e.preventDefault();
        history.back();
      });
    }
  }

  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== '0px';
      mobileMenu.style.maxHeight = isOpen ? '0px' : mobileMenu.scrollHeight + 'px';
      mobileMenu.style.opacity = isOpen ? '0' : '1';
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

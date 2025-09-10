document.addEventListener('DOMContentLoaded', () => {
  const landing = document.querySelector('#nv-landing');
  if (!landing) return;

  // header & footer
  document.querySelector('header')?.remove();
  document.querySelector('footer')?.remove();

  // sidebar kiri
  landing.closest('[data-slot="sidebar-wrapper"]')
    ?.querySelector('[data-slot="sidebar"]')
    ?.remove();

  // toc kanan
  const docs = landing.closest('[data-slot="docs"]');
  if (docs) {
    [...docs.children].forEach(el => {
      if (!el.contains(landing)) el.style.display = 'none';
    });
  }

  const article = landing.closest('article');
  if (article) {
    [...article.children].forEach(el => {
      if (!el.contains(landing)) el.style.display = 'none';
    });
    // hide page nav bawah, dialog menu, dll.)
    let sib = article.nextElementSibling;
    while (sib) { sib.style.display = 'none'; sib = sib.nextElementSibling; }
  }
});

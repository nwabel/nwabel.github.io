document.addEventListener('DOMContentLoaded', () => {
  const landingContainer = document.querySelector('#nv-landing'); // Cek keberadaan elemen landing
  if (!landingContainer) return;

  // Hapus elemen global agar landing page bener-bener clean
  document.querySelector('header')?.remove();
  document.querySelector('footer')?.remove();

  // Hapus sidebar kiri agar layout menjadi full-width
  landingContainer.closest('[data-slot="sidebar-wrapper"]')
    ?.querySelector('[data-slot="sidebar"]')
    ?.remove();

  // Sembunyikan kolom selain konten (seperti TOC kanan)
  const docsWrapper = landingContainer.closest('[data-slot="docs"]');
  if (docsWrapper) {
    [...docsWrapper.children].forEach(child => {
      if (!child.contains(landingContainer)) child.style.display = 'none';
    });
  }

  // Bersihkan elemen di dalam artikel (breadcrumb, judul otomatis, nav bawah)
  const articleWrapper = landingContainer.closest('article');
  if (articleWrapper) {
    [...articleWrapper.children].forEach(child => {
      if (!child.contains(landingContainer)) child.style.display = 'none';
    });

    // Hilangkan semua elemen setelah artikel (dialog menu, dll.)
    let sibling = articleWrapper.nextElementSibling;
    while (sibling) { 
      sibling.style.display = 'none'; 
      sibling = sibling.nextElementSibling; 
    }
  }
});
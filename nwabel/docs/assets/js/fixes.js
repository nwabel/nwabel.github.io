/* --- SEARCH TEXT CUSTOMIZATION --- */
(() => {
  const SEARCH_PLACEHOLDER = "Mau cari apa?"; // Teks pengganti

  const updateSearchElements = (root = document) => {
    // Cari tombol trigger search bawaan Shadcn
    const triggers = [
      ...root.querySelectorAll('[data-slot="dialog-trigger"]'),
      ...root.querySelectorAll('button[onclick*="onSearchBarClick"]'),
    ];

    triggers.forEach(btn => {
      // Update label di dalam span
      btn.querySelectorAll("span").forEach(span => {
        if (/^Search/i.test(span.textContent.trim())) span.textContent = SEARCH_PLACEHOLDER;
      });

      // Update text node langsung
      if (/^Search/i.test(btn.textContent.trim())) {
        btn.childNodes.forEach(node => {
          if (node.nodeType === 3 && /^Search/i.test(node.textContent.trim())) {
            node.textContent = SEARCH_PLACEHOLDER;
          }
        });
      }

      // Update atribut accessibility
      if (btn.getAttribute("aria-label")?.toLowerCase().startsWith("search")) btn.setAttribute("aria-label", SEARCH_PLACEHOLDER);
      if (btn.title?.toLowerCase().startsWith("search")) btn.title = SEARCH_PLACEHOLDER;
    });

    // Update placeholder di dalam dialog
    const dialog = root.querySelector("#search-dialog") || root;
    dialog.querySelectorAll('input[data-slot="command-input"], input[type="text"][placeholder]')
      .forEach(input => {
        if (/search/i.test(input.placeholder)) input.setAttribute("placeholder", SEARCH_PLACEHOLDER);
      });
  };

  const initSearchFix = () => updateSearchElements();
  document.addEventListener("DOMContentLoaded", initSearchFix);
  
  // Re-apply saat dialog terbuka
  document.addEventListener("click", (e) => {
    if (e.target.closest('[data-slot="dialog-trigger"], button[onclick*="onSearchBarClick"]')) {
      requestAnimationFrame(() => setTimeout(initSearchFix, 30));
    }
  });

  new MutationObserver(() => initSearchFix()).observe(document.documentElement, { childList: true, subtree: true });
})();

/* --- BACK TO TOP COMPONENT --- */
(() => {
  const SCROLL_THRESHOLD = 300; // Jarak scroll untuk muncul
  const BTN_ID = 'back-to-top';
  let isTicking = false;

  const getHeaderHeight = () => {
    const header = document.querySelector('header');
    return header ? (header.getBoundingClientRect().height + 8) + 'px' : '4rem';
  }; // Hitung jarak aman dari navbar

  const createBackToTop = () => {
    let btn = document.getElementById(BTN_ID);
    if (!btn) {
      btn = document.createElement('button');
      btn.id = BTN_ID;
      btn.type = 'button';
      btn.className = 'back-to-top'; // Sinkron dengan fixes.css
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 19V5"></path><path d="M5 12l7-7 7 7"></path>
        </svg>
        <span>Back to top</span>`;
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      document.body.appendChild(btn);
    }
    return btn;
  };

  const updateBtnVisibility = () => {
    const btn = createBackToTop();
    btn.classList.toggle('is-visible', window.scrollY > SCROLL_THRESHOLD);
    isTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      requestAnimationFrame(updateBtnVisibility);
      isTicking = true;
    }
  }, { passive: true });
})();

/* --- READING PROGRESS BAR --- */
(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const isLanding = location.pathname === '/' || location.pathname.endsWith('/index.html') || document.querySelector('#nv-landing');
    if (isLanding) return;

    // Cari navbar
    const navbar = document.querySelector('header.site-header, nav.navbar, .md-header, header, nav');
    if (!navbar) {
      console.warn('Navbar not found, fallback to body');
      createProgress(document.body, 'fixed');
      return;
    }
    if (getComputedStyle(navbar).position === 'static') navbar.style.position = 'relative';
    createProgress(navbar, 'absolute');
  });

  function createProgress(parent, pos) {
    let container = document.getElementById('progressContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'progressContainer';
      container.className = `progress-container ${pos === 'fixed' ? 'fallback' : ''}`;
      container.innerHTML = `<div id="myBar" class="progress-bar"></div>`;
      parent.appendChild(container);
    }
    const bar = document.getElementById('myBar');
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }
})();
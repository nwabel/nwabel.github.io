(function () {
  const NEW_TEXT = "Mau cari apa?";

  function updateHeaderSearchTrigger(root = document) {
    // tombol search bawaan shadcn
    const triggers = [
      ...root.querySelectorAll('[data-slot="dialog-trigger"]'),
      ...root.querySelectorAll('button[onclick*="onSearchBarClick"]'),
    ];

    triggers.forEach(btn => {
      const spans = btn.querySelectorAll("span");
      spans.forEach(span => {
        if (/^Search/i.test(span.textContent.trim())) {
          span.textContent = NEW_TEXT;
        }
      });

      if (/^Search/i.test(btn.textContent.trim())) {
        btn.childNodes.forEach(n => {
          if (n.nodeType === 3 && /^Search/i.test(n.textContent.trim())) {
            n.textContent = NEW_TEXT;
          }
        });
      }

      if (btn.getAttribute("aria-label")?.toLowerCase().startsWith("search")) {
        btn.setAttribute("aria-label", NEW_TEXT);
      }
      if (btn.title?.toLowerCase().startsWith("search")) {
        btn.title = NEW_TEXT;
      }
    });
  }

  function updateDialogPlaceholder(root = document) {
    const dialog = root.querySelector("#search-dialog") || root;
    dialog.querySelectorAll('input[data-slot="command-input"], input[type="text"][placeholder]')
      .forEach(inp => {
        if (/search/i.test(inp.placeholder)) {
          inp.setAttribute("placeholder", NEW_TEXT);
        }
      });
  }

  function apply(root = document) {
    updateHeaderSearchTrigger(root);
    updateDialogPlaceholder(root);
  }

  // initial
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => apply(document));
  } else {
    apply(document);
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest('[data-slot="dialog-trigger"], button[onclick*="onSearchBarClick"]');
    if (t) {
      requestAnimationFrame(() => setTimeout(() => apply(document), 30));
    }
  });

  const mo = new MutationObserver(() => apply(document));
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();

//backtotp
(function () {
  const THRESHOLD = 300;
  const STAY_MS = 600;
  const ID = 'back-to-top';
  let lastY = window.scrollY;
  let showUntil = 0;
  let ticking = false;

  const DEBUG = false;

  function log(...args){ if (DEBUG) console.log('[btt]', ...args); }

  function headerHeightPx() {

    const cs = getComputedStyle(document.body);
    let hh = cs.getPropertyValue('--header-height').trim();
    if (hh) return `calc(${hh} + 0.5rem)`;

    const h = document.querySelector('header');
    if (h) return (h.getBoundingClientRect().height + 8) + 'px';

    return '4rem';
  }

  function ensureBtn() {
    let btn = document.getElementById(ID);
    if (!btn) {
      btn = document.createElement('button');
      btn.id = ID;
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Back to top');
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 19V5"></path>
          <path d="M5 12l7-7 7 7"></path>
        </svg>
        <span>Back to top</span>
      `;
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      document.body.appendChild(btn);
    }
    btn.style.setProperty('--btt-top', headerHeightPx());
    return btn;
  }

  function update() {
    const btn = ensureBtn();
    const y = window.scrollY;
    const now = Date.now();

    const scrollingUp = y < lastY - 3;
    const pastThreshold = y > THRESHOLD;
    btn.classList.toggle('is-visible', pastThreshold);
    
    if (pastThreshold && scrollingUp) {
      showUntil = now + STAY_MS;
      btn.classList.add('is-visible');
      log('show (scrolling up)');
    } else {
      if (now > showUntil || !pastThreshold) {
        btn.classList.remove('is-visible');
        log('hide');
      }
    }

    lastY = y;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function onResize() {
    const btn = document.getElementById(ID);
    if (btn) btn.style.setProperty('--btt-top', headerHeightPx());
  }

  function start() {
    ensureBtn();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

/* ==========================================================================
   Sercing (Navbar Search Button Styled + Symmetrical Keycap)
   ========================================================================== */
(() => {
  const SEARCH_PLACEHOLDER = "Mau cari apa?";
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || "");
  const KBD_HTML = isMac
    ? `<span class="nv-kbd-group" aria-hidden="true"><kbd class="nv-kbd nv-kbd-sym">⌘</kbd><kbd class="nv-kbd">K</kbd></span>`
    : `<span class="nv-kbd-group" aria-hidden="true"><kbd class="nv-kbd">Ctrl</kbd><kbd class="nv-kbd">K</kbd></span>`;

  const updateSearchElements = (root = document) => {
    const triggers = [
      ...new Set([
        ...root.querySelectorAll('[data-slot="dialog-trigger"]'),
        ...root.querySelectorAll('button[onclick*="onSearchBarClick"]'),
      ]),
    ];

    triggers.forEach(btn => {
      if (!btn.dataset.nvSearchStyled) {
        btn.dataset.nvSearchStyled = "1";
        btn.classList.add("nv-nav-search-btn");
        btn.setAttribute("aria-label", SEARCH_PLACEHOLDER);
        btn.innerHTML = `
          <span class="nv-nav-search-left">
            <svg class="nv-nav-search-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
            </svg>
            <span class="nv-nav-search-text">${SEARCH_PLACEHOLDER}</span>
          </span>
          ${KBD_HTML}
        `;
      }
    });

    const dialog = root.querySelector("#search-dialog") || root;
    dialog.querySelectorAll('input[data-slot="command-input"], input[type="text"][placeholder]')
      .forEach(input => {
        if (/search/i.test(input.placeholder)) {
          input.setAttribute("placeholder", SEARCH_PLACEHOLDER);
        }
      });
  };

  const initSearchFix = () => updateSearchElements();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearchFix);
  } else {
    initSearchFix();
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest('[data-slot="dialog-trigger"], button[onclick*="onSearchBarClick"]')) {
      requestAnimationFrame(() => setTimeout(initSearchFix, 30));
    }
  });

  new MutationObserver(() => initSearchFix()).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();


/* ==========================================================================
   Bektutop
   ========================================================================== */
(() => {
  const SCROLL_THRESHOLD = 300;
  const BTN_ID = "back-to-top";
  let isTicking = false;

  const createBackToTop = () => {
    let btn = document.getElementById(BTN_ID);
    if (!btn) {
      btn = document.createElement("button");
      btn.id = BTN_ID;
      btn.type = "button";
      btn.className = "back-to-top";
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 19V5"></path><path d="M5 12l7-7 7 7"></path>
        </svg>
        <span>Back to top</span>`;
      btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
      document.body.appendChild(btn);
    }
    return btn;
  };

  const updateBtnVisibility = () => {
    const btn = createBackToTop();
    btn.classList.toggle("is-visible", window.scrollY > SCROLL_THRESHOLD);
    isTicking = false;
  };

  window.addEventListener("scroll", () => {
    if (!isTicking) {
      requestAnimationFrame(updateBtnVisibility);
      isTicking = true;
    }
  }, { passive: true });
})();


/* ==========================================================================
   Reading progress bar
   ========================================================================== */
(() => {
  const createProgress = (parent, pos) => {
    let container = document.getElementById("progressContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "progressContainer";
      container.className = `progress-container ${pos === "fixed" ? "fallback" : ""}`;
      container.innerHTML = `<div id="myBar" class="progress-bar"></div>`;
      parent.appendChild(container);
    }
    
    const bar = document.getElementById("myBar");
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const isLanding = location.pathname === "/" || location.pathname.endsWith("/index.html") || document.querySelector("#nv-landing");
    if (isLanding) return;

    const navbar = document.querySelector("header.site-header, nav.navbar, .md-header, header, nav");
    if (!navbar) {
      createProgress(document.body, "fixed");
      return;
    }
    
    if (getComputedStyle(navbar).position === "static") {
      navbar.style.position = "relative";
    }
    createProgress(navbar, "absolute");
  });
})();


/* ==========================================================================
   Serling
   ========================================================================== */
(() => {
  const SHARE_SVG = `<svg class="tabler-icon tabler-icon-share nv-share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="6" r="3"></circle><circle cx="18" cy="18" r="3"></circle><line x1="8.7" y1="10.7" x2="15.3" y2="7.3"></line><line x1="8.7" y1="13.3" x2="15.3" y2="16.7"></line></svg>`;
  const CHECK_SVG = `<svg class="tabler-icon tabler-icon-check nv-share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l5 5l10 -10"></path></svg>`;

  const showToast = (msg) => {
    let existing = document.getElementById("nv-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "nv-toast";
    toast.innerText = msg;
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "12%",
      left: "50%",
      transform: "translateX(-50%) translateY(20px)",
      backgroundColor: "#10b981", 
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "99px",
      fontSize: "0.85rem",
      fontWeight: "500",
      zIndex: "99999",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      opacity: "0",
      pointerEvents: "none",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    });

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(20px)";
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  const fixShareButton = (btn) => {
    if (btn.dataset.shareFixed) return;
    btn.dataset.shareFixed = "1";
    btn.removeAttribute("onclick");

    const oldSvg = btn.querySelector("svg");
    if (oldSvg) oldSvg.remove();
    btn.insertAdjacentHTML("afterbegin", SHARE_SVG);

    const textSpan = btn.querySelector("span");
    if (textSpan) textSpan.innerText = "Share";

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const currentUrl = window.location.href;

      navigator.clipboard.writeText(currentUrl).then(() => {
        const currentIcon = btn.querySelector(".nv-share-icon");
        if (currentIcon) currentIcon.outerHTML = CHECK_SVG;
        
        if (textSpan) textSpan.innerText = "Copied!";
        showToast("Link disalin!");

        setTimeout(() => {
          const checkIcon = btn.querySelector(".nv-share-icon");
          if (checkIcon) checkIcon.outerHTML = SHARE_SVG;
          if (textSpan) textSpan.innerText = "Share";
        }, 2000);
      }).catch(err => console.error("Gagal menyalin:", err));
    });
  };

  const scanAndFix = () => {
    // Cari tombol target bawaan
    document.querySelectorAll('button[onclick*="fetch("], button[onclick*="clipboard"]').forEach(fixShareButton);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scanAndFix);
  } else {
    scanAndFix();
  }

  new MutationObserver(scanAndFix).observe(document.body, { 
    childList: true, 
    subtree: true 
  });
})();


/* ==========================================================================
   5. BREADCRUMBS INJECTOR
   ========================================================================== */
(() => {
  const HOME_LABEL = "Home";

  const getBasePath = (() => {
    let path = (window.BASE_URL || "/");
    try { path = new URL(path, location.origin).pathname; } catch {}
    return path.endsWith("/") ? path : path + "/";
  })();

  const formatLabel = (str) =>
    decodeURIComponent(str)
      .replace(/\.(html|md)$/i, "")
      .replace(/[_-]+/g, " ")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\b([a-z])([a-z0-9]*)/gi, (_, first, rest) => first.toUpperCase() + rest);

  const getPageTitle = () => {
    const header = document.querySelector("#page-header h1, article h1");
    return (header ? header.textContent : document.title).trim();
  };

  const buildCrumbs = () => {
    let relativePath = location.pathname.startsWith(getBasePath)
      ? location.pathname.slice(getBasePath.length)
      : location.pathname;
    relativePath = relativePath.replace(/^\/+/, "").replace(/\/+$/, "");

    let segments = relativePath ? relativePath.split("/") : [];
    if (segments.length && /^index(\.(html|md))?$/i.test(segments.at(-1))) segments.pop();

    const currentPageTitle = getPageTitle();
    const crumbs = [{ text: HOME_LABEL, href: getBasePath }];

    if (segments.length === 0) {
      crumbs.push({ text: currentPageTitle, href: null });
      return crumbs;
    }

    let accumulatedPath = getBasePath;
    for (let i = 0; i < segments.length - 1; i++) {
      accumulatedPath += segments[i] + "/";
      crumbs.push({ text: formatLabel(segments[i]), href: accumulatedPath });
    }

    const lastSegment = formatLabel(segments.at(-1));
    crumbs.push({ text: /^index$/i.test(currentPageTitle) ? lastSegment : currentPageTitle, href: null });
    return crumbs;
  };

  const renderBreadcrumbs = () => {
    if (document.body.classList.contains("is-home") || document.querySelector("#nv-landing")) {
      return;
    }

    const data = buildCrumbs();
    const nav = document.createElement("nav");
    nav.className = "nw-breadcrumbs";
    nav.setAttribute("aria-label", "Breadcrumb");

    nav.innerHTML = `
      <ol class="nw-bc-list">
        ${data.map((item, i) =>
          i === data.length - 1 || !item.href
            ? `<li class="nw-bc-item nw-bc-current"><span title="${item.text}">${item.text}</span></li>`
            : `<li class="nw-bc-item"><a class="nw-bc-link" href="${item.href}" title="${item.text}">${item.text}</a></li>`
        ).join("")}
      </ol>`;

    document.querySelectorAll(".nw-breadcrumbs, .nv-docs-subbar").forEach(old => old.remove());

    const contentCol = document.querySelector('[data-slot="docs"] > .flex.min-w-0.flex-1.flex-col');

    if (contentCol) {
      const subbar = document.createElement("div");
      subbar.className = "nv-docs-subbar";

      const bcRow = document.createElement("div");
      bcRow.className = "nv-subbar-row";
      const bcScroll = document.createElement("div");
      bcScroll.className = "nv-subbar-scroll";
      bcScroll.appendChild(nav);
      bcRow.appendChild(bcScroll);
      subbar.appendChild(bcRow);

      // Mobile TOC ("In this article") — muncul di < 1280px jika halaman punya heading TOC
      const tocLinks = [...document.querySelectorAll("#toc a[href^='#']")];
      if (tocLinks.length > 0) {
        const mobileToc = document.createElement("div");
        mobileToc.className = "nv-mobile-toc";
        mobileToc.innerHTML = `
          <button type="button" class="nv-mobile-toc-toggle" aria-expanded="false">
            <span class="nv-mobile-toc-label">In this article</span>
            <svg class="nv-mobile-toc-chevron" viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
              <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
            </svg>
          </button>
          <div class="nv-mobile-toc-menu" hidden>
            <ul class="nv-mobile-toc-list"></ul>
          </div>
        `;

        const list = mobileToc.querySelector(".nv-mobile-toc-list");
        tocLinks.forEach((a) => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = a.getAttribute("href");
          link.textContent = a.textContent.trim();
          const depth = a.getAttribute("data-depth");
          if (depth) link.setAttribute("data-depth", depth);
          else if (a.className.includes("pl-")) link.setAttribute("data-depth", "3");
          li.appendChild(link);
          list.appendChild(li);
        });

        const toggleBtn = mobileToc.querySelector(".nv-mobile-toc-toggle");
        const menu = mobileToc.querySelector(".nv-mobile-toc-menu");

        const closeMenu = () => {
          menu.hidden = true;
          toggleBtn.setAttribute("aria-expanded", "false");
        };

        toggleBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const willOpen = menu.hidden;
          menu.hidden = !willOpen;
          toggleBtn.setAttribute("aria-expanded", String(willOpen));
        });

        menu.addEventListener("click", (e) => {
          if (e.target.closest("a")) closeMenu();
        });

        document.addEventListener("click", (e) => {
          if (!menu.hidden && !mobileToc.contains(e.target)) closeMenu();
        });

        subbar.appendChild(mobileToc);
      }

      contentCol.insertBefore(subbar, contentCol.firstChild);
    } else {
      const target = document.querySelector("#page-header") || document.querySelector("article") || document.querySelector("main");
      target?.parentNode?.insertBefore(nav, target);
    }
  };

  // Satukan #updated_at sejajar dalam 1 baris kompak dengan Share & Prev/Next di bawah <h1>
  const enhanceArticleHeader = () => {
    if (document.body.classList.contains("is-home") || document.querySelector("#nv-landing")) {
      return;
    }

    const pageHeader = document.getElementById("page-header");
    if (!pageHeader || pageHeader.dataset.nvHeaderFixed) return;
    const h1 = pageHeader.querySelector("h1");
    const actions = pageHeader.querySelector("div:last-child");
    if (!h1 || !actions) return;
    pageHeader.dataset.nvHeaderFixed = "1";

    const updatedEl = document.getElementById("updated_at");
    const updatedRow = updatedEl?.closest("article > div:first-child > div:last-child");

    const metaBar = document.createElement("div");
    metaBar.className = "nv-article-meta";

    const metaLeft = document.createElement("div");
    metaLeft.className = "nv-article-meta-left";
    if (updatedEl) {
      metaLeft.appendChild(updatedEl);
      if (updatedRow && updatedRow !== pageHeader.parentElement) {
        updatedRow.remove();
      }
    }

    actions.className = "nv-article-actions";
    metaBar.appendChild(metaLeft);
    metaBar.appendChild(actions);

    pageHeader.className = "nv-article-header";
    pageHeader.appendChild(metaBar);
  };

  // Pagination bawah minimalis (1 baris rapi, tidak makan tempat)
  const enhanceBottomNav = () => {
    if (document.body.classList.contains("is-home") || document.querySelector("#nv-landing")) {
      return;
    }

    const nav = document.getElementById("bottom-navigation");
    if (!nav || nav.dataset.nvEnhanced) return;
    const links = [...nav.querySelectorAll("a[href]")];
    if (!links.length) return;
    nav.dataset.nvEnhanced = "1";

    let prevLink = null;
    let nextLink = null;

    links.forEach((a) => {
      if (a.querySelector(".tabler-icon-arrow-left")) prevLink = a;
      else if (a.querySelector(".tabler-icon-arrow-right")) nextLink = a;
    });

    nav.className = "nv-bottom-nav";
    nav.innerHTML = "";

    const prevSlot = document.createElement("div");
    prevSlot.className = "nv-bn-slot nv-bn-prev";
    if (prevLink) {
      const title = (prevLink.textContent || "").trim() || "Previous";
      prevSlot.innerHTML = `
        <a href="${prevLink.getAttribute("href")}" class="nv-bn-link" title="${title}">
          <svg class="nv-bn-arrow" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L4.81 7h7.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z"></path>
          </svg>
          <span class="nv-bn-title">${title}</span>
        </a>
      `;
    }
    nav.appendChild(prevSlot);

    const nextSlot = document.createElement("div");
    nextSlot.className = "nv-bn-slot nv-bn-next";
    if (nextLink) {
      const title = (nextLink.textContent || "").trim() || "Next";
      nextSlot.innerHTML = `
        <a href="${nextLink.getAttribute("href")}" class="nv-bn-link" title="${title}">
          <span class="nv-bn-title">${title}</span>
          <svg class="nv-bn-arrow" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
            <path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z"></path>
          </svg>
        </a>
      `;
    }
    nav.appendChild(nextSlot);
  };

  const initDocsChrome = () => {
    renderBreadcrumbs();
    enhanceArticleHeader();
    enhanceBottomNav();
  };

  (document.readyState === "loading")
    ? document.addEventListener("DOMContentLoaded", initDocsChrome, { once: true })
    : initDocsChrome();
})();

/* ==========================================================================
   8. AUTO-FLAG HOME PAGE (.is-home CLASS)
   ========================================================================== */
(() => {
  const path = window.location.pathname;
  if (path === "/" || path.endsWith("/index.html") || path === window.BASE_URL) {
    document.body.classList.add("is-home");
  }
})();

/* ==========================================================================
   9. DOCS FOOTER (GITHUB DOCS STYLE — NEMPEL KONTEN TENGAH + TOC, TIDAK KE SIDEBAR)
   ========================================================================== */
(() => {
  const setupDocsFooter = () => {
    if (document.body.classList.contains("is-home") || document.querySelector("#nv-landing")) {
      return;
    }

    const rightCol = document.querySelector('[data-slot="sidebar-wrapper"] > .h-full.w-full');
    const footer = document.querySelector("footer");
    if (!rightCol || !footer || footer.dataset.nvDocsFooter) return;
    footer.dataset.nvDocsFooter = "1";

    // Pindahkan footer ke dalam kolom kanan (di bawah konten tengah + TOC, terpisah dari sidebar kiri)
    rightCol.appendChild(footer);
    footer.classList.add("nv-docs-footer");

    const base = (() => {
      let b = (typeof base_url !== "undefined" ? base_url : window.BASE_URL) || "/";
      try { b = new URL(b, location.origin).pathname; } catch {}
      return b.endsWith("/") ? b : b + "/";
    })();

    // Hitung estimasi waktu baca otomatis untuk status pill (Opsi 4)
    const articleText = (document.querySelector("article .typography")?.textContent || "").trim();
    const wordCount = articleText ? articleText.split(/\s+/).filter(Boolean).length : 0;
    const readMinutes = Math.max(1, Math.round(wordCount / 200));
    const statusLabel = wordCount > 15 ? `read time: ~${readMinutes} min` : "status: online";

    // Pakai fade (tanpa translateY) pada footer agar tidak menambah ruang scroll 100px di bawah footer
    footer.setAttribute("data-aos", "fade");
    footer.setAttribute("data-aos-offset", "0");

    footer.innerHTML = `
      <div class="nv-df-top">
        <div class="nv-df-top-left">
          <span class="nv-df-brand">~/nwabel/docs</span>
          <span class="nv-df-status" title="Status halaman">
            <span class="nv-df-status-dot" aria-hidden="true"></span>
            <span>${statusLabel}</span>
          </span>
        </div>
        <button type="button" class="nv-df-random-btn" aria-label="Buka catatan acak">
          <svg class="nv-df-random-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="16 3 21 3 21 8"></polyline>
            <line x1="4" y1="20" x2="21" y2="3"></line>
            <polyline points="21 16 21 21 16 21"></polyline>
            <line x1="15" y1="15" x2="21" y2="21"></line>
            <line x1="4" y1="4" x2="9" y2="9"></line>
          </svg>
          <span>Random Note</span>
        </button>
      </div>

      <div class="nv-df-grid">
        <div class="nv-df-col">
          <p class="nv-df-eyebrow">Kontribusi</p>
          <h3 class="nv-df-heading">Bantu rapihin catatan ini</h3>
          <p class="nv-df-text">Nemu typo, command error, atau link mati? Langsung cek source atau buka issue di repository GitHub.</p>
          <a class="nv-df-btn" href="https://github.com/nwabel/nwabel.github.io" target="_blank" rel="noopener">
            <span>Lihat di GitHub</span>
            <svg class="nv-df-ext-icon" viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
              <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"></path>
            </svg>
          </a>
        </div>

        <div class="nv-df-col">
          <p class="nv-df-eyebrow">Kontak</p>
          <h3 class="nv-df-heading">Ada yang mau ditanyain?</h3>
          <div class="nv-df-links">
            <a href="https://github.com/nwabel" target="_blank" rel="noopener">GitHub (@nwabel)</a>
            <a href="mailto:nabilsywl@gmail.com">nabilsywl@gmail.com</a>
          </div>
        </div>
      </div>

      <div class="nv-df-bottom">
        <div class="nv-df-credit">
          <a href="https://github.com/asiffer/mkdocs-shadcn" target="_blank" rel="noopener">shadcn theme</a>
          provided by
          <a href="https://github.com/asiffer" target="_blank" rel="noopener">@asiffer</a>
          <span class="nv-df-sep" aria-hidden="true">|</span>
          modified by
          <a href="https://github.com/nwabel" target="_blank" rel="noopener">nwabel</a>
        </div>
        <div class="nv-df-bottom-links">
          <a href="${base}">Home</a>
          <a href="${base}finding/">Finding</a>
          <a href="${base}wretap/">Wretap</a>
          <a href="${base}wiki/">Wiki</a>
          <a href="${base}blog/">Blok</a>
        </div>
      </div>
    `;

    // Random Note handler (ambil artikel acak dari search_index.json)
    const randomBtn = footer.querySelector(".nv-df-random-btn");
    if (randomBtn) {
      randomBtn.addEventListener("click", async () => {
        if (randomBtn.dataset.loading === "1") return;
        randomBtn.dataset.loading = "1";
        randomBtn.classList.add("is-loading");
        try {
          const res = await fetch(`${base}search/search_index.json`);
          if (!res.ok) throw new Error("Index fetch failed");
          const data = await res.json();
          const currentPath = location.pathname.replace(/\/+$/, "");
          const pages = (data.docs || [])
            .filter(d => d.location && !d.location.includes("#"))
            .map(d => {
              const targetPath = new URL(d.location, location.origin + base).pathname;
              return targetPath;
            })
            .filter((p, idx, arr) => arr.indexOf(p) === idx)
            .filter(p => {
              const norm = p.replace(/\/+$/, "");
              const baseNorm = base.replace(/\/+$/, "");
              return norm !== currentPath && norm !== baseNorm;
            });

          if (pages.length) {
            const pick = pages[Math.floor(Math.random() * pages.length)];
            window.location.href = pick;
            return;
          }
          window.location.href = `${base}blog/`;
        } catch (err) {
          console.error("Gagal memuat Random Note:", err);
          window.location.href = `${base}blog/`;
        } finally {
          randomBtn.dataset.loading = "0";
          randomBtn.classList.remove("is-loading");
        }
      });
    }

    // Aktifkan animasi scroll AOS di halaman Docs (halus & slow, tidak mengganggu prefers-reduced-motion)
    if (window.AOS && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      AOS.init({ duration: 650, easing: "ease-out", once: true, offset: 30 });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupDocsFooter, { once: true });
  } else {
    setupDocsFooter();
  }
})();
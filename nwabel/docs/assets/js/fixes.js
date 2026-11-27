(() => {
  "use strict";

  /* ========================================================================
     SHARED HELPERS & CONSTANTS
     ======================================================================== */
  const SEARCH_PLACEHOLDER = "Mau cari apa?";
  const IS_MAC = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || "");

  const BASE_PATH = (() => {
    let base = (typeof base_url !== "undefined" ? base_url : window.BASE_URL) || "/";
    try { base = new URL(base, location.origin).pathname; } catch {}
    return base.endsWith("/") ? base : base + "/";
  })();

  const SVG = {
    search: `<svg class="nv-nav-search-icon" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path></svg>`,
    kbd: IS_MAC
      ? `<span class="nv-kbd-group" aria-hidden="true"><kbd class="nv-kbd nv-kbd-sym">⌘</kbd><kbd class="nv-kbd">K</kbd></span>`
      : `<span class="nv-kbd-group" aria-hidden="true"><kbd class="nv-kbd">Ctrl</kbd><kbd class="nv-kbd">K</kbd></span>`,
    arrowUp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"></path><path d="M5 12l7-7 7 7"></path></svg>`,
    share: `<svg class="tabler-icon tabler-icon-share nv-share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="6" r="3"></circle><circle cx="18" cy="18" r="3"></circle><line x1="8.7" y1="10.7" x2="15.3" y2="7.3"></line><line x1="8.7" y1="13.3" x2="15.3" y2="16.7"></line></svg>`,
    check: `<svg class="tabler-icon tabler-icon-check nv-share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 12l5 5l10 -10"></path></svg>`,
    chevronDown: `<svg class="nv-mobile-toc-chevron" viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path></svg>`,
    arrowLeft: `<svg class="nv-bn-arrow" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L4.81 7h7.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z"></path></svg>`,
    arrowRight: `<svg class="nv-bn-arrow" viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z"></path></svg>`,
    external: `<svg class="nv-df-ext-icon" viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A2.5 2.5 0 0 1 10.604 1Z"></path></svg>`,
    shuffle: `<svg class="nv-df-random-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>`,
  };

  const onReady = (fn) =>
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", fn, { once: true })
      : fn();

  const flagHome = () => {
    const p = location.pathname;
    if (p === "/" || p.endsWith("/index.html") || p === window.BASE_URL) {
      document.body?.classList.add("is-home");
    }
  };

  const isHome = () =>
    Boolean(document.body?.classList.contains("is-home") || document.querySelector("#nv-landing"));

  const formatLabel = (str) =>
    decodeURIComponent(str)
      .replace(/\.(html|md)$/i, "")
      .replace(/[_-]+/g, " ")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\b([a-z])([a-z0-9]*)/gi, (_, first, rest) => first.toUpperCase() + rest);

  // Flag home segera sebelum modul lain berjalan
  flagHome();

  /* ========================================================================
     1. NAVBAR SEARCH BUTTON & PLACEHOLDER
     ======================================================================== */
  const syncSearchUI = (root = document) => {
    const triggers = new Set([
      ...root.querySelectorAll('[data-slot="dialog-trigger"]'),
      ...root.querySelectorAll('button[onclick*="onSearchBarClick"]'),
    ]);

    triggers.forEach((btn) => {
      if (btn.dataset.nvSearchStyled) return;
      btn.dataset.nvSearchStyled = "1";
      btn.classList.add("nv-nav-search-btn");
      btn.setAttribute("aria-label", SEARCH_PLACEHOLDER);
      btn.innerHTML = `
        <span class="nv-nav-search-left">
          ${SVG.search}
          <span class="nv-nav-search-text">${SEARCH_PLACEHOLDER}</span>
        </span>
        ${SVG.kbd}
      `;
    });

    const dialog = root.querySelector("#search-dialog") || root;
    dialog.querySelectorAll('input[data-slot="command-input"], input[type="text"][placeholder]').forEach((input) => {
      if (/search/i.test(input.placeholder)) {
        input.setAttribute("placeholder", SEARCH_PLACEHOLDER);
      }
    });
  };

  /* ========================================================================
     2. SHARE BUTTON & TOAST
     ======================================================================== */
  const showToast = (msg) => {
    document.getElementById("nv-toast")?.remove();
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
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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

  const syncShareButtons = () => {
    document.querySelectorAll('button[onclick*="fetch("], button[onclick*="clipboard"]').forEach((btn) => {
      if (btn.dataset.shareFixed) return;
      btn.dataset.shareFixed = "1";
      btn.removeAttribute("onclick");

      btn.querySelector("svg")?.remove();
      btn.insertAdjacentHTML("afterbegin", SVG.share);

      const textSpan = btn.querySelector("span");
      if (textSpan) textSpan.innerText = "Share";

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        navigator.clipboard
          .writeText(location.href)
          .then(() => {
            const icon = btn.querySelector(".nv-share-icon");
            if (icon) icon.outerHTML = SVG.check;
            if (textSpan) textSpan.innerText = "Copied!";
            showToast("Link disalin!");

            setTimeout(() => {
              const checkIcon = btn.querySelector(".nv-share-icon");
              if (checkIcon) checkIcon.outerHTML = SVG.share;
              if (textSpan) textSpan.innerText = "Share";
            }, 2000);
          })
          .catch((err) => console.error("Gagal menyalin:", err));
      });
    });
  };

  /* ========================================================================
     3. BACK TO TOP & READING PROGRESS BAR
     ======================================================================== */
  const initBackToTop = () => {
    let ticking = false;

    const getBtn = () => {
      let btn = document.getElementById("back-to-top");
      if (!btn) {
        btn = document.createElement("button");
        btn.id = "back-to-top";
        btn.type = "button";
        btn.className = "back-to-top";
        btn.innerHTML = `${SVG.arrowUp}<span>Back to top</span>`;
        btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
        document.body.appendChild(btn);
      }
      return btn;
    };

    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        getBtn().classList.toggle("is-visible", window.scrollY > 300);
        ticking = false;
      });
    }, { passive: true });
  };

  const initReadingProgress = () => {
    if (isHome()) return;

    const navbar = document.querySelector("header.site-header, nav.navbar, .md-header, header, nav");
    const parent = navbar || document.body;
    const isFallback = !navbar;

    if (navbar && getComputedStyle(navbar).position === "static") {
      navbar.style.position = "relative";
    }

    let container = document.getElementById("progressContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "progressContainer";
      container.className = `progress-container${isFallback ? " fallback" : ""}`;
      container.innerHTML = `<div id="myBar" class="progress-bar"></div>`;
      parent.appendChild(container);
    }

    const bar = document.getElementById("myBar");
    if (!bar) return;

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  };

  /* ========================================================================
     4. DOCS SUBBAR (BREADCRUMBS + MOBILE TOC)
     ======================================================================== */
  const buildBreadcrumbs = () => {
    const rel = (location.pathname.startsWith(BASE_PATH)
      ? location.pathname.slice(BASE_PATH.length)
      : location.pathname
    ).replace(/^\/+|\/+$/g, "");

    const segments = rel ? rel.split("/") : [];
    if (segments.length && /^index(\.(html|md))?$/i.test(segments.at(-1))) segments.pop();

    const headerEl = document.querySelector("#page-header h1, article h1");
    const pageTitle = (headerEl ? headerEl.textContent : document.title).trim();
    const crumbs = [{ text: "Home", href: BASE_PATH }];

    if (!segments.length) {
      crumbs.push({ text: pageTitle, href: null });
      return crumbs;
    }

    let acc = BASE_PATH;
    for (let i = 0; i < segments.length - 1; i++) {
      acc += `${segments[i]}/`;
      crumbs.push({ text: formatLabel(segments[i]), href: acc });
    }

    const last = formatLabel(segments.at(-1));
    crumbs.push({ text: /^index$/i.test(pageTitle) ? last : pageTitle, href: null });
    return crumbs;
  };

  const initDocsSubbar = () => {
    if (isHome()) return;

    const crumbs = buildBreadcrumbs();
    const nav = document.createElement("nav");
    nav.className = "nw-breadcrumbs";
    nav.setAttribute("aria-label", "Breadcrumb");
    nav.innerHTML = `
      <ol class="nw-bc-list">
        ${crumbs
          .map((item, i) =>
            i === crumbs.length - 1 || !item.href
              ? `<li class="nw-bc-item nw-bc-current"><span title="${item.text}">${item.text}</span></li>`
              : `<li class="nw-bc-item"><a class="nw-bc-link" href="${item.href}" title="${item.text}">${item.text}</a></li>`
          )
          .join("")}
      </ol>`;

    document.querySelectorAll(".nw-breadcrumbs, .nv-docs-subbar").forEach((el) => el.remove());

    const contentCol = document.querySelector('[data-slot="docs"] > .flex.min-w-0.flex-1.flex-col');
    if (!contentCol) {
      const target = document.querySelector("#page-header, article, main");
      target?.parentNode?.insertBefore(nav, target);
      return;
    }

    const subbar = document.createElement("div");
    subbar.className = "nv-docs-subbar";

    const row = document.createElement("div");
    row.className = "nv-subbar-row";
    const scrollWrap = document.createElement("div");
    scrollWrap.className = "nv-subbar-scroll";
    scrollWrap.appendChild(nav);
    row.appendChild(scrollWrap);
    subbar.appendChild(row);

    const tocLinks = [...document.querySelectorAll("#toc a[href^='#']")];
    if (tocLinks.length) {
      const mobileToc = document.createElement("div");
      mobileToc.className = "nv-mobile-toc";
      mobileToc.innerHTML = `
        <button type="button" class="nv-mobile-toc-toggle" aria-expanded="false">
          <span class="nv-mobile-toc-label">In this article</span>
          ${SVG.chevronDown}
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
      menu.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
      document.addEventListener("click", (e) => { if (!menu.hidden && !mobileToc.contains(e.target)) closeMenu(); });

      subbar.appendChild(mobileToc);
    }

    contentCol.insertBefore(subbar, contentCol.firstChild);
  };

  /* ========================================================================
     5. COMPACT ARTICLE HEADER & BOTTOM PAGINATION
     ======================================================================== */
  const initArticleHeader = () => {
    if (isHome()) return;

    const pageHeader = document.getElementById("page-header");
    if (!pageHeader || pageHeader.dataset.nvHeaderFixed) return;
    const h1 = pageHeader.querySelector("h1");
    const actions = pageHeader.querySelector("div:last-child");
    if (!h1 || !actions) return;
    pageHeader.dataset.nvHeaderFixed = "1";

    const datesEl = document.getElementById("nv-page-dates") || document.getElementById("updated_at");
    const datesWrapper = datesEl?.parentElement;
    const updatedRow = datesEl?.closest("article > div:first-child > div:last-child");

    const metaBar = document.createElement("div");
    metaBar.className = "nv-article-meta";

    const metaLeft = document.createElement("div");
    metaLeft.className = "nv-article-meta-left";
    if (datesEl) {
      metaLeft.appendChild(datesEl);
      if (datesWrapper && datesWrapper !== updatedRow) datesWrapper.remove();
      if (updatedRow && updatedRow !== pageHeader.parentElement && !updatedRow.querySelector(".external_links")) {
        updatedRow.remove();
      }
    }

    actions.className = "nv-article-actions";
    metaBar.append(metaLeft, actions);

    pageHeader.className = "nv-article-header";
    pageHeader.appendChild(metaBar);
  };

  const initBottomNav = () => {
    if (isHome()) return;

    const nav = document.getElementById("bottom-navigation");
    if (!nav || nav.dataset.nvEnhanced) return;
    const links = [...nav.querySelectorAll("a[href]")];
    if (!links.length) return;
    nav.dataset.nvEnhanced = "1";

    const prevLink = links.find((a) => a.querySelector(".tabler-icon-arrow-left"));
    const nextLink = links.find((a) => a.querySelector(".tabler-icon-arrow-right"));

    const renderSlot = (dir, link) => {
      const title = link ? (link.textContent || "").trim() || (dir === "prev" ? "Previous" : "Next") : "";
      const inner = link
        ? dir === "prev"
          ? `<a href="${link.getAttribute("href")}" class="nv-bn-link" title="${title}">${SVG.arrowLeft}<span class="nv-bn-title">${title}</span></a>`
          : `<a href="${link.getAttribute("href")}" class="nv-bn-link" title="${title}"><span class="nv-bn-title">${title}</span>${SVG.arrowRight}</a>`
        : "";
      return `<div class="nv-bn-slot nv-bn-${dir}">${inner}</div>`;
    };

    nav.className = "nv-bottom-nav";
    nav.innerHTML = renderSlot("prev", prevLink) + renderSlot("next", nextLink);
  };

  /* ========================================================================
     6. DOCS FOOTER (GITHUB DOCS STYLE) & RANDOM NOTE
     ======================================================================== */
  const initDocsFooter = () => {
    if (isHome()) return;

    const rightCol = document.querySelector('[data-slot="sidebar-wrapper"] > .h-full.w-full');
    const footer = document.querySelector("footer");
    if (!rightCol || !footer || footer.dataset.nvDocsFooter) return;
    footer.dataset.nvDocsFooter = "1";

    rightCol.appendChild(footer);
    footer.classList.add("nv-docs-footer");
    footer.setAttribute("data-aos", "fade");
    footer.setAttribute("data-aos-offset", "0");

    footer.innerHTML = `
      <div class="nv-df-grid">
        <div class="nv-df-col">
          <p class="nv-df-eyebrow">Kontribusi</p>
          <h3 class="nv-df-heading">Bantu rapihin catatan ini</h3>
          <p class="nv-df-text">Nemu typo, command error, atau link mati? Langsung cek source atau buka issue di repository GitHub.</p>
          <a class="nv-df-btn" href="https://github.com/nwabel/nwabel.github.io" target="_blank" rel="noopener">
            <span>Lihat di GitHub</span>
            ${SVG.external}
          </a>
        </div>

        <div class="nv-df-col">
          <p class="nv-df-eyebrow">Kontak</p>
          <h3 class="nv-df-heading">Ada yang mau ditanyain?</h3>
          <div class="nv-df-links">
            <a href="https://github.com/nwabel" target="_blank" rel="noopener">GitHub (@nwabel)</a>
            <a href="mailto:nabilsywl@gmail.com">nabilsywl@gmail.com</a>
          </div>
          <div class="nv-df-col-action">
            <button type="button" class="nv-df-random-btn" aria-label="Buka catatan acak">
              ${SVG.shuffle}
              <span>Random Note</span>
            </button>
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
          <a href="${BASE_PATH}">Home</a>
          <a href="${BASE_PATH}finding/">Finding</a>
          <a href="${BASE_PATH}wretap/">Wretap</a>
          <a href="${BASE_PATH}wiki/">Wiki</a>
          <a href="${BASE_PATH}blog/">Blok</a>
        </div>
      </div>
    `;

    const randomBtn = footer.querySelector(".nv-df-random-btn");
    randomBtn?.addEventListener("click", async () => {
      if (randomBtn.dataset.loading === "1") return;
      randomBtn.dataset.loading = "1";
      randomBtn.classList.add("is-loading");
      try {
        const res = await fetch(`${BASE_PATH}search/search_index.json`);
        if (!res.ok) throw new Error("Index fetch failed");
        const data = await res.json();
        const currentPath = location.pathname.replace(/\/+$/, "");
        const baseNorm = BASE_PATH.replace(/\/+$/, "");

        const pages = [...new Set(
          (data.docs || [])
            .filter((d) => d.location && !d.location.includes("#"))
            .map((d) => new URL(d.location, location.origin + BASE_PATH).pathname)
        )].filter((p) => {
          const norm = p.replace(/\/+$/, "");
          return norm !== currentPath && norm !== baseNorm;
        });

        location.href = pages.length
          ? pages[Math.floor(Math.random() * pages.length)]
          : `${BASE_PATH}blog/`;
      } catch (err) {
        console.error("Gagal memuat Random Note:", err);
        location.href = `${BASE_PATH}blog/`;
      } finally {
        randomBtn.dataset.loading = "0";
        randomBtn.classList.remove("is-loading");
      }
    });

    if (window.AOS && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      AOS.init({ duration: 650, easing: "ease-out", once: true, offset: 30 });
    }
  };

  /* ========================================================================
     BOOTSTRAP
     ======================================================================== */
  initBackToTop();

  document.addEventListener("click", (e) => {
    if (e.target.closest('[data-slot="dialog-trigger"], button[onclick*="onSearchBarClick"]')) {
      requestAnimationFrame(() => setTimeout(syncSearchUI, 30));
    }
  });

  onReady(() => {
    flagHome();
    syncSearchUI();
    syncShareButtons();
    initReadingProgress();
    initDocsSubbar();
    initArticleHeader();
    initBottomNav();
    initDocsFooter();

    new MutationObserver(() => {
      syncSearchUI();
      syncShareButtons();
    }).observe(document.documentElement, { childList: true, subtree: true });
  });
})();

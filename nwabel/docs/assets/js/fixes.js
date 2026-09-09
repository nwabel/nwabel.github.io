/* ==========================================================================
   1. SEARCH TEXT CUSTOMIZATION
   ========================================================================== */
(() => {
  const SEARCH_PLACEHOLDER = "Mau cari apa?";

  const updateSearchElements = (root = document) => {
    const triggers = [
      ...root.querySelectorAll('[data-slot="dialog-trigger"]'),
      ...root.querySelectorAll('button[onclick*="onSearchBarClick"]'),
    ];

    triggers.forEach(btn => {
      btn.querySelectorAll("span").forEach(span => {
        if (/^Search/i.test(span.textContent.trim())) {
          span.textContent = SEARCH_PLACEHOLDER;
        }
      });

      if (/^Search/i.test(btn.textContent.trim())) {
        btn.childNodes.forEach(node => {
          if (node.nodeType === 3 && /^Search/i.test(node.textContent.trim())) {
            node.textContent = SEARCH_PLACEHOLDER;
          }
        });
      }

      if (btn.getAttribute("aria-label")?.toLowerCase().startsWith("search")) {
        btn.setAttribute("aria-label", SEARCH_PLACEHOLDER);
      }
      if (btn.title?.toLowerCase().startsWith("search")) {
        btn.title = SEARCH_PLACEHOLDER;
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
  
  document.addEventListener("DOMContentLoaded", initSearchFix);
  
  document.addEventListener("click", (e) => {
    if (e.target.closest('[data-slot="dialog-trigger"], button[onclick*="onSearchBarClick"]')) {
      requestAnimationFrame(() => setTimeout(initSearchFix, 30));
    }
  });

  new MutationObserver(() => initSearchFix()).observe(document.documentElement, { 
    childList: true, 
    subtree: true 
  });
})();


/* ==========================================================================
   2. BACK TO TOP COMPONENT
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
   3. READING PROGRESS BAR
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
   4. COPY PAGE URL SCRIPT
   ========================================================================== */
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const copyButtons = document.querySelectorAll('button[onclick*="fetch(`../..`)"]');

    copyButtons.forEach(btn => {
      btn.removeAttribute("onclick");

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const currentUrl = window.location.href;

        navigator.clipboard.writeText(currentUrl).then(() => {
          const textSpan = btn.querySelector("span");
          if (textSpan) {
            const originalText = textSpan.innerText;
            textSpan.innerText = "Link Copied!";
            setTimeout(() => {
              textSpan.innerText = originalText;
            }, 2000);
          }
        }).catch(err => {
          console.error("Gagal menyalin tautan:", err);
        });
      });
    });
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
    const data = buildCrumbs();
    const nav = document.createElement("nav");
    nav.className = "nw-breadcrumbs";
    nav.setAttribute("aria-label", "Breadcrumb");
    
    nav.innerHTML = `
      <ol class="nw-bc-list"> 
        ${data.map((item, i) =>
          i === data.length - 1 || !item.href
            ? `<li class="nw-bc-item nw-bc-current"><span>${item.text}</span></li>`
            : `<li class="nw-bc-item"><a class="nw-bc-link" href="${item.href}">${item.text}</a></li>`
        ).join("")}
      </ol>`;

    document.querySelectorAll(".nw-breadcrumbs").forEach(old => old.remove());
    const target = document.querySelector("#page-header") || document.querySelector("article") || document.querySelector("main");
    target?.parentNode?.insertBefore(nav, target);
  };

  (document.readyState === "loading")
    ? document.addEventListener("DOMContentLoaded", renderBreadcrumbs, { once: true })
    : renderBreadcrumbs();
})();


/* ==========================================================================
   6. LOGO SWAPPER (BRAND HEADER)
   ========================================================================== */
(() => {
  const LOGO_FILENAME = "assets/images/logo/logoku.svg";
  const LOGO_SIZE = 25;

  const getBasePath = () => {
    const base = (window.BASE_URL || "/");
    try {
      const path = new URL(base, location.origin).pathname;
      return path.endsWith("/") ? path : path + "/";
    } catch {
      return "/";
    }
  };

  const getBrandLink = () => {
    const base = getBasePath();
    return (
      document.querySelector(`header .container-wrapper a[href="${base}"][data-slot="button"]`) ||
      document.querySelector(`header .container-wrapper a[href^="${location.origin}${base}"][data-slot="button"]`)
    );
  };

  const swapLogo = () => {
    const link = getBrandLink();
    if (!link) return;

    const originalSvg = link.querySelector("svg");
    if (!originalSvg || link.querySelector('img[data-nwabel-logo]')) return;

    const newLogo = document.createElement("img");
    newLogo.src = getBasePath() + LOGO_FILENAME.replace(/^\/+/, "") + "?v=2";
    newLogo.alt = "nwabel-logo";
    newLogo.width = LOGO_SIZE;
    newLogo.height = LOGO_SIZE;
    newLogo.setAttribute("data-nwabel-logo", "1");
    
    Object.assign(newLogo.style, {
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: "0.375rem"
    });

    originalSvg.style.display = "none";
    originalSvg.parentNode.insertBefore(newLogo, originalSvg);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", swapLogo);
  } else {
    swapLogo();
  }
})();


/* ==========================================================================
   7. MOBILE BURGER LOGO REPLACER
   ========================================================================== */
(() => {
  const LOGO_SRC = "assets/images/logo/logoku.svg";
  const SIZE = 22;

  const getBasePath = () => {
    const guess = (window.BASE_URL || window.base_url || "/");
    try {
      const p = new URL(guess, location.origin).pathname;
      return p.endsWith("/") ? p : p + "/";
    } catch { 
      return "/"; 
    }
  };

  const B = getBasePath();

  const nukeOldIconContainers = (btn) => {
    btn.querySelectorAll("svg").forEach(el => el.remove());
    btn.querySelectorAll("div, span, i").forEach(el => {
      const cls = el.className || "";
      const tinyClass =
        /\bw-4\b/.test(cls) ||
        /\bsize-4\b/.test(cls) ||
        /\bw-\[16px\]\b/.test(cls) ||
        /\bw-3\b/.test(cls) ||
        /\bsize-3\b/.test(cls);

      const rect = el.getBoundingClientRect();
      const tinyBox = (rect.width && rect.width <= 20) && (rect.height && rect.height <= 20);
      const isTextish = /\btext|label|sr-only\b/i.test(cls) || /\bMenu\b/i.test(el.textContent || "");

      if (!isTextish && (tinyClass || tinyBox)) {
        el.remove();
      }
    });
  };

  const ensureLogo = (btn) => {
    if (btn.querySelector('img[data-mobile-burger]')) return;

    const img = document.createElement("img");
    img.src = B + LOGO_SRC.replace(/^\/+/, "") + "?v=3";
    img.alt = "Menu";
    img.width = SIZE;
    img.height = SIZE;
    img.setAttribute("data-mobile-burger", "1");
    
    Object.assign(img.style, {
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: "8px"
    });

    btn.prepend(img);
    btn.style.gap = "0.35rem";
    btn.style.paddingLeft = "8px";
  };

  const run = () => {
    const btn = document.querySelector("header #menu-button");
    if (!btn) return;

    nukeOldIconContainers(btn);
    ensureLogo(btn);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  new MutationObserver(() => run()).observe(document.body, { 
    childList: true, 
    subtree: true 
  });
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
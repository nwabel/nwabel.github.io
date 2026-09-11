/* ==========================================================================
   Sercing
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
   8. AUTO-FLAG HOME PAGE (.is-home CLASS)
   ========================================================================== */
(() => {
  const path = window.location.pathname;
  if (path === "/" || path.endsWith("/index.html") || path === window.BASE_URL) {
    document.body.classList.add("is-home");
  }
})();
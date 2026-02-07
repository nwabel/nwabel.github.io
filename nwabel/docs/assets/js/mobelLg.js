(function () {
  const LOGO_SRC = "assets/logoku.svg";
  const SIZE = 22;
  function basePath() {
    const guess = (window.BASE_URL || window.base_url || "/");
    try {
      const p = new URL(guess, location.origin).pathname;
      return p.endsWith("/") ? p : p + "/";
    } catch { return "/"; }
  }
  const B = basePath();

  function nukeOldIconContainers(btn) {
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

      const isTextish = /\btext|label|sr-only\b/i.test(cls) || /\bMenu\b/i.test(el.textContent||"");

      if (!isTextish && (tinyClass || tinyBox)) {
        el.remove();
      }
    });
  }

  function ensureLogo(btn) {
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
  }

  function run() {
    const btn = document.querySelector('header #menu-button');
    if (!btn) return;

    nukeOldIconContainers(btn);
    ensureLogo(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  const mo = new MutationObserver(() => run());
  mo.observe(document.body, { childList: true, subtree: true });
})();

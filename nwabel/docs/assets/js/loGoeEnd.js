(function () {
  console.log("[logo-swap] loaded");

  const LOGO_PATH = "assets/images/logo/.svg";

  function basePath() {
    const guess = (window.BASE_URL || window.base_url || "/");
    try {
      const p = new URL(guess, location.origin).pathname;
      return p.endsWith("/") ? p : p + "/";
    } catch {
      return "/";
    }
  }

  function brandLink() {
    const b = basePath();

    return (
      document.querySelector(`header .container-wrapper a[href="${b}"][data-slot="button"]`) ||
      document.querySelector(`header .container-wrapper a[href^="${location.origin}${b}"][data-slot="button"]`)
    );
  }

  function run() {
    const link = brandLink();
    if (!link) return console.warn("[logo-swap] brand link not found");

    const svg = link.querySelector("svg");
    if (!svg) return console.warn("[logo-swap] svg not found");

    if (link.querySelector('img[data-nwabel-logo]')) {
      console.log("[logo-swap] already swapped");
      return;
    }

    const img = document.createElement("img");
    img.src = basePath() + LOGO_PATH.replace(/^\/+/, "") + "?v=2"; // cache-busting
    img.alt = "Logo";
    img.width = 25;
    img.height = 25;
    img.style.display = "inline-block";
    img.style.verticalAlign = "middle";
    img.style.marginRight = "0.375rem";
    img.setAttribute("data-nwabel-logo", "1");

    svg.style.display = "none";
    svg.parentNode.insertBefore(img, svg);

    console.log("[logo-swap] done");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();

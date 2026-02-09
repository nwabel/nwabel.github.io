(() => {
  const LOGO_FILENAME = "assets/images/logo/logoku.svg"; // Ganti ke logo.svg kalau perlu
  const LOGO_SIZE = 25; // Ukuran logo (px)

  const getBasePath = () => {
    const base = (window.BASE_URL || "/");
    try {
      const path = new URL(base, location.origin).pathname;
      return path.endsWith("/") ? path : path + "/";
    } catch {
      return "/";
    }
  }; // Ambil base path aplikasi

  const getBrandLink = () => {
    const base = getBasePath();
    return (
      document.querySelector(`header .container-wrapper a[href="${base}"][data-slot="button"]`) ||
      document.querySelector(`header .container-wrapper a[href^="${location.origin}${base}"][data-slot="button"]`)
    );
  }; // Cari elemen link brand di navbar

  const swapLogo = () => {
    const link = getBrandLink();
    if (!link) return;

    const originalSvg = link.querySelector("svg");
    if (!originalSvg || link.querySelector('img[data-nwabel-logo]')) return;

    const newLogo = document.createElement("img");
    newLogo.src = getBasePath() + LOGO_FILENAME.replace(/^\/+/, "") + "?v=2"; // Cache-busting v2
    newLogo.alt = "nwabel-logo";
    newLogo.width = LOGO_SIZE;
    newLogo.height = LOGO_SIZE;
    newLogo.setAttribute("data-nwabel-logo", "1");
    
    // Styling agar presisi di navbar
    Object.assign(newLogo.style, {
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: "0.375rem"
    });

    originalSvg.style.display = "none"; // Sembunyikan SVG lama
    originalSvg.parentNode.insertBefore(newLogo, originalSvg); // Inject logo baru
  };

  // Eksekusi saat DOM siap
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", swapLogo);
  } else {
    swapLogo();
  }
})();
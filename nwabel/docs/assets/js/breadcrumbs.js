(() => {
  const HOME_LABEL = "Home"; // Label root navigasi

  const getBasePath = (() => {
    let path = (window.BASE_URL || "/");
    try { path = new URL(path, location.origin).pathname; } catch {}
    return path.endsWith("/") ? path : path + "/";
  })(); // Ambil base URL aplikasi

  const formatLabel = (str) =>
    decodeURIComponent(str)
      .replace(/\.(html|md)$/i, "") // Buang ekstensi file
      .replace(/[_-]+/g, " ") // Ubah separator jadi spasi
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\b([a-z])([a-z0-9]*)/gi, (_, first, rest) => first.toUpperCase() + rest); // Title Case

  const getPageTitle = () => {
    const header = document.querySelector("#page-header h1, article h1");
    return (header ? header.textContent : document.title).trim();
  }; // Ambil judul utama halaman

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
  }; // Susun data navigasi

  const renderBreadcrumbs = () => {
    const data = buildCrumbs();
    const nav = document.createElement("nav");
    nav.className = "nw-breadcrumbs"; // Sinkron dengan breadcrumbs.css
    nav.setAttribute("aria-label", "Breadcrumb");
    
    nav.innerHTML = `
      <ol class="nw-bc-list"> 
        ${data.map((item, i) =>
          i === data.length - 1 || !item.href
            ? `<li class="nw-bc-item nw-bc-current"><span>${item.text}</span></li>`
            : `<li class="nw-bc-item"><a class="nw-bc-link" href="${item.href}">${item.text}</a></li>`
        ).join("")}
      </ol>`; // HTML structure sinkron dengan CSS

    document.querySelectorAll(".nw-breadcrumbs").forEach(old => old.remove()); // Bersihkan elemen lama
    const target = document.querySelector("#page-header") || document.querySelector("article") || document.querySelector("main");
    target?.parentNode?.insertBefore(nav, target); // Inject ke DOM
  }; // Eksekusi render

  (document.readyState === "loading")
    ? document.addEventListener("DOMContentLoaded", renderBreadcrumbs, { once: true })
    : renderBreadcrumbs(); // Runtime check
})();
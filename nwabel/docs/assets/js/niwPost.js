(async () => {
  "use strict";

  if (window.__niwPostInitialized || !document.querySelector("#nv-landing")) return;
  window.__niwPostInitialized = true;

  const grid = document.getElementById("latest-posts-list");
  if (!grid) return;

  const CATEGORY_MAP = { wretap: "Wretap", wiki: "Wiki", blog: "Blok" };

  const PORTAL_CARDS = [
    {
      title: "📝 Blok",
      url: "blog/",
      pathLabel: "~/blog",
      summary: "Ramdom, yapping aza sesukan hati.",
      category: "Blok",
      tokenLabel: "Portal Utama",
      isPortal: true,
      categories: ["all", "Portal", "Blok"],
    },
    {
      title: "🛡️ Wretap",
      url: "wretap/",
      pathLabel: "~/wretap",
      summary: "Dokumentasi penyelesaian CTF dan analisis kerentanan sistem.",
      category: "Wretap",
      tokenLabel: "Portal Utama",
      isPortal: true,
      categories: ["all", "Portal", "Wretap"],
    },
    {
      title: "🧠 Wiki",
      url: "wiki/",
      pathLabel: "~/wiki",
      summary: "Contekan-contekan gwej agar supaya tidak lupa ketika saat ditanya kolega.",
      category: "Wiki",
      tokenLabel: "Portal Utama",
      isPortal: true,
      categories: ["all", "Portal", "Wiki"],
    },
  ];

  const ARROW_SVG = `<svg class="nv-icon nv-arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>`;
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  let activeCategory = "all";
  let searchQuery = "";
  let allPosts = [];

  const escapeHtml = (str) =>
    String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const renderCard = (item) => {
    const tokenText = escapeHtml(item.tokenLabel || item.category);
    const titleText = escapeHtml(item.title);
    const descText = escapeHtml(item.summary || "Baca selengkapnya di halaman ini.");
    const metaText = escapeHtml(item.pathLabel || `~/${(item.category || "docs").toLowerCase()}`);
    const actionText = item.isPortal ? "Buka Portal" : "Baca Tulisan";
    const badgeClass = item.isPortal
      ? "nv-badge-portal"
      : `nv-badge-${(item.category || "lainnya").toLowerCase()}`;

    return `
      <div class="nv-card">
        <div class="nv-card-body">
          <div class="nv-card-tokens">
            <span class="nv-badge ${badgeClass}">${tokenText}</span>
          </div>
          <h3 class="nv-card-title">
            <a href="${escapeHtml(item.url)}" class="nv-card-link">${titleText}</a>
          </h3>
          <p class="nv-card-desc">${descText}</p>
        </div>
        <div class="nv-card-footer">
          <span class="nv-card-meta">${metaText}</span>
          <span class="nv-card-action">${actionText}${ARROW_SVG}</span>
        </div>
      </div>
    `;
  };

  const updateGrid = () => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = [...PORTAL_CARDS, ...allPosts].filter((item) => {
      const catMatch =
        activeCategory === "all" ||
        item.categories?.includes(activeCategory) ||
        item.category === activeCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return `${item.title} ${item.summary} ${item.category} ${item.tokenLabel || ""}`.toLowerCase().includes(q);
    });

    const visible = filtered.slice(0, mobileQuery.matches ? 3 : 6);
    grid.innerHTML = visible.length
      ? visible.map(renderCard).join("")
      : `<div class="nv-empty"><p>Engga nemu artikel yang cocok sama filter/pencarian ini.</p></div>`;
  };

  mobileQuery.addEventListener?.("change", updateGrid);

  // Category Dropdown
  const catBtn = document.getElementById("nv-cat-btn");
  const catMenu = document.getElementById("nv-cat-menu");
  const catVal = document.getElementById("nv-cat-val");

  if (catBtn && catMenu) {
    const setMenuOpen = (open) => {
      catMenu.hidden = !open;
      catBtn.setAttribute("aria-expanded", String(open));
    };

    catBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      setMenuOpen(catMenu.hidden);
    });

    const catItems = catMenu.querySelectorAll("[data-category]");
    catItems.forEach((itemBtn) => {
      itemBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        activeCategory = itemBtn.getAttribute("data-category") || "all";
        if (catVal) catVal.textContent = itemBtn.querySelector("span")?.textContent || "All categories";
        catItems.forEach((b) => {
          const selected = b === itemBtn;
          b.classList.toggle("is-selected", selected);
          b.setAttribute("aria-checked", String(selected));
        });
        setMenuOpen(false);
        updateGrid();
      });
    });

    document.addEventListener("click", (e) => {
      if (!catMenu.hidden && !e.target.closest("#nv-cat-dropdown")) setMenuOpen(false);
    });
  }

  // Search Input & ⌘K / Ctrl+K Shortcut
  const searchInput = document.getElementById("nv-article-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value || "";
      updateGrid();
    });

    const kbdGroup = document.getElementById("nv-article-search-kbd");
    const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || "");
    if (kbdGroup && !isMac) {
      kbdGroup.innerHTML = `<kbd class="nv-kbd">Ctrl</kbd><kbd class="nv-kbd">K</kbd>`;
    }

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        e.stopPropagation();
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => searchInput.focus(), 180);
      }
    }, true);
  }

  // Fetch articles from MkDocs search_index.json
  const root = (
    (typeof base_url !== "undefined" && base_url) ||
    document.querySelector("link[rel='canonical']")?.href ||
    "/"
  ).replace(/\/+$/, "/");
  const join = (p) => new URL(p, root).href;

  let docs = [];
  try {
    const data = await (await fetch(join("search/search_index.json"), { cache: "no-store" })).json();
    docs = (data.docs || data || []).filter(
      (d) =>
        d?.location &&
        d.title &&
        /^(wretap|blog|wiki)\//i.test(d.location) &&
        !/^(wretap|blog|wiki)\/$/i.test(d.location) &&
        !/\/index\.html?$/i.test(d.location) &&
        !d.location.includes("#")
    );
  } catch (e) {
    console.warn("[niwPost] gagal ambil search index:", e);
    updateGrid();
    return;
  }

  const getMeta = async (d) => {
    const url = join(d.location);
    let date = null;
    try {
      const html = await (await fetch(url, { cache: "no-store" })).text();
      const match =
        html.match(/new Date\('([^']+)'\)/) ||
        html.match(/<time[^>]+datetime="([^"]+)"/i) ||
        html.match(/"datePublished"\s*:\s*"([^"]+)"/i);
      if (match) date = new Date(match[1]);
    } catch {}

    const rawText = (d.text || "").replace(/\s+/g, " ").trim();
    const summary = rawText.length > 110 ? `${rawText.slice(0, 110)}…` : rawText;
    const prefix = d.location.split("/")[0].toLowerCase();
    const category = CATEGORY_MAP[prefix] || "Lainnya";

    return {
      title: d.title,
      url,
      date,
      pathLabel: `~/${d.location.replace(/\/+$/, "")}`,
      summary: summary || "Klik untuk membaca dokumentasi lengkap.",
      category,
      tokenLabel: category,
      isPortal: false,
      categories: ["all", category],
    };
  };

  allPosts = (await Promise.all(docs.map(getMeta))).sort(
    (a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0)
  );

  updateGrid();
})();

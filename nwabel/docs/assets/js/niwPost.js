(async function () {
  "use strict";
  if (window.__niwPostInitialized) return;
  if (!document.querySelector("#nv-landing")) return;
  window.__niwPostInitialized = true;

  const grid = document.getElementById("latest-posts-list");
  if (!grid) return;

  const portalCards = [
    {
      title: "📝 Blok",
      url: "blog/",
      pathLabel: "~/blog",
      summary: "Ramdom, yapping aza sesukan hati.",
      category: "Blok",
      tokenLabel: "Portal Utama",
      isPortal: true,
      categories: ["all", "Portal", "Blok"]
    },
    {
      title: "🛡️ Wretap",
      url: "wretap/",
      pathLabel: "~/wretap",
      summary: "Dokumentasi penyelesaian CTF dan analisis kerentanan sistem.",
      category: "Wretap",
      tokenLabel: "Portal Utama",
      isPortal: true,
      categories: ["all", "Portal", "Wretap"]
    },
    {
      title: "🧠 Wiki",
      url: "wiki/",
      pathLabel: "~/wiki",
      summary: "Contekan-contekan gwej agar supaya tidak lupa ketika saat ditanya kolega.",
      category: "Wiki",
      tokenLabel: "Portal Utama",
      isPortal: true,
      categories: ["all", "Portal", "Wiki"]
    }
  ];

  let activeCategory = "all";
  let searchQuery = "";
  let allPosts = [];
  let isInitialRender = true;

  const escapeHtml = (str) =>
    String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  function renderCard(item) {
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
          <span class="nv-card-action">
            ${actionText}
            <svg class="nv-icon nv-arrow" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
          </span>
        </div>
      </div>
    `;
  }

  function updateGrid() {
    const q = searchQuery.trim().toLowerCase();
    const combined = [...portalCards, ...allPosts];

    const filtered = combined.filter((item) => {
      const catMatch =
        activeCategory === "all" ||
        (item.categories && item.categories.includes(activeCategory)) ||
        item.category === activeCategory;
      if (!catMatch) return false;
      if (!q) return true;
      const hay = `${item.title} ${item.summary} ${item.category} ${item.tokenLabel || ""}`.toLowerCase();
      return hay.includes(q);
    });

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const visible = filtered.slice(0, isMobile ? 3 : 6);

    if (!visible.length) {
      grid.innerHTML = `
        <div class="nv-empty">
          <p>Engga nemu artikel yang cocok sama filter/pencarian ini.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = visible.map(renderCard).join("");
  }

  const mobileQuery = window.matchMedia("(max-width: 768px)");
  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", () => updateGrid());
  }

  // Setup Category Dropdown & Search Controls
  const catBtn = document.getElementById("nv-cat-btn");
  const catMenu = document.getElementById("nv-cat-menu");
  const catVal = document.getElementById("nv-cat-val");
  const searchInput = document.getElementById("nv-article-search");

  if (catBtn && catMenu) {
    catBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = !catMenu.hidden;
      catMenu.hidden = isOpen;
      catBtn.setAttribute("aria-expanded", String(!isOpen));
    });

    catMenu.querySelectorAll("[data-category]").forEach((itemBtn) => {
      itemBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        activeCategory = itemBtn.getAttribute("data-category") || "all";
        if (catVal) {
          catVal.textContent = itemBtn.querySelector("span")?.textContent || "All categories";
        }
        catMenu.querySelectorAll("[data-category]").forEach((b) => {
          const selected = b === itemBtn;
          b.classList.toggle("is-selected", selected);
          b.setAttribute("aria-checked", String(selected));
        });
        catMenu.hidden = true;
        catBtn.setAttribute("aria-expanded", "false");
        updateGrid(true);
      });
    });

    document.addEventListener("click", (e) => {
      if (!catMenu.hidden && !e.target.closest("#nv-cat-dropdown")) {
        catMenu.hidden = true;
        catBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value || "";
      updateGrid(true);
    });
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
    const idxURL = join("search/search_index.json");
    const data = await (await fetch(idxURL, { cache: "no-store" })).json();
    docs = (data.docs || data || [])
      .filter((d) => d && d.location && d.title)
      .filter((d) => /^(wretap|blog|wiki)\//i.test(d.location))
      .filter((d) => !/^(wretap|blog|wiki)\/$/i.test(d.location))
      .filter((d) => !/\/index\.html?$/i.test(d.location))
      .filter((d) => !d.location.includes("#"));
  } catch (e) {
    console.warn("[niwPost] gagal ambil search index:", e);
    updateGrid();
    return;
  }

  async function getMeta(d) {
    const url = join(d.location);
    let date = null;
    try {
      const html = await (await fetch(url, { cache: "no-store" })).text();
      const m =
        html.match(/new Date\('([^']+)'\)/) ||
        html.match(/<time[^>]+datetime="([^"]+)"/i) ||
        html.match(/"datePublished"\s*:\s*"([^"]+)"/i);
      if (m) date = new Date(m[1]);
    } catch (_) {}

    const rawText = (d.text || "").replace(/\s+/g, " ").trim();
    const summary = rawText.length > 110 ? rawText.slice(0, 110) + "…" : rawText;

    let category = "Lainnya";
    if (d.location.startsWith("wretap/")) category = "Wretap";
    else if (d.location.startsWith("wiki/")) category = "Wiki";
    else if (d.location.startsWith("blog/")) category = "Blok";

    const cleanPath = d.location.replace(/\/+$/, "");

    return {
      title: d.title,
      url,
      date,
      pathLabel: `~/${cleanPath}`,
      summary: summary || "Klik untuk membaca dokumentasi lengkap.",
      category,
      tokenLabel: category,
      isPortal: false,
      categories: ["all", category]
    };
  }

  allPosts = (await Promise.all(docs.map(getMeta))).sort(
    (a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0)
  );

  updateGrid();
})();

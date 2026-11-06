(async function () {
  "use strict";
  if (!document.querySelector("#nv-landing")) return;

  const root = ((typeof base_url !== "undefined" && base_url) ||
               (document.querySelector("link[rel='canonical']")?.href) ||
               "/").replace(/\/+$/, "/");
  const join = (p) => (new URL(p, root)).href;

  let docs = [];
  try {
    const idxURL = join("search/search_index.json");
    const data = await (await fetch(idxURL, { cache: "no-store" })).json();
    docs = (data.docs || data || [])
      .filter(d => d && d.location && d.title)
      .filter(d => /^(wretap|blog|wiki)\//i.test(d.location))
      .filter(d => !/^(wretap|blog|wiki)\/$/i.test(d.location))
      .filter(d => !/\/index\.html?$/i.test(d.location));
  } catch (e) {
    console.warn("[niwPost] gagal ambil search index:", e);
    return;
  }

  async function getMeta(d) {
    const url = join(d.location);
    let date = null;
    try {
      const html = await (await fetch(url, { cache: "no-store" })).text();
      let m = html.match(/new Date\('([^']+)'\)/) ||
              html.match(/<time[^>]+datetime="([^"]+)"/i) ||
              html.match(/"datePublished"\s*:\s*"([^"]+)"/i);
      if (m) date = new Date(m[1]);
    } catch (_) { }

    const summary = (d.text || "").replace(/\s+/g, " ").trim().slice(0, 100);
    
    let category = "Lainnya", badgeClass = "";
    if (d.location.startsWith("wretap/")) { category = "Wretap"; badgeClass = "nv-badge-wretap"; }
    else if (d.location.startsWith("wiki/")) { category = "Wiki"; badgeClass = "nv-badge-wiki"; }
    else if (d.location.startsWith("blog/")) { category = "Blok"; badgeClass = "nv-badge-blok"; }

    return { title: d.title, url, date, summary, category, badgeClass };
  }

  const posts = (await Promise.all(docs.map(getMeta)))
    .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0))
    .slice(0, 6); 

  const ul = document.getElementById("latest-posts-list");
  if (!ul) return;

  ul.innerHTML = posts.length
    ? posts.map(p => `
      <li>
        <span class="nv-badge ${p.badgeClass}">${p.category}</span>
        ${p.date ? `<time datetime="${p.date.toISOString()}" style="display:block; font-size:0.85rem; opacity:0.6; margin-bottom:0.3rem;">${p.date.toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</time>` : ``}
        <a href="${p.url}" style="font-weight: 600; text-decoration: none; color: var(--foreground); display: block; margin-bottom: 0.5rem; font-size: 1.05rem; line-height: 1.3;">${p.title}</a>
        ${p.summary ? `<p style="font-size: 0.9rem; color: var(--muted-foreground); margin: 0; line-height: 1.5;">${p.summary}&hellip;</p>` : ``}
      </li>
    `).join("")
    : "<li style='opacity: 0.5;'>Belum ada aktivitas.</li>";
})();
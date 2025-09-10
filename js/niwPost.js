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
    const arr = data.docs || data || [];
    docs = arr
      .filter(d => d && d.location && d.title)
      .filter(d => /^blog\//i.test(d.location)) // folder Blog
      .filter(d => !/^blog\/$/i.test(d.location)) // bukan Blog/
      .filter(d => !/\/index\.html?$/i.test(d.location));// buang index.html
  } catch (e) {
    console.warn("[latest] gagal ambil search index:", e);
    return;
  }

  async function getMeta(d) {
    const url = join(d.location);
    let date = null;
    try {
      const html = await (await fetch(url, { cache: "no-store" })).text();
      // Sumber tanggal: 1) new Date('...') dari theme, 2) <time datetime>, 3) JSON-LD datePublished
      let m = html.match(/new Date\('([^']+)'\)/) ||
              html.match(/<time[^>]+datetime="([^"]+)"/i) ||
              html.match(/"datePublished"\s*:\s*"([^"]+)"/i);
      if (m) date = new Date(m[1]);
    } catch (_) { /* ignore */ }

    const summary = (d.text || "").replace(/\s+/g, " ").trim().slice(0, 160);
    return { title: d.title, url, date, summary };
  }

  const posts = (await Promise.all(docs.map(getMeta)))
    .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0))
    .slice(0, 3);

  const ul = document.getElementById("latest-posts-list");
  if (!ul) return;

  ul.innerHTML = posts.length
    ? posts.map(p => `
      <li>
        ${p.date ? `<time datetime="${p.date.toISOString()}">${p.date.toLocaleDateString()}</time>` : ``}
        <a href="${p.url}">${p.title}</a>
        ${p.summary ? `<p>${p.summary}&hellip;</p>` : ``}
      </li>
    `).join("")
    : "<li>Tidak ada posting.</li>";
})();

(() => {
  const HOME = "Home";

  const basePath = (() => {
    let b = (window.BASE_URL || "/");
    try { b = new URL(b, location.origin).pathname; } catch {}
    return b.endsWith("/") ? b : b + "/";
  })();

  const prettify = (s) =>
    decodeURIComponent(s)
      .replace(/\.(html|md)$/i, "")
      .replace(/[_-]+/g, " ")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\b([a-z])([a-z0-9]*)/gi, (_, a, b) => a.toUpperCase() + b);

  const h1Text = () => {
    const h1 = document.querySelector("#page-header h1, article h1");
    return (h1 ? h1.textContent : document.title).trim();
  };

  const build = () => {
    let rel = location.pathname.startsWith(basePath)
      ? location.pathname.slice(basePath.length)
      : location.pathname;
    rel = rel.replace(/^\/+/, "").replace(/\/+$/, "");

    let parts = rel ? rel.split("/") : [];
    if (parts.length && /^index(\.(html|md))?$/i.test(parts.at(-1))) parts.pop();

    const title = h1Text();
    const out = [{ text: HOME, href: basePath }];

    if (parts.length === 0) {
      out.push({ text: title, href: null });
      return out;
    }

    let acc = basePath;
    for (let i = 0; i < parts.length - 1; i++) {
      acc += parts[i] + "/";
      out.push({ text: prettify(parts[i]), href: acc });
    }

    const lastSeg = prettify(parts.at(-1));
    out.push({ text: /^index$/i.test(title) ? lastSeg : title, href: null });
    return out;
  };

  const render = () => {
    const crumbs = build();
    const nav = document.createElement("nav");
    nav.className = "nw-breadcrumbs";
    nav.setAttribute("aria-label", "Breadcrumb");
    nav.innerHTML = `
      <ol class="nw-bc-list">
        ${crumbs
          .map((c, i) =>
            i === crumbs.length - 1 || !c.href
              ? `<li class="nw-bc-item nw-bc-current"><span>${c.text}</span></li>`
              : `<li class="nw-bc-item"><a class="nw-bc-link" href="${c.href}">${c.text}</a></li>`
          )
          .join("")}
      </ol>`;

    document.querySelectorAll(".nw-breadcrumbs").forEach(n => n.remove());
    const anchor = document.querySelector("#page-header") || document.querySelector("article") || document.querySelector("main");
    anchor?.parentNode?.insertBefore(nav, anchor);
  };

  (document.readyState === "loading")
    ? document.addEventListener("DOMContentLoaded", render, { once: true })
    : render();
})();

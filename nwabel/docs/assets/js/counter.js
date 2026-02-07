document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('.nv-stat-num[data-count]');
  if (!els.length) return;

  const animate = (el) => {
    const target = +el.dataset.count;
    const dur = 900, start = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(target * (0.2 + 0.8*k)); // ease-in-ish
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting){ animate(e.target); io.unobserve(e.target); }});
  }, { threshold: 0.4 });

  els.forEach(el => io.observe(el));
});

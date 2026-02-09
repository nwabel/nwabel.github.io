document.addEventListener('DOMContentLoaded', () => {
  const statsElements = document.querySelectorAll('.nv-stat-num[data-count]'); // grep angka
  if (!statsElements.length) return;

  const runCounterAnimation = (element) => {
    const targetValue = +element.dataset.count;
    const animationDuration = 900;
    const startTime = performance.now();

    const updateValue = (currentTime) => {
      const progress = Math.min(1, (currentTime - startTime) / animationDuration);
      element.textContent = Math.round(targetValue * (0.2 + 0.8 * progress));
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };
    
    requestAnimationFrame(updateValue);
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounterAnimation(entry.target);
        scrollObserver.unobserve(entry.target); // animasi jalan sekali
      }
    });
  }, { threshold: 0.4 }); // trigger 40% viewport

  statsElements.forEach(el => scrollObserver.observe(el)); // scroll
});
<div id="nv-landing">
    <!-- Hero Section: Full Screen & Marquee at Bottom -->
    <section class="nv-landing-hero">
        <div class="nv-wrap nv-hero-inner-full" data-aos="fade-up">
            <div class="nv-hero-greet">
                <a class="glightbox nv-hero-avatar-link" data-type="image" data-width="100%" data-height="auto" href="https://avatars.githubusercontent.com/u/88957934?s=400&amp;u=46e450415c1283b44b188c748c3051b3b5db0d48&amp;v=4" data-desc-position="bottom"><img class="nv-hero-avatar" src="https://avatars.githubusercontent.com/u/88957934?s=400&amp;u=46e450415c1283b44b188c748c3051b3b5db0d48&amp;v=4" alt="Nwabel"></a>
                <h2 class="nv-hero-hello">Guwej, Saya, I’m Nabil</h2>
            </div>
            <p class="nv-hero-title">I build <span class="nv-select">delightful</span> docs &amp; tools, and break things (in labs) to learn.</p>
            <p class="nv-hero-lead">Full-stack tinkerer, SOC Analyst (kalo masih). I ship documentation sites, training labs, and tiny utilities — then write about them.</p>
            <p class="nv-hero-roles">
                <span class="nv-sr">Developer, Satpam Server, Digital Forensics</span>
                <span aria-hidden="true"><span class="nv-type-role">Developer | Satpam Server | Digital Forensics</span><span class="nv-type-note"></span><span class="nv-type-caret"></span></span>
            </p>
        </div>
        <!-- Marquee Tools as Hero Bottom Bar (2 grup identik untuk loop mulus) -->
        <div class="nv-marquee" data-aos="fade-in" data-aos-delay="200">
            <div class="nv-marquee-track">
                <div class="nv-marquee-group"><span>Burp Suite</span><span aria-hidden="true">•</span><span>Splunk</span><span aria-hidden="true">•</span><span>Wireshark</span><span aria-hidden="true">•</span><span>Nmap</span><span aria-hidden="true">•</span><span>Metasploit</span><span aria-hidden="true">•</span><span>INI NGASAL YAA GA BENERAN WKWKW</span><span aria-hidden="true">•</span><span>Python</span><span aria-hidden="true">•</span><span>Bash</span><span aria-hidden="true">•</span><span>Docker</span><span aria-hidden="true">•</span></div>
                <div class="nv-marquee-group" aria-hidden="true"><span>Burp Suite</span><span aria-hidden="true">•</span><span>Splunk</span><span aria-hidden="true">•</span><span>Wireshark</span><span aria-hidden="true">•</span><span>Nmap</span><span aria-hidden="true">•</span><span>Metasploit</span><span aria-hidden="true">•</span><span>INI NGASAL YAA GA BENERAN WKWKW</span><span aria-hidden="true">•</span><span>Python</span><span aria-hidden="true">•</span><span>Bash</span><span aria-hidden="true">•</span><span>Docker</span><span aria-hidden="true">•</span></div>
            </div>
        </div>
    </section>
<!-- Below the Fold: Jelajahi Konten & Aktivitas Terakhir -->
    <section class="nv-section nv-wrap nv-below-fold" data-aos="fade-up">
        <div class="nv-sec-head" style="margin-bottom: 0.5rem;">
            <h2 class="nv-sec-title">Kali Aje Penasaran</h2>
        </div>
        <div class="nv-grid">
            <a href="blog/" class="nv-card nv-card-link">
                <div class="nv-card-body">
                    <h3>📝 Blok</h3>
                    <p class="nv-card-desc">Ramdom, yapping aza sesukan hati </p>
                </div>
            </a>
            <a href="wretap/" class="nv-card nv-card-link">
                <div class="nv-card-body">
                    <h3>🛡️ Wretap</h3>
                    <p class="nv-card-desc">Dokumentasi penyelesaian CTF dan analisis kerentanan sistem.</p>
                </div>
            </a>
            <a href="wiki/" class="nv-card nv-card-link">
                <div class="nv-card-body">
                    <h3>🧠 Wiki</h3>
                    <p class="nv-card-desc">Contekan-contekan gwej agar supaya tidak lupa ketika saat ditanya kolega.</p>
                </div>
            </a>
        </div>

        <div class="nv-sec-head" style="margin-bottom: 0.5rem;">
            <h2 class="nv-sec-title">Apa apa aja </h2>
            <a class="nv-link" href="blog/">w0w Aku Pnasaran →</a>
        </div>
        <ul id="latest-posts-list" class="nv-latest">
            <li style="opacity: 0.5;">Loading contekan...</li>
        </ul>
    </section>

    <!-- Clean CTA Banner -->
    <section class="nv-section nv-wrap" data-aos="fade-up" style="padding-top: 0; padding-bottom: 3rem;">
        <div class="nv-cta-panel">
            <div>
                <h3 style="margin: 0 0 .25rem; font-size: 1.25rem;">Let's Build Something Together</h3>
                <p class="nv-asd" style="font-size: .9rem; margin: 0;">Ini juga kalo eluh mau nden gwe ga mager or lokit ni email (basa-basi aja si enih, males aslinya mah).</p>
            </div>
            <div class="nv-cta" style="margin-top: 0;">
                <a class="nv-btn nv-btn-primary" href="mailto:nabilsywl@gmail.com">Get in Touch</a>
                <a class="nv-btn nv-btn-ghost" href="https://github.com/nwabel" target="_blank" rel="noopener">GitHub Profile</a>
            </div>
        </div>
    </section>
</div>

<!-- Script Inisialisasi & Fetcher -->
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script src="assets/js/niwPost.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("is-home");
    if (window.AOS) {
      AOS.init({ duration: 700, easing: "ease-out", once: true, offset: 40 });
    }
    // Typing animation peran di hero (AOS hanya untuk animasi scroll, bukan ngetik)
    var box = document.querySelector(".nv-hero-roles");
    if (!box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var roleEl = box.querySelector(".nv-type-role");
    var noteEl = box.querySelector(".nv-type-note");
    var items = [
      ["Developer", "full kopas EAY"],
      ["Satpam Server", "mungkeeen"],
      ["Digital Forensics", "niatnya"]
    ];
    var i = 0, n = 0, deleting = false;
    box.classList.add("is-typing");
    roleEl.textContent = "";
    function tick() {
      var role = items[i][0];
      var full = role + " (" + items[i][1] + ")";
      n += deleting ? -1 : 1;
      roleEl.textContent = full.slice(0, Math.min(n, role.length));
      noteEl.textContent = n > role.length ? full.slice(role.length, n) : "";
      var delay = deleting ? 35 : 70;
      if (!deleting && n === full.length) { deleting = true; delay = 1600; }
      else if (deleting && n === 0) { deleting = false; i = (i + 1) % items.length; delay = 350; }
      setTimeout(tick, delay);
    }
    setTimeout(tick, 700);
  });
</script>
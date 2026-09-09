<div id="nv-landing">
    <!-- Hero Section -->
    <section class="nv-hero" data-aos="fade-up">
        <div class="nv-wrap">
            <div class="nv-hero-inner">
                <img class="nv-avatar" src="assets/images/logo/logoku.png" alt="Nwabel">
                <div class="nv-hero-text">
                    <p class="nv-overline">Developer • SecOps • Forensics Tinkerer</p>
                    <h1 class="nv-title">
                        I build delightful docs &amp; tools, and break things (in labs) to learn.
                    </h1>
                    <p class="nv-subtitle">
                        Gudang contekan pribadi yang kebetulan online. Isinya catatan ngoprek CTF, lab investigasi, sampai jejak bug hasil buruan.
                    </p>
                    <div class="nv-cta">
                        <a class="nv-btn nv-btn-primary" href="blog/">Blog</a>
                        <a class="nv-btn nv-btn-ghost" href="wretap/">Wretap</a>
                        <a class="nv-btn nv-btn-ghost" href="wiki/">Wiki</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Marquee Tools -->
    <div class="nv-marquee" data-aos="fade-in" data-aos-delay="200">
        <div class="nv-marquee-track">
            <span>Burp Suite</span> • <span>Splunk</span> • <span>Wireshark</span> • <span>Nmap</span> • <span>Metasploit</span> • <span>Python</span> • <span>Bash</span> • <span>Docker</span> • <span>Burp Suite</span> • <span>Splunk</span> • <span>Wireshark</span> • <span>Nmap</span>
        </div>
    </div>

    <!-- Latest Posts Feed (Otomatis ditarik oleh niwPost.js) -->
    <section class="nv-section nv-wrap" data-aos="fade-up" style="margin-top: 3rem; margin-bottom: 5rem;">
        <div class="nv-sec-head">
            <h2 class="nv-sec-title">Aktivitas Terakhir</h2>
            <a class="nv-link" href="blog/">Semua pos →</a>
        </div>
        <ul id="latest-posts-list" class="nv-latest">
            <li style="opacity: 0.5;">Loading contekan...</li>
        </ul>
    </section>
</div>

<!-- Script Inisialisasi & Fetcher -->
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script src="assets/js/niwPost.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    // Tandai body sebagai landing page biar CSS full-screen aktif
    document.body.classList.add("is-home");
    
    if (window.AOS) {
      AOS.init({ duration: 700, easing: "ease-out", once: true, offset: 40 });
    }
  });
</script>
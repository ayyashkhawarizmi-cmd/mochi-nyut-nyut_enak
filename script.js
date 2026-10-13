/* =====================================================
   MOCHI NYUT-NYUT - script.js
   Daftar isi:
   1. KONFIGURASI (edit bagian ini)
   2. Fungsi WhatsApp
   3. Ilustrasi mochi (SVG)
   4. Render menu & Mochi Picker
   5. Navbar, scroll, dan tombol melayang
   6. Animasi (reveal, steps, hati, sparkle, ripple)
   7. Inisialisasi
   ===================================================== */

"use strict";

/* ---------- 1. KONFIGURASI ---------- */

// Nomor WhatsApp: pakai format internasional tanpa "+" atau "0" di depan.
// Contoh: 0812-3456-7890 menjadi "6281234567890"
const WHATSAPP_NUMBER = "6285526291321";

const INSTAGRAM_USERNAME = "username_instagram"; // tanpa @

// Lokasi penjualan (teks yang tampil di website)
const LOCATION_NAME = "Area Sekolah / Sekitar Lingkungan Sekolah";

// Isi dengan alamat atau nama tempat agar peta Google Maps tampil.
// Contoh: "SMK Negeri 1 Jakarta". Kosongkan untuk memakai placeholder.
const MAPS_QUERY = "Jl. Lkr. Utara No.8 (atau Jl. Raya Kaliabang No.8), Perwira, Kec. Bekasi Utara, Kota Bekasi, Jawa Barat 17124.";

// Jam operasional
const OPENING_DAYS = "Senin - Jumat";
const OPENING_TIME = "09.00 - 15.00";

// Daftar produk dan harga (harga dalam rupiah, angka saja)
const PRODUCTS = [
  {
    name: "Oreo",
    emoji: "🍪",
    key: "oreo",
    image: "oreo.png",
    price: 5000,
    tint: "#ffe1ec",
    desc: "Mochi lembut dengan isian cream oreo yang manis dan creamy.",
    pickerDesc: "Manis, creamy, dan lembut. Pas buat kamu yang suka rasa chill.",
  },
  {
    name: "Mangga",
    emoji: "🥭",
    key: "mangga",
    image: "mangga.png",
    price: 5000,
    tint: "#fff0cc",
    desc: "Mochi lembut dengan perpaduan cream dan rasa mangga yang manis dan fruity.",
    pickerDesc: "Manis dan fruity. Pas buat kamu yang suka rasa tropis.",
  },
  {
    name: "Cokelat",
    emoji: "🍫",
    key: "cokelat",
    image: "coklat.png",
    price: 5000,
    tint: "#f5e1d6",
    desc: "Mochi lembut dengan isian cream cokelat yang creamy dan legit.",
    pickerDesc: "Creamy dan legit. Pas buat kamu yang suka rasa klasik.",
  },
];

/* ---------- 2. Fungsi WhatsApp ---------- */

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function orderWhatsApp(productName) {
  const message = `Kak saya mau beli Mochi Nyut-Nyut rasa ${productName} dong 😊`;
  window.open(buildWhatsAppUrl(message), "_blank", "noopener");
}

function contactWhatsApp() {
  const message = "Kak saya mau beli mochi nyut-nyut nya dong 😊";
  window.open(buildWhatsAppUrl(message), "_blank", "noopener");
}

/* ---------- 3. Ilustrasi mochi (SVG) ---------- */

const MOCHI_COLORS = {
  strawberry: { top: "#d4c2c2", bottom: "#aaaaaa", cream: "#ffffff", accent: "#000000" },
  mangga: { top: "#ffe9a8", bottom: "#ffc65c", cream: "#fffbe9", accent: "#ff9f1c" },
  cokelat: { top: "#d9a48a", bottom: "#a8664a", cream: "#fff1e6", accent: "#6b4034" },
};

let mochiUid = 0;

/**
 * Membuat SVG mochi. Jika sudah ada gambar produk di assets, SVG ini hanya jadi cadangan.
 * @param {string} flavor  strawberry | mangga | cokelat
 * @param {boolean} smile  true = mulut tersenyum lebar
 */
function createMochiSvg(flavor, smile = false) {
  const c = MOCHI_COLORS[flavor] || MOCHI_COLORS.strawberry;
  const id = `mochi-grad-${mochiUid++}`;
  const mouth = smile
    ? `<path d="M88 126 Q100 144 112 126 Z" fill="#6b4034" stroke="#6b4034" stroke-width="3" stroke-linejoin="round"/>
       <path d="M94 133 Q100 139 106 133" fill="none" stroke="#ff8fb1" stroke-width="4" stroke-linecap="round"/>`
    : `<path d="M90 124 Q100 135 110 124" fill="none" stroke="#6b4034" stroke-width="3.5" stroke-linecap="round"/>`;

  return `
  <svg viewBox="0 0 200 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${c.top}"/>
        <stop offset="1" stop-color="${c.bottom}"/>
      </linearGradient>
    </defs>
    <path d="M24 122 C24 62 64 34 100 34 C136 34 176 62 176 122 C176 156 146 172 100 172 C54 172 24 156 24 122 Z" fill="url(#${id})"/>
    <path d="M62 46 C74 22 126 22 138 46 C128 58 72 58 62 46 Z" fill="${c.cream}"/>
    <circle cx="100" cy="28" r="12" fill="${c.cream}"/>
    <ellipse cx="68" cy="84" rx="16" ry="9" fill="#fff" opacity=".45" transform="rotate(-28 68 84)"/>
    <circle cx="76" cy="110" r="6" fill="#6b4034"/>
    <circle cx="124" cy="110" r="6" fill="#6b4034"/>
    <circle cx="78" cy="108" r="2" fill="#fff"/>
    <circle cx="126" cy="108" r="2" fill="#fff"/>
    <ellipse cx="58" cy="126" rx="11" ry="7" fill="#ff8fb1" opacity=".55"/>
    <ellipse cx="142" cy="126" rx="11" ry="7" fill="#ff8fb1" opacity=".55"/>
    ${mouth}
  </svg>`;
}

function renderMochiArt() {
  document.querySelectorAll("[data-mochi]").forEach((el) => {
    el.innerHTML = createMochiSvg(el.dataset.mochi, el.hasAttribute("data-smile"));
  });
}

/* ---------- 4. Render menu & Mochi Picker ---------- */

function formatRupiah(value) {
  return "Rp" + value.toLocaleString("id-ID");
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(
    (p, i) => `
    <article class="product sparkle-host reveal" style="--delay: ${i * 0.1}s; --tint: ${p.tint}">
      <div class="product__img">
        <div class="product__art" data-mochi="${p.key}" role="img" aria-label="Ilustrasi mochi ${p.name}"></div>
        <img class="product__photo" src="assets/${p.image}" alt="Mochi Nyut-Nyut rasa ${p.name}" loading="lazy" data-fallback />
      </div>
      <h3 class="product__name">${p.emoji} ${p.name}</h3>
      <p class="product__desc">${p.desc}</p>
      <p class="product__price">${formatRupiah(p.price)} <small>/ pcs</small></p>
      <button type="button" class="btn btn--primary" data-order="${p.name}">🍡 Pesan Mochi Ini</button>
    </article>`
  ).join("");

  renderMochiArt();
}

function initPicker() {
  const options = document.querySelectorAll(".picker__option");
  const result = document.getElementById("pickerResult");
  const art = document.getElementById("pickerArt");
  const message = document.getElementById("pickerMessage");
  const desc = document.getElementById("pickerDesc");
  const orderBtn = document.getElementById("pickerOrder");
  if (!options.length || !result) return;

  let selected = null;

  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = PRODUCTS.find((p) => p.name === btn.dataset.pick);
      if (!product) return;
      selected = product;

      options.forEach((o) => o.classList.toggle("is-selected", o === btn));
      art.innerHTML = createMochiSvg(product.key, true);
      message.textContent = `Kamu cocoknya sama Mochi ${product.name}! ${product.emoji}💗`;
      desc.textContent = product.pickerDesc;

      // Restart animasi muncul
      result.hidden = false;
      result.style.animation = "none";
      void result.offsetWidth;
      result.style.animation = "";
    });
  });

  orderBtn.addEventListener("click", () => {
    if (selected) orderWhatsApp(selected.name);
  });
}

/* ---------- 5. Navbar, scroll, tombol melayang ---------- */

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const nav = document.getElementById("nav");
  const burger = document.getElementById("hamburger");
  const toTop = document.getElementById("toTop");

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  };

  burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) setMenu(false);
  });

  const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 24);
    toTop.classList.toggle("is-visible", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Tandai menu aktif sesuai section yang sedang dilihat
  const links = [...document.querySelectorAll(".nav__link")];
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) =>
          l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

/* ---------- 6. Animasi ---------- */

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add("is-visible");
          // Setelah animasi muncul selesai, hover kartu kembali cepat (tanpa delay)
          setTimeout(() => el.classList.add("is-revealed"), 1200);
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => io.observe(el));
}

// Nomor langkah 1 -> 2 -> 3 -> 4 menyala bergantian
function initSteps() {
  const list = document.getElementById("stepsList");
  if (!list) return;
  const steps = [...list.querySelectorAll(".step")];
  let current = 0;
  let timer = null;

  const tick = () => {
    steps.forEach((s, i) => s.classList.toggle("is-active", i === current));
    current = (current + 1) % steps.length;
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !timer) {
        tick();
        timer = setInterval(tick, 1500);
      } else if (!entry.isIntersecting && timer) {
        clearInterval(timer);
        timer = null;
      }
    });
  });
  io.observe(list);
}

// Partikel hati kecil di hero
function initHearts() {
  const layer = document.getElementById("heartsLayer");
  if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const symbols = ["💗", "💕", "🤍", "✨"];
  const spawn = () => {
    if (document.hidden) return;
    const el = document.createElement("span");
    el.className = "heart-particle";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${12 + Math.random() * 14}px`;
    el.style.setProperty("--drift", `${Math.random() * 80 - 40}px`);
    el.style.animationDuration = `${6 + Math.random() * 5}s`;
    layer.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  };
  setInterval(spawn, 900);
}

// Mochi hero: bounce saat kursor masuk atau saat diklik/ditekan Enter
function initHeroMochi() {
  const mochi = document.getElementById("heroMochi");
  if (!mochi) return;

  const bounce = () => {
    mochi.classList.remove("is-bouncing");
    void mochi.offsetWidth;
    mochi.classList.add("is-bouncing");
  };
  mochi.addEventListener("mouseenter", bounce);
  mochi.addEventListener("click", bounce);
  mochi.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); bounce(); }
  });
  mochi.addEventListener("animationend", (e) => {
    if (e.target === mochi) mochi.classList.remove("is-bouncing");
  });
}

// Sparkle kecil saat kursor masuk ke kartu produk/tim
function initSparkles() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const symbols = ["✨", "💗", "⭐"];

  document.addEventListener("mouseover", (e) => {
    const host = e.target.closest(".sparkle-host");
    if (!host || host.contains(e.relatedTarget)) return;

    const rect = host.getBoundingClientRect();
    const originX = e.clientX - rect.left;
    const originY = e.clientY - rect.top;

    for (let i = 0; i < 6; i++) {
      const s = document.createElement("span");
      s.className = "sparkle-burst";
      s.textContent = symbols[i % symbols.length];
      s.style.left = `${originX}px`;
      s.style.top = `${originY}px`;
      s.style.setProperty("--dx", `${Math.random() * 90 - 45}px`);
      s.style.setProperty("--dy", `${-20 - Math.random() * 60}px`);
      host.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    }
  });
}

// Efek ripple pada semua tombol .btn
function initRipple() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const r = document.createElement("span");
    r.className = "ripple";
    r.style.width = r.style.height = `${size}px`;
    r.style.left = `${e.clientX - rect.left - size / 2}px`;
    r.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(r);
    r.addEventListener("animationend", () => r.remove());
  });
}

/* ---------- 7. Inisialisasi ---------- */

// Gambar yang belum tersedia (logo, foto tim, foto produk) disembunyikan,
// sehingga placeholder di belakangnya yang terlihat.
function initImageFallbacks() {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    const hide = () => { img.style.display = "none"; };
    img.addEventListener("error", hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });

  // Kalau logo.png tersedia, ikon mochi kecil di navbar disembunyikan
  const logo = document.querySelector(".brand__logo");
  const icon = document.querySelector(".brand__icon");
  if (logo && icon) {
    const swap = () => { icon.style.display = "none"; };
    logo.addEventListener("load", swap);
    if (logo.complete && logo.naturalWidth > 0) swap();
  }
}

// Semua tombol WhatsApp memakai fungsi yang sama
function initWhatsAppButtons() {
  document.addEventListener("click", (e) => {
    const order = e.target.closest("[data-order]");
    if (order) { orderWhatsApp(order.dataset.order); return; }

    const contact = e.target.closest("[data-contact]");
    if (contact) { contactWhatsApp(); return; }

    const link = e.target.closest("[data-contact-link]");
    if (link) { e.preventDefault(); contactWhatsApp(); }
  });
}

// Mengisi teks lokasi, kontak, jam, Instagram, dan peta dari konfigurasi
function initContent() {
  const hasNumber = !WHATSAPP_NUMBER.includes("X");
  const values = {
    location: LOCATION_NAME,
    hoursDays: OPENING_DAYS,
    hoursTime: OPENING_TIME,
    whatsapp: hasNumber ? `+${WHATSAPP_NUMBER}` : "+62 XXX-XXXX-XXXX",
    instagram: `@${INSTAGRAM_USERNAME}`,
  };

  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.dataset.bind;
    if (key === "instagramLink") {
      el.href = `https://instagram.com/${INSTAGRAM_USERNAME}`;
    } else if (key in values) {
      el.textContent = values[key];
    }
  });

  // Peta
  const mapBox = document.getElementById("mapBox");
  const placeholder = document.getElementById("mapPlaceholder");
  if (mapBox && MAPS_QUERY.trim()) {
    const iframe = document.createElement("iframe");
    iframe.title = `Peta lokasi ${LOCATION_NAME}`;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.src = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`;
    placeholder.replaceWith(iframe);
  }

  const mapsBtn = document.getElementById("openMaps");
  if (mapsBtn) {
    mapsBtn.addEventListener("click", () => {
      const query = MAPS_QUERY.trim() || LOCATION_NAME;
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      window.open(url, "_blank", "noopener");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderMochiArt();
  renderProducts();
  initContent();
  initImageFallbacks();
  initWhatsAppButtons();
  initNavbar();
  initPicker();
  initHeroMochi();
  initHearts();
  initSparkles();
  initRipple();
  initSteps();
  initReveal();
});

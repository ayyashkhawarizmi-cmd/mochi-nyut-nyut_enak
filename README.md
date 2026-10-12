# 🍡 Mochi Nyut-Nyut

Website brand untuk tugas Kewirausahaan.
*Kenyalnya nyut-nyut, manisnya bikin larut.*

Dibuat dengan HTML, CSS, dan JavaScript biasa (tanpa library, tanpa instalasi).

## Struktur folder

```
mochi-nyut-nyut/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── logo.png          (opsional, logo kamu)
    ├── anggota1.jpg
    ├── anggota2.jpg
    ├── anggota3.jpg
    ├── anggota4.jpg
    ├── anggota5.jpg
    ├── strawberry.png    (opsional, foto produk)
    ├── mangga.png        (opsional, foto produk)
    └── cokelat.png       (opsional, foto produk)
```

File di `assets/` yang belum ada tidak membuat error. Website otomatis menampilkan ilustrasi mochi dan placeholder sebagai gantinya.

## Cara menjalankan

1. Buka folder `mochi-nyut-nyut`.
2. Klik dua kali `index.html` (terbuka di browser), atau di VS Code klik kanan `index.html` lalu **Open with Live Server**.
3. Butuh internet untuk memuat font (Fredoka dan Nunito) dan Google Maps. Tanpa internet website tetap jalan dengan font bawaan.

Untuk menampilkan secara online, upload satu folder ini ke GitHub Pages, Netlify, atau Vercel.

## Cara memasukkan foto anggota

1. Siapkan 5 foto (disarankan persegi atau agak tegak, ukuran sekitar 600×660 px).
2. Ganti nama file menjadi `anggota1.jpg` sampai `anggota5.jpg`.
3. Taruh di folder `assets/`. Selesai, tidak perlu mengubah kode.

Kalau fotomu berformat `.png`, ganti ekstensi di `index.html` (cari `assets/anggota1.jpg`, dan seterusnya).

Untuk mengganti nama, posisi, dan deskripsi anggota, cari `[NAMA ANGGOTA 1]` di `index.html` (bagian `<!-- 7. TEAM -->`) lalu edit teksnya.

## Cara mengganti nomor WhatsApp

Buka `script.js`, edit baris paling atas:

```js
const WHATSAPP_NUMBER = "62XXXXXXXXXX";
```

Format: kode negara tanpa `+` dan tanpa `0` di depan. Contoh nomor `0812-3456-7890` menjadi `"6281234567890"`.
Nomor ini hanya ditulis di satu tempat, dan semua tombol WhatsApp memakainya.

Instagram juga di bagian yang sama:

```js
const INSTAGRAM_USERNAME = "username_instagram"; // tanpa @
```

## Cara mengganti lokasi dan jam buka

Di `script.js`, bagian konfigurasi:

```js
const LOCATION_NAME = "Area Sekolah / Sekitar Lingkungan Sekolah";
const MAPS_QUERY = "";            // isi alamat/nama tempat agar peta Google Maps muncul
const OPENING_DAYS = "Senin - Jumat";
const OPENING_TIME = "09.00 - 15.00";
```

Contoh: `MAPS_QUERY = "SMK Negeri 1 Contoh, Jakarta"`. Kalau dikosongkan, yang tampil adalah placeholder peta, dan tombol "Buka Google Maps" mencari berdasarkan `LOCATION_NAME`.

## Cara mengganti harga, rasa, dan deskripsi

Di `script.js`, edit daftar `PRODUCTS`:

```js
{ name: "Strawberry", emoji: "🍓", key: "strawberry", price: 5000, ... }
```

Ubah angka `price` (tanpa titik). Tampilan menu dan format "Rp5.000" otomatis ikut berubah.
Pesan WhatsApp otomatis memakai `name`, jadi rasa baru cukup ditambahkan sebagai satu blok baru di daftar ini.

## Cara mengganti warna

Di bagian atas `style.css` ada variabel warna:

```css
--pink: #ff8fb1;
--light-pink: #ffe1ec;
--cream: #fff8ef;
--brown: #6b4034;
--white: #ffffff;
```

## Memakai logo dan foto produk sendiri

- **Logo**: simpan sebagai `assets/logo.png`. Logo akan muncul di navbar di samping tulisan brand.
- **Foto produk**: simpan sebagai `assets/strawberry.png`, `assets/mangga.png`, `assets/cokelat.png`. Foto akan menutupi ilustrasi bawaan di kartu menu.
"# mochi-nyut-nyut" 

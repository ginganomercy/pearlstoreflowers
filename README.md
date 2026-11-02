# Pearl Store Flowers — Luxury Floral & Hand Bouquet Atelier

Aplikasi web multi-page (*Multi-Page Application / MPA*) resmi berstandar *haute floristerie* untuk **Pearl Store Flowers** ([@pearl.storeflowers](https://www.instagram.com/pearl.storeflowers)), dibangun menggunakan arsitektur mutakhir **Astro + Svelte 5 (Runes) + Tailwind CSS + Zod + MiniSearch** yang ditenagai oleh runtime **Bun** dan dioptimalkan untuk hosting di edge CDN Cloudflare Pages.

---

## 🏛️ Arsitektur Mutakhir (Cutting-Edge Stack)

| Lapisan | Teknologi | Peran & Keunggulan Arsitektur |
|---|---|---|
| **SSG Multi-Page** | **Astro 4/5** | Menghasilkan HTML statis murni (*Zero-JS baseline*), sub-milidetik TTFB, dan pre-rendered pages untuk ke-38 buket. |
| **Reactive Islands** | **Svelte 5** | Interaktivitas terisolasi (*Runes reactivity*) untuk pencarian instan, filter kategori, dan modal tinjau cepat (<8KB client bundle). |
| **Search Engine** | **MiniSearch** | Mesin pencari *inverted index* lokal dengan fitur *fuzzy search* & toleransi saltik (*typo tolerance*) sub-2 milidetik. |
| **Data Integrity Guard** | **Zod** | Validasi skema ketat saat build time, mencegah data produk cacat atau SKU duplikat rilis ke produksi. |
| **Mobile & PWA** | **Web App Manifest** | PWA-ready dengan tema botanical `#183324`, mendukung opsi *Add to Home Screen*. |
| **Runtime & Toolchain** | **Bun 1.1+** | Native execution untuk dependency resolution, bundler, dan test runner otomatis sub-detik. |
| **Edge CDN** | **Cloudflare Pages** | Kompatibel penuh dengan output direktori `dist/` tanpa resiko MIME type `application/octet-stream`. |

---

## 📱 WhatsApp & Social Commerce Integration

Setiap buket dari 38 koleksi memiliki URL permanen tersendiri:
```text
https://shelwa-craft.pages.dev/koleksi/[slug]
```
Setiap halaman dilengkapi dengan tag OpenGraph lengkap (`og:image`, `og:title`, `og:description`) serta Schema.org JSON-LD (`Florist` dan `Product`). Saat tautan buket dibagikan ke WhatsApp, WhatsApp secara otomatis memunculkan kartu preview visual beresolusi tinggi dengan foto buket asli, nama, dan harga produk.

---

## 🌿 Identitas Visual (Botanical Luxury & Haute Floristerie)

- **Deep Botanical Forest (`#183324` / `#142A1D`)**: Identitas kemewahan alami pada tombol pemesanan WhatsApp, header showcase, dan panduan order.
- **Fresh Sage Mint (`#EBF4EB` & `#CCE2CC`)**: Lencana kategori dan chip komposisi bunga asli.
- **Darkest Forest Atelier (`#0E1E15`)**: Pengumuman rilis *top bar* dan footer resmi.
- **Warm Ivory Pearl (`#FAF9F5`)**: Latar belakang elegan berpadu dengan kartu putih bersih.

---

## 📦 Katalog Produk (38 Koleksi Terkurasi)

1. **Wedding & Bridal Collection** (10 Produk: `PSF-WED-01` s/d `PSF-WED-10`): Mawar putih Holland, peach garden, rustic dried, crimson rose cascade, minimalist calla lily, orchid spray, dsb.
2. **Engagement & Proposal Collection** (8 Produk: `PSF-ENG-01` s/d `PSF-ENG-08`): Romantic pastel, sage green & ivory, champagne gold, baby's breath cloud, dusty blue hydrangea, dsb.
3. **Graduation & Celebration** (12 Produk: `PSF-GRAD-01` s/d `PSF-GRAD-12`): Mawar satin abadi, bunga kawat bulu (*pipe cleaner*), boneka wisuda, bunga matahari, butterfly LED, dsb.
4. **Bunga Abadi & Kustom** (8 Produk: `PSF-CUST-01` s/d `PSF-CUST-08`): Buket uang tarik, balon akrilik transparan, bloom box bunga meja, pigura kaca 3D shadow box, dsb.

---

## 🛠️ Perintah Pengujian & Pembangunan

```bash
cd "shelwa-craft-web"

# Instalasi dependency
bun install

# Menjalankan unit test otomatis (14 pengujian lulus dalam <300ms)
bun test

# Membangun rilis produksi (39 halaman statis di dist/)
bun run build

# Menjalankan server lokal pratinjau
bun run preview
```

---

## ⚖️ Lisensi & Hak Cipta

© 2026 Pearl Store Flowers. Dikembangkan oleh **Rafly Ashraffi Rachmat**. Seluruh hak cipta dilindungi undang-undang.

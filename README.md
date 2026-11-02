# Shelwa Craft — Luxury Floral & Hand Bouquet Atelier

Aplikasi web mobile-first resmi untuk etalase katalog buket bunga **Shelwa Craft** (`@shelwa_craft`), dirancang dengan standar butik haute floristerie (*Botanical Luxury Green*), dioptimalkan khusus untuk akses cepat melalui tautan bio Instagram dengan integrasi langsung ke pemesanan WhatsApp.

---

## 🚀 Arsitektur Produksi & Optimasi (Hardened Edge SPA)

- **Fault Tolerance (Error Boundary)**: Membungkus seluruh aplikasi dengan `ErrorBoundary` kelas enterprise untuk mencegah layar putih kosong saat terjadi kendala rendering, dilengkapi dengan tombol reload dan pemesanan WhatsApp darurat.
- **Adaptive Image Optimizer (WebP Pipeline)**: Mengompresi URL gambar secara dinamis ke format WebP (`w=600&q=75&fm=webp`) yang menghemat kuota pengunjung hingga ~65%, dilengkapi prioritas muat `fetchpriority="high"` untuk produk *above-the-fold*.
- **Debounced Search Engine (150ms)**: Menstabilkan kalkulasi filter saat pengunjung mengetik cepat di keyboard ponsel, menjaga frame rate tetap halus (60 FPS).
- **SEO & Social Commerce (JSON-LD)**: Menginjeksikan structured data schema.org jenis `Florist`, `LocalBusiness`, dan `ItemList` berstandar Google Search agar etalase memiliki *Rich Snippets*.
- **Vendor Chunk Splitting**: Memisahkan bundle produksi Vite (`vendor-react`, `vendor-icons`, dan app logic) untuk memaksimalkan *Long-Term Browser Caching*.
- **Aksesibilitas (WCAG AA)**: Modal produk dilengkapi `role="dialog"`, `aria-modal="true"`, dan *focus trap* otomatis.

---

## 🌿 Identitas Visual (Botanical Luxury & Haute Floristerie)

- **Deep Botanical Forest (`#183324` / `#142A1D`)**: Digunakan secara megah pada Hero Showcase Banner, Seksi Alur Pemesanan 4 Langkah, dan Tombol Pemesanan WhatsApp.
- **Fresh Sage Mint (`#EBF4EB` & `#CCE2CC`)**: Menghiasi tab filter kategori, chip komposisi bunga asli, dan lencana portofolio resmi.
- **Dark Forest Atelier (`#0E1E15`)**: Memberikan fondasi wibawa pada Top Announcement Bar dan Footer resmi.
- **Fotografi Asli Beresolusi Tinggi**: 38 produk buket bunga terkurasi dipetakan dengan foto rangkaian asli (rasio portrait *4:5*) dengan efek interaktif *hover zoom*.

---

## 📦 Katalog Produk Terkurasi (38 Produk Lengkap)

1. **Wedding & Bridal Collection** (10 Produk): Mawar putih Holland, peach Juliet, rustic dried, red velvet, cascading orchid, champagne roses.
2. **Engagement & Proposal Collection** (8 Produk): Dusty rose, sweet apricot, lavender eustoma, baby's breath cloud, cappuccino roses.
3. **Graduation & Celebration** (12 Produk): Sunflower cerah, blue hydrangea, pastel gerberas, statice everlasting.
4. **Custom & Everlasting Gift** (8 Produk): Bloom box luxury, dome bunga abadi, money bouquet styling, frame dried flower.

---

## 🛠️ Panduan Menjalankan

```bash
cd "c:\Users\RAFLY A.R\Downloads\shelwa_craft\shelwa-craft-web"
bun install
bun run dev     # Menjalankan server dev di http://localhost:3000
bun test        # Menjalankan 18 unit test otomatis
bun run build   # Membangun versi rilis siap deploy di folder dist/
```

---

## ⚖️ Lisensi & Hak Cipta

© 2026 Shelwa Craft. Dikembangkan oleh **Rafly Ashraffi Rachmat**. Seluruh hak cipta dilindungi undang-undang.

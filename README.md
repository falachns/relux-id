<div align="center">

# RelUX Design System
### Rel Enterprise User Experience — PT Kereta Api Indonesia (Persero)

[![Production Live](https://img.shields.io/badge/Production-relux--kai.vercel.app-083e7b?style=for-the-badge&logo=vercel)](https://relux-kai.vercel.app)
[![Make Kit KAI Tokens](https://img.shields.io/badge/Tokens-597%20W3C%20Tokens-ee6c15?style=for-the-badge)](https://relux-kai.vercel.app/#/tokens)
[![Multi-Framework Parity](https://img.shields.io/badge/Framework%20Parity-14%2F14%20Aligned-10b981?style=for-the-badge)](https://relux-kai.vercel.app/#/components)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-0d1b3e?style=for-the-badge)](https://relux-kai.vercel.app)

<p align="center">
  Platform sistem desain resmi PT Kereta Api Indonesia (Persero) yang menjembatani variabel desain Figma Make Kit KAI dengan implementasi kode produksi multi-framework secara deterministik dan terstandarisasi.
</p>

[Dokumentasi Interaktif](https://relux-kai.vercel.app) · [Katalog Komponen](https://relux-kai.vercel.app/#/components) · [Token & Variabel](https://relux-kai.vercel.app/#/tokens) · [Portal Manajemen](https://relux-kai.vercel.app/#/manage) · [AI Context (llms.txt)](https://relux-kai.vercel.app/llms.txt)

</div>

---

## 📖 Tentang RelUX

**RelUX (Rel Enterprise User Experience)** adalah fondasi antarmuka digital terpadu untuk seluruh produk digital internal dan publik di lingkungan **PT Kereta Api Indonesia (Persero)**. Dibangun di atas token sistem **Make Kit KAI v1**, RelUX mengeliminasi friksi antara tim desain produk (Figma) dan tim perekayasa perangkat lunak dengan menyediakan pustaka komponen siap pakai yang memiliki paritas visual dan fungsional identik di 3 tumpukan teknologi utama KAI: **Laravel Blade**, **React**, dan **Angular**.

### Nilai Utama & Standar KAI
- **Keamanan & Kontras Tinggi (WCAG 2.1 AA)**: Seluruh rasio kontras teks, form control, dan penanda status tervalidasi memenuhi rasio minimum 4.5:1 untuk menjamin inklusivitas penumpang dan staf operasional.
- **Single Source of Truth Tokens**: 597 token atomik dan semantik (warna korporat *Deep Navy* `#083e7b` dan *Energy Orange* `#ee6c15`, tipografi, spacing, radius, elevasi).
- **Paritas Multi-Framework Deterministik**: Standar markup HTML, class utilitas, dan perilaku interaksi diuji otomatis melalui script paritas CI.
- **AI-Assisted Engineering**: Menyediakan metadata arsitektur terstruktur (`/llms.txt` dan `/llms-full.txt`) agar Cursor, Copilot, dan model AI internal dapat menghasilkan kode komponen KAI secara presisi.

---

## 🏛️ Arsitektur Pustaka Komponen

RelUX mengimplementasikan paritas 100% pada **14 komponen kanonikal** utama yang dapat diekspor langsung ke proyek target:

| Kategori | Komponen Tersedia | Dukungan Framework |
|:---|:---|:---:|
| **Action & Controls** | Button, Toggle, Checkbox | Blade · React · Angular |
| **Form Inputs** | Text Input, Select, Date Picker, File Upload | Blade · React · Angular |
| **Feedback & Status** | Alert, Badge, Tag, Tooltip, Empty State | Blade · React · Angular |
| **Navigation & Data** | Stepper, Avatar, Accordion, Data Table, Tabs | Blade · React · Angular |

### Contoh Halaman Riil Terintegrasi (Enterprise Examples)
Dokumentasi memuat 5 studi kasus implementasi nyata antarmuka digital KAI:
1. **Dashboard Operasi KAI (`#/example-dashboard`)**: Pemantauan jadwal perjalanan KA, keterlambatan, dan performa armada real-time.
2. **Landing Page Pemesanan Tiket (`#/example-landing`)**: Widget pencarian rute, pemilihan kelas kereta, dan ringkasan tarif penumpang.
3. **Google Authenticator & 2FA (`#/example-google-auth`)**: Alur peningkatan keamanan multi-faktor untuk akun pegawai KAI.
4. **Portal Masuk & SSO KAI (`#/example-login`)**: Antarmuka autentikasi korporat terpusat.
5. **Pengaturan & Preferensi (`#/example-settings`)**: Manajemen profil, notifikasi, dan hak akses kerja.

---

## 🛠️ Tata Kelola Komponen (`/manage`)

Sesuai arahan PRD, RelUX dilengkapi portal tata kelola mandiri untuk memfasilitasi kolaborasi lintas unit kerja:
- **Change Requests (CR)**: Pengajuan kebutuhan komponen baru atau revisi varian dari tim produk.
- **Workflow Persetujuan**: Tahapan *Draft*, *Pending Review*, hingga *Approved* dengan visual diff viewer.
- **Role Simulation**: Pembagian akses berbasis peran (*Viewer*, *Editor*, dan *Maintainer/Admin*).
- **Audit Trail**: Pencatatan riwayat perubahan token dan komponen secara transparan.

---

## 💻 Panduan Pengembangan Lokal

### Prasyarat
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Instalasi & Menjalankan Aplikasi

```bash
# Clone repositori
git clone https://github.com/falachns/relux-id.git

# Masuk ke direktori
cd relux-id

# Pasang dependensi
pnpm install

# Jalankan server pengembangan lokal
pnpm dev
```

Aplikasi dokumentasi aktif di `http://localhost:5173`.

### Pengujian Otomatis & Paritas Token

```bash
# Menjalankan build lengkap dan audit paritas token multi-framework
pnpm build && pnpm audit:all
```

Suite audit mencakup:
- `tokens:check`: Verifikasi 597 token Make Kit KAI dan CSS variables.
- `snippets:check`: Validasi ketersediaan cuplikan kode pada 12 grup komponen.
- `parity:check`: Pengujian kesetaraan atribut dan penamaan 14 komponen (Blade, React, Angular).
- `typecheck`: Kompilasi TypeScript bebas galat (`tsc --noEmit`).

---

## 📁 Struktur Direktori Repositori

```plaintext
relux-id/
├── public/                 # Favicon, robots.txt, sitemap.xml, llms.txt, tokens W3C
├── registry/               # Definisi template & code snippets multi-framework
├── src/
│   ├── components/
│   │   ├── docs/           # Layout, Header, Sidebar, TOC (Ina Digital style)
│   │   ├── brand/          # Aset logo vektor resmi KAI & sub-brand
│   │   └── ui/             # Implementasi referensi komponen Make Kit KAI
│   ├── pages/              # Halaman dokumentasi, contoh nyata, & manajemen
│   └── styles/             # Token adapter CSS & Tailwind configuration
├── vendor/                 # Figma Make Kit KAI v1 token styles
└── scripts/                # Script audit CI paritas & generator katalog token
```

---

## 🔒 Keamanan & Infrastruktur Produksi

- **Domain Utama**: [https://relux-kai.vercel.app](https://relux-kai.vercel.app)
- **Domain Cadangan**: [https://relux-id.vercel.app](https://relux-id.vercel.app)
- **Header Keamanan**: Dikonfigurasi dengan `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, dan `Strict-Transport-Security`.
- **SEO & Discovery**: Dilengkapi dynamic metadata title per rute, Open Graph card, dan sitemap 30 halaman kanonikal.

---

## ⚖️ Hak Cipta & Kepemilikan

© 2026 PT Kereta Api Indonesia (Persero). Seluruh hak cipta dilindungi undang-undang. Dokumentasi dan komponen ini ditujukan sebagai standar rekayasa perangkat lunak di ekosistem digital KAI.

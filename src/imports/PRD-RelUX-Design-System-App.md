# PRD: RelUX Design System Application
**Dokumen kebutuhan produk untuk aplikasi web internal design system KAI**

| | |
|---|---|
| **Nama Produk** | RelUX Design System App |
| **Domain** | relux.kai.id / design.kai.id |
| **Owner** | UI/UX Lead — IT Application Development, PT KAI |
| **Target Pengguna** | Tim UI/UX Designer & Tim Developer internal KAI |
| **Status** | Draft |

---

## 1. Latar Belakang & Masalah

Tim desain sudah mengimplementasikan design system (RelUX, berbasis UntitledUI Kit) di Figma. Namun hasil aplikasi yang dibangun developer sering **tidak 1:1** dengan desain, karena:

1. Developer berbeda-beda menerjemahkan desain Figma secara manual (interpretasi ulang, bukan kode siap pakai)
2. Struktur/skeleton komponen tidak konsisten antar developer dan antar project
3. Belum ada **codebase design system** milik tim desain sendiri yang bisa langsung dipakai developer
4. Tidak ada dokumentasi aturan pakai (usage guideline) yang terpusat

Akibatnya muncul *design debt* / slop: UI hasil akhir menyimpang dari desain resmi, dan sulit di-maintain karena tiap project punya versi komponennya sendiri-sendiri.

## 2. Tujuan Produk

- Menyediakan **single source of truth** untuk seluruh komponen design system RelUX, dalam bentuk kode siap pakai (bukan sekadar referensi visual)
- Menjembatani gap antara Figma (desain) dan implementasi aplikasi (kode)
- Menstandarkan struktur komponen di seluruh project KAI yang berbasis PHP/Laravel
- Memudahkan developer mengadopsi design system tanpa perlu menerjemahkan ulang dari Figma

## 3. Target Pengguna

| Persona | Kebutuhan Utama |
|---|---|
| **UI/UX Designer** | Referensi komponen resmi, penamaan token yang konsisten dengan Figma |
| **Developer (Backend/Frontend)** | Kode komponen siap pakai (CSS + Blade), dokumentasi cara implementasi |
| **Tech Lead / System Analyst** | Standar teknis untuk audit kepatuhan project terhadap design system |
| **Product Owner / Manajer Tim** | Alat governance untuk memastikan semua project baru pakai base yang sama |

## 4. Lingkup (Scope)

### 4.1 Termasuk dalam scope
- Web app responsive, dapat diakses internal (relux.kai.id)
- Dokumentasi komponen (visual preview + kode)
- Dokumentasi design token (warna, tipografi, spacing, radius, shadow)
- Usage guideline per komponen (design.md)
- Search & filter komponen
- Versioning/changelog komponen

### 4.2 Di luar scope (fase awal)
- Auto-sync otomatis dua arah antara Figma dan kode (fase lanjutan)
- Playground interaktif untuk custom theme per project (fase lanjutan)
- Manajemen akses granular per role (bisa pakai auth sederhana dulu)

> Catatan: dokumen/file `.md` berisi konten aktual design system (daftar komponen, token, dsb) disiapkan terpisah oleh tim desain, dan akan menjadi **sumber konten** yang di-render oleh aplikasi ini.

## 5. Fitur & Functional Requirements

### 5.1 Component Library
- Menampilkan daftar seluruh komponen (Button, Input, Card, Modal, dll) per kategori
- Live preview komponen (render langsung, bukan screenshot statis)
- Menampilkan varian: state (default/hover/focus/disabled), ukuran (size), tipe (variant/style)
- Tombol "copy code" untuk setiap snippet

### 5.2 Code Snippet
- Setiap komponen menyediakan:
  - Kode CSS (atau class yang dipakai)
  - Kode template Laravel Blade (`<x-component />` atau partial view)
- Snippet harus valid dan langsung bisa dipakai tanpa modifikasi struktur

### 5.3 Design Tokens
- Warna, tipografi, spacing, border-radius, shadow ditampilkan sebagai tabel referensi
- Tersedia dalam bentuk CSS custom properties (`--color-primary`, dst) yang bisa di-import
- Penamaan token harus sinkron dengan penamaan token di Figma

### 5.4 Usage Guidelines (design.md)
- Tiap komponen punya halaman guideline: kapan dipakai, kapan tidak, contoh benar/salah
- Catatan aksesibilitas dasar (kontras warna, ukuran target klik, dsb)

### 5.5 Changelog & Versioning
- Riwayat perubahan per komponen (tanggal, jenis perubahan, versi)
- Label status komponen: `stable`, `beta`, `deprecated`

### 5.6 Search & Navigation
- Pencarian komponen berdasarkan nama/kategori
- Navigasi sidebar per kategori komponen

## 6. Non-Functional Requirements

- **Responsive**: dapat diakses dari desktop maupun tablet/mobile (untuk keperluan review cepat)
- **Performa**: waktu render halaman komponen cepat, snippet code load tanpa delay signifikan
- **Konsistensi**: struktur URL dan penamaan komponen konsisten (`/components/button`, `/components/input`, dst)
- **Maintainability**: penambahan komponen baru tidak memerlukan perubahan besar pada struktur aplikasi (berbasis file/data komponen, bukan hardcode)
- **Aksesibilitas**: aplikasi sendiri harus mengikuti standar dasar aksesibilitas web

## 7. Kebutuhan Teknis (untuk implementasi via AI coding assistant — Claude Code / Kiro)

- **Stack**: PHP/Laravel + Blade Components, CSS (custom/Tailwind menyesuaikan token KAI)
- **Struktur data per komponen**:
  - `name`, `category`, `description`
  - `variants[]` (props/state yang tersedia)
  - `preview` (render langsung dari Blade component)
  - `code_snippet` (CSS + Blade)
  - `usage_md` (isi guideline, sumber dari file markdown terpisah)
  - `status` (stable/beta/deprecated), `version`, `last_updated`
- **Sumber konten komponen & token**: file markdown/JSON terpisah yang disiapkan tim desain (di luar scope pembangunan aplikasi ini) — aplikasi hanya perlu mem-parsing dan me-render-nya
- **Distribusi ke project lain**: perlu ditentukan mekanismenya — opsi:
  1. Composer package internal (`kai/relux-ui`)
  2. CDN internal untuk file CSS
  3. Starter kit/boilerplate project baru
- **Autentikasi**: akses internal saja (SSO KAI atau basic auth, sesuai kebijakan IT)

## 8. Roadmap Bertahap

| Fase | Cakupan |
|---|---|
| **Fase 1 (MVP)** | Component library dasar + code snippet + design tokens statis |
| **Fase 2** | Usage guidelines (design.md) + changelog/versioning |
| **Fase 3** | Mekanisme distribusi ke project (Composer package/starter kit) |
| **Fase 4** | Integrasi otomatis token dari Figma (API/export sync) |

## 9. Metrik Keberhasilan

- Jumlah project baru yang menggunakan relux.kai.id sebagai base
- Berkurangnya tiket/bug terkait inkonsistensi UI antar aplikasi KAI
- Waktu development UI berkurang karena developer tidak perlu membangun komponen dari nol
- Tingkat kepatuhan (compliance) project terhadap design system saat audit

## 10. Pertanyaan Terbuka (Open Questions)

- Apakah butuh sistem autentikasi/role-based access, atau cukup akses internal terbuka?
- Siapa yang bertanggung jawab meng-update komponen saat ada perubahan di Figma (workflow governance)?
- Apakah distribusi ke project lain memakai Composer package sejak Fase 1, atau copy-paste manual dulu sebagai MVP?

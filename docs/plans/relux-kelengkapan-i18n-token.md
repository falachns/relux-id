# Rencana Audit & Penyempurnaan RelUX by KAI

## Tujuan

Menyelesaikan katalog RelUX yang **sudah ada saat ini**—bukan menambah area produk baru—agar:

1. seluruh shell, halaman dokumentasi, demo, label aksesibilitas, dan metadata yang terlihat dapat beralih penuh antara Bahasa Indonesia dan English;
2. styling authored app memakai token/utility dari `@make-kits/design-system-kai-v-1@0.0.2`, tanpa layer palet lokal yang menduplikasi atau mengarang token kit;
3. empat token light-theme yang rusak di package tetap ditangani dengan shim kompatibilitas sekecil mungkin;
4. seluruh 21 halaman yang sudah terdaftar tetap lengkap, responsif, keyboard-accessible, dan konsisten dengan pola dokumentasi INA Digital/Qiscus yang sudah diterapkan: header persisten, sidebar berkelompok, area konten terfokus, dan TOC kanan otomatis;
5. perubahan tetap mempertahankan arsitektur single-page berbasis state tanpa router.

## Keputusan yang Sudah Disepakati

- **Cakupan kelengkapan:** katalog RelUX yang saat ini ada di sidebar.
- **Cakupan English:** seluruh UI dan dokumentasi, bukan hanya navigasi/judul.
- **Token lokal:** gunakan **shim bug minimal** untuk `--card`, `--popover`, `--sidebar`, dan `--destructive`; hapus token lokal tambahan lain.
- **Design system:** package hanya menyediakan CSS variables, utility/classes, dan typography classes; package tidak menyediakan React component API yang dapat diimpor.
- **Tema:** light theme saja, mengikuti aplikasi saat ini.
- **Navigasi:** tetap tanpa router; tidak menambah URL per halaman pada pekerjaan ini.

## Temuan Audit yang Menentukan Implementasi

- Semua target katalog sudah mempunyai halaman:
  - Memulai: Pengenalan, Mulai menggunakan.
  - Merek: Logo.
  - Fondasi: Warna, Tipografi, Spacing & Grid, Radius & Shadow, Ikonografi, State.
  - Komponen: Button, Form Controls, Badges & Tags, Alert & Banner, Cards, Data Table, Navigation, Accordion, Modal & Dialog, Avatars, Progress, App UI Components.
- `src/lib/i18n.tsx` saat ini hanya menerjemahkan shell dan judul section. Tidak satu pun dari 21 file halaman memakai `useLang`, sehingga body copy, demo, tabel, snippet berisi copy, placeholder, dan ARIA label tetap Bahasa Indonesia ketika EN dipilih.
- `src/index.css` mendefinisikan palet KAI, sub-brand, status dokumentasi, logo, dan code surface dengan raw hex di luar package.
- Package `0.0.2` memang mengirim `--card`, `--popover`, `--sidebar`, dan `--destructive` sebagai transparan pada light theme.
- Card konten mayoritas sudah memakai `rounded-lg`; radius lain dipakai untuk kontrol, pill, dialog, atau elemen kecil dan tidak perlu dipaksa menjadi `rounded-lg`.
- Landmark utama, skip link, TOC, tab keyboard, dan native dialog sudah tersedia, tetapi drawer mobile, language radiogroup, reduced motion, dan sebagian label demo masih perlu diperketat.

## Arsitektur i18n

### 1. Perluas kontrak i18n inti

Ubah `src/lib/i18n.tsx` menjadi sumber bersama untuk:

- tipe `Lang = 'id' | 'en'`;
- tipe generik `Localized<T> = Record<Lang, T>`;
- helper `useLocalized(copy)` yang mengembalikan cabang copy sesuai bahasa aktif;
- copy shell global seperti navigasi, pencarian, TOC, status, aksi umum, footer, dan pesan loading;
- validasi nilai `localStorage`: hanya `id` atau `en` yang diterima, selain itu fallback ke `id`;
- sinkronisasi `document.documentElement.lang`.

Jangan membuat kamus string global datar untuk seluruh isi 21 halaman. Setiap halaman mempunyai struktur copy typed lokal agar array demo/tabel dan kalimat JSX tetap mudah dirawat.

Pola per halaman:

```ts
type PageCopy = {
  title: string
  description: string
  sections: { ... }
  // arrays, labels, guidance, aria text, dan copy snippet yang relevan
}

const COPY = {
  id: { ... },
  en: { ... },
} satisfies Localized<PageCopy>
```

Di komponen halaman gunakan `const copy = useLocalized(COPY)`.

### 2. Anchor dan TOC harus stabil lintas bahasa

Ubah `src/components/docs/Section.tsx` agar menerima `id` eksplisit selain `title`.

- `id` memakai slug kanonis yang tidak berubah ketika bahasa diganti.
- `title` adalah string terlokalisasi yang tampil di heading dan otomatis dipindai TOC.
- Hapus ketergantungan pada `SECTION_EN` dan slug yang dihitung dari judul Bahasa Indonesia.
- Seluruh pemanggilan `<Section>` di 21 halaman diberi `id` tetap.

Dengan ini pergantian ID/EN tidak mengubah anchor, scroll target, atau state aktif TOC.

### 3. Aturan penerjemahan

Terjemahkan:

- page title, lead, semua paragraf/list/guideline/FAQ;
- header tabel dan deskripsi row;
- status dan metadata komponen yang bersifat copy;
- label, placeholder, empty state, hasil pencarian, tombol, banner, dialog, form demo;
- seluruh `aria-label`, `caption`, visually-hidden text, status announcement, dan alt/title yang bermakna;
- copy manusia dalam contoh kode, termasuk komentar dan label yang tampil di UI.

Pertahankan apa adanya:

- nama API, prop, class, CSS variable, package, command, path, dan identifier kode;
- nama produk/kereta/stasiun sebagai proper noun;
- sintaks kode dan nama framework.

## Implementasi Token dan Styling

### 1. Rapikan `src/index.css`

Pertahankan:

- import `@make-kits/design-system-kai-v-1/style.css` di paling atas;
- import Tailwind;
- mapping `@theme inline` yang diwajibkan setup package;
- mapping chart dan elevation yang memang berasal dari package;
- font Inter yang berasal dari CSS package;
- base behavior untuk body, focus/cursor, scrollbar, dan selection.

Hapus:

- `--kai-primary-*`, `--kai-secondary-*`, dan seluruh `--kai-{subbrand}-*`;
- `--relux-logo-*`;
- `--primary-soft`, `--accent-soft`;
- seluruh `--status-*`;
- `--code-bg` dan `--code-fg`;
- mapping Tailwind untuk token-token lokal tersebut.

Shim kompatibilitas light theme:

- `--card: var(--background)`;
- `--popover: var(--background)`;
- `--sidebar: var(--background)`;
- `--destructive` memakai nilai error resmi yang sudah digunakan oleh kit, sebagai satu-satunya fallback warna eksplisit dan diberi komentar yang menyebut bug package `0.0.2`.

### 2. Migrasi penggunaan token lokal

Lakukan penggantian semantik di seluruh `src/`:

- soft primary/accent → opacity dari token package, misalnya `bg-primary/10` atau `bg-accent/10`;
- code surface → `bg-foreground text-background`, dengan border/focus derived dari token package;
- stable/info/beta/deprecated → komposisi `primary`, `accent`, `muted`, dan `destructive`, selalu disertai label/ikon agar makna tidak bergantung pada warna;
- hover `--kai-primary-700` → state berbasis `accent` atau opacity token package;
- warna logo default → `var(--primary)` dan `var(--foreground)`;
- selection → `color-mix()` atau opacity yang bersumber dari `--primary`, tanpa token warna baru.

Perbarui `StatusBadge`, `TONE_SOFT`, dan `TONE_BORDER` terlebih dahulu agar halaman komponen mewarisi mapping baru secara konsisten.

### 3. Koreksi halaman Warna

`src/pages/ColorsPage.tsx` tidak boleh mendokumentasikan alias lokal seolah-olah token package.

- Tampilkan token CSS variable yang benar-benar diekspos package sebagai token interaktif.
- Palet atau nilai yang hanya tertanam sebagai style/utility kit boleh ditampilkan sebagai referensi kit, tetapi jangan dibuat ulang sebagai CSS variable lokal.
- Swatch visual harus memakai class/utility yang berasal dari stylesheet package atau token package yang tersedia.
- Nilai warna boleh tampil sebagai **data dokumentasi** jika memang menjelaskan nilai kit, tetapi tidak boleh dipakai sebagai authored styling.
- Hapus section “token status dokumentasi” yang bergantung pada token lokal; ganti dengan mapping status dokumentasi ke token semantik package.
- Hilangkan inline raw color pada alpha demo; bangun checker/surface dari `background`, `foreground`, `muted`, dan opacity.

### 4. Radius

- Pertahankan `rounded-lg` untuk card/surface konten.
- Biarkan `rounded-full` untuk avatar, badge, progress, dan status dot.
- Biarkan radius kontrol mengikuti skala kit.
- Ubah surface konten yang ditemukan belum `rounded-lg`; jangan mengubah dialog ekspresif atau kontrol kecil hanya demi uniformitas.

## Penyempurnaan Komponen Dokumentasi Bersama

### `src/components/docs/Header.tsx`

- Lokalkan semua label bahasa.
- Implementasikan keyboard pattern radiogroup: ArrowLeft/ArrowRight, Home/End, roving `tabIndex`.
- Simpan ref tombol menu agar fokus dapat dikembalikan setelah drawer ditutup.
- Logo home tidak melakukan full reload; panggil navigasi internal ke `introduction`.

### `src/components/docs/DocsLayout.tsx`

- Tambahkan kontrak `onHome`/navigasi internal ke Header.
- Drawer mobile memakai dialog semantics (`role="dialog"`, `aria-modal`, label jelas), Escape untuk menutup, focus trap sederhana, body scroll lock, dan focus restore.
- Saat pindah section, pindahkan fokus ke `main-content` setelah render untuk pengguna keyboard/screen reader, tanpa mengganggu klik pointer.
- Lokalkan footer.

### `src/components/docs/Sidebar.tsx`

- Pertahankan pencarian terhadap label ID dan EN.
- Lokalkan seluruh status/empty state.
- Saat hasil pencarian aktif, group tetap terbuka.
- Pastikan disabled roadmap item tidak masuk urutan tab jika tidak dapat dinavigasi.

### `src/components/docs/TableOfContents.tsx`

- Pertahankan scan otomatis dan IntersectionObserver.
- Gunakan anchor ID stabil dari `Section`.
- Hormati reduced motion: gunakan scroll instan jika pengguna memilih reduced motion.

### `CodeBlock`, `CodeTabs`, `PropsTable`, `ComponentPage`, `StatusBadge`

- Lokalkan copy dan label ARIA.
- `CodeTabs` memakai label tablist sesuai bahasa.
- `PropsTable` menerima caption opsional; halaman memberi caption terlokalisasi untuk tabel data bermakna.
- Mapping status/tone hanya menggunakan token package.
- Pertahankan card shell `rounded-lg`.

### `src/components/brand/RelUXLogo.tsx`

- Hapus dependensi pada `--relux-logo-*`.
- Default warna memakai `var(--primary)` dan `var(--foreground)`.
- Variant invert/mono tetap berasal dari token package, bukan literal warna.

## Migrasi 21 Halaman

Kerjakan dalam kelompok agar review dan diagnosis mudah.

### Kelompok A — Memulai dan brand

- `Introduction.tsx`
- `GettingStarted.tsx`
- `LogoPage.tsx`

Tambahkan copy ID/EN lengkap, lokalkan card, scope, langkah setup, guideline logo, CTA, dan ARIA/title logo.

### Kelompok B — Fondasi

- `ColorsPage.tsx`
- `TypographyPage.tsx`
- `SpacingPage.tsx`
- `RadiusPage.tsx`
- `IconPage.tsx`
- `StatePage.tsx`

Selain terjemahan penuh:

- pastikan dokumentasi token cocok dengan package `0.0.2`;
- hilangkan authored raw color dan token lokal;
- pertahankan nama class/token teknis;
- lokalkan search ikon, empty state, state demo, dan tabel fondasi;
- width/progress visual dinamis boleh tetap memakai inline style untuk ukuran, bukan warna/typography/spacing dekoratif.

### Kelompok C — Komponen inti

- `ButtonPage.tsx`
- `FormPage.tsx`
- `BadgePage.tsx`
- `AlertPage.tsx`
- `CardPage.tsx`
- `TablePage.tsx`

Lokalkan seluruh preview dan guideline. Pastikan:

- error/help text terhubung dengan `aria-describedby`;
- status table/badge tidak hanya mengandalkan warna;
- sort/search empty state dapat dipahami screen reader;
- snippet copy manusia mengikuti bahasa aktif.

### Kelompok D — Pola interaksi

- `NavigationPage.tsx`
- `AccordionPage.tsx`
- `ModalPage.tsx`
- `AvatarPage.tsx`
- `ProgressPage.tsx`
- `AppUIPage.tsx`

Lokalkan seluruh demo dan ARIA. Pastikan:

- tabs memakai roving tabindex dan arrow keys;
- accordion mempertahankan trigger/panel linkage;
- native dialog menutup via Escape, restore focus, dan mempunyai judul/deskripsi yang terhubung;
- avatar status mempunyai padanan teks;
- progress mempunyai nama/nilai terlokalisasi;
- widget pencarian tiket dan sidebar app sepenuhnya bilingual.

## Motion, Aksesibilitas, dan Performa

### Motion

- Gunakan `useReducedMotion` pada transisi halaman.
- Nonaktifkan blur/translation page transition ketika reduced motion aktif.
- Smooth scroll pada navigasi/TOC hanya dipakai jika reduced motion tidak aktif.
- Skeleton/spinner tetap memakai `motion-safe`.

### Aksesibilitas

Audit final mencakup:

- satu `h1` per halaman dan hierarki `h2`/`h3` berurutan;
- landmark unik dan label sesuai bahasa;
- focus visible untuk semua kontrol;
- target interaktif utama minimal 44×44 CSS px atau mempunyai area klik ekuivalen;
- input selalu mempunyai visible label;
- tabs, radiogroup, accordion, dialog, drawer, dan pagination dapat dioperasikan penuh dengan keyboard;
- status/error tidak hanya dibedakan warna;
- tidak ada ID duplikat setelah berganti bahasa;
- kontras diverifikasi untuk komposisi token yang baru.

### Performa

- Pertahankan named imports ikon agar tree-shaking bekerja.
- Setelah build, catat ukuran entry chunk.
- Jika entry JS terkompresi melewati 200 kB atau warning chunk Vite muncul, ubah registry halaman di `App.tsx` menjadi `React.lazy` per halaman dengan fallback terlokalisasi; jika tidak, pertahankan import statis untuk perpindahan tab instan.
- Jangan menambah library i18n atau UI baru.
- Jangan memulai dev server baru; gunakan server Make yang sudah berjalan.

## Metadata dan Dokumentasi Publik

### `index.html`

- Bahasa default dan fallback noscript tetap Bahasa Indonesia.
- Hapus raw theme color dan ganti dengan representasi yang tidak menduplikasi authored UI color jika browser tidak mendukung CSS variable di meta; jika harus statis, dokumentasikan sebagai metadata brand, bukan styling komponen.
- Perluas JSON-LD `about` agar mencakup seluruh katalog saat ini, bukan hanya subset lama.

### Metadata runtime

Tambahkan effect kecil pada level app untuk memperbarui:

- `document.title`;
- meta description;
- Open Graph title/description;

berdasarkan bahasa dan section aktif. Jangan mengubah URL/canonical karena aplikasi tetap tanpa router.

### `public/llms.txt` dan `public/ai-catalog.json`

- Sinkronkan daftar fondasi/komponen dengan seluruh katalog saat ini.
- Sediakan ringkasan ID dan EN yang jelas.
- Jangan mengklaim komponen, package, atau framework yang belum tersedia.

## File yang Diperkirakan Berubah

- Core: `src/App.tsx`, `src/index.css`, `src/lib/i18n.tsx`.
- Shared docs: seluruh file di `src/components/docs/`.
- Brand: `src/components/brand/RelUXLogo.tsx`.
- UI lokal: `src/components/ui/Accordion.tsx` hanya bila label/announcement perlu diteruskan sebagai prop.
- Pages: seluruh 21 file di `src/pages/`.
- Metadata/docs publik: `index.html`, `public/llms.txt`, `public/ai-catalog.json`.
- `src/lib/nav.ts` hanya untuk copy/status metadata bila diperlukan; urutan dan daftar section tetap.

Tidak mengubah file di `node_modules/@make-kits/design-system-kai-v-1`.

## Urutan Implementasi

1. Tambahkan primitive i18n typed dan anchor section stabil.
2. Rapikan token lokal dan migrasikan shared tone/status/logo/code surface.
3. Perbaiki shell: header, drawer, focus management, TOC, reduced motion.
4. Migrasikan halaman kelompok A, lalu B, C, dan D ke copy bilingual.
5. Sinkronkan metadata runtime dan dokumentasi publik.
6. Jalankan scan statis, build, lalu uji manual keyboard/responsive/bahasa.
7. Jika build menunjukkan entry chunk melewati kriteria, lakukan lazy-loading halaman dan build ulang.

## Verifikasi

### Pemeriksaan statis

- Cari raw warna di authored styling:
  - tidak ada hex/rgb/hsl pada `src/**/*.{tsx,css}` selain allowlist shim `--destructive`;
  - string hex yang tersisa pada `ColorsPage` harus hanya data dokumentasi, tidak berada dalam `className`, inline `style`, atau deklarasi CSS.
- Cari pemakaian token yang dihapus:
  - tidak ada `primary-soft`, `accent-soft`, `status-*`, `code-*`, `kai-primary-*`, `kai-secondary-*`, `kai-{subbrand}-*`, atau `relux-logo-*`.
- Pastikan seluruh `<Section>` mempunyai ID kanonis eksplisit.
- Pastikan setiap file halaman mengambil copy dari `useLocalized`.
- Pastikan tidak ada font family selain yang disediakan package.
- Pastikan tidak ada perubahan di package design system.

### Build

Jalankan:

```bash
pnpm build
```

Build harus selesai dengan exit code 0. Catat ukuran chunk dan terapkan kriteria lazy-loading di atas bila diperlukan.

### Uji manual pada server Make yang sudah berjalan

Untuk setiap 21 halaman:

1. buka dari sidebar desktop dan drawer mobile;
2. toggle ID → EN → ID;
3. pastikan title, lead, section, table, demo, snippet copy manusia, TOC, next link, dan ARIA-visible behavior berubah;
4. pastikan anchor TOC tetap sama setelah toggle;
5. pastikan card surface terlihat dan memakai `rounded-lg`;
6. pastikan tidak ada overflow pada 320 px, tablet, dan desktop.

Keyboard:

- skip link;
- buka/tutup drawer, Escape, focus trap, focus restore;
- sidebar dan next navigation;
- language radiogroup dengan arrow/Home/End;
- CodeTabs dan Navigation tabs;
- accordion;
- modal/dialog;
- seluruh form dan table actions.

Reduced motion:

- aktifkan `prefers-reduced-motion: reduce`;
- verifikasi page swap dan scroll tidak memakai motion dekoratif.

Kontras:

- cek teks normal, muted text, focus ring, destructive state, status badge, code block, dan control disabled terhadap WCAG 2.1 AA.

## Kriteria Selesai

- Seluruh katalog saat ini dapat digunakan penuh dalam ID dan EN.
- Tidak ada body copy atau label aksesibilitas yang tertinggal dalam bahasa yang salah, kecuali proper noun dan identifier teknis.
- Semua authored UI styling berasal dari token/utility kit, dengan hanya shim bug minimal yang disetujui.
- Semua card konten konsisten `rounded-lg`.
- Navigasi single-page, search sidebar, TOC otomatis, demo interaktif, dan urutan halaman tidak mengalami regresi.
- Build berhasil dan tidak ada warning performa yang melewati kriteria yang ditetapkan.
- Uji keyboard, responsive, reduced motion, dan kontras selesai tanpa blocker.

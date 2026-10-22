# Rencana Final: Audit dan Penyelarasan Penuh RelUX dengan Make Kit Design System KAI v1

## 1. Ringkasan Audit Saat Ini

### Jawaban atas tiga pertanyaan utama

#### 1. Apakah sudah lengkap sesuai Make Kit Design System KAI v1?

**Belum.**

Yang sudah ada:

- seluruh foundation utama yang saat ini ditampilkan aplikasi: Logo, Warna, Tipografi, Spacing & Grid, Radius & Shadow, Ikonografi, dan State;
- seluruh kelompok base component pada `ComponentsPage` kit: Buttons, Form Controls, Badges & Tags, Alert & Banner, Cards, Data Table, Navigation, Modal & Dialog, Avatars, Progress;
- App UI Components;
- tambahan RelUX sendiri: Accordion dan dokumentasi State.

Yang masih terlewat atau belum lengkap:

- tiga surface example resmi dalam package:
  - KAI Dashboard;
  - KAI Landing Page;
  - Google Auth Guide untuk ESA Web dan ESA Mobile;
- katalog token package belum exhaustive:
  - package mempunyai sekitar **583 custom properties non-internal**;
  - 192 token palet KAI/sub-brand;
  - 150 token utility palette;
  - 70 token semantic color;
  - 21 token effects/shadow;
  - 20 alpha;
  - 17 spacing;
  - 15 width/container;
  - 11 radius;
  - 22 primitive typography;
  - 54 class typography;
  - token chart, sidebar, dan component aliases;
- beberapa bagian komponen kit belum direpresentasikan lengkap, misalnya KAI brand button variants, form password/date/toggle variants, avatar photo/status, pagination, skeleton, dan tautan ke example pages.

#### 2. Apakah struktur codebase sudah rapi dan aman?

**Cukup terbaca, tetapi belum rapi final.**

Kondisi positif:

- build berhasil;
- pembagian `pages`, `components/docs`, `components/ui`, dan `lib` sudah mudah dipahami;
- tidak ada perubahan lokal yang belum tersimpan pada saat audit;
- navigasi dan urutan halaman mempunyai tipe `SectionId`;
- komponen dokumentasi bersama seperti `Section`, `CodeBlock`, `CodeTabs`, dan `PropsTable` sudah ada.

Masalah struktural:

- 21 halaman diimpor statis dari `App.tsx`;
- hasil build saat ini:
  - JS minified **778.85 kB**;
  - gzip **217.05 kB**;
  - Vite mengeluarkan warning chunk lebih besar dari 500 kB;
- page header yang sama diulang pada 12 file;
- `GuidelineCard` diduplikasi pada 5 halaman;
- implementasi Button hanya lokal di `ButtonPage`, sehingga bukan primitive reusable;
- styles Button/Modal/Form dan tone status berulang;
- `ComponentPage` menerima `next`/`onNavigate` tetapi tidak menggunakannya;
- semua halaman menerima `onNavigate` walau mayoritas tidak memakainya;
- seluruh isi halaman belum memakai sistem i18n typed; EN saat ini hanya mengubah shell/judul section;
- package kit tidak mengekspor React component library yang dapat dipakai langsung; package utamanya adalah CSS dan example app.

#### 3. Apakah token design dan code React/HTML+CSS sudah benar?

**Belum.**

Masalah token:

- `src/index.css` menduplikasi palet kit dengan raw hex:
  - `--kai-primary-*`;
  - `--kai-secondary-*`;
  - token sub-brand;
  - status, code surface, dan logo;
- padahal package sudah menyediakan token canonical dengan nama seperti:
  - `--colors/kai/primary/600`;
  - `--colors/background/bg-success-primary`;
  - `--colors/text/...`;
  - `--component-colors/utility/...`;
- `ColorsPage` mendokumentasikan alias lokal seolah-olah token kit;
- alpha demo memakai raw hex/rgba inline;
- banyak typography menggunakan arbitrary `text-[...]`, bukan token/class typography kit;
- snippet `GettingStarted` menuliskan font stack manual;
- token spacing/radius package bersifat unitless dan belum mempunyai adapter konsisten untuk pemakaian sebagai CSS length.

Masalah snippet:

- hanya Accordion dan Button mempunyai tab React + HTML;
- halaman komponen lain umumnya hanya mempunyai React/TSX;
- snippet React Accordion/Button mengimpor package fiktif `relux/ui`;
- package `relux/ui` tidak ada;
- class HTML seperti `relux-btn` dan `relux-accordion__trigger` tidak didefinisikan dalam CSS aplikasi;
- snippet HTML tidak menyertakan CSS executable;
- beberapa snippet memakai token lokal yang tidak berasal dari kit;
- snippet tidak berasal dari file source yang sama dengan demo, sehingga mudah drift.

## 2. Keputusan Produk dan Teknis yang Sudah Final

- Cakupan: **seluruh surface Make Kit**.
- Tambahkan tiga example page resmi, bukan hanya katalog saat ini.
- Token catalog harus mencakup seluruh family publik yang relevan dari package, bukan daftar manual parsial.
- React dan HTML+CSS harus executable.
- Demo dan snippet harus berasal dari satu source of truth.
- Seluruh UI dan dokumentasi tetap bilingual ID/EN sesuai keputusan sebelumnya.
- Navigasi aplikasi utama tetap single-page berbasis state, tanpa React Router.
- Styling authored app harus berasal dari CSS variables/classes package.
- Font hanya Inter/font faces yang didefinisikan package.
- Light theme tetap menjadi mode utama; dark theme tidak ditambahkan dalam pekerjaan ini.
- Empat token light-theme package yang transparan ditangani dengan shim yang menunjuk kembali ke token package, tanpa raw color baru.

## 3. Sumber Kebenaran

Prioritas:

1. `@make-kits/design-system-kai-v-1@0.0.2/dist/style.css`;
2. source content pada source map package untuk:
   - `ComponentsPage.tsx`;
   - `DashboardPage.tsx`;
   - `LandingExamplePage.tsx`;
   - `GoogleAuthPage.tsx`;
   - `RelUXLayout.tsx`;
   - `RelUXLogo.tsx`;
3. guideline setup package;
4. implementasi RelUX saat ini;
5. PRD lokal.

Dependency manifest package bukan daftar komponen RelUX. Dependency seperti Radix, MUI, Recharts, dan Sonner hanya capability yang tersedia; jangan mendokumentasikannya sebagai komponen RelUX kecuali digunakan oleh surface resmi kit.

## 4. Arsitektur CSS dan Token

### 4.1 Struktur stylesheet

Gunakan:

- `src/index.css` sebagai satu-satunya global entry yang diimpor `main.tsx`;
- `src/styles/theme.css` **tidak dibuat**, karena setup kit secara eksplisit melarang import theme lama;
- tambahkan:
  - `src/styles/kit-adapter.css`;
  - `src/styles/components.css`;
  - `src/styles/examples.css`.

Urutan `src/index.css`:

```css
@import '@make-kits/design-system-kai-v-1/style.css';
@import 'tailwindcss';
@import './styles/kit-adapter.css';
@import './styles/components.css';
@import './styles/examples.css';
```

Tidak ada `styles/global.css` pada snapshot repo saat ini. Jangan membuat entry global kedua; konsolidasikan semua import melalui `src/index.css`.

### 4.2 Kit adapter

`kit-adapter.css` hanya berisi:

1. mapping Tailwind `@theme inline` ke token package;
2. conversion unitless ke CSS length menggunakan `calc(var(...) * 1px)`;
3. empat shim bug package;
4. semantic aliases yang nilainya hanya mereferensikan token package.

Contoh prinsip:

```css
:root {
  --card: var(--colors\/background\/bg-primary);
  --popover: var(--colors\/background\/bg-primary);
  --sidebar: var(--colors\/background\/bg-primary);
  --destructive: var(--colors\/background\/bg-error-solid);
}
```

Tidak boleh ada raw hex/rgb/hsl pada adapter.

Mapping semantic tambahan diperbolehkan hanya sebagai Tailwind adapter, misalnya:

```css
@theme inline {
  --color-success: var(--colors\/foreground\/fg-success-primary);
  --color-success-soft: var(--colors\/background\/bg-success-primary);
  --color-warning: var(--colors\/foreground\/fg-warning-primary);
  --color-warning-soft: var(--colors\/background\/bg-warning-primary);
}
```

Ini bukan palet baru; semua nilai tetap mengalir dari token package.

### 4.3 Spacing, radius, width, dan typography

- Hapus arbitrary text size `text-[...]`; ganti dengan:
  - class typography kit untuk specimen/heading yang cocok;
  - `text-xs`, `text-sm`, `text-base`, dst. yang dipetakan ke token package;
- `font-serif` dihapus; package hanya mendefinisikan Inter;
- `font-mono` hanya untuk source code/identifier, menggunakan mono fallback package;
- spacing/radius unitless dipetakan dengan `calc(... * 1px)`;
- layout arbitrary value hanya boleh memakai token, misalnya:
  - `max-width: calc(var(--width-3xl) * 1px)`;
  - `padding: calc(var(--spacing-xl) * 1px)`;
- card konten memakai radius kit yang dipilih sebagai standard `rounded-lg`;
- badge/avatar/progress tetap `rounded-full`.

### 4.4 Penghapusan token lokal

Hapus raw value berikut:

- `--kai-*`;
- `--relux-logo-*`;
- `--primary-soft`, `--accent-soft`;
- `--status-*`;
- `--code-bg`, `--code-fg`.

Ganti pemakaiannya dengan canonical package variables.

Logo:

- source path SVG tetap mengikuti source map resmi kit;
- default color memakai canonical KAI/RelUX token dari package;
- tidak menyimpan ulang warna literal dalam app.

## 5. Katalog Token Otomatis

Manual list tidak cukup aman untuk 583 variables. Tambahkan generator.

### 5.1 Tooling

Tambahkan `postcss` sebagai dev dependency eksplisit.

Tambahkan:

- `scripts/generate-kit-catalog.mjs`;
- `src/generated/kit-token-catalog.ts`;
- `src/generated/kit-typography-catalog.ts`.

Generator:

1. membaca `node_modules/@make-kits/design-system-kai-v-1/dist/style.css`;
2. parse CSS memakai PostCSS, bukan regex;
3. mengumpulkan custom property public;
4. menormalisasi escaped slash untuk nama display;
5. mengelompokkan family;
6. mengumpulkan 54 typography classes beserta size, line-height, dan weight;
7. menghasilkan output deterministik yang diurutkan;
8. menyimpan `packageVersion: '0.0.2'`.

Script:

```json
{
  "tokens:generate": "node scripts/generate-kit-catalog.mjs",
  "tokens:check": "node scripts/generate-kit-catalog.mjs --check",
  "prebuild": "pnpm tokens:check"
}
```

`--check` gagal bila generated catalog tidak sinkron dengan package.

### 5.2 Family yang wajib tercakup

Colors:

- 16 KAI/sub-brand families × 12 shade = 192;
- 17 utility families = 150;
- semantic background = 32;
- semantic border = 10;
- semantic foreground = 15;
- semantic text = 13;
- alpha = 20;
- chart = 5;
- sidebar semantic = 8;
- component aliases = 4;
- core colors dan `stroke-card`/`primary-digisign`.

Foundations lain:

- effects/shadows = 21;
- spacing = 17;
- radius = 11;
- width/container = 15;
- typography primitive = 22;
- typography classes = 54.

Tailwind internal properties `--tw-*`, animation bookkeeping, dan compiler internals tidak ditampilkan sebagai design token.

### 5.3 UI katalog

Perbarui halaman:

- `ColorsPage`;
- `TypographyPage`;
- `SpacingPage`;
- `RadiusPage`.

Gunakan:

- family filter;
- search token;
- collapsible groups;
- copy variable name;
- copy `var(--token-name)`;
- preview swatch/specimen;
- count per family dan total;
- badge sumber “Make Kit 0.0.2”.

Raw hex boleh tampil sebagai **nilai dokumentasi hasil generator**, tetapi tidak boleh dipakai untuk authored styling.

Swatch preview:

- menerima nama variable;
- memasang CSS custom property `--swatch-value: var(--escaped-token)` sebagai satu-satunya inline style dinamis;
- class CSS menangani `background`;
- tidak menerima raw hex sebagai styling.

## 6. Component Library Lokal sebagai Source of Truth

Package kit tidak mengekspor reusable React components, jadi bangun implementation layer lokal yang mengikuti surface package.

### 6.1 Struktur

```text
src/components/ui/
  accordion/
  alert/
  avatar/
  badge/
  button/
  card/
  data-table/
  dialog/
  form-controls/
  navigation/
  progress/
  app-ui/
```

Setiap folder:

- `index.ts`;
- file React component;
- types/variants;
- tidak mendefinisikan raw color/typography;
- memakai stable `relux-*` class dari `components.css`.

### 6.2 Surface wajib

#### Buttons

- variants: primary, secondary, outline/tertiary, link/ghost, destructive;
- sizes yang ditampilkan kit;
- leading icon, trailing icon, icon-only;
- loading, disabled;
- KAI, ESA, Commuter, Bandara, Logistik brand examples;
- native button semantics dan `asChild` hanya bila benar-benar diperlukan.

#### Form Controls

- text input;
- password dengan show/hide;
- email validation;
- disabled;
- date input;
- select;
- textarea;
- checkbox;
- radio;
- toggle/switch;
- visible labels, helper/error linkage.

#### Badges & Tags

- status, outline, number, dot;
- sizes;
- semantic and brand tones.

#### Alert & Banner

- info, warning, error, success;
- dismissible banner;
- `role="status"`/`role="alert"` sesuai urgency.

#### Cards

- train card;
- statistic card;
- interactive action;
- semantic article/heading.

#### Data Table

- search;
- sortable header;
- status;
- pagination;
- empty state;
- responsive horizontal scroll.

#### Navigation

- underline tabs;
- pill tabs;
- breadcrumb;
- pagination;
- complete roving tabindex.

#### Modal & Dialog

- information dialog;
- confirmation dialog;
- form modal;
- slide-over panel sesuai deskripsi kit;
- focus management, Escape, restore focus.

#### Avatars

- XS sampai 2XL;
- photo;
- initials;
- online/offline status;
- avatar group.

#### Progress

- progress bars;
- spinner/loaders;
- skeleton;
- determinate and indeterminate semantics.

#### App UI

- Public App Search & Book Widget;
- Internal App Sidebar Navigation;
- links/cards menuju tiga example pages.

#### RelUX extensions

- Accordion dan State tetap dipertahankan;
- tandai sebagai “RelUX extension” bila tidak berada di `ComponentsPage` kit.

## 7. Snippet React dan HTML+CSS yang Executable

### 7.1 Struktur example source

Untuk setiap component page:

```text
src/examples/components/<component>/
  react-example.tsx
  html-example.html
  html-example.css
```

### 7.2 React

- demo React mengimpor `react-example.tsx`;
- CodeTabs menampilkan file yang sama melalui Vite raw import:
  - `import source from './react-example.tsx?raw'`;
- snippet mengimpor component nyata:
  - `@/components/ui/button`;
  - bukan `relux/ui`;
- file example harus ikut typecheck/build.

### 7.3 HTML + CSS

- HTML tab menampilkan isi `html-example.html`;
- CSS tab menampilkan isi `html-example.css`;
- HTML preview dirender dalam sandboxed iframe menggunakan exact HTML/CSS source;
- CSS example mengimpor/menyalin class stable yang sama dari `components.css`;
- tidak ada class snippet yang tidak didefinisikan;
- token color/font/spacing/radius tetap memakai variables package;
- HTML mempunyai ARIA dan keyboard behavior yang dapat dijalankan dengan JS native hanya bila interaction membutuhkannya.

Untuk interactive HTML component seperti tabs, accordion, modal, dan drawer, tambahkan:

- `html-example.js`;
- tab JavaScript;
- iframe memakai file JS exact yang sama.

### 7.4 Validasi snippet

Tambahkan `scripts/validate-snippets.mjs`:

- memastikan semua import alias React example dapat di-resolve;
- memastikan class `relux-*` dalam HTML terdapat di `components.css`;
- memastikan token `var(--...)` yang dirujuk ada pada generated catalog atau adapter allowlist;
- memastikan setiap component page mempunyai React + HTML + CSS;
- JavaScript wajib untuk interaction HTML yang tidak native.

Script:

```json
{
  "snippets:check": "node scripts/validate-snippets.mjs"
}
```

## 8. Example Pages Resmi Make Kit

Tambahkan tiga section ID dan nav group `Contoh / Examples`:

- `example-dashboard`;
- `example-landing`;
- `example-google-auth`.

Navigasi tetap state-based; jangan menambah React Router.

### 8.1 KAI Dashboard

Port surface dari source map:

- operation sidebar;
- top bar;
- page header;
- alert strip;
- statistic cards;
- passenger/revenue trend;
- passenger per route;
- active train table;
- system notifications.

Gunakan Recharts hanya jika visual chart benar-benar membutuhkan; lazy-load page agar dependency tidak masuk initial chunk.

### 8.2 KAI Landing Page

Port:

- promo topbar;
- navbar;
- hero;
- ticket search;
- conditional results;
- stats;
- services;
- promotions;
- testimonials;
- CTA;
- footer.

Tidak menambah photography kecuali diminta; gunakan visual/icon treatment yang sudah ada pada Make Kit source.

### 8.3 Google Auth Guide

Port:

- ESA Web tab;
- ESA Mobile tab;
- installation;
- credential input;
- QR registration;
- OTP copy/input;
- success flow;
- three mobile registration options;
- original guide image assets dari package hanya bila dapat direferensikan secara legal dan stabil;
- bila asset package tidak dapat diimpor dari public export, salin asset ke `src/imports` dengan attribution dari package.

Seluruh copy ID/EN dan seluruh alt text wajib lengkap.

## 9. i18n Penuh

Pertahankan keputusan sebelumnya: seluruh shell dan dokumentasi bilingual.

### 9.1 API

Di `src/lib/i18n.tsx`:

- `Lang`;
- `Localized<T>`;
- `useLocalized`;
- validasi localStorage;
- global shell strings;
- common component/status strings.

Setiap page/example memakai typed local `COPY`:

```ts
const COPY = {
  id: { ... },
  en: { ... },
} satisfies Localized<PageCopy>
```

Terjemahkan:

- title, description, section, guideline;
- form labels/placeholders;
- demo content;
- table;
- dialog;
- ARIA;
- empty/loading/error/status;
- snippet visible copy dan comments.

Jangan terjemahkan:

- identifier API;
- class;
- variable;
- package;
- command;
- path.

### 9.2 Anchor

`Section` menerima `id` explicit dan title terlokalisasi. ID tidak berubah saat toggle bahasa.

## 10. Rapikan Struktur Dokumentasi

### Shared components

Tambahkan/refactor:

- `PageHeader`;
- `GuidelineCard`;
- `TokenCatalog`;
- `TokenSwatch`;
- `SnippetPreview`;
- `ExamplePageShell`;
- `StatusBadge`;
- `ComponentPage`.

Hapus:

- `next`/`onNavigate` yang tidak dipakai dari `ComponentPage`;
- `onNavigate` dari page yang tidak memakainya;
- page header copy-paste;
- lima implementasi `GuidelineCard`;
- local Button dalam `ButtonPage`.

### Data

Tambahkan:

- `src/data/component-catalog.ts`;
- `src/data/example-catalog.ts`;
- generated token/typography data.

`nav.ts` diturunkan dari catalog data sejauh mungkin agar daftar, urutan, status, dan next link tidak drift.

## 11. Aksesibilitas

Wajib:

- satu `h1` per page;
- heading hierarchy teratur;
- landmark unik;
- skip link;
- focus visible;
- 44×44 target untuk primary interactive controls;
- drawer:
  - `role="dialog"`;
  - `aria-modal`;
  - Escape;
  - focus trap;
  - focus restore;
- language radiogroup:
  - roving tabindex;
  - ArrowLeft/Right;
  - Home/End;
- tabs:
  - roving tabindex;
  - arrows/Home/End;
  - tab/panel linkage;
- dialogs:
  - label/description;
  - initial safe focus;
  - Escape;
  - return focus;
- reduced motion:
  - page transition;
  - smooth scroll;
  - spinner/skeleton;
- status tidak hanya warna;
- chart mempunyai text/table equivalent;
- example page images mempunyai alt;
- Google Auth steps dapat dipahami tanpa screenshot.

## 12. Performa

### Code splitting wajib

Ubah `App.tsx` menjadi page registry:

```ts
const PAGES: Record<SectionId, LazyExoticComponent<...>> = { ... }
```

Gunakan `React.lazy` + `Suspense`.

Chunk terpisah untuk:

- setiap foundation;
- setiap component page;
- setiap example page;
- Recharts hanya di Dashboard;
- Google Auth images hanya di Google Auth chunk.

Hilangkan `motion` untuk page transition bila efek yang sama dapat dicapai dengan CSS; bila tetap digunakan, lazy-load atau pastikan tidak mendominasi initial bundle.

Target:

- tidak ada Vite chunk warning >500 kB;
- initial JS gzip <150 kB;
- example dependencies tidak masuk initial chunk;
- build sukses.

## 13. Metadata dan Dokumentasi Publik

Perbarui:

- `index.html`;
- `public/llms.txt`;
- `public/ai-catalog.json`;
- structured data.

Daftar harus mencakup:

- foundation penuh;
- base component penuh;
- extensions;
- tiga example pages.

Metadata runtime berubah sesuai language dan active section tanpa mengubah URL/canonical.

## 14. Urutan Implementasi

1. Tambahkan generator token dan generated catalog.
2. Buat `kit-adapter.css`; migrasikan dan hapus raw local tokens.
3. Bangun/refactor UI primitive lokal beserta `components.css`.
4. Buat source example React/HTML/CSS/JS.
5. Refactor component pages agar demo dan code memakai source yang sama.
6. Lengkapi token/foundation pages dari generated catalog.
7. Tambahkan tiga example pages.
8. Terapkan i18n typed ke seluruh existing dan new pages.
9. Rapikan docs shared components, catalog, nav, dan dead props.
10. Terapkan lazy registry/code splitting.
11. Sinkronkan metadata/public docs.
12. Jalankan checks, build, dan manual accessibility review.

## 15. Verifikasi

### Static checks

Jalankan:

```bash
pnpm tokens:check
pnpm snippets:check
pnpm build
```

Tambahkan scan:

- tidak ada authored raw hex/rgb/hsl pada `src/**/*.{tsx,css}`;
- raw values hanya boleh muncul di generated catalog sebagai documentation data;
- tidak ada `font-family` selain variable/font package;
- tidak ada `text-[...]` untuk typography;
- tidak ada `relux/ui`;
- semua `relux-*` class snippet terdefinisi;
- semua token snippet terdaftar;
- tidak ada local token alias lama;
- tidak ada perubahan di package kit.

### Coverage check

Generator/validator harus melaporkan:

- token family count;
- typography class count = 54;
- ComponentsPage section count = 16;
- example page count = 3;
- component docs dengan React example;
- component docs dengan HTML+CSS example;
- interactive HTML docs dengan JS bila perlu.

### Build/performance

- production build exit code 0;
- tidak ada chunk >500 kB;
- initial gzip <150 kB;
- Dashboard/Recharts dan Google Auth assets berada di lazy chunks.

### Manual QA

Untuk seluruh halaman:

- desktop, tablet, 320px mobile;
- ID dan EN;
- sidebar search;
- TOC;
- next/previous;
- copy token;
- copy code;
- React demo;
- HTML iframe demo;
- keyboard;
- screen-reader labels;
- reduced motion;
- error/loading/empty/disabled;
- card radius;
- no horizontal overflow kecuali data table/code block.

Example pages:

- Dashboard chart/table fallback;
- Landing search flow;
- Google Auth ESA Web/Mobile tabs dan semua step.

## 16. Kriteria Selesai

- Seluruh surface Make Kit `0.0.2` terwakili.
- Tidak ada token family publik yang relevan terlewat.
- Tidak ada authored raw styling value di luar generated documentation data.
- Semua text memakai font faces package.
- Semua component docs mempunyai React dan HTML+CSS executable.
- Interactive HTML mempunyai JS executable bila dibutuhkan.
- Demo dan displayed source tidak drift.
- Semua import snippet nyata.
- Codebase tidak lagi memiliki header/guideline/button duplication utama.
- Seluruh UI/docs ID dan EN lengkap.
- Accessibility review lulus.
- Build lulus tanpa large-chunk warning dan memenuhi target initial bundle.

# Plan: Audit & Perbaikan Lengkap RelUX Design System App

## Context

Audit menyeluruh telah dilakukan terhadap semua halaman, komponen docs, dan kit token. Ditemukan **11 bug aktif** (4 navigasi, 2 token, 2 aksesibilitas, 1 animasi, 1 dead code) serta **2 halaman Fondasi yang belum dibangun** meski sudah ada di nav sebagai `soon` (Spacing, Radius & Shadow). Selain itu, tiga token kit belum dikabel ke Tailwind `@theme`.

Tujuan: (1) perbaiki semua bug, (2) bangun SpacingPage + RadiusPage, (3) kabel token yang kurang, (4) update alur navigasi linear agar konsisten.

---

## Bugs Aktif

### HIGH — Aksesibilitas

**Bug 1 — Sidebar nav item buttons tidak punya focus-visible ring**
- File: `src/components/docs/Sidebar.tsx` baris 77–97
- Masalah: `<button>` nav item hanya punya `transition-colors`, tidak ada `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-lg`
- Fix: tambahkan kelas focus-visible ke setiap `<button>` nav item

**Bug 2 — CodeTabs ARIA tab pattern tidak lengkap**
- File: `src/components/docs/CodeTabs.tsx`
- Masalah: tab buttons punya `role="tab"` tapi tidak punya `id` dan `aria-controls`; tidak ada panel `role="tabpanel"`/`aria-labelledby`; tidak ada navigasi arrow key
- Fix: tambahkan `id`, `aria-controls`, `onKeyDown` (ArrowLeft/ArrowRight switching), wrap panel dengan `<div role="tabpanel" id={...} aria-labelledby={...}>`

### MEDIUM — Navigasi (semua NextLink salah)

Alur navigasi yang benar setelah ditambah dua halaman baru:
```
introduction → getting-started → logo → warna → tipografi → spacing → radius → accordion → button → state → icon
```

| File | Baris | Saat ini | Harus |
|---|---|---|---|
| `src/pages/GettingStarted.tsx` | 131 | `onNavigate('accordion')`, label "Selanjutnya · Accordion" | `onNavigate('logo')`, label "Selanjutnya · Logo" |
| `src/pages/TypographyPage.tsx` | 162–165 | `onNavigate('accordion')`, label "Selanjutnya · Accordion" | `onNavigate('spacing')`, label "Selanjutnya · Spacing" |
| `src/pages/AccordionPage.tsx` | 219–221 | `onNavigate('introduction')`, label "Kembali · Pengenalan" | `onNavigate('button')`, label "Selanjutnya · Button" |
| `src/pages/ButtonPage.tsx` | 262 | `onNavigate('introduction')`, label "Kembali · Pengenalan" | `onNavigate('state')`, label "Selanjutnya · State" |
| `src/pages/IconPage.tsx` | 154 | `onNavigate('button')`, label "Selanjutnya · Button" | Hapus `<NextLink>` (IconPage adalah halaman terakhir) |

### MEDIUM — Token & Dead Code

**Bug 3 — `text-white` hardcoded di StatePage**
- File: `src/pages/StatePage.tsx` baris 188
- `text-white` → `text-primary-foreground` (kit token untuk teks di atas warna primary/status-stable)

**Bug 4 — Dead code `(block ? '' : '')` di StatePage**
- File: `src/pages/StatePage.tsx` baris 251
- `className={'mt-1 ' + (block ? '' : '')}` → `className="mt-1"`

**Bug 5 — Accordion `transition-all` inert**
- File: `src/components/ui/Accordion.tsx` baris 119
- `transition-all` pada elemen yang pakai `hidden={!open}` tidak punya efek (elemen snap show/hide)
- Fix: Ganti dengan animasi grid-row expansion:
  ```tsx
  // Ganti hidden={!open} dengan class conditional
  // Panel: style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
  // className="grid transition-[grid-template-rows] duration-200 ease-out"
  // Inner div: className="overflow-hidden"
  ```

### LOW — Token Belum Dikabel

**Bug 6 — Chart tokens tidak ada di `@theme`**
- File: `src/index.css`
- Tambahkan ke blok `@theme inline`:
  ```css
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --shadow-elevation-sm: var(--elevation-sm);
  ```
  (ColorsPage mendokumentasikan chart tokens, tapi swatchnya mungkin gagal render karena token belum dikabel)

---

## Halaman Baru

### SpacingPage (`src/pages/SpacingPage.tsx`)

Mengekspos 17 spacing tokens dari kit. Token tersedia di CSS sebagai `--spacing-*` dengan nilai numerik mentah (tanpa `px`).

**Struktur visual:**
- Tabel bar horizontal: bar lebar `value × 1px` (capped 160px display max), kolom token name, nilai (tampilkan `{value}px`), kegunaan
- Token yang didokumentasikan:

| Token | Nilai |
|---|---|
| `--spacing-none` | 0px |
| `--spacing-xxs` | 2px |
| `--spacing-xs` | 4px |
| `--spacing-sm` | 6px |
| `--spacing-md` | 8px |
| `--spacing-lg` | 12px |
| `--spacing-xl` | 16px |
| `--spacing-2xl` | 20px |
| `--spacing-3xl` | 24px |
| `--spacing-4xl` | 32px |
| `--spacing-5xl` | 40px |
| `--spacing-6xl` | 48px |
| `--spacing-7xl` | 64px |
| `--spacing-8xl` | 80px |
| `--spacing-9xl` | 96px |
| `--spacing-10xl` | 128px |
| `--spacing-11xl` | 160px |

- NextLink ke `'radius'`

### RadiusPage (`src/pages/RadiusPage.tsx`)

Mengekspos 11 radius tokens + 1 shadow token dari kit.

**Struktur visual:**
- Grid card persegi yang menunjukkan border-radius visual dengan `border-radius: calc(var(--radius-*) * 1px)` (note: kit mendefinisikan token ini sebagai angka tanpa satuan)
- Shadow section: satu card dengan `box-shadow: var(--elevation-sm)` menampilkan shadow token

| Token | Nilai |
|---|---|
| `--radius-none` | 0px |
| `--radius-xxs` | 2px |
| `--radius-xs` | 4px |
| `--radius-sm` | 6px |
| `--radius-md` | 8px (= `--radius` base) |
| `--radius-lg` | 10px |
| `--radius-xl` | 12px |
| `--radius-2xl` | 16px |
| `--radius-3xl` | 20px |
| `--radius-4xl` | 24px |
| `--radius-full` | 9999px |

**Shadow:** `--elevation-sm: 0px 1px 2px 0px #0a0d120d`

- NextLink ke `'accordion'`

---

## Perubahan Struktur Nav & Routing

### `src/lib/nav.ts`

1. Tambah `'spacing'` dan `'radius'` ke `SectionId` type
2. Ubah item `spacing` dan `radius` dari `soon: true` ke `section: 'spacing'` / `section: 'radius'`

### `src/App.tsx`

1. Import `SpacingPage` dan `RadiusPage`
2. Tambah branch `{section === 'spacing' && <SpacingPage onNavigate={setSection} />}`
3. Tambah branch `{section === 'radius' && <RadiusPage onNavigate={setSection} />}`

---

## File yang Diubah

| File | Perubahan |
|---|---|
| `src/lib/nav.ts` | Tambah `'spacing'` `'radius'` ke SectionId; wire dua section baru |
| `src/App.tsx` | Import + render SpacingPage, RadiusPage |
| `src/index.css` | Tambah `--color-chart-1..5`, `--shadow-elevation-sm` ke `@theme inline` |
| `src/pages/GettingStarted.tsx` | Fix NextLink → logo |
| `src/pages/TypographyPage.tsx` | Fix NextLink → spacing |
| `src/pages/AccordionPage.tsx` | Fix NextLink → button |
| `src/pages/ButtonPage.tsx` | Fix NextLink → state |
| `src/pages/IconPage.tsx` | Hapus NextLink |
| `src/pages/StatePage.tsx` | Fix `text-white` → `text-primary-foreground`; hapus dead code |
| `src/components/ui/Accordion.tsx` | Ganti `transition-all`/`hidden` dengan grid-row animation |
| `src/components/docs/Sidebar.tsx` | Tambah focus-visible ring ke nav item buttons |
| `src/components/docs/CodeTabs.tsx` | Lengkapi ARIA tab pattern (id, aria-controls, role=tabpanel, arrow keys) |
| `src/pages/SpacingPage.tsx` | **Baru** — halaman Spacing tokens |
| `src/pages/RadiusPage.tsx` | **Baru** — halaman Radius & Shadow tokens |

---

## Pola yang Digunakan Kembali

- `Section` / `GuidelineCard` / `NextLink` — disalin dari pola halaman lain (source: `Introduction.tsx`, `ColorsPage.tsx`)
- `PropsTable` dari `src/components/docs/PropsTable.tsx` untuk tabel token
- `StatusBadge` dari `src/components/docs/StatusBadge.tsx`

---

## Verification

1. Jalankan dev server — sudah running di `$PORT`
2. Cek setiap halaman sidebar bisa dibuka
3. Verifikasi alur NextLink: klik "Selanjutnya" berturutan dari Introduction sampai Icon — harus linear tanpa lompat
4. Keyboard test Sidebar: Tab ke nav items → pastikan focus ring terlihat (biru KAI)
5. Keyboard test CodeTabs: Tab ke tab bar → Arrow Left/Right pindah tab tanpa meninggalkan tab bar
6. Cek Accordion: buka/tutup item — panel harus slide smooth (bukan snap)
7. StatePage dark mode: tombol "Tersimpan" harus teks putih di latar hijau ✓ (via `text-primary-foreground`)
8. SpacingPage: bar visual 17 token tampil berurutan
9. RadiusPage: 11 card radius + shadow card tampil

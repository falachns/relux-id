# Plan: RelUX Docs — Logo, Warna, Tipografi, State, Icon, Button

## Context

The RelUX by KAI design-system documentation app (React 19 + Vite + Tailwind v4,
state-based single-page navigation, all copy in Bahasa Indonesia) currently ships three
live pages — Pengenalan, Getting Started, Accordion — with the remaining sidebar items
shown as `soon` stubs. The user wants six new documentation sections built out in full:
**Logo, Warna, Tipografi, State, Icon, Button**.

This plan supersedes `plans/background-saya-sedang-greedy-feather.md`, whose "Kit Token
Reference" was inaccurate. Verified against `node_modules/@make-kits/design-system-kai-v-1/dist/style.css`:

- The kit ships **CSS variables + typography classes only** (no importable React components).
- Semantic color tokens: `--primary`, `--primary-foreground`, `--accent`, `--secondary`,
  `--muted`, `--muted-foreground`, `--destructive`, `--card`, `--popover`, `--ring`,
  `--border`, `--input`, `--background`, `--foreground`, `--chart-1..5`, `--primary-digisign`,
  plus `--color-gray-50`, `--color-white`, `--color-black`, and sidebar tokens.
- **There are NO `--colors/kai/primary/600` primitive scales and NO sub-brand palettes.**
  Any docs page must document the tokens that actually exist.
- Real typography classes exist: `.display-{2xl,xl,lg,md,sm,xs}-{regular,medium,semibold,bold}`,
  `.h1/.h2-{regular,semibold,bold}`, `.subtitle-{1,2}-*`, `.body-{1,2}-*`, `.large-*`,
  `.caption-*`, `.overline-{1,2}-*`.
- Font-size tokens `--text-{xs,sm,base,lg,xl,2xl,3xl}`, `--spacing-{xxs,xs,sm,md,lg,xl,2xl..11xl,none}`,
  `--radius-{none,xxs,xs,sm,md,lg,xl,2xl,3xl,4xl,full}`, `--elevation-sm`, `--leading-tight/snug`.

**No dependency install is needed.** `package.json` already pins the selected kit `0.0.2`,
`@radix-ui/react-slot 1.1.2`, and `lucide-react 0.487.0`.

## Conventions to follow (verified)

- Pages export a **named** function `export function XxxPage({ onNavigate }: { onNavigate: (section: SectionId) => void })`.
- Root: `<article className="mx-auto max-w-3xl">`. Header block = eyebrow
  `<p className="mb-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-accent">`,
  `<h1 className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl">`
  (with `<StatusBadge>` in a `flex flex-wrap items-center gap-3` wrapper where relevant),
  lead `<p className="mt-4 text-lg leading-relaxed text-muted-foreground">`, optional `<dl>` meta row.
- Body content = sequence of local `<Section title="…">` blocks; end with
  `<NextLink label="…" onClick={() => onNavigate('…')} />` (import `NextLink` from `./Introduction`).
- Reuse shared docs components: `PropsTable`, `CodeTabs`, `CodeBlock`, `StatusBadge`
  (all in `src/components/docs/`).
- `Section` and `GuidelineCard` are **not shared** — copy them locally into each new page,
  matching the existing pattern in `AccordionPage.tsx`.
- **No raw hex in page files.** Use Tailwind semantic utilities (`text-foreground`,
  `bg-muted`, `border-border`, `bg-primary`, `text-accent`, `bg-status-stable-soft`, etc.)
  or inline `style={{ background: 'var(--token)' }}` referencing real kit vars. Raw hex is
  permitted only in `src/index.css` (its documented additive layer).

## Files to modify

**`src/lib/nav.ts`**
- Extend `SectionId` to: `'introduction' | 'getting-started' | 'logo' | 'warna' | 'tipografi' | 'accordion' | 'button' | 'state' | 'icon'`.
- Add new group **Merek** (above Fondasi): `{ id: 'logo', label: 'Logo', section: 'logo' }`.
- Fondasi: give `colors` → `section: 'warna'`, `typography` → `section: 'tipografi'` (drop their `soon`). Keep `spacing`, `radius` as `soon`.
- Komponen: `button` → `section: 'button'` (drop `soon`); add `{ id: 'state', label: 'State', section: 'state' }` and `{ id: 'icon', label: 'Icon', section: 'icon' }`. Keep `input`, `card`, `modal` as `soon`.

**`src/App.tsx`**
- Import the six new page components and add one `{section === '…' && <XxxPage onNavigate={setSection} />}` line each, following the existing `&&` pattern.

## New page files (`src/pages/`)

Each uses the header/Section/NextLink conventions above.

**`LogoPage.tsx`** — Overview of the RelUX mark; **Aset Logo**: 3–4 inline `<svg>` variants
(warna penuh, putih on `bg-primary`, monokrom) drawn with `currentColor`/token colors — a
concise "R" lettermark + "RelUX by KAI" wordmark; **Ruang Bebas** diagram (padding = 0.2×width);
**Ukuran Minimum** `PropsTable` (Digital 32px / Cetak 15mm / Favicon 16px); **Do/Hindari** `GuidelineCard` grid.

**`ColorsPage.tsx`** (Warna) — document only real tokens: **Token Semantik** card grid
(primary, primary-foreground, accent, secondary, muted, muted-foreground, background,
foreground, card, popover, border, input, ring, destructive) each = 48px swatch
`style={{ background: 'var(--primary)' }}` + name; **Warna Bagan (Chart)** row for
`--chart-1..5`; **Netral** for gray-50/white/black; **Token Status Dokumentasi** grid for the
additive `--status-*`/`--primary-soft`/`--accent-soft`; **Panduan** Do/Hindari + note that
color adapts automatically in dark mode. No fabricated 25–950 scales or sub-brands.

**`TypographyPage.tsx`** (Tipografi) — **Font Family** Inter specimen (weights 400/500/600/700);
**Skala Tipe** live preview applying real kit classes (`display-2xl` … `overline-2`) to a
sample string, with a `PropsTable` of class → intended use; **Token Ukuran** `PropsTable` for
`--text-xs … --text-3xl`; **Panduan** Do/Hindari.

**`StatePage.tsx`** — **Gambaran Umum** of canonical states; **Showcase** a `useState` tab
switcher (Tombol / Input) rendering default, hover (real `:hover`), focus (`ring-2 ring-ring`),
active (`active:scale-[0.98]`), disabled (`opacity-40 cursor-not-allowed`), loading (spinner +
"Memuat…"), error, success — all via semantic tokens; **Token State** `PropsTable`;
**Aksesibilitas** (`aria-disabled`, `aria-invalid`, `aria-busy`).

**`IconPage.tsx`** — uses `lucide-react` (new but supported convention). **Gambaran Umum**;
**Pencarian Ikon** `useState`-filtered grid over a curated static `ICON_CATALOG`
(~60 icons across categories, named imports for tree-shaking); **Ukuran** (16/20/24/32);
**Warna** (text-foreground/muted-foreground/accent/status tokens); **Penggunaan** `CodeBlock`;
brief note that `@mui/icons-material` is also available.

**`ButtonPage.tsx`** — mirrors `AccordionPage` structure. Define a local `Button` component
(plain `<button>`; `asChild` via `@radix-ui/react-slot`; props `variant`
primary/secondary/outline/ghost/destructive, `size` sm/md/lg, `disabled`, `loading`,
`leftIcon`/`rightIcon`) styled with semantic Tailwind utilities + `clsx`. Sections: Live
Preview (variant×size grid + icon/icon-only), Anatomi (`PropsTable`), Varian, Do/Hindari,
Aksesibilitas, Kode (`CodeTabs`), Props/API (`PropsTable`), Changelog (timeline like AccordionPage).

## Verification

1. Dev server already runs on `$PORT`; open each new section from the sidebar and confirm it renders.
2. Toggle dark mode (Header button) and confirm all new pages recolor via tokens.
3. `grep -rE '#[0-9a-fA-F]{3,6}' src/pages/` returns no matches in the new files (SVG uses tokens/currentColor).
4. Confirm icon search filters, Button variant×size grid has no overflow, and state showcase tab switch works.
5. Optional: run the project's typecheck/build only if a broad error surfaces.

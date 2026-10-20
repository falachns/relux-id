# Plan: RelUX Documentation — Logo, Color Token, Tipografi, State, Icon, Button

## Context

The RelUX by KAI design system documentation app already has three working pages
(Pengenalan, Getting Started, Accordion) and a nav with several "soon" stubs.
The user wants to build out five major new documentation sections in full detail:
**Logo, Color Token (Warna), State, Icon, and Component (Button)**,
plus **Tipografi** which is also stubbed in the nav.

All styling must use CSS variables from `@make-kits/design-system-kai-v-1/style.css`
(no raw hex values). The kit ships tokens only — no importable React components.
Navigation is state-based (`SectionId` in App.tsx), not URL-based.

---

## Kit Token Reference (used in all pages)

From `node_modules/@make-kits/design-system-kai-v-1/dist/style.css`:

**Semantic tokens**: `--primary #201e64`, `--accent #252271`, `--background`, `--foreground`,
`--muted`, `--muted-foreground`, `--border`, `--ring`, `--secondary`, `--radius 8px`

**Primitive palettes** (CSS var format `--colors/kai/primary/600` etc):
- KAI Primary (indigo): 25 → #e9e9f1 … 600 → #201e64 … 950 → #100e2f
- Sub-brands: ESA (#0b56a7), Bandara (#098ccc), Logistik (#252170), Commuter (#de251b),
  Service (#41ab42), Property (#e6690a), Pariwisata (#efa200) + each has a secondary
- Text semantic: `--colors/text/text-primary-(900)` #181d27, text-secondary #414651, etc.
- Border: `--colors/border/border-primary` #d5d7da
- Background: `--colors/background/bg-primary` #fff, bg-brand-solid, etc.
- Foreground: `--colors/foreground/fg-brand-primary-(600)`, fg-error, fg-success, etc.

**Typography classes** (pre-built): `.large-semibold`, `.h1-regular`, `.subtitle-1-bold`,
`.body-1-regular`, `.caption-regular`, `.overline-1-semibold`, etc.

**Spacing primitives** (unitless, as CSS vars):
`--spacing-xs: 4`, `--spacing-sm: 6`, `--spacing-md: 8`, `--spacing-lg: 12`,
`--spacing-xl: 16`, `--spacing-2xl: 20`, `--spacing-3xl: 24`, `--spacing-4xl: 32`,
`--spacing-5xl: 40`, `--spacing-6xl: 48`, `--spacing-7xl: 64`

**Radius primitives**: `--radius-xs: 4`, `--radius-sm: 6`, `--radius-md: 8`,
`--radius-lg: 10`, `--radius-xl: 12`, `--radius-2xl: 16`, `--radius-full: 9999`

**Elevation**: `--elevation-sm: 0px 1px 2px 0px #0a0d120d`

---

## Files to Create or Modify

### Modified files

**`src/lib/nav.ts`**
- Extend `SectionId` union to include all new navigable pages:
  `'warna' | 'tipografi' | 'logo' | 'icon' | 'state' | 'button'`
- In NAV, convert the stubs to navigable items (remove `soon: true`, add `section`):
  - Fondasi group: Warna → `section: 'warna'`, Tipografi → `section: 'tipografi'`
  - Keep Spacing and Radius & Shadow as `soon: true` for now
  - Add new group **"Merek"** above Fondasi: Logo (`section: 'logo'`)
  - Komponen group: Button → `section: 'button'` (remove `soon`), Icon → `section: 'icon'`
  - Add State as a new item in Komponen: `{ label: 'State', section: 'state' }`

**`src/App.tsx`**
- Import all 6 new page components
- Add conditional renders for each new SectionId in the page-rendering switch/if block

### New page files

| File | Section | Content summary |
|---|---|---|
| `src/pages/LogoPage.tsx` | Logo | Brand identity, SVG logo variants, usage rules, do/don't |
| `src/pages/ColorsPage.tsx` | Warna | Full color token catalog with swatches |
| `src/pages/TypographyPage.tsx` | Tipografi | Type scale, ramp, classes, usage |
| `src/pages/StatePage.tsx` | State | Component states with interactive demo |
| `src/pages/IconPage.tsx` | Icon | lucide-react icon catalog with search |
| `src/pages/ButtonPage.tsx` | Button | Full component doc: anatomy, variants, states, API |

---

## Page Content Specifications

### 1. LogoPage (`src/pages/LogoPage.tsx`)

Sections:
1. **Overview** — Explains RelUX brand mark, role in the KAI family
2. **Aset Logo** — Four variants shown as inline SVG cards:
   - `Warna Penuh` (Primary indigo on white)
   - `Putih` (White on `--primary` bg)
   - `Hitam` (Black/dark on white)
   - `Horizontal` (logo + wordmark side by side)
   
   Logo SVG: The "R" lettermark for RelUX. Since the kit exports a JS bundle (not an importable TSX), reproduce the logo as a concise inline `<svg>` — a bold navy-indigo "R" mark with "RelUX by KAI" wordmark underneath, using `--primary` and `--foreground` colors.

3. **Ruang Bebas (Clear Space)** — Diagram showing minimum padding = width × 0.2
4. **Ukuran Minimum** — Table: Digital 32px, Print 15mm, Favicon 16px
5. **Panduan Do/Hindari** — GuidelineCard grid (import the pattern from AccordionPage):
   - Do: use on approved backgrounds, maintain proportions
   - Hindari: stretch, recolor outside palette, add effects, use on clashing backgrounds

### 2. ColorsPage (`src/pages/ColorsPage.tsx`)

Sections:
1. **Token Warna Semantik** — 2-col card grid showing: primary, accent, secondary, muted,
   background, foreground, border, ring, destructive. Each card: swatch 48×48px + token name + hex.
   
2. **Palet KAI Utama** — Full 25–950 scale.
   Rendered as a horizontal swatch row with step label + hex + CSS var for each stop.
   
3. **Palet Sub-Brand** — Grid of 8 sub-brands (ESA, Bandara, Logistik, Commuter, Service,
   Property, Pariwisata, plus KAI main). Each brand card shows:
   - Brand name + logo color dot
   - Primary 500/600 swatch pair
   - Secondary 500 swatch
   - Hex values + CSS var names
   
4. **Token Teks** — PropsTable with columns: Token, Light, Dark, Usage.
   Rows: text-primary, text-secondary, text-tertiary, text-quaternary, text-brand-primary,
   text-error-primary, text-warning-primary, text-success-primary.
   
5. **Token Latar (Background)** — PropsTable: bg-primary, bg-secondary, bg-tertiary,
   bg-brand-primary, bg-brand-solid, bg-error-primary, bg-success-primary, bg-warning-primary.
   
6. **Token Batas (Border)** — PropsTable: border-primary, border-secondary, border-tertiary,
   border-brand, border-error.
   
7. **Palet Utilitas** — Compact grid showing the available utility palette families:
   gray, brand, error (red), warning (amber), success (green), blue, indigo, purple, orange.
   Each shows a compressed 50–700 swatch strip.

8. **Alpha Utilities** — Show alpha-white and alpha-black at 10%, 25%, 50%, 75%, 100%.

All swatches implemented as `<div>` with `style={{ background: 'var(--token-name)' }}`.
Where CSS vars use `/` in names (e.g. `--colors/kai/primary/600`), access via
`style={{ background: 'var(--colors\/kai\/primary\/600)' }}` (escape the slash) or define
wrapper custom properties in `src/index.css` for display-only use.

Actually, since CSS var names with `/` work fine in `var()` calls in modern CSS but are tricky
in JS template strings, define display-only aliases in `src/index.css` using the pattern:
```css
/* colors page display aliases */
--doc-kai-25: var(--colors\/kai\/primary\/25);
/* … */
```
No — simpler: use inline style `style={{ '--bg': 'var(...)' } as React.CSSProperties}` with
`className="..." style={{ background: 'var(--colors/kai/primary/600)' }}` — CSS slashes work
fine in `background: var(...)` directly in HTML/JSX style props.

### 3. TypographyPage (`src/pages/TypographyPage.tsx`)

Sections:
1. **Font Family** — Inter specimen card (pangram sentence, weights 400/500/600/700).
2. **Skala Tipe** — Table with columns: Kelas CSS, Ukuran, Tinggi Baris, Berat, Contoh.
   Live preview of each class applied to "Aa — Selamat datang di RelUX" in a
   `<span className="h1-semibold">` style.
   All 10 scale levels (large → overline-2) × 3 weights = 30 rows, grouped by level.
3. **Token Ukuran Font** — PropsTable: CSS var → px value for each `--font-size/text-xs` … `display-2xl`.
4. **Token Line Height** — Same for `--line-height/text-xs` … `display-2xl`.
5. **Panduan Penggunaan** — Do/Hindari cards: use scale classes, don't mix sizes arbitrarily,
   ensure sufficient contrast, use semibold for interactive labels.

### 4. StatePage (`src/pages/StatePage.tsx`)

Sections:
1. **Gambaran Umum State** — Explanation of the 8 canonical states in the system.
2. **Showcase Interaktif** — A tab switcher (Tombol | Input | Checkbox) showing all states
   for that component type. No external library: use local `useState` for tab.
   
   **Tombol (Button) states** — rendered side by side:
   - `Default`: `bg-primary` button
   - `Hover`: slightly lighter (use CSS `:hover` pseudo-class, not simulated)
   - `Focused`: `ring-2` focus ring using `--ring` color
   - `Active/Pressed`: scale(0.98) transform
   - `Disabled`: `opacity-40 cursor-not-allowed`
   - `Loading`: spinner icon + "Memuat…" text
   - `Error`: `bg-destructive` or red outline variant
   - `Success`: green bg using `--colors/background/bg-success-solid`
   
   **Input states** — show `<input>` with each state:
   - Default, Focus (border `--ring`), Error (border `fg-error-primary`), Disabled, Success

3. **Token State** — PropsTable mapping state → CSS token used:
   focus-ring → `--ring`, error-border → `--colors/border/border-error`, etc.
4. **Aksesibilitas** — Notes on aria-disabled, aria-invalid, aria-busy.

### 5. IconPage (`src/pages/IconPage.tsx`)

Uses `lucide-react` (already installed, v0.487.0). 

Sections:
1. **Gambaran Umum** — Explanation: the system uses lucide-react for UI icons.
2. **Pencarian Ikon** — Search input (`useState`) filtering a curated catalog of ~80 icons
   across 8 categories: Navigation, Action, Status, Communication, File, Media, User, Arrow.
   
   Icon grid: 6-col grid of cards. Each card: `<Icon size={24}/>` centered + name below.
   Active/selected card shows highlighted border using `--primary`.
   
3. **Ukuran Ikon** — Four size demos (16, 20, 24, 32px) for a single icon.
4. **Warna Ikon** — Show icon in: text-primary, text-secondary, text-brand, text-error, text-success.
5. **Penggunaan** — Code snippet showing `import { Home } from 'lucide-react'` + JSX.
6. **Ikon MUI** — Note that `@mui/icons-material` is also available for richer catalog.
   Brief import example.

Curated icon catalog (representative set):
- Navigation: Home, Menu, ChevronRight, ChevronDown, ArrowLeft, ArrowRight, X, MoreHorizontal
- Action: Plus, Minus, Search, Edit, Trash2, Copy, Download, Upload, Share, Settings, Filter, Sort
- Status: Check, CheckCircle, AlertCircle, AlertTriangle, Info, XCircle, Loader2, Clock
- Communication: Mail, MessageSquare, Bell, Phone
- File: File, FileText, Folder, FolderOpen
- Media: Image, Play, Pause, Volume2
- User: User, Users, UserPlus, LogIn, LogOut
- Arrow: ArrowUp, ArrowDown, ChevronsUpDown, ExternalLink

### 6. ButtonPage (`src/pages/ButtonPage.tsx`)

Follows the AccordionPage pattern exactly (same section structure).

Sections:
1. **Live Preview** — Grid of all variants:
   - Variant × Size: `primary`, `secondary`, `outline`, `ghost`, `destructive` × `sm`, `md`, `lg`
   - With/without leading icon (using lucide-react `Plus` or `ArrowRight`)
   - Icon-only variant (square)
   
   Implement `<Button>` as a local component in this file (using Radix `Slot` from
   `@radix-ui/react-slot` which is installed): supports `variant`, `size`, `disabled`, `loading`,
   `asChild` props. All styling via CSS custom properties and Tailwind utility classes.

2. **Anatomy** — PropsTable with columns: Bagian, Elemen, Deskripsi.
   Rows: Container, Label, Leading Icon, Trailing Icon, Loading Spinner.

3. **Varian** — Visual + written description of each variant and when to use.

4. **Do/Hindari** — GuidelineCard grid.

5. **Aksesibilitas** — aria-disabled, aria-label, keyboard navigation notes.

6. **Kode** — CodeTabs (React | HTML) showing Button usage.

7. **API / Props** — PropsTable: prop, type, default, description.
   Props: `variant`, `size`, `disabled`, `loading`, `asChild`, `leftIcon`, `rightIcon`.

8. **Changelog** — Timeline matching AccordionPage style.

---

## Implementation Notes

- `GuidelineCard` component: copy the local pattern from AccordionPage.tsx rather than
  re-exporting it. Keep each page self-contained to avoid cross-file coupling.
- All new pages export `default function XxxPage()` and use `<article>` root with existing
  `prose`-equivalent spacing classes already in the codebase.
- Colors page swatch divs: `style={{ background: 'var(--colors/kai/primary/600)' }}` works
  directly in JSX — no escaping needed. CSS custom property names with `/` are valid CSS.
- For the ColorPage, display aliases for the semantic tokens reuse the already-set
  `--primary`, `--accent`, etc. from the kit (no new CSS needed).
- Icon catalog: import only the used icons from `lucide-react` (named imports for tree-shaking).
  For the search grid, use a static `ICON_CATALOG` array of `{ name, component, category }`.
- ButtonPage `<Button>` component: render a `<button>` (not Radix Slot unless `asChild` is true).
  Use `clsx` or `tailwind-merge` (both installed) for conditional classes.

---

## nav.ts Updated SectionId

```typescript
export type SectionId =
  | 'introduction'
  | 'getting-started'
  | 'logo'          // NEW
  | 'warna'         // NEW (was soon)
  | 'tipografi'     // NEW (was soon)
  | 'accordion'
  | 'button'        // NEW (was soon)
  | 'state'         // NEW
  | 'icon';         // NEW
```

Nav groups after update:
- **Memulai**: Pengenalan (introduction), Getting Started (getting-started), Catatan Rilis (soon)
- **Merek**: Logo (logo) — NEW GROUP
- **Fondasi**: Warna (warna), Tipografi (tipografi), Spacing (soon), Radius & Shadow (soon)
- **Komponen**: Accordion (accordion), Button (button), State (state), Icon (icon), Card (soon), Modal (soon)

---

## Verification

1. Run the existing dev server (already running on $PORT) and navigate to each new section via the sidebar.
2. Check dark mode toggle applies correct token values to all new pages.
3. Verify no raw hex values in new page files (`grep -r '#[0-9a-fA-F]{3,6}' src/pages/` should return zero matches in new files).
4. Confirm icon search filters correctly and code snippets are copyable.
5. Check the color swatches render correctly in both light and dark mode.
6. Verify the Button component demo shows all variant × size combinations without layout overflow.

# Context

The user wants the RelUX design system documentation app to fully cover everything the `@make-kits/design-system-kai-v-1` kit actually provides. After reading the kit's `dist/style.css` completely and comparing it against every current page, significant content is missing across Colors, Typography, and Spacing. The goal is to bring the documentation into full alignment with the kit's token system.

---

## Gaps Found (Kit vs. App)

### 1. ColorsPage.tsx — major gaps

**Currently documented:**
- 14 semantic tokens (`--primary`, `--secondary`, etc.)
- 5 chart tokens
- 3 neutrals (white, gray-50, black — not even from the kit)
- 4 doc-only status tokens

**Missing from the kit:**
1. **KAI Primary full palette** — 10 steps: 25 (#e9e9f1) → 50 → 100 → 200 → 300 → 400 → 500 (#252271) → **600 (#201e64, primary)** → 700 → 800 → 900 → 950 (#100e2f)
2. **KAI Secondary palette** — orange: 500 (#f06a25), 600 (#d35e22), 700 (#b6511e)
3. **7 sub-brand palettes** (each has Primary + Secondary):
   - ESA: Primary blue (#0b56a7), Secondary amber (#f08201)
   - Bandara: Primary sky (#098ccc), Secondary teal (#2ba5bb)
   - Logistik: Primary indigo (#252170), Secondary amber (#ff9b00)
   - Commuter: Primary red (#de251b), Secondary teal-green (#286f6c)
   - Service: Primary green (#41ab42), Secondary violet (#7e32f9)
   - Property: Primary burnt-orange (#e6690a), Secondary purple (#833ccd)
   - Pariwisata: Primary golden (#efa200), Secondary magenta (#d717a7)
4. **Semantic text tokens** — `--colors/text/text-primary` (#181d27), secondary (#414651), tertiary (#535862), quaternary/disabled (#717680), error (#d92d20), warning (#dc6803), success (#079455)
5. **Semantic border tokens** — primary (#d5d7da), secondary (#e9eaeb), tertiary (#f5f5f5), error (#f04438)
6. **Semantic background tokens** — primary (#fff), secondary (#fafafa), tertiary (#f5f5f5), quaternary (#e9eaeb), error (#fef3f2), warning (#fffaeb), success (#ecfdf3)
7. **Alpha tokens** — `--component-colors/alpha/alpha-white-10` … `alpha-black-100` (10 increments each)
8. **`--stroke-card`** (#0000001a) and **`--primary-digisign`** (#052a66)
9. **`--elevation-sm`** shadow token (currently only on RadiusPage, should also be referenced here or on its own section)

### 2. TypographyPage.tsx — Mobile/App scale entirely missing

The kit ships **two** type systems. The current page only documents the web display scale. The mobile/app scale is completely absent:

| Class | Size | Line Height |
|---|---|---|
| `.large-*` | 36px | 40px |
| `.h1-*` | 24px | 28–34px |
| `.h2-*` | 20px | 24px |
| `.subtitle-1-*` | 18px | 20px |
| `.subtitle-2-*` | 16px | 20px |
| `.body-1-*` | 14px | 20px |
| `.body-2-*` | 13px | 16–20px |
| `.caption-*` | 12px | 16px |
| `.overline-1-*` | 10px | 12px |
| `.overline-2-*` | 9px | 12px |

Weight variants: `-regular`, `-semibold`, `-bold` (and `-medium` where applicable).

The web display scale (`.display-2xl-*` … `.text-xs-*`) is documented, but needs the `-medium` weight variant added (it's currently not shown).

### 3. SpacingPage.tsx — Container & Width tokens entirely missing

The kit defines:
```
--container-padding-mobile: 16px
--container-padding-desktop: 32px
--container-max-width-desktop: 1280px
--paragraph-max-width: 720px
--width-xxs: 320px  --width-xs: 384px  --width-sm: 480px  --width-md: 560px
--width-lg: 640px   --width-xl: 768px  --width-2xl: 1024px --width-3xl: 1280px
--width-4xl: 1440px --width-5xl: 1600px --width-6xl: 1920px
```

These need a new **"Token Lebar & Kontainer"** section in SpacingPage.

---

## Implementation Plan

### File 1: `src/pages/ColorsPage.tsx`

Add 5 new `<Section>` blocks after the existing "Warna Bagan" section:

1. **Palet Merek KAI** — `<Section title="Palet Merek KAI">`: Two sub-groups:
   - KAI Primary: 12 swatches (25→950) with var names like `--kai-primary-600`
   - KAI Secondary: 3 swatches (500/600/700)

2. **Palet Sub-merek** — `<Section title="Palet Sub-merek">`: 7 brand rows, each with Primary + Secondary swatch pair. Use a 2-col grid per brand (brand name label + 2 swatches). Render via CSS inline style since these are static hex values from the kit.

3. **Token Teks & Border** — `<Section title="Token Teks & Border">`: Two PropsTable blocks:
   - Text tokens (7 rows): token name, hex value, usage
   - Border tokens (4 rows): token name, hex value, usage

4. **Token Latar (Background)** — `<Section title="Token Latar">`: PropsTable (7 rows) for background tokens + add stroke-card and primary-digisign.

5. **Token Alpha** — `<Section title="Token Alpha">`: Compact grid showing alpha-white (10–100%) and alpha-black (10–100%) as semi-transparent swatches over a checkered background.

### File 2: `src/pages/TypographyPage.tsx`

- **Rename** the existing "Skala Tipe" section to "Skala Tipe — Web" to make the distinction clear.
- **Add new section** "Skala Tipe — Mobile & App" after it, documenting all 10 mobile classes (large, h1, h2, subtitle-1/2, body-1/2, caption, overline-1/2) with the same live-preview row format used for the web scale.
- **Add `-medium` variant** to the web display scale row table in the "Kegunaan Kelas" PropsTable.
- Update the "Token Ukuran Font" PropsTable to mention which scale each token belongs to.

### File 3: `src/pages/SpacingPage.tsx`

- **Add new `<Section title="Token Lebar & Kontainer">`** before the "Prinsip Spacing" section.
- Show a PropsTable with:
  - 4 container tokens (container-padding-mobile, container-padding-desktop, container-max-width-desktop, paragraph-max-width) with values and usage notes
  - 11 width tokens (width-xxs through width-6xl) with px values and typical use cases (modal widths, sidebar widths, page max-widths, breakpoint references)

---

## Critical Files to Modify

- `src/pages/ColorsPage.tsx` — largest change, 5 new sections
- `src/pages/TypographyPage.tsx` — add mobile scale section + medium variant
- `src/pages/SpacingPage.tsx` — add container/width token section

## Files to Leave Unchanged

- `src/pages/RadiusPage.tsx` — radius tokens are complete; elevation-sm is correctly documented here
- `src/pages/AccordionPage.tsx`, `ButtonPage.tsx`, `StatePage.tsx`, `IconPage.tsx` — complete
- `src/pages/Introduction.tsx`, `GettingStarted.tsx`, `LogoPage.tsx` — not relevant to token docs
- `src/lib/nav.ts` — no new nav entries needed (all changes are within existing sections)

## Styling Rules

- All new swatches rendered via `style={{ background: 'var(--token-name)' }}` for semantic tokens, or `style={{ background: '#hexvalue' }}` for brand palette colors (which are exposed as CSS vars in the kit but not always as Tailwind utilities)
- No raw hex in className — only in inline style when the token is a brand palette step (e.g. `--kai-primary-600` is available but Tailwind `bg-primary-600` may not be)
- Typography previews use the actual kit class names (`.body-1-regular`, `.h2-semibold`, etc.) applied via `className`
- PropsTable used for tabular data; swatch grids for visual palette previews — match the existing patterns in ColorsPage

## Verification

After implementation: visually check each new section in the preview — swatches should render actual colors (not transparent), typography previews should show the correct size/weight, and width token table should list all 11 entries. Confirm no section has raw hex values outside of inline `style` attributes.

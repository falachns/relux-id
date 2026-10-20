# RelUX Design System — Documentation Site

## Context
PT KAI's design team has a Figma design system (**RelUX**, based on the UntitledUI kit), but
developer implementations drift from the design because there's no central, code-ready source of
truth or usage documentation (see `src/imports/PRD-RelUX-Design-System-App.md`). This task builds the
**documentation web app** that renders that system — the MVP surface described in the PRD (component
library + live preview + code snippets + tokens + usage guidelines), inspired by the Qiscus UI and
INA Digital design-system docs.

Scope for this task: the three deliverables the user asked for, branded as RelUX:
1. **Pengenalan / Introduction** — purpose & scope (drawn from the PRD's background, goals, personas).
2. **Getting Started** — setup & usage overview (install, import tokens, use a component).
3. **Accordion** component page — anatomy, usage guidelines (do/don't), and code snippets, as the
   exemplar template every future component page will follow.

**Environment note:** the PRD names Laravel/Blade as the eventual stack, but this workspace is
React 19 + Vite + Tailwind v4. Per the user's direction, **this pass focuses on the component design**
(visual documentation + real live preview + anatomy + usage); the Laravel Blade snippet variant is
deferred to a later pass. For now the Accordion shows **React/HTML + CSS** snippets, with the
`CodeTabs` wrapper structured so a Blade tab can be dropped in later without rework.

Per the user's earlier choice, navigation is a **single-page tabbed layout** — persistent sidebar +
in-page section switching via React state, no router dependency. UI copy is **Indonesian** to match
the KAI internal audience (matching the INA Digital reference), with technical terms in English.

## Aesthetic stance
Clean, modern **technical-editorial** docs with KAI brand identity. KAI's palette is a deep
railway **blue** primary with an **orange** accent. One memorable move: a transitional **serif** for
page titles against a clean sans body and a mono for code/tokens/kbd — keeps it from reading as
generic SaaS while staying authoritative and government-grade.

- Fonts (Google, `@import` at very top of `src/index.css`): **Fraunces** (serif titles) + **Inter**
  (body/UI) + **JetBrains Mono** (code/tokens).
- Tokens in `src/index.css` (Tailwind v4 `:root` + `.dark` + `@theme inline`): background, foreground,
  card, muted, border, ring, radius, **primary = KAI blue**, **accent = KAI orange**, plus semantic
  status colors (stable/beta/deprecated). Wire `.dark` to the header theme toggle.

## Implementation

Blank scaffold (`src/App.tsx`); build the feature under `src/`. Leave `main.tsx`/`index.html` as-is.

### Files
- `src/index.css` — font imports (first), RelUX tokens (`:root`/`.dark`), `@theme inline` mapping,
  base body styles, scroll-only scrollbar.
- `src/App.tsx` — shell rendering `<DocsLayout>`; holds `activeSection` + `theme` state.
- `src/components/docs/DocsLayout.tsx` — CSS Grid shell (Header + Sidebar + main); sidebar collapses
  to a drawer below ~1000px.
- `src/components/docs/Header.tsx` — RelUX wordmark + "by KAI" lockup, a working search field that
  filters sidebar items (PRD §5.6), theme toggle.
- `src/components/docs/Sidebar.tsx` — grouped nav (Memulai / Fondasi / Komponen). Introduction,
  Getting Started, Accordion wired live; other items disabled with a `soon` marker. Active item gets
  accent left-rule.
- `src/components/docs/CodeBlock.tsx` — mono block, language label, copy button (`navigator.clipboard`,
  copied state) — PRD §5.1/§5.2.
- `src/components/docs/CodeTabs.tsx` — tabbed wrapper (CSS | Blade | React) over `CodeBlock`.
- `src/components/docs/PropsTable.tsx` — hairline table for anatomy/props/tokens.
- `src/components/docs/StatusBadge.tsx` — stable/beta/deprecated pill (PRD §5.5).
- `src/pages/Introduction.tsx` — purpose, the problem (design drift), scope in/out, personas grid,
  design principles.
- `src/pages/GettingStarted.tsx` — install/import steps (CSS custom properties + component), usage
  overview, next-steps cards.
- `src/pages/Accordion.tsx` — exemplar page (structure below).
- `src/components/ui/Accordion.tsx` — real, keyboard-accessible accordion (aria-expanded, Enter/Space,
  single/multi open) used for the live preview AND described by the docs, so snippets stay truthful.

### Accordion page structure (the exemplar template)
- Header: serif "Accordion" title, one-line description, `StatusBadge` (stable) + version + last-updated.
- **Live preview** panel — working React `Accordion` on a subtle card.
- **Anatomy** — labelled parts (Root, Item, Trigger, Icon, Panel) via `PropsTable`.
- **Usage guidelines** — Do / Don't two columns with check/cross markers + accessibility notes
  (contrast, click-target size) per PRD §5.4.
- **Code** — `CodeTabs`: React usage + CSS classes now (Blade tab deferred, wrapper ready for it).
- **Props / API** — `PropsTable` (prop, type, default, description).
- **Changelog** — small version history list (PRD §5.5).
- Footer prev/next links.

### Conventions
- Style only with Tailwind utilities bound to the CSS tokens (`bg-background`, `text-foreground`,
  `text-primary`, `border-border`, …). No inline styles; no unlayered `*` reset.
- Component data (name/category/status/version) kept in a small typed array so adding components later
  needs no structural change (PRD maintainability §6).
- Realistic Indonesian placeholder copy (real FAQ content), no lorem ipsum.
- No new runtime dependencies (React state only; no router).

## Verification
- Dev server already runs on `$PORT`; confirm in the preview panel:
  - Sidebar switches Introduction / Getting Started / Accordion; search filters items.
  - Accordion preview expands/collapses via mouse + keyboard (focus ring visible).
  - Code tabs switch; copy buttons work; theme toggle flips light/dark.
  - Layout reflows below ~1000px (sidebar → drawer).
- Optional `pnpm build` only if a broad TS/Tailwind issue is suspected.

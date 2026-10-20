import { useState } from 'react'
import { Section } from '../components/docs/Section'
import { PropsTable } from '../components/docs/PropsTable'
import { PageHeader } from '../components/docs/PageHeader'
import { TokenDownloadBar } from '../components/docs/TokenDownloadBar'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type SpacingToken = {
  name: string
  suffix: string
  value: number
  usage: string
}

const SPACING_TOKENS: SpacingToken[] = [
  { name: '--spacing-none', suffix: 'none', value: 0, usage: 'Tanpa jarak; elemen berhimpitan.' },
  { name: '--spacing-xxs', suffix: 'xxs', value: 2, usage: 'Jarak antar ikon & label.' },
  { name: '--spacing-xs', suffix: 'xs', value: 4, usage: 'Padding badge, tag kecil.' },
  { name: '--spacing-sm', suffix: 'sm', value: 6, usage: 'Gap antar elemen inline.' },
  { name: '--spacing-md', suffix: 'md', value: 8, usage: 'Padding tombol kompak, gap ikon.' },
  { name: '--spacing-lg', suffix: 'lg', value: 12, usage: 'Padding internal kartu kecil.' },
  { name: '--spacing-xl', suffix: 'xl', value: 16, usage: 'Padding kartu standar, gap seksi.' },
  { name: '--spacing-2xl', suffix: '2xl', value: 20, usage: 'Margin antar komponen.' },
  { name: '--spacing-3xl', suffix: '3xl', value: 24, usage: 'Padding section, gap baris.' },
  { name: '--spacing-4xl', suffix: '4xl', value: 32, usage: 'Margin blok konten.' },
  { name: '--spacing-5xl', suffix: '5xl', value: 40, usage: 'Padding halaman mobile.' },
  { name: '--spacing-6xl', suffix: '6xl', value: 48, usage: 'Spasi antar seksi utama.' },
  { name: '--spacing-7xl', suffix: '7xl', value: 64, usage: 'Hero section padding vertikal.' },
  { name: '--spacing-8xl', suffix: '8xl', value: 80, usage: 'Whitespace layout besar.' },
  { name: '--spacing-9xl', suffix: '9xl', value: 96, usage: 'Padding halaman desktop lebar.' },
  { name: '--spacing-10xl', suffix: '10xl', value: 128, usage: 'Jarak antar modul halaman.' },
  { name: '--spacing-11xl', suffix: '11xl', value: 160, usage: 'Whitespace maksimum skala besar.' },
]

type PageCopy = {
  title: string
  category: string
  description: string
  tokensTitle: string
  tokensDesc: string
  tokenColumnToken: string
  tokenColumnValue: string
  tokenColumnVisual: string
  tokenColumnUsage: string
  howToUseTitle: string
  customPropsTitle: string
  visualDemoTitle: string
  containerWidthTitle: string
  containerWidthDesc: string
  containerSubTitle: string
  refWidthSubTitle: string
  visualWidthTitle: string
  principlesTitle: string
  principles: string[]
}

const COPY = {
  id: {
    title: 'Spacing',
    category: 'Fondasi',
    description: 'RelUX mendefinisikan 17 token spacing dari kit KAI v1 — skala geometris yang konsisten dari 0 hingga 160px. Token ini mengatur padding, margin, dan gap di seluruh sistem.',
    tokensTitle: 'Token spacing',
    tokensDesc: 'Semua token spacing tersedia sebagai CSS custom properties. Gunakan dengan calc(var(--spacing-xl) * 1px) atau lewat Tailwind kelas yang sesuai.',
    tokenColumnToken: 'Token',
    tokenColumnValue: 'Nilai',
    tokenColumnVisual: 'Visual',
    tokenColumnUsage: 'Kegunaan',
    howToUseTitle: 'Cara pakai',
    customPropsTitle: 'CSS Custom Properties',
    visualDemoTitle: 'Demo Visual — Nested Spacing',
    containerWidthTitle: 'Token lebar & kontainer',
    containerWidthDesc: 'Token lebar dan kontainer mengatur tata letak halaman secara makro — lebar kolom konten, padding responsif, dan breakpoint referensi.',
    containerSubTitle: 'Kontainer',
    refWidthSubTitle: 'Lebar Referensi',
    visualWidthTitle: 'Visualisasi Lebar Relatif',
    principlesTitle: 'Prinsip spacing',
    principles: [
      'Jarak intra-grup vs inter-grup: Jarak antar elemen dalam satu grup (<=md) harus lebih kecil dari jarak antar grup (>=lg).',
      'Konsistensi skala: Pilih token dari skala ini, bukan nilai arbitrary.',
      'Touch target: Kontrol interaktif memerlukan area minimal 44×44px pada mobile. Gunakan padding tambahan lewat token spacing bila ukuran visual elemen lebih kecil.',
    ],
  },
  en: {
    title: 'Spacing',
    category: 'Foundation',
    description: 'RelUX defines 17 canonical spacing tokens from KAI kit v1 — a consistent geometric scale from 0 to 160px. These tokens govern padding, margins, and layout gaps across the system.',
    tokensTitle: 'Spacing tokens',
    tokensDesc: 'All spacing tokens are accessible as CSS custom properties. Consume via calc(var(--spacing-xl) * 1px) or matching Tailwind utility classes.',
    tokenColumnToken: 'Token',
    tokenColumnValue: 'Value',
    tokenColumnVisual: 'Visual',
    tokenColumnUsage: 'Usage',
    howToUseTitle: 'How to use',
    customPropsTitle: 'CSS Custom Properties',
    visualDemoTitle: 'Visual Demo — Nested Spacing',
    containerWidthTitle: 'Width & container tokens',
    containerWidthDesc: 'Width and container tokens govern macro layouts — content column widths, responsive paddings, and layout breakpoints.',
    containerSubTitle: 'Containers',
    refWidthSubTitle: 'Reference Widths',
    visualWidthTitle: 'Relative Width Visualization',
    principlesTitle: 'Spacing principles',
    principles: [
      'Intra-group vs inter-group distance: Gaps within an element cluster (<=md) should always be smaller than gaps between distinct clusters (>=lg).',
      'Scale consistency: Adhere strictly to canonical tokens rather than introducing arbitrary values.',
      'Touch target: Interactive controls require a minimum 44×44px hit target on mobile screens. Add padding via spacing tokens when visual elements are smaller.',
    ],
  },
} satisfies Localized<PageCopy>

export function SpacingPage({
  onNavigate,
}: {
  onNavigate?: (section: SectionId) => void
}) {
  const t = useLocalized(COPY)

  return (
    <article className="mx-auto max-w-3xl">
      <PageHeader
        category={t.category}
        title={t.title}
        status="stable"
        description={t.description}
      />

      <TokenDownloadBar />

      <Section id="spacing-tokens" title={t.tokensTitle}>
        <p className="mb-5 text-sm text-muted-foreground">{t.tokensDesc}</p>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">{t.tokenColumnToken}</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">{t.tokenColumnValue}</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">{t.tokenColumnVisual}</th>
                <th className="hidden px-4 py-3 text-left font-medium text-foreground sm:table-cell">{t.tokenColumnUsage}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {SPACING_TOKENS.map((token) => (
                <tr key={token.name} className="group hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <code className="font-mono text-sm text-primary">
                      {token.name}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm tabular-nums text-muted-foreground">
                      {token.value}px
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex h-5 items-center">
                      {token.value === 0 ? (
                        <div className="h-4 w-px rounded-full bg-border" />
                      ) : (
                        <div
                          className="h-4 rounded-sm bg-primary/25 ring-1 ring-inset ring-primary/20"
                          style={{
                            width: `calc(var(--spacing-${token.suffix}) * 1px)`,
                            minWidth: '2px',
                          }}
                        />
                      )}
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-muted-foreground sm:table-cell">
                    {token.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="how-to-use" title={t.howToUseTitle}>
        <div className="space-y-6">
          {/* Caliper Diagram Specimen (PRD §5.4 / Untitled UI) */}
          <CaliperSpecimen />

          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="mb-3 text-sm font-semibold text-foreground">
              {t.customPropsTitle}
            </p>
            <pre className="overflow-x-auto rounded-lg relux-code-surface p-4 font-mono text-xs sm:text-sm text-background">
{`.card {
  padding: calc(var(--spacing-xl) * 1px);  /* 16px */
  gap: calc(var(--spacing-md) * 1px);      /* 8px */
  margin-bottom: calc(var(--spacing-3xl) * 1px); /* 24px */
}`}
            </pre>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <p className="mb-3 text-sm font-semibold text-foreground">
              {t.visualDemoTitle}
            </p>
            <div className="flex items-start gap-4 flex-wrap">
              {[
                { suffix: 'sm', value: 6, label: 'sm' },
                { suffix: 'md', value: 8, label: 'md' },
                { suffix: 'lg', value: 12, label: 'lg' },
                { suffix: 'xl', value: 16, label: 'xl' },
                { suffix: '2xl', value: 20, label: '2xl' },
                { suffix: '3xl', value: 24, label: '3xl' },
              ].map((item) => (
                <div key={item.suffix} className="flex flex-col items-center gap-1.5">
                  <div
                    className="rounded-lg bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center transition-transform hover:scale-105"
                    style={{
                      width: `calc(var(--spacing-${item.suffix}) * 1px + 28px)`,
                      height: `calc(var(--spacing-${item.suffix}) * 1px + 28px)`,
                    }}
                  >
                    <div className="size-3.5 rounded bg-primary/50" />
                  </div>
                  <span className="font-mono text-xs font-medium text-foreground">
                    {item.label}
                  </span>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    {item.value}px
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="width-container" title={t.containerWidthTitle}>
        <p className="mb-4">{t.containerWidthDesc}</p>

        <p className="mb-2 text-sm font-medium text-foreground">{t.containerSubTitle}</p>
        <PropsTable
          columns={[
            { key: 'token', header: 'Token CSS', mono: true },
            { key: 'nilai', header: 'Nilai', mono: true },
            { key: 'usage', header: 'Penggunaan' },
          ]}
          rows={[
            { token: '--container-padding-mobile', nilai: '16px', usage: 'Padding kiri/kanan konten di viewport mobile.' },
            { token: '--container-padding-desktop', nilai: '32px', usage: 'Padding kiri/kanan konten di viewport desktop.' },
            { token: '--container-max-width-desktop', nilai: '1280px', usage: 'Lebar maksimum wrapper halaman (= width-3xl).' },
            { token: '--paragraph-max-width', nilai: '720px', usage: 'Lebar maksimum kolom teks body untuk kenyamanan baca.' },
          ]}
        />

        <p className="mb-2 mt-6 text-sm font-medium text-foreground">{t.refWidthSubTitle}</p>
        <PropsTable
          columns={[
            { key: 'token', header: 'Token CSS', mono: true },
            { key: 'nilai', header: 'Nilai', mono: true },
            { key: 'usage', header: 'Tipikal Penggunaan' },
          ]}
          rows={[
            { token: '--width-xxs', nilai: '320px', usage: 'Dialog kecil, sheet konfirmasi.' },
            { token: '--width-xs', nilai: '384px', usage: 'Sidebar compact, panel samping.' },
            { token: '--width-sm', nilai: '480px', usage: 'Modal kecil, form login.' },
            { token: '--width-md', nilai: '560px', usage: 'Modal standar, drawer medium.' },
            { token: '--width-lg', nilai: '640px', usage: 'Kolom teks utama (≈ paragraph-max-width).' },
            { token: '--width-xl', nilai: '768px', usage: 'Konten utama tablet.' },
            { token: '--width-2xl', nilai: '1024px', usage: 'Layout dua kolom, tabel lebar.' },
            { token: '--width-3xl', nilai: '1280px', usage: 'Container halaman desktop (= container-max-width).' },
            { token: '--width-4xl', nilai: '1440px', usage: 'Layout desktop lebar / fullwidth.' },
            { token: '--width-5xl', nilai: '1600px', usage: 'Dashboard wide-screen.' },
            { token: '--width-6xl', nilai: '1920px', usage: '4K / ultra-wide breakpoint.' },
          ]}
        />

        <div className="mt-5 overflow-hidden rounded-lg border border-border bg-card p-5">
          <p className="mb-3 text-sm font-medium text-foreground">{t.visualWidthTitle}</p>
          <div className="space-y-2">
            {[
              { label: 'xxs', px: 320 }, { label: 'xs', px: 384 },
              { label: 'sm', px: 480 }, { label: 'md', px: 560 },
              { label: 'lg', px: 640 }, { label: 'xl', px: 768 },
              { label: '2xl', px: 1024 }, { label: '3xl', px: 1280 },
            ].map((w) => (
              <div key={w.label} className="flex items-center gap-3">
                <span className="w-8 shrink-0 font-mono text-xs text-muted-foreground">{w.label}</span>
                <div
                  className="h-5 rounded-sm bg-primary/20 ring-1 ring-inset ring-primary/30"
                  style={{ width: `${(w.px / 1280) * 100}%`, minWidth: '4px' }}
                />
                <span className="font-mono text-xs tabular-nums text-muted-foreground/70">{w.px}px</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="principles" title={t.principlesTitle}>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {t.principles.map((p, idx) => (
            <li key={idx}>{p}</li>
          ))}
        </ul>
      </Section>
    </article>
  )
}

function CaliperSpecimen() {
  const [selectedIdx, setSelectedIdx] = useState<number>(4) // default to --spacing-md (8px)
  const activeToken = SPACING_TOKENS[selectedIdx] || SPACING_TOKENS[4]
  const remValue = (activeToken.value / 16).toFixed(3)

  return (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-sm text-foreground">
            Diagram Caliper Terukur (Caliper Specimen)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Pilih token untuk mengamati dimensi bentang caliper dan perbandingan skala relatif.
          </p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="rounded-md bg-primary/10 border border-primary/20 px-2 py-0.5 font-semibold text-primary">
            {activeToken.name}
          </span>
          <span className="rounded-md bg-muted border border-border/60 px-2 py-0.5 text-foreground font-semibold">
            {activeToken.value}px
          </span>
        </div>
      </div>

      {/* Pill selector */}
      <div className="flex flex-wrap gap-1.5">
        {SPACING_TOKENS.filter((t) => [2, 4, 8, 12, 16, 20, 24, 32, 48, 64, 80].includes(t.value)).map((token) => (
          <button
            key={token.name}
            type="button"
            onClick={() => setSelectedIdx(SPACING_TOKENS.findIndex((t) => t.name === token.name))}
            className={`rounded-md px-2.5 py-1 font-mono text-xs transition-all active:scale-[0.98] ${
              activeToken.name === token.name
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {token.suffix} ({token.value}px)
          </button>
        ))}
      </div>

      {/* Caliper measurement stage */}
      <div className="rounded-xl border border-border/70 bg-muted/20 p-5 overflow-hidden">
        <div className="space-y-2">
          {/* Caliper Bracket */}
          <div
            className="flex items-center text-primary transition-all duration-300"
            style={{ width: `${Math.max(activeToken.value * 3.5, 48)}px`, minWidth: '48px', maxWidth: '100%' }}
          >
            {/* Left tick */}
            <div className="h-5 w-0.5 bg-primary rounded-full shrink-0" />
            {/* Center line with badge */}
            <div className="relative flex-1 h-0.5 bg-primary mx-0.5 flex items-center justify-center">
              <span className="absolute -top-3.5 bg-card border border-primary/40 rounded px-1.5 py-0.5 font-mono text-xs leading-none font-bold text-primary shadow-xs whitespace-nowrap">
                {activeToken.value}px · {remValue}rem
              </span>
            </div>
            {/* Right tick */}
            <div className="h-5 w-0.5 bg-primary rounded-full shrink-0" />
          </div>

          {/* Bar fill */}
          <div
            className="h-8 rounded-lg bg-primary/20 border border-primary/35 flex items-center px-3 transition-all duration-300 shadow-inner"
            style={{ width: `${Math.max(activeToken.value * 3.5, 48)}px`, minWidth: '48px', maxWidth: '100%' }}
          >
            <span className="font-mono text-xs font-semibold text-primary truncate">
              {activeToken.name}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span><strong className="text-foreground">Konteks Penggunaan:</strong> {activeToken.usage}</span>
          <span className="font-mono text-xs text-muted-foreground/80">calc(var({activeToken.name}) * 1px)</span>
        </div>
      </div>
    </div>
  )
}

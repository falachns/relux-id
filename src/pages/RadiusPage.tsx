import { useState } from 'react'
import { Section } from '../components/docs/Section'
import { PageHeader } from '../components/docs/PageHeader'
import { TokenDownloadBar } from '../components/docs/TokenDownloadBar'
import { KIT_TOKENS } from '../generated/kit-catalog'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type RadiusToken = {
  name: string
  suffix: string
  value: number | 'full'
  usage: string
}

const RADIUS_TOKENS: RadiusToken[] = [
  { name: '--radius-none', suffix: 'none', value: 0, usage: 'Kotak tegas, tabel, separator.' },
  { name: '--radius-xxs', suffix: 'xxs', value: 2, usage: 'Badge kecil, chip.' },
  { name: '--radius-xs', suffix: 'xs', value: 4, usage: 'Input, tag kompak.' },
  { name: '--radius-sm', suffix: 'sm', value: 6, usage: 'Elemen inline, tooltip.' },
  { name: '--radius-md', suffix: 'md', value: 8, usage: 'Base token sistem (--radius). Kartu, tombol.' },
  { name: '--radius-lg', suffix: 'lg', value: 10, usage: 'Kartu elevated, dropdown.' },
  { name: '--radius-xl', suffix: 'xl', value: 12, usage: 'Panel, modal sheet.' },
  { name: '--radius-2xl', suffix: '2xl', value: 16, usage: 'Dialog, drawer.' },
  { name: '--radius-3xl', suffix: '3xl', value: 20, usage: 'Surface besar, hero card.' },
  { name: '--radius-4xl', suffix: '4xl', value: 24, usage: 'Container ekspresif.' },
  { name: '--radius-full', suffix: 'full', value: 'full', usage: 'Pill, avatar, badge bulat.' },
]

type PageCopy = {
  title: string
  category: string
  description: string
  radiusTokensTitle: string
  radiusTokensDesc: string
  effectsTitle: string
  effectsDesc: string
  radiusTableTitle: string
  tokenHeader: string
  valueHeader: string
  usageHeader: string
  elevationTitle: string
  elevationDesc: string
  subtleShadowDesc: string
  cssUsageTitle: string
  principlesTitle: string
  principles: string[]
}

const COPY = {
  id: {
    title: 'Radius & Shadow',
    category: 'Fondasi',
    description: '11 token radius mendefinisikan karakter bentuk RelUX — dari sudut tajam hingga pill. Dikombinasikan dengan token shadow elevation-sm untuk kedalaman halus.',
    radiusTokensTitle: 'Token border radius',
    radiusTokensDesc: 'Token radius tersedia sebagai angka dimensionless di CSS. Gunakan dengan calc(var(--radius-xl) * 1px) untuk mendapatkan nilai pixel.',
    effectsTitle: 'Katalog shadow & effects',
    effectsDesc: 'Seluruh token effects yang diekspor Make Kit, termasuk shadow komponen dan portfolio mockup.',
    radiusTableTitle: 'Token tabel',
    tokenHeader: 'Token',
    valueHeader: 'Nilai',
    usageHeader: 'Kegunaan',
    elevationTitle: 'Shadow elevasi',
    elevationDesc: 'Kit mendefinisikan satu token shadow untuk kedalaman permukaan.',
    subtleShadowDesc: 'Shadow halus untuk kartu dan panel yang perlu membedakan diri dari latar belakang tanpa tampil terlalu menonjol.',
    cssUsageTitle: 'Penggunaan CSS',
    principlesTitle: 'Prinsip radius',
    principles: [
      'Concentric radius: Radius luar = radius dalam + padding. Gunakan token satu tingkat lebih kecil untuk elemen di dalam.',
      'Token base (--radius-md = 8px): Ini adalah --radius sistem. Kartu, tombol, dan input standar memakai nilai ini.',
      'Radius > xl untuk ekspresi: Token 2xl–4xl hanya untuk surface ekspresif seperti hero, ilustrasi, atau onboarding cards.',
    ],
  },
  en: {
    title: 'Radius & Shadow',
    category: 'Foundation',
    description: '11 radius tokens establish the shape identity of RelUX — ranging from crisp corners to full pills, complemented by elevation-sm shadow for subtle surface depth.',
    radiusTokensTitle: 'Border radius tokens',
    radiusTokensDesc: 'Radius tokens are declared as dimensionless units in CSS. Consume via calc(var(--radius-xl) * 1px) for computed pixel values.',
    effectsTitle: 'Shadow & effects catalog',
    effectsDesc: 'All effects tokens exported by Make Kit, encompassing component shadows and surface elevations.',
    radiusTableTitle: 'Token table',
    tokenHeader: 'Token',
    valueHeader: 'Value',
    usageHeader: 'Usage',
    elevationTitle: 'Elevation shadow',
    elevationDesc: 'The kit defines canonical shadow tokens for surface layering and spatial hierarchy.',
    subtleShadowDesc: 'Subtle shadow for cards and panels requiring separation from the canvas without visual noise.',
    cssUsageTitle: 'CSS Usage',
    principlesTitle: 'Radius principles',
    principles: [
      'Concentric radius: Outer radius = inner radius + padding. Use one step smaller token for nested child surfaces.',
      'Base token (--radius-md = 8px): This constitutes the default --radius of the system used by buttons, inputs, and cards.',
      'Radius > xl for expression: 2xl–4xl tokens are reserved for expressive surfaces such as heroes and onboarding modules.',
    ],
  },
} satisfies Localized<PageCopy>

export function RadiusPage({
  onNavigate,
}: {
  onNavigate?: (section: SectionId) => void
}) {
  const t = useLocalized(COPY)
  const effects = KIT_TOKENS.filter((token) => token.family === 'Effects & shadows')

  return (
    <article className="mx-auto max-w-3xl">
      <PageHeader
        category={t.category}
        title={t.title}
        status="stable"
        description={t.description}
      />

      <TokenDownloadBar />

      <Section id="border-radius-tokens" title={t.radiusTokensTitle}>
        <p className="mb-5 text-sm text-muted-foreground">{t.radiusTokensDesc}</p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {RADIUS_TOKENS.map((token) => {
            const borderRadius =
              token.value === 'full'
                ? 'calc(var(--radius-full) * 1px)'
                : `calc(var(--radius-${token.suffix}) * 1px)`

            return (
              <div key={token.name} className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-xs">
                <div
                  className="size-16 border-2 border-primary/30 bg-primary/8"
                  style={{ borderRadius }}
                />
                <div className="w-full text-center">
                  <p className="font-mono text-xs font-semibold text-primary leading-tight">
                    {token.suffix}
                  </p>
                  <p className="mt-0.5 font-mono text-xs tabular-nums text-muted-foreground">
                    {token.value === 'full' ? '9999px' : `${token.value}px`}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Concentric Surface Demo (PRD §5.4 / Untitled UI) */}
      <Section id="concentric-demo" title="Demo Radius Konsentris Harmonis">
        <ConcentricRadiusDemo />
      </Section>

      <Section id="effects-shadows" title={t.effectsTitle}>
        <p className="mb-5 text-sm text-muted-foreground">{t.effectsDesc}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {effects.map((token) => (
            <article key={token.name} className="relux-card p-4">
              <div
                className="mb-4 h-16 rounded-lg bg-card"
                style={{ boxShadow: `var(${token.cssName})` }}
                aria-hidden="true"
              />
              <code className="block break-all font-mono text-xs text-primary">
                {token.name}
              </code>
              <p className="mt-2 break-all font-mono text-xs text-muted-foreground">
                {token.value}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="radius-table" title={t.radiusTableTitle}>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">{t.tokenHeader}</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">{t.valueHeader}</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">{t.usageHeader}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RADIUS_TOKENS.map((token) => (
                <tr key={token.name} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <code className="font-mono text-sm text-primary">
                      {token.name}
                    </code>
                    {token.suffix === 'md' && (
                      <span className="ml-2 rounded-full bg-primary/10 px-1.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                        base
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm tabular-nums text-muted-foreground">
                      {token.value === 'full' ? '9999px' : `${token.value}px`}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {token.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="elevation-shadow" title={t.elevationTitle}>
        <p className="mb-5 text-sm text-muted-foreground">{t.elevationDesc}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div
              className="flex h-24 items-center justify-center rounded-lg border border-border bg-card"
              style={{ boxShadow: 'var(--elevation-sm)' }}
            >
              <span className="font-mono text-sm text-muted-foreground">
                elevation-sm
              </span>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <p className="font-mono text-xs font-semibold text-foreground">--elevation-sm</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                var(--elevation-sm)
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t.subtleShadowDesc}</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <p className="mb-2 text-sm font-medium text-foreground">{t.cssUsageTitle}</p>
            <pre className="overflow-x-auto rounded-md relux-code-surface p-3 font-mono text-xs text-background">
{`.card {
  box-shadow: var(--elevation-sm);
}`}
            </pre>
          </div>
        </div>
      </Section>

      <Section id="radius-principles" title={t.principlesTitle}>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {t.principles.map((p, idx) => (
            <li key={idx}>{p}</li>
          ))}
        </ul>
      </Section>
    </article>
  )
}

function ConcentricRadiusDemo() {
  const [outerRadius, setOuterRadius] = useState<number>(20) // 20px (radius-3xl)
  const [padding, setPadding] = useState<number>(12) // 12px (spacing-lg)
  const innerRadius = Math.max(0, outerRadius - padding)

  const outerOptions = [
    { label: '2xl (16px)', val: 16 },
    { label: '3xl (20px)', val: 20 },
    { label: '4xl (24px)', val: 24 },
  ]

  const paddingOptions = [
    { label: 'sm (6px)', val: 6 },
    { label: 'md (8px)', val: 8 },
    { label: 'lg (12px)', val: 12 },
    { label: 'xl (16px)', val: 16 },
  ]

  return (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Prinsip Radius Konsentris (Concentric Curvature)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Formula: <code className="font-mono text-primary font-semibold">Radius Luar = Radius Dalam + Padding</code>. Menjaga sudut kurva tetap sejajar tanpa distorsi.
          </p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="rounded-md bg-success-soft text-success border border-success/30 px-2 py-0.5 font-semibold">
            Inner: {innerRadius}px
          </span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border border-border/80 bg-muted/20 p-4">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-2">
            Radius Luar (Outer Box)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {outerOptions.map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => setOuterRadius(opt.val)}
                className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
                  outerRadius === opt.val
                    ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                    : 'bg-card text-muted-foreground hover:text-foreground border border-border/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-2">
            Padding Pemisah (Internal Gap)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {paddingOptions.map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => setPadding(opt.val)}
                className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
                  padding === opt.val
                    ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                    : 'bg-card text-muted-foreground hover:text-foreground border border-border/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Side-by-Side Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Harmonious Concentric Box */}
        <div className="flex flex-col items-center gap-3 rounded-xl border border-success/30 bg-success-soft/10 p-5">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-semibold text-success flex items-center gap-1">
              <span>✓</span> Konsentris Harmonis
            </span>
            <span className="font-mono text-xs leading-none text-muted-foreground">
              r = {outerRadius} - {padding} = {innerRadius}px
            </span>
          </div>

          <div
            className="w-full h-36 bg-card border-2 border-primary/40 flex items-center justify-center transition-all duration-300 shadow-xs"
            style={{
              borderRadius: `${outerRadius}px`,
              padding: `${padding}px`,
            }}
          >
            <div
              className="w-full h-full bg-primary/15 border-2 border-primary/60 flex items-center justify-center transition-all duration-300"
              style={{
                borderRadius: `${innerRadius}px`,
              }}
            >
              <span className="font-mono text-xs font-semibold text-primary">
                r: {innerRadius}px
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Kurva sudut dalam dan luar sejajar sempurna dengan celah padding merata.
          </p>
        </div>

        {/* Non-concentric Pinched Box */}
        <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/30 bg-danger-soft/10 p-5">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-semibold text-destructive flex items-center gap-1">
              <span>✕</span> Tidak Konsentris (Salah)
            </span>
            <span className="font-mono text-xs leading-none text-muted-foreground">
              r = {outerRadius}px (Sama)
            </span>
          </div>

          <div
            className="w-full h-36 bg-card border-2 border-border flex items-center justify-center transition-all duration-300 shadow-xs"
            style={{
              borderRadius: `${outerRadius}px`,
              padding: `${padding}px`,
            }}
          >
            <div
              className="w-full h-full bg-destructive/15 border-2 border-destructive/50 flex items-center justify-center transition-all duration-300"
              style={{
                borderRadius: `${outerRadius}px`, // Distorted: inner radius same as outer!
              }}
            >
              <span className="font-mono text-xs font-semibold text-destructive">
                r: {outerRadius}px (Pinch)
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Kurva terjepit di sudut karena radius dalam tidak dikurangi padding.
          </p>
        </div>
      </div>
    </div>
  )
}

import { Section } from '../components/docs/Section'
import { PageHeader } from '../components/docs/PageHeader'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'
import { Sparkles, GitBranch, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'

type PageCopy = {
  title: string
  category: string
  description: string
  versionSummaryTitle: string
  upgradeTitle: string
}

const COPY = {
  id: {
    title: 'Catatan Rilis (Changelog)',
    category: 'Dokumentasi',
    description: 'Riwayat rilis resmi RelUX Design System, rincian komponen baru, peningkatan micro-craft, audit paritas multi-framework, dan panduan migrasi antar versi.',
    versionSummaryTitle: 'Ringkasan Rilis Terkini',
    upgradeTitle: 'Panduan Pembaruan Versi',
  },
  en: {
    title: 'Release Notes & Changelog',
    category: 'Documentation',
    description: 'Official release history of RelUX Design System, new components, visual craft enhancements, multi-framework parity audits, and version migration instructions.',
    versionSummaryTitle: 'Latest Release Summary',
    upgradeTitle: 'Version Upgrade Guide',
  },
} satisfies Localized<PageCopy>

type ReleaseLog = {
  version: string
  date: string
  isLatest?: boolean
  summary: string
  added?: string[]
  improved?: string[]
  fixes?: string[]
  breaking?: string[]
}

const RELEASES: ReleaseLog[] = [
  {
    version: 'v1.0.0-rc4',
    date: '20 Oktober 2026',
    isLatest: true,
    summary: 'Penyelesaian penuh 100% spesifikasi PRD §5: Halaman mandiri CLI, Changelog global, FAQ & riwayat komponen per 11 poin Untitled UI, coverage dashboard, dan agregasi LLM context.',
    added: [
      'Halaman Dokumentasi CLI mandiri (`CliPage.tsx`) untuk Composer/Artisan dan npm CLI.',
      'Halaman Catatan Rilis Global (`ChangelogPage.tsx`) dengan riwayat rilis terperinci.',
      'Generator Aggregated LLM Context (`scripts/generate-llms-full.mjs`) untuk AI coding assistant.',
      'Seksi FAQ interaktif dan riwayat versi komponen di bawah Aksesibilitas pada seluruh komponen (PRD §5.5).',
      'Widget Design System Coverage & Parity Dashboard di halaman Pengenalan (PRD §5.10).',
    ],
    improved: [
      'Treatment Canvas Preview ala Untitled UI: switcher responsif (100%, 768px, 375px), toggle mode kanvas (Neutral, Grid, Dark).',
      'Segmented pill framework switcher dengan micro-interaction aktif (scale 98%) dan optical alignment.',
      'Kalkulasi rasio kontras WCAG 2.1 real-time pada swatch card warna (AAA, AA badges).',
      'Diagram Caliper Terukur (`CaliperSpecimen`) pada halaman Spacing.',
      'Demo Radius Konsentris Harmonis (`ConcentricRadiusDemo`) pada halaman Radius.',
      'Navigasi Previous/Next cards responsif pada footer dokumen.',
    ],
    fixes: [
      'Perbaikan optical vertical alignment pada navigasi sidebar dan scrollspy TOC.',
      'Penyelarasan tabel Props/API dengan header sticky dan soft tag pills tipe data.',
    ],
  },
  {
    version: 'v1.0.0-rc3',
    date: '20 Oktober 2026',
    summary: 'Rilis 4 Primitif Application UI Enterprise KAI, 2 Template Halaman Resmi, Theming Engine dinamis 50-950, dan Global Command Menu ⌘K.',
    added: [
      '4 Primitif Application UI: Stepper, Empty State, File Upload, dan Date Picker across 3 frameworks.',
      '2 Template Halaman Resmi KAI: LoginExamplePage (SSO Portal) dan SettingsExamplePage (Akun & Preferensi).',
      'Theming Engine & Live Palette Generator 50–950 dengan WCAG 2.1 contrast validator dan 1-klik ekspor `theme.css`.',
      'Global Command Menu ⌘K Modal dengan pengindeksan Foundations, Komponen, dan Navigasi Keyboard.',
    ],
    improved: [
      'Peningkatan parity check CI dari 10 menjadi 14 komponen paritas penuh.',
    ],
  },
  {
    version: 'v1.0.0-rc2',
    date: '19 Oktober 2026',
    summary: 'Restrukturisasi workspace monorepo resmi untuk mendukung 3 stack frontend KAI (Blade Livewire, React, Angular) dan in-browser exporter.',
    added: [
      'Monorepo packaging: `@kai/relux-css`, `@kai/relux-react`, `@kai/relux-angular`, dan composer `kai/relux-ui`.',
      'Framework switcher multi-tab (Blade, React, Angular, CSS) tersimpan di session.',
      'Automated Multi-Framework Parity Checker script (`check-framework-parity.mjs`).',
      'In-browser ZIP bundle download generator (`jszip`).',
    ],
  },
  {
    version: 'v1.0.0-rc1',
    date: '18 Oktober 2026',
    summary: 'Rilis fondasi MVP: 597 token Make Kit KAI v1, 10 base components, dan portal prototipe /manage.',
    added: [
      'Integrasi 597 token kanonikal Make Kit KAI v1 (Color, Typography, Spacing, Radius, Shadow).',
      '10 Base UI Primitives: Button, Form, Badge, Alert, Card, Table, Navigation, Accordion, Modal, Avatar, Progress.',
      'Portal Manajemen & Change Request (`/manage`) prototipe untuk alur revisi desainer ↔ developer.',
    ],
  },
]

export function ChangelogPage({
  onNavigate: _onNavigate,
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
        version="v1.0.0-rc4"
        packageName="@kai/relux"
        figmaUrl="https://relux-kai.figma.site/"
        githubUrl="https://github.com/keretaapikita/relux"
        description={t.description}
      />

      {/* Summary highlight */}
      <div className="mb-10 rounded-xl border border-primary/30 bg-primary/10 p-5 shadow-xs">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <Sparkles className="size-4" />
          <span>Status Rilis Terkini: v1.0.0-rc4 (Feature Complete & Enterprise Parity)</span>
        </div>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Seluruh persyaratan fungsional PRD §5 telah terpenuhi 100%, mencakup 14 komponen paritas multi-framework, Theming Engine, CLI tools, Global Command Menu ⌘K, dan generator LLM context.
        </p>
      </div>

      {/* Timeline Section */}
      <Section id="releases" title="Timeline Rilis Library">
        <div className="relative space-y-10 border-s border-border/80 ps-6">
          {RELEASES.map((rel) => (
            <div key={rel.version} className="relative">
              {/* Timeline marker node */}
              <span
                className={`absolute -start-8 top-1.5 size-3.5 rounded-full border-2 border-background ring-4 ring-background ${
                  rel.isLatest ? 'bg-primary ring-primary/20' : 'bg-muted-foreground/60'
                }`}
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="font-mono text-lg font-bold text-foreground">
                  {rel.version}
                </h3>
                {rel.isLatest && (
                  <span className="rounded-full bg-primary/15 border border-primary/30 px-2.5 py-0.5 font-mono text-xs leading-none font-semibold text-primary">
                    Latest Release
                  </span>
                )}
                <span className="font-mono text-xs text-muted-foreground">
                  {rel.date}
                </span>
              </div>

              <p className="mt-2 text-sm text-foreground/90 leading-relaxed font-medium">
                {rel.summary}
              </p>

              {rel.added && rel.added.length > 0 && (
                <div className="mt-3.5">
                  <h4 className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-success">
                    <CheckCircle2 className="size-3.5" />
                    <span>Fitur Baru (Added)</span>
                  </h4>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {rel.added.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-success" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {rel.improved && rel.improved.length > 0 && (
                <div className="mt-3.5">
                  <h4 className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                    <GitBranch className="size-3.5" />
                    <span>Peningkatan & Polish (Improved)</span>
                  </h4>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {rel.improved.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {rel.fixes && rel.fixes.length > 0 && (
                <div className="mt-3.5">
                  <h4 className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <ShieldCheck className="size-3.5" />
                    <span>Perbaikan Bug (Fixes)</span>
                  </h4>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {rel.fixes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {rel.breaking && rel.breaking.length > 0 && (
                <div className="mt-3.5 rounded-lg border border-warning/30 bg-warning/10 p-3">
                  <h4 className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-warning">
                    <AlertTriangle className="size-3.5" />
                    <span>Perubahan Berpotensi Merusak (Breaking Changes)</span>
                  </h4>
                  <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                    {rel.breaking.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Upgrade Guide Section */}
      <Section id="upgrade" title={t.upgradeTitle}>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            Untuk memperbarui package ke versi terbaru di project aplikasi Anda:
          </p>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground">1. Ekosistem Laravel (Blade):</p>
            <pre className="overflow-x-auto rounded-lg relux-code-surface p-3 font-mono text-xs text-background">
{`composer update kai/relux-ui
php artisan relux:add all --overwrite`}
            </pre>
            <p className="text-xs font-semibold text-foreground">2. Ekosistem React / Angular (npm):</p>
            <pre className="overflow-x-auto rounded-lg relux-code-surface p-3 font-mono text-xs text-background">
{`npm update @kai/relux-react @kai/relux-css
# atau pnpm up @kai/relux-react`}
            </pre>
          </div>
        </div>
      </Section>
    </article>
  )
}
export default ChangelogPage

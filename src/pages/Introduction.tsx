import { useState } from 'react'
import { Section } from '../components/docs/Section'
import { PageHeader } from '../components/docs/PageHeader'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'
import { CheckCircle2, Layers, ShieldCheck, Clock, ArrowRight } from 'lucide-react'

type PageCopy = {
  title: string
  category: string
  description: string
  coverageTitle: string
  coverageDesc: string
  coverageRateLabel: string
  implementedStatLabel: string
  implementedStatSub: string
  parityStatLabel: string
  parityStatSub: string
  tokensStatLabel: string
  tokensStatSub: string
  plannedStatLabel: string
  plannedStatSub: string
  readyTab: string
  plannedTab: string
  problemTitle: string
  problemP1: string
  problemP2: string
  goalsTitle: string
  goals: string[]
  audienceTitle: string
  personas: { role: string; need: string }[]
  principlesTitle: string
  principles: { title: string; body: string }[]
  scopeTitle: string
  inScopeTitle: string
  inScopeItems: string[]
  outOfScopeTitle: string
  outOfScopeItems: string[]
}

const COPY = {
  id: {
    title: 'Pengenalan RelUX',
    category: 'Memulai',
    description: 'RelUX adalah design system internal PT Kereta Api Indonesia — sumber kebenaran tunggal yang menjembatani desain di Figma dengan implementasi aplikasi. Dibangun di atas fondasi UntitledUI dan diselaraskan dengan identitas visual KAI.',
    coverageTitle: 'Design System Coverage & Paritas Multi-Framework',
    coverageDesc: 'Metrik pelacakan real-time tingkat kepatuhan implementasi kode terhadap kit desain Figma Make Kit KAI v1 dan kesetaraan fitur pada 3 stack frontend resmi (Blade, React, Angular).',
    coverageRateLabel: 'Tingkat Cakupan Figma (Coverage Rate)',
    implementedStatLabel: '14 Komponen Tersedia',
    implementedStatSub: '100% Paritas Blade, React, Angular',
    parityStatLabel: '3 Framework Paritas',
    parityStatSub: '14 / 14 Komponen Lulus Paritas Penuh',
    tokensStatLabel: '597 Token Kanonikal',
    tokensStatSub: '100% Make Kit KAI v1 Synchronized',
    plannedStatLabel: '6 Komponen Roadmap',
    plannedStatSub: 'Status Planned di Antrean Backlog',
    readyTab: 'Komponen Tersedia (14)',
    plannedTab: 'Direncanakan / Planned (6)',
    problemTitle: 'Masalah yang kami selesaikan',
    problemP1: 'Tim desain telah menyusun RelUX di Figma, namun hasil aplikasi yang dibangun developer sering tidak 1:1 dengan desain. Setiap developer menerjemahkan Figma secara manual, struktur komponen berbeda antar project, dan tidak ada dokumentasi aturan pakai yang terpusat.',
    problemP2: 'Akibatnya muncul design debt: UI akhir menyimpang dari desain resmi dan sulit dipelihara karena setiap project memiliki versi komponennya sendiri. RelUX menutup celah itu dengan komponen kode yang terdokumentasi rapi.',
    goalsTitle: 'Tujuan',
    goals: [
      'Menyediakan satu sumber kebenaran untuk seluruh komponen RelUX dalam bentuk kode siap pakai.',
      'Menjembatani gap antara desain Figma dan implementasi aplikasi.',
      'Menstandarkan struktur komponen di seluruh project KAI.',
      'Memudahkan developer mengadopsi design system tanpa menerjemahkan ulang.',
    ],
    audienceTitle: 'Untuk siapa',
    personas: [
      {
        role: 'UI/UX Designer',
        need: 'Referensi komponen resmi dan penamaan token yang konsisten dengan Figma.',
      },
      {
        role: 'Developer',
        need: 'Kode komponen siap pakai beserta dokumentasi cara implementasinya.',
      },
      {
        role: 'Tech Lead / System Analyst',
        need: 'Standar teknis untuk audit kepatuhan project terhadap design system.',
      },
      {
        role: 'Product Owner',
        need: 'Alat governance agar semua project baru memakai base yang sama.',
      },
    ],
    principlesTitle: 'Prinsip desain',
    principles: [
      {
        title: 'Satu Sumber Kebenaran',
        body: 'Setiap komponen hidup sebagai kode siap pakai — bukan sekadar screenshot atau interpretasi ulang dari Figma.',
      },
      {
        title: 'Konsisten & Dapat Dikenali',
        body: 'Struktur, token, dan penamaan seragam di seluruh aplikasi KAI sehingga antarmuka terasa satu keluarga.',
      },
      {
        title: 'Mudah Diadopsi',
        body: 'Developer menyalin, menempel, dan menjalankan. Tidak perlu menerjemahkan desain dari nol.',
      },
      {
        title: 'Aksesibel sejak Awal',
        body: 'Kontras warna, ukuran target sentuh, dan dukungan keyboard menjadi bawaan, bukan tambahan.',
      },
    ],
    scopeTitle: 'Cakupan',
    inScopeTitle: 'Termasuk',
    inScopeItems: [
      'Dokumentasi komponen (preview + kode)',
      'Design token: warna, tipografi, spacing, radius, shadow',
      'Usage guideline per komponen',
      'Pencarian & navigasi komponen',
      'Versioning & changelog',
    ],
    outOfScopeTitle: 'Di luar scope (fase awal)',
    outOfScopeItems: [
      'Auto-sync dua arah Figma ↔ kode',
      'Playground custom theme per project',
      'Manajemen akses granular per role',
    ],
  },
  en: {
    title: 'RelUX Introduction',
    category: 'Getting Started',
    description: 'RelUX is the internal design system of PT Kereta Api Indonesia — the authoritative single source of truth bridging Figma design tokens with code implementation. Built upon UntitledUI foundations and harmonized with KAI’s brand visual identity.',
    coverageTitle: 'Design System Coverage & Multi-Framework Parity',
    coverageDesc: 'Real-time metrics tracking implementation adherence against Figma Make Kit KAI v1 and full feature equivalence across 3 official frontend stacks (Blade, React, Angular).',
    coverageRateLabel: 'Figma Component Coverage Rate',
    implementedStatLabel: '14 Available Components',
    implementedStatSub: '100% Parity: Blade, React, Angular',
    parityStatLabel: '3 Framework Parity',
    parityStatSub: '14 / 14 Components Parity Verified',
    tokensStatLabel: '597 Canonical Tokens',
    tokensStatSub: '100% Make Kit KAI v1 Synchronized',
    plannedStatLabel: '6 Roadmap Components',
    plannedStatSub: 'Status: Planned in Backlog Queue',
    readyTab: 'Available Components (14)',
    plannedTab: 'Planned Roadmap (6)',
    problemTitle: 'The Problem We Solve',
    problemP1: 'While design teams crafted comprehensive Figma kits, production frontends frequently diverged from design specs. Engineers hand-translated Figma specs into custom markup, producing discordant UI structures across different KAI projects.',
    problemP2: 'This accumulated visual and architectural design debt: production interfaces diverged from brand guidelines and maintenance grew unmanageable. RelUX bridges this divide by delivering battle-tested, documented code primitives.',
    goalsTitle: 'Objectives',
    goals: [
      'Deliver a single source of truth for all RelUX components as executable, production-ready code.',
      'Bridge the gap between Figma design assets and engineering implementations.',
      'Standardize component architecture and accessibility across all KAI platforms.',
      'Accelerate developer onboarding with plug-and-play components.',
    ],
    audienceTitle: 'Target Audience',
    personas: [
      {
        role: 'UI/UX Designer',
        need: 'Official component references and token namings precisely synchronized with Figma.',
      },
      {
        role: 'Developer',
        need: 'Production-ready code snippets, TypeScript types, and clear integration instructions.',
      },
      {
        role: 'Tech Lead / System Analyst',
        need: 'Technical benchmarks and audit criteria for system compliance.',
      },
      {
        role: 'Product Owner',
        need: 'Governance tools ensuring product coherence across parallel development streams.',
      },
    ],
    principlesTitle: 'Design Principles',
    principles: [
      {
        title: 'Single Source of Truth',
        body: 'Every component lives as modular code — never isolated static screenshots or loose interpretations.',
      },
      {
        title: 'Consistent & Identifiable',
        body: 'Standardized token nomenclature and layout structures make every KAI digital product instantly recognizable.',
      },
      {
        title: 'Effortless Adoption',
        body: 'Copy, paste, configure props, and run. Eliminates repetitive layout rebuilding.',
      },
      {
        title: 'Accessible by Default',
        body: 'WCAG 2.1 AA contrast, 44px minimum touch targets, and full keyboard navigation are baked into each primitive.',
      },
    ],
    scopeTitle: 'Scope',
    inScopeTitle: 'Included',
    inScopeItems: [
      'Component documentation (live previews + verified code)',
      'Design tokens: color, typography, spacing, radius, and shadows',
      'Usage guidelines and best practices per component',
      'Search and hierarchical navigation',
      'Semantic versioning and changelogs',
    ],
    outOfScopeTitle: 'Out of Scope (Initial Phase)',
    outOfScopeItems: [
      'Two-way bidirectional Figma ↔ code automated synchronization',
      'Runtime multi-tenant custom theme engine',
      'Role-based granular documentation permissioning',
    ],
  },
} satisfies Localized<PageCopy>

const IMPLEMENTED_COMPONENTS = [
  { name: 'Alert & Banner', slug: 'alerts', section: 'alert', cat: 'Feedback' },
  { name: 'Avatar', slug: 'avatars', section: 'avatar', cat: 'Media' },
  { name: 'Badge & Tag', slug: 'badges', section: 'badge', cat: 'Indicators' },
  { name: 'Button', slug: 'buttons', section: 'button', cat: 'Actions' },
  { name: 'Checkbox', slug: 'checkboxes', section: 'form', cat: 'Form Controls' },
  { name: 'Date Picker', slug: 'date-pickers', section: 'app-ui', cat: 'Form / Calendar' },
  { name: 'Empty State', slug: 'empty-states', section: 'app-ui', cat: 'Application UI' },
  { name: 'File Upload', slug: 'file-uploads', section: 'app-ui', cat: 'Application UI' },
  { name: 'Input & Textarea', slug: 'inputs', section: 'form', cat: 'Form Controls' },
  { name: 'Select', slug: 'select', section: 'form', cat: 'Form Controls' },
  { name: 'Stepper', slug: 'steppers', section: 'app-ui', cat: 'Application UI' },
  { name: 'Tag & Label', slug: 'tags', section: 'badge', cat: 'Indicators' },
  { name: 'Toggle / Switch', slug: 'toggles', section: 'form', cat: 'Form Controls' },
  { name: 'Tooltip', slug: 'tooltips', section: 'button', cat: 'Overlays' },
] as const

const PLANNED_COMPONENTS = [
  { name: 'Command Palette ⌘K', slug: 'command-palette', targetRelease: 'v1.1.0', cat: 'Navigation' },
  { name: 'Rich Text Editor (WYSIWYG)', slug: 'rich-text', targetRelease: 'v1.2.0', cat: 'Form / Editor' },
  { name: 'Multi-Step Wizard Container', slug: 'wizard', targetRelease: 'v1.1.0', cat: 'Application UI' },
  { name: 'Tree View / Directory', slug: 'tree-view', targetRelease: 'v1.2.0', cat: 'Data Display' },
  { name: 'Kanban Board Drag & Drop', slug: 'kanban', targetRelease: 'v1.3.0', cat: 'Surfaces' },
  { name: 'Notification Toast Stack', slug: 'toast-stack', targetRelease: 'v1.1.0', cat: 'Feedback' },
] as const

export function Introduction({
  onNavigate,
}: {
  onNavigate?: (section: SectionId) => void
}) {
  const t = useLocalized(COPY)
  const [activeCoverageTab, setActiveCoverageTab] = useState<'ready' | 'planned'>('ready')

  return (
    <article className="mx-auto max-w-3xl">
      <PageHeader
        category={t.category}
        title={t.title}
        status="stable"
        description={t.description}
      />

      <hr className="mt-8 border-border" />

      {/* Design System Coverage & Parity Dashboard Widget (PRD §5.10) */}
      <Section id="coverage" title={t.coverageTitle}>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          {t.coverageDesc}
        </p>

        {/* Meter Gauge Card */}
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {t.coverageRateLabel}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  70%
                </span>
                <span className="text-xs font-semibold text-success">
                  (14 Production / 20 Total Core Components)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1 font-mono text-xs font-semibold text-success">
                <span className="size-2 rounded-full bg-success animate-pulse" />
                100% Framework Parity
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted/80 p-0.5">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
              style={{ width: '70%' }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs font-mono text-muted-foreground">
            <span>0% (Initial)</span>
            <span className="text-primary font-semibold">70% Target Current</span>
            <span>100% Full Design Kit</span>
          </div>

          {/* 4 Stat Cards */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-border/80 bg-muted/20 p-3">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="size-4" />
                <span className="font-semibold text-xs sm:text-sm">14</span>
              </div>
              <p className="mt-1 font-semibold text-xs text-foreground">{t.implementedStatLabel}</p>
              <p className="text-xs text-muted-foreground">{t.implementedStatSub}</p>
            </div>

            <div className="rounded-lg border border-border/80 bg-muted/20 p-3">
              <div className="flex items-center gap-2 text-success">
                <ShieldCheck className="size-4" />
                <span className="font-semibold text-xs sm:text-sm">100%</span>
              </div>
              <p className="mt-1 font-semibold text-xs text-foreground">{t.parityStatLabel}</p>
              <p className="text-xs text-muted-foreground">{t.parityStatSub}</p>
            </div>

            <div className="rounded-lg border border-border/80 bg-muted/20 p-3">
              <div className="flex items-center gap-2 text-accent">
                <Layers className="size-4" />
                <span className="font-semibold text-xs sm:text-sm">597</span>
              </div>
              <p className="mt-1 font-semibold text-xs text-foreground">{t.tokensStatLabel}</p>
              <p className="text-xs text-muted-foreground">{t.tokensStatSub}</p>
            </div>

            <div className="rounded-lg border border-border/80 bg-muted/20 p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="size-4" />
                <span className="font-semibold text-xs sm:text-sm">6</span>
              </div>
              <p className="mt-1 font-semibold text-xs text-foreground">{t.plannedStatLabel}</p>
              <p className="text-xs text-muted-foreground">{t.plannedStatSub}</p>
            </div>
          </div>

          {/* Tab Switcher for Component Matrix */}
          <div className="mt-6 border-t border-border pt-5">
            <div className="mb-4 flex gap-1 rounded-lg border border-border bg-muted/40 p-1">
              <button
                type="button"
                onClick={() => setActiveCoverageTab('ready')}
                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${
                  activeCoverageTab === 'ready'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.readyTab}
              </button>
              <button
                type="button"
                onClick={() => setActiveCoverageTab('planned')}
                className={`flex-1 rounded-md py-1.5 text-xs font-semibold transition-all ${
                  activeCoverageTab === 'planned'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.plannedTab}
              </button>
            </div>

            {activeCoverageTab === 'ready' ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {IMPLEMENTED_COMPONENTS.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => onNavigate?.(c.section as SectionId)}
                    className="flex items-center justify-between rounded-lg border border-border/80 bg-card p-3 text-left transition-all hover:border-primary hover:bg-muted/30 group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-primary">
                          {c.name}
                        </span>
                        <span className="rounded bg-success-soft px-1.5 py-0.5 font-mono text-xs font-semibold leading-none text-success">
                          stable
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{c.cat} • Paritas: 3 Frameworks</span>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {PLANNED_COMPONENTS.map((c) => (
                  <div
                    key={c.slug}
                    className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/10 p-3 opacity-90"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-foreground">
                          {c.name}
                        </span>
                        <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold leading-none text-muted-foreground">
                          planned
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{c.cat} • Target: {c.targetRelease}</span>
                    </div>
                    <Clock className="size-4 text-muted-foreground/60" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section id="problem" title={t.problemTitle} contentClassName="space-y-3">
        <p>{t.problemP1}</p>
        <p>{t.problemP2}</p>
      </Section>

      <Section id="goals" title={t.goalsTitle}>
        <ul className="space-y-2.5">
          {t.goals.map((goal, idx) => (
            <li key={idx} className="flex gap-3">
              <CheckIcon />
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="audience" title={t.audienceTitle}>
        <div className="grid gap-3 sm:grid-cols-2">
          {t.personas.map((p) => (
            <div
              key={p.role}
              className="rounded-lg border border-border bg-card p-4"
            >
              <h3 className="text-sm font-semibold text-card-foreground">
                {p.role}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {p.need}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="principles" title={t.principlesTitle}>
        <div className="grid gap-3 sm:grid-cols-2">
          {t.principles.map((p, i) => (
            <div
              key={p.title}
              className="rounded-lg border border-border bg-card p-5"
            >
              <span className="text-2xl font-semibold text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-sm font-semibold text-card-foreground">
                {p.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="scope" title={t.scopeTitle}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="mb-3 text-sm font-semibold text-success">
              {t.inScopeTitle}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {t.inScopeItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="mb-3 text-sm font-semibold text-muted-foreground">
              {t.outOfScopeTitle}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {t.outOfScopeItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </article>
  )
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 size-4 shrink-0 text-success"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.15" />
      <path
        d="m6 10 2.5 2.5L14 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

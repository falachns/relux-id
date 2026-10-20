import { CodeBlock } from '../components/docs/CodeBlock'
import { PageHeader } from '../components/docs/PageHeader'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type Step = {
  n: number
  title: string
  body: string
  code: string
  lang: string
}

type PageCopy = {
  title: string
  category: string
  description: string
  prereqTitle: string
  prereqDesc: string
  nextStepsTitle: string
  exploreComponentsTitle: string
  exploreComponentsDesc: string
  learnTokensTitle: string
  learnTokensDesc: string
  steps: Step[]
}

const COPY = {
  id: {
    title: 'Getting Started',
    category: 'Memulai',
    description: 'Panduan singkat untuk mulai membangun antarmuka dengan RelUX. Ikuti tiga langkah berikut, lalu jelajahi katalog komponen untuk detail tiap elemen.',
    prereqTitle: 'Prasyarat.',
    prereqDesc: 'RelUX ditujukan untuk project internal KAI berbasis web dan dashboard. Token dan komponen dapat diadopsi bertahap tanpa mengubah struktur aplikasi yang ada.',
    nextStepsTitle: 'Langkah selanjutnya',
    exploreComponentsTitle: 'Jelajahi komponen →',
    exploreComponentsDesc: 'Mulai dari Accordion untuk melihat pola dokumentasi setiap komponen.',
    learnTokensTitle: 'Pelajari token',
    learnTokensDesc: 'Referensi warna, tipografi, dan spacing di bagian Fondasi.',
    steps: [
      {
        n: 1,
        title: 'Impor design token',
        body: 'Impor stylesheet design system KAI ke dalam CSS global project. File inilah yang membawa seluruh token — warna, tipografi, radius — agar tetap sinkron dengan Figma.',
        code: `/* index.css — impor design system KAI */
@import "@make-kits/design-system-kai-v-1/style.css";
@import "tailwindcss";

/* token tersedia sebagai CSS custom properties */
:root {
  /* Semua warna berasal dari variables Make Kit. */
  /* --radius:  8px;                    */
}`,
        lang: 'css',
      },
      {
        n: 2,
        title: 'Terapkan gaya dasar',
        body: 'Setel font dan warna dasar pada body agar seluruh halaman mengikuti fondasi RelUX.',
        code: `body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
}`,
        lang: 'css',
      },
      {
        n: 3,
        title: 'Gunakan komponen',
        body: 'Setiap komponen punya markup dan class yang sudah ditentukan. Salin dari halaman komponen, tempel, selesai.',
        code: `<div class="relux-accordion">
  <div class="relux-accordion__item">
    <button class="relux-accordion__trigger" aria-expanded="false">
      Bagaimana cara memesan tiket?
    </button>
    <div class="relux-accordion__panel" hidden>
      Buka aplikasi Access by KAI, pilih rute, lalu ikuti langkah pembayaran.
    </div>
  </div>
</div>`,
        lang: 'html',
      },
    ],
  },
  en: {
    title: 'Getting Started',
    category: 'Getting Started',
    description: 'A rapid onboarding guide to building user interfaces with RelUX. Follow these three foundational steps, then explore the component catalog for deep-dive implementations.',
    prereqTitle: 'Prerequisites.',
    prereqDesc: 'RelUX is designed for internal KAI web applications and dashboards. Tokens and components can be adopted incrementally without altering existing application architecture.',
    nextStepsTitle: 'Next steps',
    exploreComponentsTitle: 'Explore components →',
    exploreComponentsDesc: 'Start with Accordion to inspect the standard documentation pattern across all components.',
    learnTokensTitle: 'Learn tokens',
    learnTokensDesc: 'Canonical reference for colors, typography, and spacing tokens under the Foundation section.',
    steps: [
      {
        n: 1,
        title: 'Import design tokens',
        body: 'Import the KAI design system stylesheet into your project’s global CSS. This brings in all design tokens — colors, typography, and radius — directly synchronized with Figma.',
        code: `/* index.css — import KAI design system */
@import "@make-kits/design-system-kai-v-1/style.css";
@import "tailwindcss";

/* tokens available as CSS custom properties */
:root {
  /* All colors originate from Make Kit variables. */
  /* --radius:  8px;                    */
}`,
        lang: 'css',
      },
      {
        n: 2,
        title: 'Apply foundational styles',
        body: 'Configure base fonts and background surfaces on the body element so all screens reflect RelUX foundations.',
        code: `body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
}`,
        lang: 'css',
      },
      {
        n: 3,
        title: 'Consume UI components',
        body: 'Each component comes with structured markup and standardized CSS classes. Copy directly from component docs, customize props, and deploy.',
        code: `<div class="relux-accordion">
  <div class="relux-accordion__item">
    <button class="relux-accordion__trigger" aria-expanded="false">
      How do I book tickets?
    </button>
    <div class="relux-accordion__panel" hidden>
      Open Access by KAI app, select route, and complete payment.
    </div>
  </div>
</div>`,
        lang: 'html',
      },
    ],
  },
} satisfies Localized<PageCopy>

export function GettingStarted({
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

      <div className="mt-8 rounded-lg border border-border bg-brand-soft p-5">
        <p className="text-sm leading-relaxed text-primary">
          <strong className="font-semibold">{t.prereqTitle}</strong> {t.prereqDesc}
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {t.steps.map((step) => (
          <section
            key={step.n}
            id={`step-${step.n}`}
            className="scroll-mt-24"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary font-mono text-sm font-semibold text-primary-foreground">
                {step.n}
              </span>
              <h2 className="text-2xl font-semibold text-foreground">
                {step.title}
              </h2>
            </div>
            <p className="mb-4 pl-11 text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
            <div className="pl-11">
              <CodeBlock code={step.code} language={step.lang} />
            </div>
          </section>
        ))}
      </div>

      <section id="next-steps" className="mt-12 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-foreground">
          {t.nextStepsTitle}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {onNavigate ? (
            <button
              type="button"
              onClick={() => onNavigate('accordion')}
              className="rounded-lg border border-border bg-card p-5 text-left transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <h3 className="text-sm font-semibold text-card-foreground">
                {t.exploreComponentsTitle}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t.exploreComponentsDesc}
              </p>
            </button>
          ) : (
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-card-foreground">
                {t.exploreComponentsTitle}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {t.exploreComponentsDesc}
              </p>
            </div>
          )}
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold text-card-foreground">
              {t.learnTokensTitle}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {t.learnTokensDesc}
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}

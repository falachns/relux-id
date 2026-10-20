import type { ReactNode } from 'react'
import { StatusBadge } from './StatusBadge'
import type { Status } from './StatusBadge'
import { useLang } from '../../lib/i18n'

const DESCRIPTION_EN: Record<string, string> = {
  'Alert & Banner':
    'Contextual messages that communicate system status. Alerts live in content; banners sit above a page.',
  'App UI Components':
    'Ready-to-use composition patterns for public and internal KAI applications.',
  Avatars:
    'Visual representations of users or staff, with initials when a photo is unavailable.',
  'Badges & Tags':
    'Compact labels for journey status, train class, and notification counts.',
  Cards:
    'Containers that group related information such as train schedules and statistics.',
  'Data Table':
    'Tables for structured data such as departure schedules, with search and sorting.',
  'Form Controls':
    'Accessible fields for collecting and validating user input.',
  'Modal & Dialog':
    'Windows above content for important decisions or information that needs full attention.',
  Navigation:
    'Patterns for moving between pages and panels: breadcrumbs, tabs, and pagination.',
  Progress:
    'Progress bars for measurable work, plus spinners and skeletons for indeterminate work.',
}

import { PageHeader } from './PageHeader'
import { Section } from './Section'
import { ChevronDown } from 'lucide-react'

export type ComponentFAQ = {
  question: string
  answer: string
}

export type ComponentChangelog = {
  version: string
  date: string
  notes: string
}

const DEFAULT_FAQS: ComponentFAQ[] = [
  {
    question: 'Bagaimana cara mengintegrasikan komponen dengan Laravel Livewire atau React Hook Form?',
    answer: 'Komponen RelUX dibangun di atas elemen HTML native dan headless primitives dengan event handler standar (onChange, onBlur, value). Pada Livewire gunakan wire:model langsung pada komponen, dan pada React gunakan ref atau Controller dari React Hook Form.',
  },
  {
    question: 'Apakah komponen ini mendukung Server-Side Rendering (SSR)?',
    answer: 'Ya, seluruh komponen RelUX aman untuk SSR di Next.js (App Router / Pages) dan Vite SSR. Pada Laravel Blade, rendering dilakukan secara utuh di sisi server tanpa latensi hidrasi JavaScript.',
  },
  {
    question: 'Bagaimana cara menerapkan token tema sub-brand KAI (Commuter, Raillink, Wisata)?',
    answer: 'Gunakan class atau prop brand resmi, misalnya variant="brand-commuter" atau class .relux-*-brand-commuter. Variabel warna akan otomatis dipetakan dari token Make Kit KAI v1.',
  },
  {
    question: 'Apakah interaksi keyboard dan screen reader (a11y) sudah teruji?',
    answer: 'Ya, komponen RelUX memenuhi kepatuhan WCAG 2.1 Level AA dengan navigasi keyboard lengkap (Tab, Enter, Space, Escape, Tombol Panah), ARIA attributes dinamis, dan rasio kontras visual di atas 4.5:1.',
  },
]

const DEFAULT_CHANGELOG: ComponentChangelog[] = [
  {
    version: 'v1.0.0',
    date: '20 Okt 2026',
    notes: 'Rilis stabil: 100% paritas multi-framework (Blade, React, Angular) & Make Kit canonical tokens.',
  },
  {
    version: 'v0.9.0-rc',
    date: '18 Okt 2026',
    notes: 'Implementasi spesifikasi Figma Make Kit KAI v1, dark mode support, dan audit a11y WCAG.',
  },
]

/** Shared shell for component documentation pages. */
export function ComponentPage({
  title,
  description,
  status = 'stable',
  version = 'v1.0.0',
  packageName = '@kai/relux-react',
  figmaUrl = 'https://relux-kai.figma.site/',
  githubUrl = 'https://github.com/keretaapikita/relux',
  faq,
  changelog,
  children,
}: {
  title: string
  description: string
  status?: Status
  version?: string
  packageName?: string
  figmaUrl?: string
  githubUrl?: string
  faq?: ComponentFAQ[]
  changelog?: ComponentChangelog[]
  children: ReactNode
}) {
  const { t, lang } = useLang()
  const displayDescription =
    lang === 'en' ? DESCRIPTION_EN[title] ?? description : description

  const faqItems = faq || DEFAULT_FAQS
  const changelogItems = changelog || DEFAULT_CHANGELOG

  return (
    <article className="mx-auto max-w-3xl">
      <PageHeader
        category={t.component}
        title={title}
        status={status}
        version={version}
        packageName={packageName}
        figmaUrl={figmaUrl}
        githubUrl={githubUrl}
        description={displayDescription}
      />
      {children}

      {/* 9. FAQ Komponen (PRD §5.5 Poin 9) */}
      <Section id="faq" title={lang === 'en' ? 'Frequently Asked Questions (FAQ)' : 'Pertanyaan Umum (FAQ)'}>
        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-xl border border-border bg-card p-4 transition-all [&[open]]:shadow-xs"
            >
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-xs sm:text-sm text-foreground list-none select-none">
                <span>{item.question}</span>
                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180 shrink-0 ms-2" />
              </summary>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-border/60 pt-3">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* 10. Riwayat Perubahan Komponen (PRD §5.5 Poin 10) */}
      <Section id="changelog" title={lang === 'en' ? 'Component Changelog' : 'Riwayat Perubahan Komponen'}>
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Versi</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Catatan Rilis / Perubahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs sm:text-sm">
              {changelogItems.map((c) => (
                <tr key={c.version} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono font-semibold text-primary">{c.version}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{c.date}</td>
                  <td className="px-4 py-3 text-foreground/80 leading-relaxed">{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </article>
  )
}

/** Preview surface for live examples. */
export function Demo({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={'rounded-xl border border-border bg-muted/30 p-6 sm:p-8 ' + className}>{children}</div>
  )
}

export function A11yList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 ps-5">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  )
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm text-foreground">
      {children}
    </code>
  )
}

/** Semantic tone mapping onto RelUX tokens. */
export type Tone = 'info' | 'success' | 'warning' | 'danger' | 'neutral'
export const TONE_SOFT: Record<Tone, string> = {
  info: 'bg-brand-soft text-primary',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-destructive',
  neutral: 'bg-muted text-muted-foreground',
}
export const TONE_BORDER: Record<Tone, string> = {
  info: 'border-primary',
  success: 'border-success',
  warning: 'border-warning',
  danger: 'border-destructive',
  neutral: 'border-border',
}

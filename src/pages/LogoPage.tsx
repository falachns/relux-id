import type { ReactNode } from 'react'
import { RelUXLogo } from '../components/brand/RelUXLogo'
import { PropsTable } from '../components/docs/PropsTable'
import { Section } from '../components/docs/Section'
import { PageHeader } from '../components/docs/PageHeader'
import { GuidelineCard } from '../components/docs/GuidelineCard'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

/** Official RelUX mark from the KAI kit; sizes to its container. */
function ReluxMark() {
  return <RelUXLogo variant="icon" height={64} title="Lambang RelUX" className="size-full" />
}

function Wordmark({ tone }: { tone: 'brand' | 'invert' | 'mono' }) {
  const color =
    tone === 'invert' ? 'var(--primary-foreground)' : tone === 'mono' ? 'var(--foreground)' : undefined
  return <RelUXLogo height={40} iconColor={color} textColor={color} title="Logo RelUX" />
}

type PageCopy = {
  title: string
  category: string
  description: string
  assetsTitle: string
  assetsDesc: string
  fullColor: string
  whiteOnPrimary: string
  monochrome: string
  markOnly: string
  clearSpaceTitle: string
  clearSpaceDesc: string
  minSizesTitle: string
  minSizesColumns: { media: string; size: string; note: string }
  minSizesRows: { media: string; size: string; note: string }[]
  guidelinesTitle: string
  dosTitle: string
  dontsTitle: string
  dos: string[]
  donts: string[]
}

const COPY = {
  id: {
    title: 'Logo',
    category: 'Merek',
    description: 'Lambang RelUX adalah wajah design system PT Kereta Api Indonesia. Ia menjaga hubungan visual dengan keluarga merek KAI dan tampil konsisten di seluruh dokumentasi serta produk internal.',
    assetsTitle: 'Aset logo',
    assetsDesc: 'Tersedia tiga varian utama. Pilih varian yang menjaga kontras terbaik terhadap latar tempat logo ditempatkan.',
    fullColor: 'Warna Penuh',
    whiteOnPrimary: 'Putih (di atas primary)',
    monochrome: 'Monokrom',
    markOnly: 'Lambang Saja',
    clearSpaceTitle: 'Ruang bebas (clear space)',
    clearSpaceDesc: 'Sisakan ruang kosong minimal 0,2 × lebar lambang di setiap sisi. Tidak ada elemen lain — teks, ikon, maupun garis — yang boleh masuk ke area ini.',
    minSizesTitle: 'Ukuran minimum',
    minSizesColumns: { media: 'Media', size: 'Ukuran Minimum', note: 'Catatan' },
    minSizesRows: [
      { media: 'Layar / Digital', size: '32px', note: 'Ukuran minimum lambang penuh pada UI.' },
      { media: 'Cetak', size: '15mm', note: 'Menjaga keterbacaan wordmark pada material cetak.' },
      { media: 'Favicon', size: '16px', note: 'Gunakan lambang "R" tanpa wordmark.' },
    ],
    guidelinesTitle: 'Panduan penggunaan',
    dosTitle: 'Lakukan',
    dontsTitle: 'Hindari',
    dos: [
      'Gunakan varian dengan kontras memadai terhadap latar.',
      'Pertahankan proporsi asli lambang dan wordmark.',
      'Jaga ruang bebas di sekeliling logo.',
      'Pakai varian monokrom bila warna penuh tidak memungkinkan.',
    ],
    donts: [
      'Meregangkan atau memampatkan logo.',
      'Mewarnai ulang di luar palet merek.',
      'Menambah bayangan, gradasi, atau efek lain.',
      'Menempatkan logo pada latar yang menurunkan keterbacaan.',
    ],
  },
  en: {
    title: 'Logo',
    category: 'Brand',
    description: 'The RelUX brand mark represents the visual identity of PT Kereta Api Indonesia’s design system, maintaining visual affinity with KAI’s brand family across all internal tools and documentation.',
    assetsTitle: 'Logo Assets',
    assetsDesc: 'Three primary variants are available. Choose the variant that preserves maximum contrast against its background surface.',
    fullColor: 'Full Color',
    whiteOnPrimary: 'White (on primary)',
    monochrome: 'Monochrome',
    markOnly: 'Mark Only',
    clearSpaceTitle: 'Clear space',
    clearSpaceDesc: 'Maintain a minimum clear space of 0.2 × mark width on all sides. No secondary elements — text, icons, or rules — may encroach into this perimeter.',
    minSizesTitle: 'Minimum sizes',
    minSizesColumns: { media: 'Media', size: 'Minimum Size', note: 'Notes' },
    minSizesRows: [
      { media: 'Screen / Digital', size: '32px', note: 'Minimum size for the complete brand mark on UI.' },
      { media: 'Print', size: '15mm', note: 'Preserves legibility of wordmark on printed collaterals.' },
      { media: 'Favicon', size: '16px', note: 'Use the standalone "R" emblem without wordmark.' },
    ],
    guidelinesTitle: 'Usage guidelines',
    dosTitle: 'Do',
    dontsTitle: 'Don’t',
    dos: [
      'Use variants that provide sufficient contrast against their background.',
      'Maintain the original proportions of emblem and wordmark.',
      'Keep clear space around the logo perimeter.',
      'Use monochrome variants when full-color reproduction is not possible.',
    ],
    donts: [
      'Stretching or compressing the logo geometry.',
      'Recoloring outside the authorized brand palettes.',
      'Adding shadows, gradients, or exterior filters.',
      'Placing the logo on busy backgrounds that harm legibility.',
    ],
  },
} satisfies Localized<PageCopy>

export function LogoPage({
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

      <Section id="assets" title={t.assetsTitle}>
        <p className="mb-4">{t.assetsDesc}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <LogoCard label={t.fullColor} surface="bg-card">
            <Wordmark tone="brand" />
          </LogoCard>
          <LogoCard label={t.whiteOnPrimary} surface="bg-primary">
            <Wordmark tone="invert" />
          </LogoCard>
          <LogoCard label={t.monochrome} surface="bg-card">
            <Wordmark tone="mono" />
          </LogoCard>
          <LogoCard label={t.markOnly} surface="bg-muted">
            <div className="size-14 text-primary">
              <ReluxMark />
            </div>
          </LogoCard>
        </div>
      </Section>

      <Section id="clear-space" title={t.clearSpaceTitle}>
        <p className="mb-4">{t.clearSpaceDesc}</p>
        <div className="flex justify-center rounded-lg border border-border bg-muted/40 p-8">
          <div className="rounded-lg border-2 border-dashed border-accent/50 p-8">
            <div className="size-16 text-primary">
              <ReluxMark />
            </div>
          </div>
        </div>
      </Section>

      <Section id="min-sizes" title={t.minSizesTitle}>
        <PropsTable
          columns={[
            { key: 'media', header: t.minSizesColumns.media },
            { key: 'size', header: t.minSizesColumns.size, mono: true },
            { key: 'note', header: t.minSizesColumns.note },
          ]}
          rows={t.minSizesRows}
        />
      </Section>

      <Section id="guidelines" title={t.guidelinesTitle}>
        <div className="grid gap-3 sm:grid-cols-2">
          <GuidelineCard tone="do" title={t.dosTitle} items={t.dos} />
          <GuidelineCard tone="dont" title={t.dontsTitle} items={t.donts} />
        </div>
      </Section>
    </article>
  )
}

function LogoCard({
  label,
  surface,
  children,
}: {
  label: string
  surface: string
  children: ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className={'grid min-h-32 place-items-center p-6 ' + surface}>
        {children}
      </div>
      <div className="border-t border-border bg-card px-4 py-2.5">
        <span className="text-sm font-medium text-card-foreground">
          {label}
        </span>
      </div>
    </div>
  )
}

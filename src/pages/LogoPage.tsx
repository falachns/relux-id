import { useState, type ReactNode } from 'react'
import { PropsTable } from '../components/docs/PropsTable'
import { Section } from '../components/docs/Section'
import { PageHeader } from '../components/docs/PageHeader'
import { GuidelineCard } from '../components/docs/GuidelineCard'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'
import { Check, Copy, Download } from 'lucide-react'

// Official geometric vector path for the RelUX wordmark
const RELUX_PATH =
  'M170.105 129V16.9376H219.192C227.399 16.9376 234.502 18.3055 240.499 21.0413C246.602 23.7771 251.285 27.6703 254.547 32.721C257.809 37.6665 259.44 43.559 259.44 50.3985C259.44 55.5544 258.335 60.1316 256.125 64.1301C254.021 68.1285 251.074 71.3905 247.286 73.9158C243.603 76.4412 239.342 78.0195 234.502 78.6508L234.028 77.2303C241.499 77.2303 247.181 78.8613 251.074 82.1232C254.968 85.2799 257.177 90.1727 257.703 96.8018L260.544 129H236.08L234.028 100.59C233.713 96.2757 232.345 93.119 229.924 91.1198C227.61 89.0153 223.611 87.9631 217.929 87.9631H194.096V129H170.105ZM194.096 67.9181H216.509C222.296 67.9181 226.768 66.6028 229.924 63.9722C233.186 61.2364 234.817 57.3958 234.817 52.4503C234.817 47.3996 233.186 43.6116 229.924 41.0863C226.663 38.4557 221.928 37.1404 215.719 37.1404H194.096V67.9181ZM310.213 130.894C301.585 130.894 294.061 129.105 287.643 125.528C281.329 121.845 276.384 116.689 272.806 110.06C269.334 103.431 267.598 95.6443 267.598 86.7004C267.598 77.7564 269.334 70.0226 272.806 63.4987C276.384 56.8697 281.329 51.7138 287.643 48.031C293.956 44.3482 301.427 42.5068 310.055 42.5068C318.473 42.5068 325.786 44.3482 331.994 48.031C338.202 51.7138 342.99 56.9749 346.357 63.8144C349.829 70.6539 351.565 78.8087 351.565 88.2787V93.0138H292.062C292.378 99.748 294.166 104.746 297.428 108.008C300.795 111.27 305.215 112.901 310.686 112.901C314.685 112.901 317.999 112.059 320.63 110.376C323.366 108.692 325.312 106.114 326.47 102.642L350.303 104.062C348.093 112.48 343.411 119.056 336.256 123.791C329.1 128.526 320.419 130.894 310.213 130.894ZM292.062 78.493H327.259C326.943 72.2849 325.207 67.655 322.05 64.6036C318.999 61.5521 315.001 60.0264 310.055 60.0264C305.11 60.0264 301.006 61.6573 297.744 64.9193C294.587 68.0759 292.693 72.6005 292.062 78.493ZM385.119 129C378.174 129 372.755 127.264 368.862 123.791C364.969 120.319 363.022 114.69 363.022 106.903V16.9376H386.697V104.378C386.697 106.903 387.276 108.692 388.433 109.744C389.591 110.796 391.274 111.323 393.484 111.323H399.166V129H385.119ZM453.694 131.525C444.224 131.525 436.017 129.789 429.072 126.317C422.233 122.844 416.919 117.899 413.131 111.48C409.343 104.957 407.449 97.3279 407.449 88.5944V16.7798H431.44V88.5944C431.44 95.8548 433.334 101.484 437.122 105.483C441.015 109.376 446.539 111.323 453.694 111.323C460.849 111.323 466.321 109.376 470.109 105.483C473.897 101.484 475.791 95.8548 475.791 88.5944V16.7798H499.782V88.5944C499.782 97.3279 497.888 104.957 494.1 111.48C490.417 117.899 485.103 122.844 478.158 126.317C471.214 129.789 463.059 131.525 453.694 131.525ZM507.062 129L545.1 72.811L507.378 16.9376H535.156L559.621 54.66L583.454 16.9376H611.39L573.668 72.4953L611.864 129H583.927L559.305 90.6463L534.999 129H507.062Z'

function getWordmarkSvg(color: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="168 15 446 118" width="446" height="118"><path d="${RELUX_PATH}" fill="${color}"/></svg>`
}

function getLockupSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 120" width="630" height="120"><g transform="translate(-165, -7)"><path d="${RELUX_PATH}" fill="#0D1B3E"/></g><rect x="465" y="38" width="145" height="44" rx="8" fill="#F37021" fill-opacity="0.12" stroke="#F37021" stroke-width="2.5"/><text x="537" y="66" font-family="system-ui, -apple-system, sans-serif" font-size="19" font-weight="800" fill="#D95D16" text-anchor="middle" letter-spacing="2">BY KAI</text></svg>`
}

type PageCopy = {
  title: string
  category: string
  description: string
  assetsTitle: string
  assetsDesc: string
  cardPrimaryTitle: string
  cardPrimaryDesc: string
  cardInvertedTitle: string
  cardInvertedDesc: string
  cardMonoTitle: string
  cardMonoDesc: string
  cardLockupTitle: string
  cardLockupDesc: string
  copySvg: string
  copied: string
  downloadSvg: string
  clearSpaceTitle: string
  clearSpaceDesc: string
  clearSpaceRule1: string
  clearSpaceRule2: string
  clearSpaceRule3: string
  minSizesTitle: string
  minSizesDesc: string
  minSizesColumns: { media: string; size: string; note: string }
  minSizesRows: { media: string; size: string; note: string }[]
  contrastTitle: string
  contrastDesc: string
  contrastItems: { surface: string; variant: string; ratio: string; rule: string }[]
  guidelinesTitle: string
  dosTitle: string
  dontsTitle: string
  dos: string[]
  donts: string[]
}

const COPY = {
  id: {
    title: 'Logo & Wordmark RelUX',
    category: 'Merek',
    description:
      'Spesifikasi resmi identitas visual RelUX Design System PT Kereta Api Indonesia (Persero). Mengusung tipografi geometris berkarakter railway yang presisi, harmonis, dan selaras dengan standar korporat KAI.',
    assetsTitle: 'Aset Resmi Wordmark & Lockup',
    assetsDesc:
      'Empat varian resmi siap pakai untuk berbagai media. Setiap kartu dilengkapi aksi salin dan unduh kode vektor SVG standar produksi.',
    cardPrimaryTitle: 'Primary Wordmark',
    cardPrimaryDesc: 'KAI Navy (#0D1B3E) di atas latar putih bersih. Pilihan utama untuk UI web, aplikasi, dan dokumen resmi.',
    cardInvertedTitle: 'Inverted Wordmark',
    cardInvertedDesc: 'Putih (#FFFFFF) di atas latar solid KAI Navy (#0D1B3E). Wajib dipakai pada header gelap, footer, dan kartu kontras tinggi.',
    cardMonoTitle: 'Monochrome Wordmark',
    cardMonoDesc: 'Hitam Netral (#111827) di atas latar abu-abu netral (#F8FAFC). Digunakan untuk cetak monokrom, stempel, atau media hitam-putih.',
    cardLockupTitle: 'Lockup Resmi (Wordmark + Sub-brand)',
    cardLockupDesc: 'Wordmark RelUX berpadu dengan badge "BY KAI". Digunakan untuk halaman pengenalan eksternal, hero banner, dan presentasi publik.',
    copySvg: 'Salin SVG',
    copied: 'Tersalin!',
    downloadSvg: 'Unduh SVG',
    clearSpaceTitle: 'Ruang Bebas (Clear Space 1R)',
    clearSpaceDesc:
      'Area aman di sekeliling wordmark ditentukan berdasarkan tinggi huruf kapital "R" (1R). Tidak ada elemen teks, garis, maupun ikon yang boleh masuk ke perimeter ini.',
    clearSpaceRule1: 'Tinggi huruf "R" menjadi unit referensi proporsional (1R).',
    clearSpaceRule2: 'Batas aman minimal 1R wajib dijaga di sisi atas, kanan, bawah, dan kiri logo.',
    clearSpaceRule3: 'Saat ditempatkan di dekat tepi layar atau grid, pertahankan jarak minimal 1R dari batas tepi.',
    minSizesTitle: 'Ukuran Minimum & Ketajaman Visual',
    minSizesDesc:
      'Batas ukuran terkecil yang diizinkan untuk menjaga keterbacaan lekukan tipografi dan rasio kontras visual di berbagai media.',
    minSizesColumns: { media: 'Media / Konteks', size: 'Ukuran Minimum', note: 'Pedoman Teknis' },
    minSizesRows: [
      { media: 'Layar Digital (UI)', size: 'Lebar 80px', note: 'Menjamin keterbacaan legibilitas huruf kecil "el" dan ketajaman pada layar non-retina.' },
      { media: 'Header Navigasi Web', size: 'Tinggi 28px – 32px', note: 'Tinggi ideal untuk header bar aplikasi dengan lebar proporsional otomatis.' },
      { media: 'Material Cetak (Offset/Print)', size: 'Lebar 25mm', note: 'Resolusi minimal 300 DPI guna mencegah distorsi tinta pada sudut-sudut huruf.' },
      { media: 'Favicon & App Icon Miniatur', size: '16px / 32px', note: 'Gunakan simbol inisial kanonikal tanpa wordmark panjang.' },
    ],
    contrastTitle: 'Aturan Kontras Warna Latar (WCAG AA)',
    contrastDesc:
      'Seluruh penempatan logo wajib memenuhi rasio kontras minimal 4.5:1 terhadap permukaan latar belakang untuk menjamin aksesibilitas tingkat AA/AAA.',
    contrastItems: [
      { surface: 'Latar Putih (#FFFFFF) / Terang', variant: 'Primary Navy (#0D1B3E)', ratio: '14.8:1 (AAA)', rule: 'Wajib digunakan pada dokumen, halaman konten, dan dashboard terang.' },
      { surface: 'Latar KAI Navy (#0D1B3E) / Gelap', variant: 'Inverted Putih (#FFFFFF)', ratio: '15.2:1 (AAA)', rule: 'Wajib digunakan pada header gelap, hero section, dan media promosi malam.' },
      { surface: 'Latar Abu-abu Lembut (#F8FAFC)', variant: 'Monochrome (#111827)', ratio: '16.1:1 (AAA)', rule: 'Direkomendasikan untuk mode cetak monokrom, faktur, dan cap resmi.' },
    ],
    guidelinesTitle: 'Panduan Penggunaan (Do & Don’t)',
    dosTitle: 'Lakukan (Do)',
    dontsTitle: 'Hindari (Don’t)',
    dos: [
      'Gunakan file vektor SVG resmi yang tersedia di katalog ini.',
      'Pertahankan aspek rasio dan proporsi asli huruf saat melakukan scaling.',
      'Pastikan rasio kontras warna terhadap latar minimal 4.5:1 (WCAG AA).',
      'Terapkan batas ruang bebas minimal 1R di keempat sisi wordmark.',
    ],
    donts: [
      'Meregangkan (stretch), memipihkan, atau memutar sudut wordmark.',
      'Mengganti warna huruf dengan warna di luar palet resmi korporat KAI.',
      'Menambahkan efek bayangan (drop shadow), bevel, gradasi luar, atau outline.',
      'Menempatkan logo di atas latar belakang foto yang rumit tanpa pelat peredam.',
    ],
  },
  en: {
    title: 'RelUX Logo & Wordmark',
    category: 'Brand',
    description:
      'Official visual identity specifications for the RelUX Design System of PT Kereta Api Indonesia (Persero). Features precision railway typography engineered for corporate harmony and accessibility.',
    assetsTitle: 'Official Wordmark & Lockup Assets',
    assetsDesc:
      'Four production-ready variants for diverse touchpoints. Each card includes one-click SVG copy and download actions.',
    cardPrimaryTitle: 'Primary Wordmark',
    cardPrimaryDesc: 'KAI Navy (#0D1B3E) on clean white background. Primary choice for web UI, dashboards, and official publications.',
    cardInvertedTitle: 'Inverted Wordmark',
    cardInvertedDesc: 'White (#FFFFFF) on solid KAI Navy (#0D1B3E). Required on dark navigation bars, footers, and high-contrast hero areas.',
    cardMonoTitle: 'Monochrome Wordmark',
    cardMonoDesc: 'Neutral Black (#111827) on soft neutral surface (#F8FAFC). Intended for monochrome print, invoices, and single-ink production.',
    cardLockupTitle: 'Official Lockup (Wordmark + Sub-brand)',
    cardLockupDesc: 'RelUX wordmark paired with "BY KAI" badge. Recommended for landing pages, keynote banners, and public announcements.',
    copySvg: 'Copy SVG',
    copied: 'Copied!',
    downloadSvg: 'Download SVG',
    clearSpaceTitle: 'Clear Space (1R Rule)',
    clearSpaceDesc:
      'The protected boundary around the wordmark is derived from the cap-height of the letter "R" (1R). No competing visual elements may intrude into this zone.',
    clearSpaceRule1: 'The cap-height of letter "R" serves as the reference unit (1R).',
    clearSpaceRule2: 'A minimum clearance of 1R must be preserved on top, right, bottom, and left sides.',
    clearSpaceRule3: 'Maintain at least 1R distance from viewport margins and parent layout bounds.',
    minSizesTitle: 'Minimum Sizes & Display Fidelity',
    minSizesDesc:
      'Strict minimum size thresholds to ensure character legibility and crisp vector rendering across physical and digital formats.',
    minSizesColumns: { media: 'Media / Context', size: 'Minimum Size', note: 'Technical Rule' },
    minSizesRows: [
      { media: 'Digital Screen (UI)', size: '80px width', note: 'Ensures optimal clarity for lowercase glyphs "el" on standard density displays.' },
      { media: 'Web Navigation Header', size: '28px – 32px height', note: 'Recommended height for navigation toolbars with proportional auto width.' },
      { media: 'Printed Material (Offset)', size: '25mm width', note: 'Minimum 300 DPI resolution to prevent ink bleed across letter curves.' },
      { media: 'Favicon & Micro Icon', size: '16px / 32px', note: 'Use standalone canonical symbol rather than full wordmark.' },
    ],
    contrastTitle: 'Background Contrast Rules (WCAG AA)',
    contrastDesc:
      'All logo placements must achieve a minimum contrast ratio of 4.5:1 against the underlying surface to comply with WCAG 2.1 AA/AAA standards.',
    contrastItems: [
      { surface: 'White (#FFFFFF) / Light Surface', variant: 'Primary Navy (#0D1B3E)', ratio: '14.8:1 (AAA)', rule: 'Mandatory on light documentation, portals, and dashboards.' },
      { surface: 'KAI Navy (#0D1B3E) / Dark Surface', variant: 'Inverted White (#FFFFFF)', ratio: '15.2:1 (AAA)', rule: 'Mandatory on dark headers, footers, and night mode surfaces.' },
      { surface: 'Soft Gray (#F8FAFC) / Neutral', variant: 'Monochrome (#111827)', ratio: '16.1:1 (AAA)', rule: 'Recommended for single-color print, receipts, and watermarks.' },
    ],
    guidelinesTitle: 'Usage Guidelines (Do & Don’t)',
    dosTitle: 'Do',
    dontsTitle: 'Don’t',
    dos: [
      'Use official vector SVG files downloaded directly from this catalog.',
      'Preserve authentic aspect ratio and glyph geometry during resizing.',
      'Ensure a minimum background contrast ratio of 4.5:1 (WCAG AA).',
      'Maintain the 1R clear space boundary around the logo perimeter.',
    ],
    donts: [
      'Distorting, stretching, skewing, or rotating the wordmark.',
      'Recoloring glyphs outside official KAI Navy (#0D1B3E) or neutral palettes.',
      'Adding outer glows, drop shadows, artificial outlines, or bevels.',
      'Placing the logo over visually noisy photo textures without a contrast scrim.',
    ],
  },
} satisfies Localized<PageCopy>

export function LogoPage({
  onNavigate,
}: {
  onNavigate?: (section: SectionId) => void
}) {
  const t = useLocalized(COPY)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (id: string, svgString: string) => {
    try {
      await navigator.clipboard.writeText(svgString)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // fallback
    }
  }

  const handleDownload = (filename: string, svgString: string) => {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const primarySvg = getWordmarkSvg('#0D1B3E')
  const invertedSvg = getWordmarkSvg('#FFFFFF')
  const monoSvg = getWordmarkSvg('#111827')
  const lockupSvg = getLockupSvg()

  return (
    <article className="mx-auto max-w-4xl space-y-12">
      <PageHeader
        category={t.category}
        title={t.title}
        status="stable"
        version="v1.0.0"
        packageName="@make-kits/design-system-kai-v-1"
        description={t.description}
      />

      {/* 1. Official Logo Grid */}
      <Section id="assets" title={t.assetsTitle}>
        <p className="mb-6 text-sm text-slate-600 leading-relaxed">{t.assetsDesc}</p>
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Card 1: Primary Wordmark */}
          <AssetCard
            id="primary"
            title={t.cardPrimaryTitle}
            description={t.cardPrimaryDesc}
            copied={copiedId === 'primary'}
            onCopy={() => handleCopy('primary', primarySvg)}
            onDownload={() => handleDownload('relux-wordmark-primary.svg', primarySvg)}
            previewBg="bg-white border border-slate-200"
            copyLabel={t.copySvg}
            copiedLabel={t.copied}
            downloadLabel={t.downloadSvg}
          >
            <svg
              viewBox="168 15 446 118"
              className="h-10 w-auto max-w-[220px]"
              role="img"
              aria-label="RelUX Primary Wordmark Navy"
            >
              <path d={RELUX_PATH} fill="#0D1B3E" />
            </svg>
          </AssetCard>

          {/* Card 2: Inverted Wordmark */}
          <AssetCard
            id="inverted"
            title={t.cardInvertedTitle}
            description={t.cardInvertedDesc}
            copied={copiedId === 'inverted'}
            onCopy={() => handleCopy('inverted', invertedSvg)}
            onDownload={() => handleDownload('relux-wordmark-inverted.svg', invertedSvg)}
            previewBg="bg-[#0D1B3E] border border-[#0D1B3E]"
            copyLabel={t.copySvg}
            copiedLabel={t.copied}
            downloadLabel={t.downloadSvg}
          >
            <svg
              viewBox="168 15 446 118"
              className="h-10 w-auto max-w-[220px]"
              role="img"
              aria-label="RelUX Inverted Wordmark White"
            >
              <path d={RELUX_PATH} fill="#FFFFFF" />
            </svg>
          </AssetCard>

          {/* Card 3: Monochrome Wordmark */}
          <AssetCard
            id="monochrome"
            title={t.cardMonoTitle}
            description={t.cardMonoDesc}
            copied={copiedId === 'monochrome'}
            onCopy={() => handleCopy('monochrome', monoSvg)}
            onDownload={() => handleDownload('relux-wordmark-monochrome.svg', monoSvg)}
            previewBg="bg-slate-50 border border-slate-200"
            copyLabel={t.copySvg}
            copiedLabel={t.copied}
            downloadLabel={t.downloadSvg}
          >
            <svg
              viewBox="168 15 446 118"
              className="h-10 w-auto max-w-[220px]"
              role="img"
              aria-label="RelUX Monochrome Wordmark"
            >
              <path d={RELUX_PATH} fill="#111827" />
            </svg>
          </AssetCard>

          {/* Card 4: Official Lockup with BY KAI */}
          <AssetCard
            id="lockup"
            title={t.cardLockupTitle}
            description={t.cardLockupDesc}
            copied={copiedId === 'lockup'}
            onCopy={() => handleCopy('lockup', lockupSvg)}
            onDownload={() => handleDownload('relux-lockup-by-kai.svg', lockupSvg)}
            previewBg="bg-white border border-slate-200"
            copyLabel={t.copySvg}
            copiedLabel={t.copied}
            downloadLabel={t.downloadSvg}
          >
            <div className="flex items-center gap-3">
              <svg
                viewBox="168 15 446 118"
                className="h-9 w-auto"
                role="img"
                aria-label="RelUX Lockup Wordmark"
              >
                <path d={RELUX_PATH} fill="#0D1B3E" />
              </svg>
              <span className="inline-flex items-center rounded-md border border-[#F37021]/30 bg-[#F37021]/10 px-2 py-0.5 text-xs font-extrabold uppercase tracking-widest text-[#D95D16]">
                BY KAI
              </span>
            </div>
          </AssetCard>
        </div>
      </Section>

      {/* 2. Clear Space Section */}
      <Section id="clear-space" title={t.clearSpaceTitle}>
        <p className="mb-6 text-sm text-muted-foreground leading-relaxed">{t.clearSpaceDesc}</p>
        <div className="overflow-hidden rounded-xl border border-border bg-card p-8 sm:p-12">
          <div className="relative mx-auto flex max-w-md items-center justify-center">
            {/* Dashed 1R clear space boundary box */}
            <div className="relative rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 p-8 sm:p-10">
              {/* Dimension indicators */}
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-xs font-bold text-primary">
                1R
              </span>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs font-bold text-primary">
                1R
              </span>
              <span className="absolute -left-7 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-primary">
                1R
              </span>
              <span className="absolute -right-7 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-primary">
                1R
              </span>

              {/* Wordmark in center */}
              <svg
                viewBox="168 15 446 118"
                className="h-10 sm:h-12 w-auto"
                role="img"
                aria-label="RelUX Clear Space Diagram"
              >
                <path d={RELUX_PATH} fill="#0D1B3E" />
              </svg>
            </div>
          </div>

          <div className="mt-8 grid gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:grid-cols-3">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 size-1.5 rounded-full bg-primary shrink-0" />
              <span>{t.clearSpaceRule1}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 size-1.5 rounded-full bg-primary shrink-0" />
              <span>{t.clearSpaceRule2}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 size-1.5 rounded-full bg-primary shrink-0" />
              <span>{t.clearSpaceRule3}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Minimum Sizes Section */}
      <Section id="min-sizes" title={t.minSizesTitle}>
        <p className="mb-4 text-sm text-muted-foreground">{t.minSizesDesc}</p>
        <PropsTable
          columns={[
            { key: 'media', header: t.minSizesColumns.media },
            { key: 'size', header: t.minSizesColumns.size, mono: true },
            { key: 'note', header: t.minSizesColumns.note },
          ]}
          rows={t.minSizesRows}
        />
      </Section>

      {/* 4. Contrast Rules Section */}
      <Section id="contrast-rules" title={t.contrastTitle}>
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{t.contrastDesc}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {t.contrastItems.map((item) => (
            <div
              key={item.surface}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-2xs"
            >
              <div>
                <span className="inline-block rounded-md bg-secondary px-2 py-0.5 font-mono text-xs font-bold text-primary">
                  {item.ratio}
                </span>
                <h4 className="mt-2.5 text-sm font-bold text-foreground">{item.surface}</h4>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{item.variant}</p>
              </div>
              <p className="mt-3 border-t border-border/60 pt-2.5 text-xs text-muted-foreground leading-normal">
                {item.rule}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Usage Guidelines (Do & Don’t) */}
      <Section id="guidelines" title={t.guidelinesTitle}>
        <div className="grid gap-4 sm:grid-cols-2">
          <GuidelineCard tone="do" title={t.dosTitle} items={t.dos} />
          <GuidelineCard tone="dont" title={t.dontsTitle} items={t.donts} />
        </div>
      </Section>
    </article>
  )
}

function AssetCard({
  id,
  title,
  description,
  previewBg,
  children,
  copied,
  onCopy,
  onDownload,
  copyLabel,
  copiedLabel,
  downloadLabel,
}: {
  id: string
  title: string
  description: string
  previewBg: string
  children: ReactNode
  copied: boolean
  onCopy: () => void
  onDownload: () => void
  copyLabel: string
  copiedLabel: string
  downloadLabel: string
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xs transition-shadow hover:shadow-xs">
      {/* Preview Surface */}
      <div className={`grid h-36 place-items-center p-6 ${previewBg}`}>
        {children}
      </div>

      {/* Metadata & Actions */}
      <div className="flex flex-1 flex-col justify-between border-t border-border p-4">
        <div>
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground leading-normal">{description}</p>
        </div>

        <div className="mt-4 flex items-center gap-2 pt-2 border-t border-border/60">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground shadow-2xs hover:bg-muted hover:border-border/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-success" aria-hidden="true" />
                <span className="text-success font-bold">{copiedLabel}</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 text-muted-foreground" aria-hidden="true" />
                <span>{copyLabel}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onDownload}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground shadow-2xs hover:bg-muted hover:border-border/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Download className="size-3.5 text-muted-foreground" aria-hidden="true" />
            <span>{downloadLabel}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

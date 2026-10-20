import type { ReactNode } from 'react'
import { Section } from '../components/docs/Section'
import { ComponentCode } from '../components/docs/ComponentCode'
import { ArrowRight, Plus, ChevronDown } from 'lucide-react'
import { PropsTable } from '../components/docs/PropsTable'
import { PageHeader } from '../components/docs/PageHeader'
import { GuidelineCard } from '../components/docs/GuidelineCard'
import { Button } from '../components/ui/button'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type PageCopy = {
  title: string
  category: string
  description: string
  versionLabel: string
  categoryLabel: string
  updatedLabel: string
  usageTitle: string
  usageDesc: string
  quickActionLabel: string
  bookTicket: string
  viewSchedule: string
  stateActionLabel: string
  processingPayment: string
  soldOut: string
  sizesTitle: string
  sizesDesc: string
  sizeComparisonLabel: string
  typesTitle: string
  typesDesc: string
  buttonVariantsLabel: string
  withIconsLabel: string
  add: string
  next: string
  addAriaLabel: string
  selectionTitle: string
  brandColorsTitle: string
  brandColorsDesc: string
  guidelinesTitle: string
  dosTitle: string
  dontsTitle: string
  dos: string[]
  donts: string[]
  hierarchyTitle: string
  hierarchyDesc: string
  hierarchyColumns: { tier: string; variant: string; purpose: string }
  hierarchyRows: { tier: string; variant: string; purpose: string }[]
  placementTitle: string
  placementDesc: string
  placementItems: { title: string; desc: string }[]
  a11yTitle: string
  a11yItems: string[]
  codeTitle: string
  propsTitle: string
  propsColumns: { prop: string; type: string; def: string; desc: string }
  propsRows: { prop: string; type: string; def: string; desc: string }[]
  changelogTitle: string
  faqTitle: string
  faqs: { q: string; a: string }[]
}

const COPY = {
  id: {
    title: 'Button',
    category: 'Komponen',
    description: 'Tombol memicu aksi — mengirim formulir, membuka dialog, atau melanjutkan alur. RelUX menyediakan lima varian dengan tiga ukuran, lengkap dengan state loading dan disabled.',
    versionLabel: 'Versi',
    categoryLabel: 'Kategori',
    updatedLabel: 'Diperbarui',
    usageTitle: 'Penggunaan',
    usageDesc: 'Tombol digunakan untuk memicu tindakan atau aksi penting dalam alur aplikasi, seperti mengirim formulir, konfirmasi pesanan, atau navigasi ke proses berikutnya.',
    quickActionLabel: 'Aksi Cepat',
    bookTicket: 'Pesan Tiket Sekarang',
    viewSchedule: 'Lihat Jadwal',
    stateActionLabel: 'State Aksi',
    processingPayment: 'Memproses Pembayaran…',
    soldOut: 'Tiket Habis',
    sizesTitle: 'Ukuran',
    sizesDesc: 'Tersedia 3 opsi ukuran standar (sm, md, lg) untuk memastikan target sentuh dan proporsi visual optimal di berbagai kerapatan layar.',
    sizeComparisonLabel: 'Perbandingan Ukuran',
    typesTitle: 'Jenis button',
    typesDesc: 'RelUX menyediakan 5 jenis varian gaya tombol untuk merefleksikan peran visual dan urgensi aksi:',
    buttonVariantsLabel: 'Varian Tombol',
    withIconsLabel: 'Dengan Ikon',
    add: 'Tambah',
    next: 'Lanjut',
    addAriaLabel: 'Tambah item',
    selectionTitle: 'Memilih button',
    brandColorsTitle: 'Warna brand KAI',
    brandColorsDesc: 'Varian brand memakai token canonical masing-masing produk KAI Group.',
    guidelinesTitle: 'Cara penggunaan yang disarankan',
    dosTitle: 'Lakukan',
    dontsTitle: 'Hindari',
    dos: [
      'Gunakan satu tombol primary per tampilan utama.',
      'Tulis label kata kerja yang ringkas ("Pesan Tiket", "Unduh").',
      'Tampilkan state loading untuk aksi asinkron guna mencegah submit ganda.',
      'Sediakan label aksesibel (aria-label) jika tombol hanya berupa ikon.',
    ],
    donts: [
      'Menumpuk lebih dari satu tombol primary dalam satu baris aksi.',
      'Memakai varian destructive untuk aksi non-kritis atau sekadar menutup modal.',
      'Menggunakan label ambigu seperti "Klik di Sini" atau "Lanjutkan Saja".',
      'Menonaktifkan fokus keyboard atau menghapus outline fokus.',
    ],
    hierarchyTitle: 'Hierarki button',
    hierarchyDesc: 'Hierarki menentukan urutan perhatian mata pengguna saat melihat aksi. Letakkan tombol berbobot lebih tinggi di posisi paling menonjol.',
    hierarchyColumns: { tier: 'Tingkat Hierarki', variant: 'Varian Rekomendasi', purpose: 'Tujuan Penggunaan' },
    hierarchyRows: [
      { tier: 'Tier 1 (High)', variant: 'Primary Button', purpose: 'Aksi tunggal paling penting pada halaman atau modal.' },
      { tier: 'Tier 2 (Medium)', variant: 'Secondary / Outline Button', purpose: 'Aksi pendukung penting yang bersanding dengan Primary.' },
      { tier: 'Tier 3 (Low)', variant: 'Ghost Button / Text', purpose: 'Aksi opsional atau navigasi sampingan yang tidak mengalihkan fokus.' },
      { tier: 'Critical', variant: 'Destructive Button', purpose: 'Aksi bahaya dengan konfirmasi tambahan sebelum eksekusi.' },
    ],
    placementTitle: 'Penempatan',
    placementDesc: 'Konsistensi penempatan tombol membantu pengguna memprediksi interaksi di seluruh sistem aplikasi KAI:',
    placementItems: [
      { title: 'Modal & Dialog', desc: 'Tempatkan tombol aksi utama di sisi kanan bawah footer dialog, dengan aksi batal (outline/ghost) di sebelah kirinya.' },
      { title: 'Formulir Multi-Langkah', desc: 'Tombol aksi lanjut di sisi kanan, tombol kembali atau simpan draf di sisi kiri.' },
      { title: 'Tabel & Data Grid', desc: 'Gunakan tombol ukuran sm varian ghost atau outline di baris tindakan agar tidak membebani pemindaian data.' },
    ],
    a11yTitle: 'Aksesibilitas',
    a11yItems: [
      'Tombol berupa elemen <button> asli sehingga mendukung keyboard bawaan.',
      'Tombol khusus ikon wajib memiliki aria-label.',
      'State loading menandai aria-busy dan menonaktifkan klik ganda.',
      'Fokus terlihat lewat cincin fokus; target sentuh memenuhi tinggi minimum.',
    ],
    codeTitle: 'Kode',
    propsTitle: 'Props / API',
    propsColumns: { prop: 'Prop', type: 'Tipe', def: 'Default', desc: 'Deskripsi' },
    propsRows: [
      { prop: 'variant', type: '"primary" | "secondary" | "outline" | "ghost" | "destructive"', def: '"primary"', desc: 'Gaya visual tombol.' },
      { prop: 'size', type: '"sm" | "md" | "lg"', def: '"md"', desc: 'Ukuran tinggi & padding.' },
      { prop: 'loading', type: 'boolean', def: 'false', desc: 'Menampilkan spinner & menonaktifkan tombol.' },
      { prop: 'disabled', type: 'boolean', def: 'false', desc: 'Menonaktifkan interaksi.' },
      { prop: 'asChild', type: 'boolean', def: 'false', desc: 'Render sebagai elemen anak (mis. <a>) via Slot.' },
      { prop: 'leftIcon', type: 'ReactNode', def: '—', desc: 'Ikon sebelum label.' },
      { prop: 'rightIcon', type: 'ReactNode', def: '—', desc: 'Ikon setelah label.' },
    ],
    changelogTitle: 'Changelog',
    faqTitle: 'Pertanyaan Umum (FAQ)',
    faqs: [
      {
        q: 'Bagaimana penanganan form submit secara default?',
        a: 'Secara default elemen <button> bertindak sebagai type="submit" di dalam tag form. Jika tombol difungsikan untuk aksi non-submit (seperti membatalkan, membuka modal, atau navigasi), eksplisitkan atribut type="button" untuk mencegah reload browser.',
      },
      {
        q: 'Kapan menggunakan state disabled vs state loading?',
        a: 'Gunakan state loading saat permintaan jaringan asinkron (seperti submit transaksi tiket atau otentikasi) sedang berjalan; komponen secara otomatis menyetel aria-busy="true" dan mencegah klik ganda. Gunakan state disabled hanya saat data formulir belum lengkap atau prasyarat aksi belum terpenuhi.',
      },
      {
        q: 'Apakah komponen Button RelUX kompatibel dengan SSR?',
        a: 'Ya, seluruh styling dibangun di atas CSS canonical Make Kit (.relux-button) tanpa ketergantungan runtime client-side sehingga 100% kompatibel dan bebas layout shift di Laravel Blade, Next.js Server Components, dan Angular SSR.',
      },
      {
        q: 'Bagaimana menerapkan kustomisasi warna Brand KAI?',
        a: 'Gunakan varian brand ("brand" atau modifier .relux-button--brand-*) yang secara otomatis memetakan variabel warna token korporat KAI Navy (#002A54), Orange (#ED6B23), atau sub-brand terkait.',
      },
    ],
  },
  en: {
    title: 'Button',
    category: 'Components',
    description: 'Buttons trigger actions — submitting forms, opening dialogs, or advancing workflows. RelUX provides five variants across three sizes, complete with loading and disabled states.',
    versionLabel: 'Version',
    categoryLabel: 'Category',
    updatedLabel: 'Updated',
    usageTitle: 'Usage',
    usageDesc: 'Buttons are used to trigger key actions or interactions within application workflows, such as form submissions, order confirmations, or proceeding to the next step.',
    quickActionLabel: 'Quick Actions',
    bookTicket: 'Book Ticket Now',
    viewSchedule: 'View Schedule',
    stateActionLabel: 'Action States',
    processingPayment: 'Processing Payment…',
    soldOut: 'Sold Out',
    sizesTitle: 'Sizes',
    sizesDesc: 'Available in 3 standard sizes (sm, md, lg) to ensure optimal touch targets and visual balance across different display densities.',
    sizeComparisonLabel: 'Size Comparison',
    typesTitle: 'Button types',
    typesDesc: 'RelUX offers 5 button visual style variants to reflect visual role and action urgency:',
    buttonVariantsLabel: 'Button Variants',
    withIconsLabel: 'With Icons',
    add: 'Add',
    next: 'Next',
    addAriaLabel: 'Add item',
    selectionTitle: 'Choosing buttons',
    brandColorsTitle: 'KAI brand colors',
    brandColorsDesc: 'Brand variants use canonical tokens corresponding to each KAI Group product.',
    guidelinesTitle: 'Recommended guidelines',
    dosTitle: 'Do',
    dontsTitle: 'Don’t',
    dos: [
      'Use one primary button per main view.',
      'Write concise, action-oriented verb labels ("Book Ticket", "Download").',
      'Show loading states for asynchronous actions to prevent double submission.',
      'Provide an accessible label (aria-label) for icon-only buttons.',
    ],
    donts: [
      'Stacking more than one primary button in a single action group.',
      'Using the destructive variant for non-critical actions or simple modal closes.',
      'Using ambiguous labels like "Click Here" or "Proceed".',
      'Disabling keyboard focus or stripping focus rings.',
    ],
    hierarchyTitle: 'Button hierarchy',
    hierarchyDesc: 'Hierarchy governs visual emphasis across actions. Position higher-weight buttons in the most prominent locations.',
    hierarchyColumns: { tier: 'Hierarchy Level', variant: 'Recommended Variant', purpose: 'Purpose' },
    hierarchyRows: [
      { tier: 'Tier 1 (High)', variant: 'Primary Button', purpose: 'Single most critical action on a page or modal.' },
      { tier: 'Tier 2 (Medium)', variant: 'Secondary / Outline Button', purpose: 'Key supporting action paired alongside Primary.' },
      { tier: 'Tier 3 (Low)', variant: 'Ghost Button / Text', purpose: 'Optional action or sidebar navigation without stealing focus.' },
      { tier: 'Critical', variant: 'Destructive Button', purpose: 'Dangerous action requiring explicit confirmation before execution.' },
    ],
    placementTitle: 'Placement',
    placementDesc: 'Consistent button placement ensures predictable user interactions across all KAI applications:',
    placementItems: [
      { title: 'Modals & Dialogs', desc: 'Place primary actions at the bottom right of the dialog footer, with cancel (outline/ghost) to its left.' },
      { title: 'Multi-Step Forms', desc: 'Place the forward action on the right, and the back or save draft action on the left.' },
      { title: 'Tables & Data Grids', desc: 'Use sm sized ghost or outline buttons in action columns to prevent visual clutter.' },
    ],
    a11yTitle: 'Accessibility',
    a11yItems: [
      'Built with native <button> elements for built-in keyboard navigation.',
      'Icon-only buttons require an explicit aria-label.',
      'Loading states set aria-busy and prevent double clicks.',
      'Visible focus ring for keyboard navigation; satisfies minimum touch targets.',
    ],
    codeTitle: 'Code',
    propsTitle: 'Props / API',
    propsColumns: { prop: 'Prop', type: 'Type', def: 'Default', desc: 'Description' },
    propsRows: [
      { prop: 'variant', type: '"primary" | "secondary" | "outline" | "ghost" | "destructive"', def: '"primary"', desc: 'Visual style of the button.' },
      { prop: 'size', type: '"sm" | "md" | "lg"', def: '"md"', desc: 'Height and padding size.' },
      { prop: 'loading', type: 'boolean', def: 'false', desc: 'Displays spinner and disables the button.' },
      { prop: 'disabled', type: 'boolean', def: 'false', desc: 'Disables user interaction.' },
      { prop: 'asChild', type: 'boolean', def: 'false', desc: 'Render as child element (e.g. <a>) via Slot.' },
      { prop: 'leftIcon', type: 'ReactNode', def: '—', desc: 'Icon displayed before label.' },
      { prop: 'rightIcon', type: 'ReactNode', def: '—', desc: 'Icon displayed after label.' },
    ],
    changelogTitle: 'Component Changelog',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    faqs: [
      {
        q: 'How does form submission behave by default?',
        a: 'Native <button> elements default to type="submit" inside HTML form containers. For non-submitting triggers (e.g. modal dismiss, step navigation), explicitly set type="button" to prevent unwanted form dispatch.',
      },
      {
        q: 'When should I use disabled vs loading state?',
        a: 'Use loading state during asynchronous background operations (e.g. checkout dispatch, API queries); the button auto-injects aria-busy="true" and guards against double submissions. Use disabled only when prerequisite conditions remain unfulfilled.',
      },
      {
        q: 'Is RelUX Button compatible with Server-Side Rendering (SSR)?',
        a: 'Yes. All visual styles compile down to zero-runtime canonical CSS (.relux-button), rendering seamlessly across Laravel Blade, Next.js App Router (SSR), and Angular Universal without hydration mismatch.',
      },
      {
        q: 'How do I customize KAI corporate brand palettes?',
        a: 'Leverage the dedicated "brand" variant or .relux-button--brand-* modifiers mapped to canonical tokens such as KAI Navy (#002A54) and KAI Orange (#ED6B23).',
      },
    ],
  },
} satisfies Localized<PageCopy>

export function ButtonPage({
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
        packageName="@kai/relux-react"
        description={t.description}
      />

      <Section id="usage" title={t.usageTitle}>
        <p className="mb-4">{t.usageDesc}</p>
        <div className="space-y-5 rounded-xl border border-border bg-muted/30 p-6 sm:p-8 shadow-xs">
          <PreviewRow label={t.quickActionLabel}>
            <Button variant="primary">{t.bookTicket}</Button>
            <Button variant="outline" rightIcon={<ArrowRight className="size-4" />}>
              {t.viewSchedule}
            </Button>
          </PreviewRow>
          <PreviewRow label={t.stateActionLabel}>
            <Button loading>{t.processingPayment}</Button>
            <Button disabled>{t.soldOut}</Button>
          </PreviewRow>
        </div>
      </Section>

      <Section id="sizes" title={t.sizesTitle}>
        <p className="mb-4">{t.sizesDesc}</p>
        <div className="space-y-4 rounded-lg border border-border bg-muted/40 p-6">
          <PreviewRow label={t.sizeComparisonLabel}>
            <Button size="sm">Small (32px)</Button>
            <Button size="md">Medium (40px)</Button>
            <Button size="lg">Large (48px)</Button>
          </PreviewRow>
        </div>
      </Section>

      <Section id="types" title={t.typesTitle}>
        <p className="mb-4">{t.typesDesc}</p>
        <div className="space-y-4 rounded-lg border border-border bg-muted/40 p-6">
          <PreviewRow label={t.buttonVariantsLabel}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </PreviewRow>
          <PreviewRow label={t.withIconsLabel}>
            <Button leftIcon={<Plus className="size-4" />}>{t.add}</Button>
            <Button variant="outline" rightIcon={<ArrowRight className="size-4" />}>
              {t.next}
            </Button>
            <Button aria-label={t.addAriaLabel} className="px-0 w-10">
              <Plus className="size-4" />
            </Button>
          </PreviewRow>
        </div>
      </Section>

      <Section id="selection" title={t.selectionTitle}>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li><strong className="text-foreground">Primary</strong> — Aksi utama berprioritas tertinggi pada layar.</li>
          <li><strong className="text-foreground">Secondary</strong> — Aksi alternatif pendukung yang memiliki bobot visual medium.</li>
          <li><strong className="text-foreground">Outline</strong> — Aksi sekunder netral seperti filter, cetak e-tiket, atau kembali.</li>
          <li><strong className="text-foreground">Ghost</strong> — Aksi bernilai rendah yang sering muncul dalam baris toolbar atau tabel data.</li>
          <li><strong className="text-foreground">Destructive</strong> — Aksi berisiko tinggi yang tidak dapat dibatalkan.</li>
        </ul>
      </Section>

      <Section id="brand-colors" title={t.brandColorsTitle}>
        <p className="mb-4 text-sm text-muted-foreground">{t.brandColorsDesc}</p>
        <div className="flex flex-wrap gap-3 rounded-lg border border-border bg-muted/40 p-6">
          {[
            ['KAI', 'kai'],
            ['ESA', 'esa'],
            ['Commuter', 'commuter'],
            ['Bandara', 'bandara'],
            ['Logistik', 'logistik'],
            ['Wisata', 'wisata'],
            ['Services', 'services'],
            ['Property', 'property'],
          ].map(([label, brand]) => (
            <button
              key={brand}
              type="button"
              className={`relux-button relux-focus relux-button--brand-${brand}`}
            >
              {label}
            </button>
          ))}
        </div>
      </Section>

      <Section id="guidelines" title={t.guidelinesTitle}>
        <div className="grid gap-3 sm:grid-cols-2">
          <GuidelineCard tone="do" title={t.dosTitle} items={t.dos} />
          <GuidelineCard tone="dont" title={t.dontsTitle} items={t.donts} />
        </div>
      </Section>

      <Section id="hierarchy" title={t.hierarchyTitle}>
        <p className="mb-4">{t.hierarchyDesc}</p>
        <PropsTable
          columns={[
            { key: 'tier', header: t.hierarchyColumns.tier, mono: true },
            { key: 'variant', header: t.hierarchyColumns.variant },
            { key: 'purpose', header: t.hierarchyColumns.purpose },
          ]}
          rows={t.hierarchyRows}
        />
      </Section>

      <Section id="placement" title={t.placementTitle}>
        <p className="mb-3">{t.placementDesc}</p>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {t.placementItems.map((item) => (
            <li key={item.title}>
              <strong className="text-foreground">{item.title}</strong> — {item.desc}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="accessibility" title={t.a11yTitle}>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {t.a11yItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section id="code" title={t.codeTitle}>
        <ComponentCode component="button" />
      </Section>

      <Section id="props" title={t.propsTitle}>
        <PropsTable
          columns={[
            { key: 'prop', header: t.propsColumns.prop, mono: true },
            { key: 'type', header: t.propsColumns.type, mono: true },
            { key: 'def', header: t.propsColumns.def, mono: true },
            { key: 'desc', header: t.propsColumns.desc },
          ]}
          rows={t.propsRows}
        />
      </Section>

      <Section id="faq" title={t.faqTitle}>
        <div className="space-y-3">
          {t.faqs.map((f, idx) => (
            <details
              key={idx}
              className="group rounded-xl border border-border bg-card p-4 transition-all [&[open]]:shadow-xs"
            >
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-xs sm:text-sm text-foreground list-none select-none">
                <span>{f.q}</span>
                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180 shrink-0 ms-2" />
              </summary>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-border/60 pt-3">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="changelog" title={t.changelogTitle}>
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
              {[
                {
                  version: 'v1.0.0',
                  date: '29 Sep 2026',
                  note: 'Rilis awal Make Kit KAI v1: 5 varian visual, 3 ukuran, state loading & disabled, paritas 3 framework (Blade, React, Angular).',
                },
              ].map((c) => (
                <tr key={c.version} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono font-semibold text-primary">{c.version}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{c.date}</td>
                  <td className="px-4 py-3 text-foreground/80 leading-relaxed">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </article>
  )
}

function PreviewRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

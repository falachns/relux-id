import { Accordion } from '../components/ui/accordion'
import { Section } from '../components/docs/Section'
import { ComponentCode } from '../components/docs/ComponentCode'
import { PropsTable } from '../components/docs/PropsTable'
import { PageHeader } from '../components/docs/PageHeader'
import { GuidelineCard } from '../components/docs/GuidelineCard'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'
import { ChevronDown } from 'lucide-react'

type PageCopy = {
  title: string
  category: string
  description: string
  versionLabel: string
  categoryLabel: string
  updatedLabel: string
  usageTitle: string
  usageDesc: string
  previewTitle: string
  anatomyTitle: string
  anatomyColumns: { part: string; desc: string }
  anatomyRows: { part: string; desc: string }[]
  variantsTitle: string
  singleTitle: string
  singleDesc: string
  multipleTitle: string
  multipleDesc: string
  statesTitle: string
  statesColumns: { state: string; desc: string }
  statesRows: { state: string; desc: string }[]
  guidelinesTitle: string
  dosTitle: string
  dontsTitle: string
  dos: string[]
  donts: string[]
  contextTitle: string
  contextColumns: { where: string; desc: string }
  contextRows: { where: string; desc: string }[]
  specsTitle: string
  specsColumns: { prop: string; value: string }
  specsRows: { prop: string; value: string }[]
  a11yTitle: string
  a11yItems: string[]
  codeTitle: string
  propsTitle: string
  propsColumns: { prop: string; type: string; def: string; desc: string }
  propsRows: { prop: string; type: string; def: string; desc: string }[]
  changelogTitle: string
  faq: { value: string; title: string; body: string }[]
  componentFaqTitle: string
  componentFaqs: { q: string; a: string }[]
}

const COPY = {
  id: {
    title: 'Accordion',
    category: 'Komponen',
    description: 'Menyusun konten dalam bagian yang dapat diperluas dan diciutkan, sehingga pengguna dapat fokus pada satu bagian tanpa terbebani informasi sekaligus.',
    versionLabel: 'Versi',
    categoryLabel: 'Kategori',
    updatedLabel: 'Diperbarui',
    usageTitle: 'Penggunaan',
    usageDesc: 'Gunakan accordion untuk menampilkan atau menyembunyikan konten tambahan dengan cepat, sehingga halaman tetap ringkas dan pengguna fokus pada informasi yang dibutuhkan.',
    previewTitle: 'Pratinjau langsung',
    anatomyTitle: 'Anatomi',
    anatomyColumns: { part: 'Bagian', desc: 'Deskripsi' },
    anatomyRows: [
      { part: 'Root', desc: 'Kontainer yang membungkus seluruh item dan mengelola state buka/tutup.' },
      { part: 'Item', desc: 'Satu unit yang terdiri dari trigger dan panel.' },
      { part: 'Trigger', desc: 'Tombol header yang membuka atau menutup panel; membawa aria-expanded.' },
      { part: 'Icon', desc: 'Indikator chevron yang berputar sesuai state.' },
      { part: 'Panel', desc: 'Area konten yang tampil saat item terbuka.' },
    ],
    variantsTitle: 'Varian',
    singleTitle: 'Single',
    singleDesc: 'Hanya satu panel terbuka dalam satu waktu. Membuka panel lain menutup panel sebelumnya.',
    multipleTitle: 'Multiple',
    multipleDesc: 'Beberapa panel dapat terbuka bersamaan, cocok untuk membandingkan isi.',
    statesTitle: 'State (keadaan)',
    statesColumns: { state: 'State', desc: 'Deskripsi' },
    statesRows: [
      { state: 'Collapsed', desc: 'Hanya judul yang tampil; konten disembunyikan.' },
      { state: 'Expanded', desc: 'Konten panel tampil; ikon chevron berputar 180°.' },
      { state: 'Hover', desc: 'Latar trigger berubah ke var(--muted) dan cursor menjadi pointer.' },
      { state: 'Focus', desc: 'Cincin fokus 2px dari var(--ring) saat dinavigasi dengan keyboard.' },
    ],
    guidelinesTitle: 'Cara penggunaan yang disarankan',
    dosTitle: 'Lakukan',
    dontsTitle: 'Hindari',
    dos: [
      'Gunakan untuk konten sekunder seperti FAQ atau detail opsional.',
      'Tulis label trigger yang ringkas dan deskriptif.',
      'Buka satu item relevan secara default bila membantu.',
    ],
    donts: [
      'Menyembunyikan informasi kritis yang harus selalu terlihat.',
      'Menumpuk accordion di dalam accordion terlalu dalam.',
      'Memakai label panjang yang membuat trigger sulit dipindai.',
    ],
    contextTitle: 'Penerapan',
    contextColumns: { where: 'Konteks', desc: 'Contoh' },
    contextRows: [
      { where: 'Halaman FAQ', desc: 'Daftar pertanyaan dan jawaban tanpa memakan banyak ruang.' },
      { where: 'Detail perjalanan', desc: 'Rincian fasilitas kereta, kebijakan bagasi, dan syarat pembatalan.' },
      { where: 'Filter pencarian', desc: 'Kelompok filter kelas, jam berangkat, dan harga yang bisa dilipat.' },
    ],
    specsTitle: 'Spesifikasi',
    specsColumns: { prop: 'Properti', value: 'Nilai / token' },
    specsRows: [
      { prop: 'Padding trigger', value: 'px-4 py-3 (16px / 12px)' },
      { prop: 'Radius kontainer', value: 'rounded-lg · var(--radius)' },
      { prop: 'Border', value: '1px · var(--border)' },
      { prop: 'Judul', value: '14–16px · semibold · var(--foreground)' },
      { prop: 'Konten', value: '14px · regular · var(--muted-foreground)' },
      { prop: 'Ikon', value: 'chevron 16px · rotasi 180° · 200ms ease-out' },
    ],
    a11yTitle: 'Aksesibilitas',
    a11yItems: [
      'Trigger berupa elemen <button> dengan aria-expanded dan aria-controls.',
      'Dapat dioperasikan penuh dengan keyboard: Tab untuk berpindah, Enter/Space untuk membuka.',
      'Fokus terlihat jelas melalui focus ring; target klik memenuhi tinggi minimum 44px.',
      'Panel memakai role="region" yang ditautkan ke triggernya.',
    ],
    codeTitle: 'Kode',
    propsTitle: 'Props / API',
    propsColumns: { prop: 'Prop', type: 'Tipe', def: 'Default', desc: 'Deskripsi' },
    propsRows: [
      { prop: 'type', type: '"single" | "multiple"', def: '"single"', desc: 'Membolehkan satu atau beberapa item terbuka bersamaan.' },
      { prop: 'defaultValue', type: 'string | string[]', def: '—', desc: 'Item yang terbuka secara default (uncontrolled).' },
      { prop: 'value', type: 'string', def: '—', desc: 'Identitas unik tiap AccordionItem.' },
      { prop: 'title', type: 'ReactNode', def: '—', desc: 'Label yang tampil pada trigger.' },
    ],
    changelogTitle: 'Changelog',
    faq: [
      {
        value: 'pesan',
        title: 'Bagaimana cara memesan tiket kereta?',
        body: 'Buka aplikasi Access by KAI, pilih stasiun asal dan tujuan, tentukan tanggal keberangkatan, lalu pilih jadwal dan kursi sebelum melanjutkan ke pembayaran.',
      },
      {
        value: 'refund',
        title: 'Apakah tiket bisa dibatalkan atau di-refund?',
        body: 'Pembatalan dapat dilakukan paling lambat 30 menit sebelum keberangkatan melalui menu Riwayat Pemesanan. Besaran pengembalian dana mengikuti ketentuan tarif yang berlaku.',
      },
      {
        value: 'boarding',
        title: 'Dokumen apa yang dibutuhkan saat boarding?',
        body: 'Tunjukkan e-boarding pass pada aplikasi beserta identitas asli yang sesuai dengan data pemesanan kepada petugas di gerbang boarding.',
      },
    ],
    componentFaqTitle: 'Pertanyaan Umum (FAQ)',
    componentFaqs: [
      {
        q: 'Bagaimana cara mengaktifkan mode ekspansi ganda (multiple)?',
        a: 'Setel prop type="multiple" pada elemen root <Accordion type="multiple"> (React) atau gunakan modifier atribut data-multiple="true" pada implementasi Blade/Angular sehingga beberapa panel dapat dibuka secara bersamaan.',
      },
      {
        q: 'Apakah Accordion RelUX memenuhi standar WAI-ARIA?',
        a: 'Ya, trigger dibungkus tombol asli dengan atribut aria-expanded dan aria-controls yang mengarah ke id panel konten (role="region"). Navigasi keyboard penuh didukung menggunakan tombol Panah, Tab, Enter, dan Spasi.',
      },
      {
        q: 'Apakah konten panel tertutup tetap ada di DOM untuk SEO?',
        a: 'Ya, markup konten tetap dipertahankan di dalam DOM browser dan disembunyikan menggunakan gaya CSS overflow/display standar agar tetap ramah pengindeksan mesin pencari (SEO) dan pencarian teks (Ctrl+F).',
      },
      {
        q: 'Dapatkah Accordion ditampilkan tanpa border luar (ghost)?',
        a: 'Dapat. Gunakan kelas varian borderless .relux-accordion--ghost untuk tata letak minimalis yang ditempatkan di dalam Card atau Sidebar navigasi.',
      },
    ],
  },
  en: {
    title: 'Accordion',
    category: 'Components',
    description: 'Organizes content into expandable and collapsible sections, allowing users to focus on one section at a time without information overload.',
    versionLabel: 'Version',
    categoryLabel: 'Category',
    updatedLabel: 'Updated',
    usageTitle: 'Usage',
    usageDesc: 'Use accordions to reveal and hide supplementary content quickly, keeping pages compact and helping users locate relevant details efficiently.',
    previewTitle: 'Live Preview',
    anatomyTitle: 'Anatomy',
    anatomyColumns: { part: 'Part', desc: 'Description' },
    anatomyRows: [
      { part: 'Root', desc: 'Container wrapping all items and managing expansion state.' },
      { part: 'Item', desc: 'Single unit consisting of a trigger and expandable panel.' },
      { part: 'Trigger', desc: 'Header button toggling the panel; carries aria-expanded.' },
      { part: 'Icon', desc: 'Chevron indicator rotating 180° based on active state.' },
      { part: 'Panel', desc: 'Collapsible content region displayed when item is expanded.' },
    ],
    variantsTitle: 'Variants',
    singleTitle: 'Single',
    singleDesc: 'Only one panel can be open at a time. Expanding another panel collapses the previous one.',
    multipleTitle: 'Multiple',
    multipleDesc: 'Multiple panels can remain expanded simultaneously, ideal for comparing items.',
    statesTitle: 'States',
    statesColumns: { state: 'State', desc: 'Description' },
    statesRows: [
      { state: 'Collapsed', desc: 'Header only is visible; content body is hidden.' },
      { state: 'Expanded', desc: 'Content is shown; chevron rotates 180° smoothly.' },
      { state: 'Hover', desc: 'Trigger background switches to var(--muted) with pointer cursor.' },
      { state: 'Focus', desc: '2px focus ring via var(--ring) on keyboard navigation.' },
    ],
    guidelinesTitle: 'Recommended guidelines',
    dosTitle: 'Do',
    dontsTitle: 'Don’t',
    dos: [
      'Use for secondary content such as FAQs or optional details.',
      'Write clear, concise, and descriptive trigger labels.',
      'Open a single relevant item by default when helpful.',
    ],
    donts: [
      'Hiding critical information that must always be visible.',
      'Nesting accordions inside accordions too deeply.',
      'Using lengthy labels that make triggers hard to scan.',
    ],
    contextTitle: 'Contexts',
    contextColumns: { where: 'Context', desc: 'Example' },
    contextRows: [
      { where: 'FAQ Page', desc: 'Questions and answers list without taking excessive vertical space.' },
      { where: 'Trip Details', desc: 'Train amenities breakdown, baggage allowances, and refund policies.' },
      { where: 'Search Filters', desc: 'Collapsible filter groups for travel class, departure times, and price.' },
    ],
    specsTitle: 'Specifications',
    specsColumns: { prop: 'Property', value: 'Value / Token' },
    specsRows: [
      { prop: 'Trigger padding', value: 'px-4 py-3 (16px / 12px)' },
      { prop: 'Container radius', value: 'rounded-lg · var(--radius)' },
      { prop: 'Border', value: '1px · var(--border)' },
      { prop: 'Title', value: '14–16px · semibold · var(--foreground)' },
      { prop: 'Content', value: '14px · regular · var(--muted-foreground)' },
      { prop: 'Icon', value: 'chevron 16px · 180° rotation · 200ms ease-out' },
    ],
    a11yTitle: 'Accessibility',
    a11yItems: [
      'Triggers use native <button> with aria-expanded and aria-controls attributes.',
      'Fully keyboard navigable: Tab to move between triggers, Enter/Space to expand.',
      'Visible focus ring for keyboard navigation; satisfies minimum touch targets of 44px.',
      'Content panels use role="region" linked to their corresponding trigger.',
    ],
    codeTitle: 'Code',
    propsTitle: 'Props / API',
    propsColumns: { prop: 'Prop', type: 'Type', def: 'Default', desc: 'Description' },
    propsRows: [
      { prop: 'type', type: '"single" | "multiple"', def: '"single"', desc: 'Allow one or multiple items to remain open simultaneously.' },
      { prop: 'defaultValue', type: 'string | string[]', def: '—', desc: 'Item(s) initially expanded by default.' },
      { prop: 'value', type: 'string', def: '—', desc: 'Unique key identifying each AccordionItem.' },
      { prop: 'title', type: 'ReactNode', def: '—', desc: 'Trigger button label header.' },
    ],
    changelogTitle: 'Changelog',
    faq: [
      {
        value: 'pesan',
        title: 'How do I book train tickets?',
        body: 'Open the Access by KAI app, select origin and destination stations, choose your travel date, then pick train schedules and seats before completing payment.',
      },
      {
        value: 'refund',
        title: 'Can train tickets be cancelled or refunded?',
        body: 'Cancellations can be made up to 30 minutes before departure via Order History. Refund amounts follow applicable fare conditions.',
      },
      {
        value: 'boarding',
        title: 'What documents are required for boarding?',
        body: 'Show your digital boarding pass on the application along with matching original ID cards to the gate officers.',
      },
    ],
    componentFaqTitle: 'Frequently Asked Questions (FAQ)',
    componentFaqs: [
      {
        q: 'How do I enable multiple expanded panels?',
        a: 'Set the type="multiple" property on the root <Accordion type="multiple"> (React) or apply data-multiple="true" on Blade/Angular templates to permit concurrent panel openings.',
      },
      {
        q: 'Does RelUX Accordion comply with WAI-ARIA standards?',
        a: 'Yes, trigger headers render native buttons with dynamic aria-expanded and aria-controls attributes linking to region panels. Full keyboard navigation with Arrow keys, Tab, Enter, and Space is natively enabled.',
      },
      {
        q: 'Is collapsed panel content retained in the DOM for searchability?',
        a: 'Yes, hidden section markup remains in the DOM tree, ensuring content remains accessible for search engine indexing (SEO) and in-page browser searching (Ctrl+F).',
      },
      {
        q: 'Can Accordion be styled without outer borders (ghost)?',
        a: 'Yes. Apply the modifier .relux-accordion--ghost for minimal layouts situated inside Cards or navigation sidebars.',
      },
    ],
  },
} satisfies Localized<PageCopy>

export function AccordionPage({
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
        <p>{t.usageDesc}</p>
      </Section>

      <Section id="preview" title={t.previewTitle}>
        <div className="rounded-lg border border-border bg-muted/40 p-6">
          <Accordion type="single" defaultValue="pesan">
            {t.faq.map((item) => (
              <Accordion.Item
                key={item.value}
                value={item.value}
                title={item.title}
              >
                {item.body}
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section id="anatomy" title={t.anatomyTitle}>
        <PropsTable
          columns={[
            { key: 'part', header: t.anatomyColumns.part, mono: true },
            { key: 'desc', header: t.anatomyColumns.desc },
          ]}
          rows={t.anatomyRows}
        />
      </Section>

      <Section id="variants" title={t.variantsTitle}>
        <h3 className="mb-1 font-semibold text-foreground">{t.singleTitle}</h3>
        <p className="mb-3">{t.singleDesc}</p>
        <div className="rounded-lg border border-border bg-muted/40 p-6">
          <Accordion type="single" defaultValue="pesan">
            {t.faq.map((item) => (
              <Accordion.Item key={item.value} value={item.value} title={item.title}>
                {item.body}
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <h3 className="mt-6 mb-1 font-semibold text-foreground">{t.multipleTitle}</h3>
        <p className="mb-3">{t.multipleDesc}</p>
        <div className="rounded-lg border border-border bg-muted/40 p-6">
          <Accordion type="multiple">
            {t.faq.map((item) => (
              <Accordion.Item key={item.value} value={item.value} title={item.title}>
                {item.body}
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section id="states" title={t.statesTitle}>
        <PropsTable
          columns={[
            { key: 'state', header: t.statesColumns.state, mono: true },
            { key: 'desc', header: t.statesColumns.desc },
          ]}
          rows={t.statesRows}
        />
      </Section>

      <Section id="guidelines" title={t.guidelinesTitle}>
        <div className="grid gap-3 sm:grid-cols-2">
          <GuidelineCard tone="do" title={t.dosTitle} items={t.dos} />
          <GuidelineCard tone="dont" title={t.dontsTitle} items={t.donts} />
        </div>
      </Section>

      <Section id="context" title={t.contextTitle}>
        <PropsTable
          columns={[
            { key: 'where', header: t.contextColumns.where },
            { key: 'desc', header: t.contextColumns.desc },
          ]}
          rows={t.contextRows}
        />
      </Section>

      <Section id="specs" title={t.specsTitle}>
        <PropsTable
          columns={[
            { key: 'prop', header: t.specsColumns.prop },
            { key: 'value', header: t.specsColumns.value, mono: true },
          ]}
          rows={t.specsRows}
        />
      </Section>

      <Section id="accessibility" title={t.a11yTitle}>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {t.a11yItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section id="code" title={t.codeTitle}>
        <ComponentCode component="accordion" />
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

      <Section id="faq" title={t.componentFaqTitle}>
        <div className="space-y-3">
          {t.componentFaqs.map((f, idx) => (
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
                { version: 'v1.2.0', date: '12 Sep 2026', note: 'Menambahkan mode multiple, durasi transisi Make Kit, dan animasi rotasi chevron 180°.' },
                { version: 'v1.1.0', date: '28 Jul 2026', note: 'Dukungan penuh navigasi keyboard (Home, End, Arrow Keys) dan audit atribut WAI-ARIA.' },
                { version: 'v1.0.0', date: '02 Jun 2026', note: 'Rilis awal komponen Accordion Make Kit KAI v1 paritas 3 framework.' },
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

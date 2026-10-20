import { Train, Clock, ArrowRight } from 'lucide-react'
import { Section } from '../components/docs/Section'
import { ComponentCode } from '../components/docs/ComponentCode'
import { ComponentPage, Demo, A11yList } from '../components/docs/ComponentPage'
import { Card, Badge, Button, type BadgeTone } from '../components/ui'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type PageCopy = {
  title: string
  description: string
  scheduleTitle: string
  variantsTitle: string
  statsTitle: string
  codeTitle: string
  a11yTitle: string
  departureLabel: (time: string) => string
  selectTrainLabel: string
  selectTrainAria: (name: string) => string
  trains: { name: string; route: string; time: string; price: string; cls: string; tone: BadgeTone }[]
  variants: { title: string; subtitle: string; body: string }[]
  stats: { label: string; value: string; delta: string }[]
  a11yItems: string[]
}

const COPY = {
  id: {
    title: 'Cards',
    description: 'Wadah untuk mengelompokkan informasi terkait, seperti jadwal kereta atau ringkasan statistik.',
    scheduleTitle: 'Kartu jadwal',
    variantsTitle: 'Varian kartu (Elevated, Flat, Outlined)',
    statsTitle: 'Kartu statistik',
    codeTitle: 'Contoh kode',
    a11yTitle: 'Aksesibilitas',
    departureLabel: (time: string) => `Berangkat ${time} WIB`,
    selectTrainLabel: 'Pilih kereta',
    selectTrainAria: (name: string) => `Pilih kereta ${name}`,
    trains: [
      { name: 'Argo Bromo Anggrek', route: 'Gambir – Surabaya Pasarturi', time: '08.20', price: 'Rp650.000', cls: 'Eksekutif', tone: 'info' },
      { name: 'Gajayana', route: 'Gambir – Malang', time: '18.40', price: 'Rp580.000', cls: 'Eksekutif', tone: 'info' },
      { name: 'Lodaya', route: 'Bandung – Solo Balapan', time: '07.00', price: 'Rp320.000', cls: 'Bisnis', tone: 'neutral' },
    ],
    variants: [
      { title: 'Elevated', subtitle: 'Bayangan halus untuk konteks menonjol', body: 'Cocok untuk kartu interaktif dan kartu rangkuman utama.' },
      { title: 'Outlined', subtitle: 'Border 1px standar design system', body: 'Varian default untuk daftar data, formulir, dan konten umum.' },
      { title: 'Flat', subtitle: 'Background muted tanpa border tegas', body: 'Dipakai di dalam section bersarang atau panel kontrol.' },
    ],
    stats: [
      { label: 'Total Penumpang', value: '128.430', delta: '+4,2% dari bulan lalu' },
      { label: 'Kereta Aktif', value: '312', delta: '+1,1% dari bulan lalu' },
      { label: 'Pendapatan', value: 'Rp8,4 M', delta: '+6,8% dari bulan lalu' },
    ],
    a11yItems: [
      'Kartu memakai elemen article dan heading agar mudah dinavigasi pembaca layar.',
      'Label aksesibel tombol menyebut nama kereta, sehingga unik di luar konteks.',
      'Angka memakai tabular-nums supaya tidak bergeser saat berubah.',
    ],
  },
  en: {
    title: 'Cards',
    description: 'Containers grouping related information, such as train schedules or high-level metric summaries.',
    scheduleTitle: 'Schedule cards',
    variantsTitle: 'Card variants (Elevated, Flat, Outlined)',
    statsTitle: 'Stat cards',
    codeTitle: 'Code example',
    a11yTitle: 'Accessibility',
    departureLabel: (time: string) => `Departs at ${time} WIB`,
    selectTrainLabel: 'Select train',
    selectTrainAria: (name: string) => `Select train ${name}`,
    trains: [
      { name: 'Argo Bromo Anggrek', route: 'Gambir – Surabaya Pasarturi', time: '08.20', price: 'IDR 650,000', cls: 'Executive', tone: 'info' },
      { name: 'Gajayana', route: 'Gambir – Malang', time: '18.40', price: 'IDR 580,000', cls: 'Executive', tone: 'info' },
      { name: 'Lodaya', route: 'Bandung – Solo Balapan', time: '07.00', price: 'IDR 320,000', cls: 'Business', tone: 'neutral' },
    ],
    variants: [
      { title: 'Elevated', subtitle: 'Subtle shadow for prominent contexts', body: 'Ideal for interactive cards and high-emphasis summaries.' },
      { title: 'Outlined', subtitle: 'Standard 1px border system token', body: 'Default variant for data records, forms, and general content.' },
      { title: 'Flat', subtitle: 'Muted surface without prominent borders', body: 'Used inside nested sections or auxiliary control panels.' },
    ],
    stats: [
      { label: 'Total Passengers', value: '128,430', delta: '+4.2% from last month' },
      { label: 'Active Trains', value: '312', delta: '+1.1% from last month' },
      { label: 'Revenue', value: 'IDR 8.4B', delta: '+6.8% from last month' },
    ],
    a11yItems: [
      'Cards employ article and heading elements so screen readers can navigate effectively.',
      'Accessible button labels include train names, remaining uniquely clear out of context.',
      'Numerical readouts use tabular-nums to prevent visual layout shifting.',
    ],
  },
} satisfies Localized<PageCopy>

export function CardPage({ onNavigate }: { onNavigate?: (s: SectionId) => void }) {
  const copy = useLocalized(COPY)

  return (
    <ComponentPage
      title={copy.title}
      description={copy.description}
    >
      <Section id="kartu-jadwal" title={copy.scheduleTitle}>
        <Demo className="grid gap-4 sm:grid-cols-2">
          {copy.trains.map((t) => (
            <Card key={t.name} as="article" variant="outlined" className="transition-shadow duration-150 ease-out hover:shadow-md">
              <Card.Body>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-md bg-brand-soft text-primary">
                      <Train aria-hidden="true" className="size-5" />
                    </span>
                    <Card.Title as="h3">{t.name}</Card.Title>
                  </div>
                  <Badge tone={t.tone} variant="soft">
                    {t.cls}
                  </Badge>
                </div>
                <Card.Description className="mt-3">{t.route}</Card.Description>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock aria-hidden="true" className="size-4" /> {copy.departureLabel(t.time)}
                </p>
              </Card.Body>
              <Card.Footer>
                <span className="font-semibold tabular-nums text-foreground">{t.price}</span>
                <Button
                  size="sm"
                  aria-label={copy.selectTrainAria(t.name)}
                  rightIcon={<ArrowRight aria-hidden="true" className="size-4" />}
                >
                  {copy.selectTrainLabel}
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </Demo>
      </Section>

      <Section id="varian-kartu" title={copy.variantsTitle}>
        <Demo className="grid gap-4 sm:grid-cols-3">
          {copy.variants.map((v) => (
            <Card key={v.title} variant={v.title.toLowerCase() as 'elevated' | 'outlined' | 'flat'}>
              <Card.Header>
                <Card.Title>{v.title}</Card.Title>
                <Card.Description>{v.subtitle}</Card.Description>
              </Card.Header>
              <Card.Body>
                <p className="text-sm text-muted-foreground">{v.body}</p>
              </Card.Body>
            </Card>
          ))}
        </Demo>
      </Section>

      <Section id="kartu-statistik" title={copy.statsTitle}>
        <Demo className="grid gap-4 sm:grid-cols-3">
          {copy.stats.map((s) => (
            <Card key={s.label} variant="outlined">
              <Card.Body>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-card-foreground">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-success">{s.delta}</p>
              </Card.Body>
            </Card>
          ))}
        </Demo>
      </Section>

      <Section id="contoh-kode" title={copy.codeTitle}>
        <ComponentCode component="card" />
      </Section>

      <Section id="aksesibilitas" title={copy.a11yTitle}>
        <A11yList items={copy.a11yItems} />
      </Section>
    </ComponentPage>
  )
}

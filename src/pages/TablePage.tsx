import { Section } from '../components/docs/Section'
import { ComponentCode } from '../components/docs/ComponentCode'
import { ComponentPage, Demo, A11yList, Code } from '../components/docs/ComponentPage'
import { DataTable, Badge, type ColumnDef, type BadgeTone } from '../components/ui'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type TrainSchedule = {
  ka: string
  rute: string
  jam: string
  status: string
  tone: BadgeTone
}

type PageCopy = {
  title: string
  description: string
  scheduleTitle: string
  codeTitle: string
  a11yTitle: string
  searchPlaceholder: string
  captionText: string
  emptyText: string
  colTrain: string
  colRoute: string
  colDeparture: string
  colStatus: string
  rows: TrainSchedule[]
  a11y1: string
  a11y2: string
  a11y3: string
  a11y4: string
}

const COPY = {
  id: {
    title: 'Data Table',
    description: 'Tabel untuk menampilkan data terstruktur seperti jadwal keberangkatan, dengan pencarian dan pengurutan.',
    scheduleTitle: 'Tabel jadwal',
    codeTitle: 'Contoh kode',
    a11yTitle: 'Aksesibilitas',
    searchPlaceholder: 'Cari kereta, misalnya Gajayana...',
    captionText: 'Jadwal keberangkatan hari ini',
    emptyText: 'Tidak ada kereta yang cocok dengan kata kunci pencarian',
    colTrain: 'Kereta',
    colRoute: 'Rute',
    colDeparture: 'Berangkat',
    colStatus: 'Status',
    rows: [
      { ka: 'Argo Bromo Anggrek', rute: 'Gambir – Surabaya Pasarturi', jam: '08.20', status: 'Tepat waktu', tone: 'success' },
      { ka: 'Gajayana', rute: 'Gambir – Malang', jam: '18.40', status: 'Terlambat', tone: 'warning' },
      { ka: 'Lodaya', rute: 'Bandung – Solo Balapan', jam: '07.00', status: 'Dalam perjalanan', tone: 'info' },
      { ka: 'Taksaka', rute: 'Gambir – Yogyakarta', jam: '09.15', status: 'Dibatalkan', tone: 'danger' },
    ],
    a11y1: 'Tabel memakai caption, scope, dan aria-sort.',
    a11y2: 'Pengurutan memakai tombol asli di dalam header kolom.',
    a11y3: 'Empty state menyebut ketiadaan data dan menawarkan pembersihan filter pencarian.',
    a11y4: 'Tabel dapat digulir horizontal di layar sempit tanpa merusak tata letak.',
  },
  en: {
    title: 'Data Table',
    description: 'Tables presenting structured datasets like departure timetables, equipped with search filtering and column sorting.',
    scheduleTitle: 'Schedule data table',
    codeTitle: 'Code example',
    a11yTitle: 'Accessibility',
    searchPlaceholder: 'Search train, e.g. Gajayana…',
    captionText: 'Today’s departure schedule',
    emptyText: 'No train records match the search query',
    colTrain: 'Train',
    colRoute: 'Route',
    colDeparture: 'Departs',
    colStatus: 'Status',
    rows: [
      { ka: 'Argo Bromo Anggrek', rute: 'Gambir – Surabaya Pasarturi', jam: '08.20', status: 'On time', tone: 'success' },
      { ka: 'Gajayana', rute: 'Gambir – Malang', jam: '18.40', status: 'Delayed', tone: 'warning' },
      { ka: 'Lodaya', rute: 'Bandung – Solo Balapan', jam: '07.00', status: 'In transit', tone: 'info' },
      { ka: 'Taksaka', rute: 'Gambir – Yogyakarta', jam: '09.15', status: 'Cancelled', tone: 'danger' },
    ],
    a11y1: 'Tables implement caption, scope th headers, and aria-sort declarations.',
    a11y2: 'Column sorting leverages native button controls inside header cells.',
    a11y3: 'Empty states clearly notify users and provide an intuitive clear filter action.',
    a11y4: 'Tables scroll horizontally on small viewports preserving data integrity.',
  },
} satisfies Localized<PageCopy>

export function TablePage({ onNavigate }: { onNavigate?: (s: SectionId) => void }) {
  const copy = useLocalized(COPY)

  const columns: ColumnDef<TrainSchedule>[] = [
    {
      key: 'ka',
      header: copy.colTrain,
      sortable: true,
      cell: (r) => <span className="font-medium text-foreground">{r.ka}</span>,
    },
    {
      key: 'rute',
      header: copy.colRoute,
      cell: (r) => <span className="text-muted-foreground">{r.rute}</span>,
    },
    {
      key: 'jam',
      header: copy.colDeparture,
      sortable: true,
      cell: (r) => <span className="tabular-nums text-foreground">{r.jam}</span>,
    },
    {
      key: 'status',
      header: copy.colStatus,
      cell: (r) => (
        <Badge tone={r.tone} variant="soft" dot>
          {r.status}
        </Badge>
      ),
    },
  ]

  return (
    <ComponentPage
      title={copy.title}
      description={copy.description}
    >
      <Section id="tabel-jadwal" title={copy.scheduleTitle}>
        <Demo>
          <DataTable
            data={copy.rows}
            columns={columns}
            searchable
            searchPlaceholder={copy.searchPlaceholder}
            caption={copy.captionText}
            emptyMessage={
              <div className="py-4">
                <p className="font-medium text-foreground">{copy.emptyText}</p>
              </div>
            }
          />
        </Demo>
      </Section>

      <Section id="contoh-kode" title={copy.codeTitle}>
        <ComponentCode component="table" />
      </Section>

      <Section id="aksesibilitas" title={copy.a11yTitle}>
        <A11yList
          items={[
            <>
              {copy.a11y1.split('caption')[0]}
              <Code>caption</Code>
              {copy.a11y1.split('caption')[1]?.split('scope')[0]}
              <Code>scope</Code>
              {copy.a11y1.split('scope')[1]?.split('aria-sort')[0]}
              <Code>aria-sort</Code>
              {copy.a11y1.split('aria-sort')[1] ?? ''}
            </>,
            copy.a11y2,
            copy.a11y3,
            copy.a11y4,
          ]}
        />
      </Section>
    </ComponentPage>
  )
}

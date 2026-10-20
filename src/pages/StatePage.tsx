import { useState } from 'react'
import type { ReactNode } from 'react'
import { Section } from '../components/docs/Section'
import { Loader2 } from 'lucide-react'
import { PropsTable } from '../components/docs/PropsTable'
import { PageHeader } from '../components/docs/PageHeader'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type Tab = 'tombol' | 'input'

type PageCopy = {
  title: string
  category: string
  description: string
  overviewTitle: string
  overviewColumns: { name: string; desc: string }
  states: { name: string; desc: string }[]
  demoTitle: string
  tabButton: string
  tabInput: string
  bookTicket: string
  processing: string
  cancel: string
  saved: string
  passengerName: string
  invalidName: string
  tokensTitle: string
  tokenColumns: { state: string; token: string; desc: string }
  tokenRows: { state: string; token: string; desc: string }[]
  a11yTitle: string
  a11yItems: string[]
}

const COPY = {
  id: {
    title: 'State',
    category: 'Fondasi',
    description: 'Setiap komponen interaktif RelUX berbagi kosakata state yang sama. State memberi umpan balik yang dapat diprediksi sehingga pengguna selalu tahu apa yang terjadi.',
    overviewTitle: 'Gambaran umum state',
    overviewColumns: { name: 'State', desc: 'Deskripsi' },
    states: [
      { name: 'Default', desc: 'Kondisi normal saat elemen siap dipakai.' },
      { name: 'Hover', desc: 'Kursor berada di atas elemen interaktif.' },
      { name: 'Focus', desc: 'Elemen menerima fokus keyboard; cincin fokus tampil.' },
      { name: 'Active', desc: 'Sedang ditekan / diklik.' },
      { name: 'Disabled', desc: 'Tidak dapat diinteraksi; kontras diturunkan.' },
      { name: 'Loading', desc: 'Menunggu proses; menampilkan indikator.' },
      { name: 'Error', desc: 'Input tidak valid atau aksi gagal.' },
      { name: 'Success', desc: 'Aksi berhasil / input tervalidasi.' },
    ],
    demoTitle: 'Contoh interaktif',
    tabButton: 'Tombol',
    tabInput: 'Input Formulir',
    bookTicket: 'Pesan Tiket',
    processing: 'Memuat…',
    cancel: 'Batalkan',
    saved: 'Tersimpan',
    passengerName: 'Nama penumpang',
    invalidName: 'Nama tidak valid.',
    tokensTitle: 'Token state',
    tokenColumns: { state: 'State', token: 'Token / Utility', desc: 'Keterangan' },
    tokenRows: [
      { state: 'Focus', token: 'ring-2 ring-ring', desc: 'Cincin fokus dari var(--ring).' },
      { state: 'Active', token: 'active:scale-[0.98]', desc: 'Umpan balik tekan.' },
      { state: 'Disabled', token: 'opacity-40', desc: 'Kontras turun + cursor-not-allowed.' },
      { state: 'Error', token: 'var(--destructive)', desc: 'Batas & teks kesalahan.' },
      { state: 'Success', token: 'var(--colors/foreground/fg-success-primary)', desc: 'Batas & teks sukses.' },
    ],
    a11yTitle: 'Aksesibilitas',
    a11yItems: [
      'State disabled memakai aria-disabled atau atribut disabled.',
      'Input error menandai aria-invalid="true" dan menautkan pesan lewat aria-describedby.',
      'State loading menandai aria-busy="true" dan menonaktifkan aksi ganda.',
      'Fokus tidak boleh bergantung pada warna saja — cincin fokus wajib terlihat jelas.',
    ],
  },
  en: {
    title: 'States',
    category: 'Foundation',
    description: 'Every interactive RelUX component shares a unified state vocabulary. States provide predictable, unambiguous feedback so users always understand system status.',
    overviewTitle: 'State overview',
    overviewColumns: { name: 'State', desc: 'Description' },
    states: [
      { name: 'Default', desc: 'Idle state when the element is ready for interaction.' },
      { name: 'Hover', desc: 'Cursor is positioned over an interactive target.' },
      { name: 'Focus', desc: 'Element receives keyboard focus; visible focus ring appears.' },
      { name: 'Active', desc: 'Element is actively pressed or clicked.' },
      { name: 'Disabled', desc: 'Non-interactive; reduced contrast with not-allowed cursor.' },
      { name: 'Loading', desc: 'Awaiting async resolution; displays progress indicator.' },
      { name: 'Error', desc: 'Invalid input or unsuccessful action execution.' },
      { name: 'Success', desc: 'Action completed successfully or valid input verified.' },
    ],
    demoTitle: 'Interactive demonstration',
    tabButton: 'Buttons',
    tabInput: 'Form Inputs',
    bookTicket: 'Book Ticket',
    processing: 'Loading…',
    cancel: 'Cancel',
    saved: 'Saved',
    passengerName: 'Passenger name',
    invalidName: 'Invalid name.',
    tokensTitle: 'State tokens',
    tokenColumns: { state: 'State', token: 'Token / Utility', desc: 'Description' },
    tokenRows: [
      { state: 'Focus', token: 'ring-2 ring-ring', desc: 'Focus ring via var(--ring).' },
      { state: 'Active', token: 'active:scale-[0.98]', desc: 'Tactile press feedback.' },
      { state: 'Disabled', token: 'opacity-40', desc: 'Reduced opacity + cursor-not-allowed.' },
      { state: 'Error', token: 'var(--destructive)', desc: 'Error borders and text tokens.' },
      { state: 'Success', token: 'var(--colors/foreground/fg-success-primary)', desc: 'Success borders and text tokens.' },
    ],
    a11yTitle: 'Accessibility',
    a11yItems: [
      'Disabled states expose aria-disabled or native disabled attributes.',
      'Error inputs flag aria-invalid="true" with errors linked via aria-describedby.',
      'Loading states flag aria-busy="true" and prevent duplicate event submission.',
      'Focus must not rely on color alone — visible focus rings are mandatory.',
    ],
  },
} satisfies Localized<PageCopy>

export function StatePage({
  onNavigate,
}: {
  onNavigate?: (section: SectionId) => void
}) {
  const t = useLocalized(COPY)
  const [tab, setTab] = useState<Tab>('tombol')

  return (
    <article className="mx-auto max-w-3xl">
      <PageHeader
        category={t.category}
        title={t.title}
        status="stable"
        description={t.description}
      />

      <Section id="overview" title={t.overviewTitle}>
        <PropsTable
          columns={[
            { key: 'name', header: t.overviewColumns.name, mono: true },
            { key: 'desc', header: t.overviewColumns.desc },
          ]}
          rows={t.states}
        />
      </Section>

      <Section id="interactive-demo" title={t.demoTitle}>
        <div
          role="tablist"
          aria-label="Component state types"
          className="mb-4 flex flex-wrap gap-1 rounded-md border border-border bg-muted/50 p-1"
        >
          {(['tombol', 'input'] as Tab[]).map((tabKey) => (
            <button
              key={tabKey}
              role="tab"
              aria-selected={tab === tabKey}
              onClick={() => setTab(tabKey)}
              className={
                'rounded px-3 py-1.5 text-sm font-medium capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
                (tab === tabKey
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground')
              }
            >
              {tabKey === 'tombol' ? t.tabButton : t.tabInput}
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-muted/40 p-6">
          {tab === 'tombol' ? (
            <ButtonStates
              bookTicket={t.bookTicket}
              processing={t.processing}
              cancel={t.cancel}
              saved={t.saved}
            />
          ) : (
            <InputStates
              passengerName={t.passengerName}
              invalidName={t.invalidName}
            />
          )}
        </div>
      </Section>

      <Section id="tokens" title={t.tokensTitle}>
        <PropsTable
          columns={[
            { key: 'state', header: t.tokenColumns.state, mono: true },
            { key: 'token', header: t.tokenColumns.token, mono: true },
            { key: 'desc', header: t.tokenColumns.desc },
          ]}
          rows={t.tokenRows}
        />
      </Section>

      <Section id="accessibility" title={t.a11yTitle}>
        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {t.a11yItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </Section>
    </article>
  )
}

function ButtonStates({
  bookTicket,
  processing,
  cancel,
  saved,
}: {
  bookTicket: string
  processing: string
  cancel: string
  saved: string
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <StateDemo label="Default">
        <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold hover:bg-accent text-primary-foreground">
          {bookTicket}
        </button>
      </StateDemo>
      <StateDemo label="Hover">
        <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold hover:bg-accent text-primary-foreground transition-colors hover:bg-accent">
          {bookTicket}
        </button>
      </StateDemo>
      <StateDemo label="Focus">
        <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold hover:bg-accent text-primary-foreground outline-none ring-2 ring-ring ring-offset-2 ring-offset-background">
          {bookTicket}
        </button>
      </StateDemo>
      <StateDemo label="Active">
        <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold hover:bg-accent text-primary-foreground transition-transform active:scale-[0.98]">
          {bookTicket}
        </button>
      </StateDemo>
      <StateDemo label="Disabled">
        <button
          disabled
          className="cursor-not-allowed rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold hover:bg-accent text-primary-foreground opacity-40"
        >
          {bookTicket}
        </button>
      </StateDemo>
      <StateDemo label="Loading">
        <button
          aria-busy="true"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold hover:bg-accent text-primary-foreground"
        >
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          {processing}
        </button>
      </StateDemo>
      <StateDemo label="Error">
        <button className="rounded-lg border border-destructive/40 bg-danger-soft px-4 py-2.5 text-sm font-semibold text-destructive-foreground">
          {cancel}
        </button>
      </StateDemo>
      <StateDemo label="Success">
        <button className="rounded-md bg-success px-4 py-2 text-sm font-medium text-primary-foreground">
          {saved}
        </button>
      </StateDemo>
    </div>
  )
}

function InputStates({
  passengerName,
  invalidName,
}: {
  passengerName: string
  invalidName: string
}) {
  const base =
    'w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none'
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StateDemo label="Default" block>
        <input aria-label={passengerName} className={base + ' border-border'} placeholder={passengerName} />
      </StateDemo>
      <StateDemo label="Focus" block>
        <input aria-label={passengerName}
          className={base + ' border-ring ring-2 ring-ring'}
          placeholder={passengerName}
        />
      </StateDemo>
      <StateDemo label="Error" block>
        <div>
          <input aria-label={passengerName}
            aria-invalid="true"
            className={base + ' border-destructive ring-2 ring-destructive/30'}
            defaultValue="123"
          />
          <p className="mt-1 text-xs text-destructive">{invalidName}</p>
        </div>
      </StateDemo>
      <StateDemo label="Disabled" block>
        <input aria-label={passengerName}
          disabled
          className={base + ' cursor-not-allowed border-border opacity-40'}
          placeholder={passengerName}
        />
      </StateDemo>
      <StateDemo label="Success" block>
        <input aria-label={passengerName}
          className={base + ' border-success ring-2 ring-success/25'}
          defaultValue="Budi Santoso"
        />
      </StateDemo>
    </div>
  )
}

function StateDemo({
  label,
  children,
  block,
}: {
  label: string
  children: ReactNode
  block?: boolean
}) {
  return (
    <div className={block ? '' : 'flex flex-col items-start gap-2'}>
      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </div>
  )
}

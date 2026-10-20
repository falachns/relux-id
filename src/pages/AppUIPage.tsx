import { useState } from 'react'
import { LayoutDashboard, Train, Users, BarChart3, Settings } from 'lucide-react'
import { Section } from '../components/docs/Section'
import { ComponentCode } from '../components/docs/ComponentCode'
import { ComponentPage, Demo, A11yList, Code } from '../components/docs/ComponentPage'
import { SearchBookWidget, SidebarNav, Stepper, EmptyState, FileUpload, DatePicker } from '../components/ui'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type PageCopy = {
  title: string
  description: string
  searchWidgetTitle: string
  sidebarTitle: string
  codeTitle: string
  a11yTitle: string
  submitLabel: string
  swapAriaLabel: string
  menuItems: { label: string }[]
  a11y1: string
  a11y2: string
  a11y3: string
}

const COPY = {
  id: {
    title: 'App UI Components',
    description: 'Pola gabungan siap pakai untuk aplikasi publik dan internal KAI, disusun dari komponen dasar RelUX.',
    searchWidgetTitle: 'Widget cari tiket (aplikasi publik)',
    sidebarTitle: 'Navigasi sidebar (aplikasi internal)',
    codeTitle: 'Contoh kode',
    a11yTitle: 'Aksesibilitas',
    submitLabel: 'Cari tiket',
    swapAriaLabel: 'Tukar stasiun asal dan tujuan',
    menuItems: [
      { label: 'Dashboard' },
      { label: 'Jadwal kereta' },
      { label: 'Manajemen penumpang' },
      { label: 'Laporan & analitik' },
      { label: 'Pengaturan' },
    ],
    a11y1: 'Widget pencarian adalah form asli; Enter dapat langsung mengirimkan pencarian.',
    a11y2: 'Tombol tukar stasiun punya label yang menjelaskan aksinya secara mandiri.',
    a11y3: 'Menu sidebar memakai tautan dengan aria-current="page" untuk item yang sedang aktif.',
  },
  en: {
    title: 'App UI Components',
    description: 'Pre-assembled application patterns for public traveler and internal railway operational systems, composed from foundational RelUX primitives.',
    searchWidgetTitle: 'Ticket search widget (public passenger app)',
    sidebarTitle: 'Sidebar navigation (internal operational console)',
    codeTitle: 'Code example',
    a11yTitle: 'Accessibility',
    submitLabel: 'Search tickets',
    swapAriaLabel: 'Swap origin and destination stations',
    menuItems: [
      { label: 'Dashboard' },
      { label: 'Train schedule' },
      { label: 'Passenger roster' },
      { label: 'Analytics & reports' },
      { label: 'Settings' },
    ],
    a11y1: 'The search widget is a native form element; submitting with Enter works out-of-the-box.',
    a11y2: 'The origin-destination swap button incorporates a standalone descriptive action label.',
    a11y3: 'Sidebar links declare the active item through aria-current="page".',
  },
} satisfies Localized<PageCopy>

export function AppUIPage({ onNavigate }: { onNavigate?: (s: SectionId) => void }) {
  const [activeMenu, setActiveMenu] = useState(0)
  const copy = useLocalized(COPY)

  const icons = [LayoutDashboard, Train, Users, BarChart3, Settings]
  const sidebarItems = copy.menuItems.map((item, idx) => ({
    icon: icons[idx],
    label: item.label,
  }))

  return (
    <ComponentPage
      title={copy.title}
      description={copy.description}
      status="beta"
    >
      <Section id="widget-cari-tiket" title={copy.searchWidgetTitle}>
        <Demo>
          <SearchBookWidget
            submitLabel={copy.submitLabel}
            swapAriaLabel={copy.swapAriaLabel}
          />
        </Demo>
      </Section>

      <Section id="navigasi-sidebar" title={copy.sidebarTitle}>
        <Demo>
          <SidebarNav
            items={sidebarItems}
            activeIndex={activeMenu}
            onSelect={setActiveMenu}
          />
        </Demo>
      </Section>

      <Section id="stepper" title="Progress Steps / Stepper (Alur Reservasi)">
        <Demo>
          <div className="space-y-6 w-full">
            <Stepper
              steps={[
                { id: 1, title: 'Rute Perjalanan', description: 'Gambir → Bandung', status: 'completed' },
                { id: 2, title: 'Pilih Kursi', description: 'Eksekutif 2 / 12A', status: 'current' },
                { id: 3, title: 'Data Penumpang', description: 'NIK & Nomor Telepon', status: 'pending' },
                { id: 4, title: 'Pembayaran', description: 'QRIS / SuperApp Pay', status: 'pending' },
              ]}
            />
          </div>
        </Demo>
      </Section>

      <Section id="empty-state" title="Empty States (Status Kosong & Nirhasil)">
        <Demo>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <EmptyState
              variant="search"
              title="Jadwal KA Tidak Ditemukan"
              description="Tidak ada kereta yang tersedia pada rute dan tanggal yang dipilih. Coba cari tanggal lain."
              action={
                <button type="button" className="relux-button relux-button--secondary text-xs">
                  Ubah Pencarian
                </button>
              }
            />
            <EmptyState
              variant="empty"
              title="Belum Ada Tiket Aktif"
              description="Perjalanan mendatang Anda akan tercatat di sini setelah proses pembayaran selesai."
              action={
                <button type="button" className="relux-button relux-button--primary text-xs">
                  Pesan Tiket Sekarang
                </button>
              }
            />
          </div>
        </Demo>
      </Section>

      <Section id="file-upload" title="File Uploader (Unggah Dokumen Dinas & Identitas)">
        <Demo>
          <div className="w-full max-w-lg mx-auto">
            <FileUpload
              accept=".pdf,.png,.jpg"
              maxSizeMB={5}
              helperText="Format berkas: PDF, PNG, JPG (Maks. 5MB per dokumen)"
            />
          </div>
        </Demo>
      </Section>

      <Section id="date-picker" title="Date Picker & Range Calendar (Pemilihan Tanggal)">
        <Demo>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl mx-auto">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Tanggal Keberangkatan (Single)
              </label>
              <DatePicker mode="single" placeholder="Pilih tanggal pergi..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Periode Dinas (Range)
              </label>
              <DatePicker mode="range" placeholder="Pilih tanggal rentang..." />
            </div>
          </div>
        </Demo>
      </Section>

      <Section id="contoh-kode" title={copy.codeTitle}>
        <ComponentCode component="app-ui" />
      </Section>

      <Section id="aksesibilitas" title={copy.a11yTitle}>
        <A11yList
          items={[
            <>
              {copy.a11y1.split('form')[0]}
              <Code>form</Code>
              {copy.a11y1.split('form')[1] ?? ''}
            </>,
            copy.a11y2,
            <>
              {copy.a11y3.split('aria-current="page"')[0]}
              <Code>aria-current="page"</Code>
              {copy.a11y3.split('aria-current="page"')[1] ?? ''}
            </>,
          ]}
        />
      </Section>
    </ComponentPage>
  )
}

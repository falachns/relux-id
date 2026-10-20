import { Tabs, Breadcrumb, Pagination } from '@/components/ui'

export function NavigationExample() {
  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Beranda', href: '#' },
          { label: 'Pemesanan', href: '#' },
          { label: 'Pilih Kursi' },
        ]}
      />
      <Tabs
        variant="pill"
        items={[
          { label: 'Jadwal KA', content: <p className="text-sm">Jadwal keberangkatan harian.</p> },
          { label: 'Tarif', content: <p className="text-sm">Tarif tiket semua kelas.</p> },
        ]}
      />
      <Pagination page={1} total={5} onPageChange={() => {}} />
    </div>
  )
}

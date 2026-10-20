import { Bell, Train, TrendingUp, Users } from 'lucide-react'
import { Section } from '../../components/docs/Section'
import { useLang } from '../../lib/i18n'
import type { SectionId } from '../../lib/nav'

const STATS = [
  { icon: Users, id: 'passengers', value: '128.430' },
  { icon: Train, id: 'trains', value: '312' },
  { icon: TrendingUp, id: 'revenue', value: 'Rp8,4 M' },
  { icon: Bell, id: 'alerts', value: '7' },
]

export function DashboardExamplePage({
  onNavigate: _onNavigate,
}: {
  onNavigate: (section: SectionId) => void
}) {
  const { lang } = useLang()
  const labels =
    lang === 'en'
      ? {
          title: 'Operations dashboard',
          lead: 'A responsive internal operations surface from the Make Kit example.',
          overview: 'Operational overview',
          passengers: 'Passengers',
          trains: 'Active trains',
          revenue: 'Revenue',
          alerts: 'System alerts',
          table: 'Active train status',
        }
      : {
          title: 'Dashboard Operasi',
          lead: 'Surface operasi internal responsif dari example Make Kit.',
          overview: 'Ringkasan operasi',
          passengers: 'Penumpang',
          trains: 'Kereta aktif',
          revenue: 'Pendapatan',
          alerts: 'Notifikasi sistem',
          table: 'Status kereta aktif',
        }

  return (
    <article>
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        {lang === 'en' ? 'Example page' : 'Halaman contoh'}
      </p>
      <h1 className="display-md-bold text-foreground">{labels.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{labels.lead}</p>

      <Section id="operational-overview" title={labels.overview}>
        <div className="grid gap-3 sm:grid-cols-2">
          {STATS.map(({ icon: Icon, id, value }) => (
            <article key={id} className="relux-stat-card">
              <Icon aria-hidden="true" className="size-5 text-primary" />
              <p className="mt-4 text-sm text-muted-foreground">
                {labels[id as keyof typeof labels]}
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="active-train-status" title={labels.table}>
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="relux-table">
            <thead>
              <tr>
                <th>{lang === 'en' ? 'Train' : 'Kereta'}</th>
                <th>{lang === 'en' ? 'Route' : 'Rute'}</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Argo Bromo Anggrek</th>
                <td>Jakarta — Surabaya</td>
                <td><span className="relux-badge relux-tone--success">{lang === 'en' ? 'Active' : 'Aktif'}</span></td>
              </tr>
              <tr>
                <th scope="row">Lodaya</th>
                <td>Bandung — Solo</td>
                <td><span className="relux-badge relux-tone--warning">{lang === 'en' ? 'Delayed' : 'Terlambat'}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </article>
  )
}

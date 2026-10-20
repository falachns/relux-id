import { DataTable, Badge } from '@/components/ui'

export function TableExample() {
  const data = [
    { ka: 'Argo Bromo Anggrek', rute: 'Gambir–Surabaya', jam: '08.20', status: 'Tepat waktu' },
    { ka: 'Gajayana', rute: 'Gambir–Malang', jam: '18.40', status: 'Terlambat' },
  ]
  return (
    <DataTable
      data={data}
      searchable
      columns={[
        { key: 'ka', header: 'Kereta', sortable: true },
        { key: 'rute', header: 'Rute' },
        { key: 'jam', header: 'Berangkat', sortable: true },
        {
          key: 'status',
          header: 'Status',
          cell: (r) => (
            <Badge tone={r.status === 'Tepat waktu' ? 'success' : 'warning'} variant="soft" dot>
              {r.status}
            </Badge>
          ),
        },
      ]}
    />
  )
}

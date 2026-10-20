import { Button } from '@/components/ui'

export function ButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Pesan tiket</Button>
      <Button variant="secondary">Cek jadwal</Button>
      <Button variant="outline">Detail rute</Button>
      <Button variant="brand-kai">KAI Brand</Button>
    </div>
  )
}

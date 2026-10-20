import { EmptyState } from '@kai/relux-react'

export function EmptyExample() {
  return (
    <EmptyState variant="search" title="Jadwal Tidak Ditemukan" description="Silakan sesuaikan filter stasiun atau tanggal." />
  )
}
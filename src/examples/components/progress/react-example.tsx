import { Progress, Spinner } from '@/components/ui'

export function ProgressExample() {
  return (
    <div className="space-y-4 max-w-md">
      <Progress label="Penyelesaian Profil" value={75} showValue tone="primary" />
      <Progress label="Verifikasi Dokumen" value={45} showValue tone="warning" />
      <div className="flex items-center gap-3">
        <Spinner size="sm" label="Memuat data perjalanan..." />
        <span className="text-sm text-muted-foreground">Sinkronisasi jadwal kereta</span>
      </div>
    </div>
  )
}

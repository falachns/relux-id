import { Alert } from '@/components/ui'

export function AlertExample() {
  return (
    <div className="space-y-3">
      <Alert tone="info" title="Info Keberangkatan">
        Boarding dibuka 60 menit sebelum keberangkatan.
      </Alert>
      <Alert tone="success" title="Pembayaran Berhasil">
        E-tiket telah dikirimkan ke alamat email terdaftar.
      </Alert>
      <Alert tone="warning" title="Peringatan Keterlambatan">
        KA Argo Bromo Anggrek diperkirakan terlambat 15 menit.
      </Alert>
    </div>
  )
}

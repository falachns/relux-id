import { useState } from 'react'
import { Dialog, Button } from '@/components/ui'

export function ModalExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Buka Detail Perjalanan</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Detail Perjalanan"
        description="Informasi jadwal keberangkatan kereta api"
      >
        <p className="text-sm text-foreground">
          KA Argo Bromo Anggrek · Berangkat 08.20 WIB dari Stasiun Gambir.
        </p>
        <Dialog.Footer>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Tutup
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

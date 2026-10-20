import { Stepper } from '@kai/relux-react'

export function StepperExample() {
  return (
    <Stepper steps={[
      { id: 1, title: 'Pilih Rute', status: 'completed' },
      { id: 2, title: 'Pilih Kursi', status: 'current' },
      { id: 3, title: 'Pembayaran', status: 'pending' }
    ]} />
  )
}
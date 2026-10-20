import { Tooltip, Button } from '@kai/relux-react'

export function TooltipExample() {
  return (
    <Tooltip content="Tarif reduksi berlaku untuk lansia">
      <Button variant="outline">Info Reduksi</Button>
    </Tooltip>
  )
}
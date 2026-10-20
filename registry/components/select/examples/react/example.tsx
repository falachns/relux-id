import { Select } from '@kai/relux-react'

export function SelectExample() {
  return (
    <Select options={[
      { label: 'Gambir (GMR)', value: 'GMR' },
      { label: 'Bandung (BD)', value: 'BD' }
    ]} />
  )
}
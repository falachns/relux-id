import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const registryDir = path.join(rootDir, 'registry/components')

const EXAMPLES = {
  buttons: {
    blade: `<x-relux::button variant="primary" size="md">
    Pesan Tiket KAI
</x-relux::button>`,
    react: `import { Button } from '@kai/relux-react'

export function ActionExample() {
  return (
    <Button variant="primary" size="md">
      Pesan Tiket KAI
    </Button>
  )
}`,
    angular: `<button reluxButton variant="primary" size="md">
  Pesan Tiket KAI
</button>`,
  },
  inputs: {
    blade: `<x-relux::input type="text" placeholder="Masukkan Nomor Induk Kependudukan (NIK)" />`,
    react: `import { Input } from '@kai/relux-react'

export function InputExample() {
  return <Input type="text" placeholder="Masukkan NIK" />
}`,
    angular: `<input reluxInput type="text" placeholder="Masukkan NIK" />`,
  },
  badges: {
    blade: `<x-relux::badge tone="success" variant="filled" :dot="true">
    Terkonfirmasi
</x-relux::badge>`,
    react: `import { Badge } from '@kai/relux-react'

export function BadgeExample() {
  return (
    <Badge tone="success" variant="filled" dot>
      Terkonfirmasi
    </Badge>
  )
}`,
    angular: `<relux-badge tone="success" variant="filled" [dot]="true">
  Terkonfirmasi
</relux-badge>`,
  },
  checkboxes: {
    blade: `<x-relux::checkbox label="Saya menyetujui Syarat & Ketentuan Angkutan Penumpang" />`,
    react: `import { Checkbox } from '@kai/relux-react'

export function CheckboxExample() {
  return <Checkbox label="Saya menyetujui Syarat & Ketentuan" />
}`,
    angular: `<relux-checkbox label="Saya menyetujui Syarat & Ketentuan"></relux-checkbox>`,
  },
  toggles: {
    blade: `<x-relux::toggle label="Notifikasi WhatsApp Perjalanan KA" :checked="true" />`,
    react: `import { Switch } from '@kai/relux-react'

export function ToggleExample() {
  return <Switch label="Notifikasi WhatsApp Perjalanan KA" defaultChecked />
}`,
    angular: `<relux-toggle label="Notifikasi WhatsApp" [checked]="true"></relux-toggle>`,
  },
  select: {
    blade: `<x-relux::select :options="['GMR' => 'Gambir (GMR)', 'BD' => 'Bandung (BD)']" />`,
    react: `import { Select } from '@kai/relux-react'

export function SelectExample() {
  return (
    <Select options={[
      { label: 'Gambir (GMR)', value: 'GMR' },
      { label: 'Bandung (BD)', value: 'BD' }
    ]} />
  )
}`,
    angular: `<relux-select [options]="stationOptions"></relux-select>`,
  },
  tooltips: {
    blade: `<x-relux::tooltip content="Tarif reduksi berlaku untuk lansia & anggota TNI/Polri">
    <button class="relux-button relux-button--outline">Info Reduksi</button>
</x-relux::tooltip>`,
    react: `import { Tooltip, Button } from '@kai/relux-react'

export function TooltipExample() {
  return (
    <Tooltip content="Tarif reduksi berlaku untuk lansia">
      <Button variant="outline">Info Reduksi</Button>
    </Tooltip>
  )
}`,
    angular: `<button reluxButton variant="outline" [reluxTooltip]="'Tarif reduksi berlaku'">
  Info Reduksi
</button>`,
  },
  avatars: {
    blade: `<x-relux::avatar name="Budi Santoso" size="md" status="online" />`,
    react: `import { Avatar } from '@kai/relux-react'

export function AvatarExample() {
  return <Avatar name="Budi Santoso" size="md" status="online" />
}`,
    angular: `<relux-avatar name="Budi Santoso" size="md" status="online"></relux-avatar>`,
  },
  tags: {
    blade: `<x-relux::tag tone="brand" :removable="true">Eksekutif SS</x-relux::tag>`,
    react: `import { Tag } from '@kai/relux-react'

export function TagExample() {
  return <Tag tone="brand" removable>Eksekutif SS</Tag>
}`,
    angular: `<relux-tag tone="brand" [removable]="true">Eksekutif SS</relux-tag>`,
  },
  alerts: {
    blade: `<x-relux::alert tone="info" title="Informasi Peron">
    Kereta Api Argo Parahyangan berangkat dari Jalur 3.
</x-relux::alert>`,
    react: `import { Alert } from '@kai/relux-react'

export function AlertExample() {
  return (
    <Alert tone="info" title="Informasi Peron">
      Kereta Api Argo Parahyangan berangkat dari Jalur 3.
    </Alert>
  )
}`,
    angular: `<relux-alert tone="info" title="Informasi Peron">
  Kereta Api Argo Parahyangan berangkat dari Jalur 3.
</relux-alert>`,
  },
  steppers: {
    blade: `<x-relux::stepper :steps="[['title' => 'Rute', 'status' => 'completed'], ['title' => 'Kursi', 'status' => 'current'], ['title' => 'Bayar', 'status' => 'pending']]" />`,
    react: `import { Stepper } from '@kai/relux-react'

export function StepperExample() {
  return (
    <Stepper steps={[
      { id: 1, title: 'Pilih Rute', status: 'completed' },
      { id: 2, title: 'Pilih Kursi', status: 'current' },
      { id: 3, title: 'Pembayaran', status: 'pending' }
    ]} />
  )
}`,
    angular: `<relux-stepper [steps]="reservationSteps"></relux-stepper>`,
  },
  'empty-states': {
    blade: `<x-relux::empty-state title="Jadwal Tidak Ditemukan" description="Silakan sesuaikan tanggal atau stasiun pilihan Anda." />`,
    react: `import { EmptyState } from '@kai/relux-react'

export function EmptyExample() {
  return (
    <EmptyState variant="search" title="Jadwal Tidak Ditemukan" description="Silakan sesuaikan filter stasiun atau tanggal." />
  )
}`,
    angular: `<relux-empty-state variant="search" title="Jadwal Tidak Ditemukan"></relux-empty-state>`,
  },
  'file-uploads': {
    blade: `<x-relux::file-upload name="identitas" helperText="Unggah scan KTP / Identitas resmi" />`,
    react: `import { FileUpload } from '@kai/relux-react'

export function FileUploadExample() {
  return <FileUpload helperText="Unggah scan KTP (Maks. 5MB)" />
}`,
    angular: `<relux-file-upload [maxSizeMB]="5"></relux-file-upload>`,
  },
  'date-pickers': {
    blade: `<x-relux::date-picker name="jadwal" placeholder="Pilih tanggal keberangkatan" />`,
    react: `import { DatePicker } from '@kai/relux-react'

export function DatePickerExample() {
  return <DatePicker mode="range" placeholder="Pilih tanggal pulang-pergi" />
}`,
    angular: `<relux-datepicker mode="range"></relux-datepicker>`,
  },
}

for (const [slug, data] of Object.entries(EXAMPLES)) {
  const compDir = path.join(registryDir, slug)
  if (!fs.existsSync(compDir)) {
    fs.mkdirSync(compDir, { recursive: true })
  }

  const examplesDir = path.join(compDir, 'examples')
  const bladeDir = path.join(examplesDir, 'blade')
  const reactDir = path.join(examplesDir, 'react')
  const angularDir = path.join(examplesDir, 'angular')

  fs.mkdirSync(bladeDir, { recursive: true })
  fs.mkdirSync(reactDir, { recursive: true })
  fs.mkdirSync(angularDir, { recursive: true })

  fs.writeFileSync(path.join(bladeDir, 'example.blade.php'), data.blade, 'utf-8')
  fs.writeFileSync(path.join(reactDir, 'example.tsx'), data.react, 'utf-8')
  fs.writeFileSync(path.join(angularDir, 'example.html'), data.angular, 'utf-8')
}

console.log('✓ Multi-framework examples generated in registry/components/{slug}/examples/{blade,react,angular}')

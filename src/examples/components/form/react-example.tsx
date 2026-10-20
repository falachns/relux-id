import { FormField, Input, Select, Checkbox, Switch, Button } from '@/components/ui'

export function FormExample() {
  return (
    <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
      <FormField label="Nama lengkap" hint="Sesuai KTP/Paspor" required>
        <Input placeholder="Budi Santoso" />
      </FormField>
      <FormField label="Kelas kereta">
        <Select defaultValue="eksekutif">
          <option value="ekonomi">Ekonomi</option>
          <option value="bisnis">Bisnis</option>
          <option value="eksekutif">Eksekutif</option>
        </Select>
      </FormField>
      <Checkbox label="Asuransi perjalanan" defaultChecked />
      <Switch label="Kirim notifikasi SMS" />
      <Button type="submit">Lanjutkan Pemesanan</Button>
    </form>
  )
}

import { Card, Button, Badge } from '@/components/ui'

export function CardExample() {
  return (
    <Card variant="outlined" className="max-w-md">
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title>Argo Bromo Anggrek</Card.Title>
          <Badge tone="info" variant="soft">Eksekutif</Badge>
        </div>
        <Card.Description>Gambir (GMR) – Surabaya Pasarturi (SBI)</Card.Description>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-muted-foreground">Berangkat 08.20 WIB · Tiba 16.30 WIB</p>
      </Card.Body>
      <Card.Footer>
        <span className="font-semibold text-foreground">Rp650.000</span>
        <Button size="sm">Pilih tiket</Button>
      </Card.Footer>
    </Card>
  )
}

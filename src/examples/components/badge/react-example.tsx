import { Badge } from '@/components/ui'

export function BadgeExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone="success" variant="soft" dot>Tepat waktu</Badge>
      <Badge tone="warning" variant="soft" dot>Terlambat</Badge>
      <Badge tone="danger" variant="soft" dot>Dibatalkan</Badge>
      <Badge tone="info" variant="outline">Bisnis</Badge>
      <Badge tone="kai" variant="solid">KAI</Badge>
      <Badge.Count count={12} srText="belum dibaca" />
    </div>
  )
}

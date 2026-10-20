import { Avatar } from '@/components/ui'

export function AvatarExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar name="Budi Santoso" size="lg" status="online" />
      <Avatar name="Siti Rahma" size="md" status="offline" />
      <Avatar name="Agus Wibowo" size="sm" status="busy" />
      <Avatar.Group max={3}>
        <Avatar name="Budi Santoso" />
        <Avatar name="Siti Rahma" />
        <Avatar name="Agus Wibowo" />
        <Avatar name="Dewi Lestari" />
      </Avatar.Group>
    </div>
  )
}

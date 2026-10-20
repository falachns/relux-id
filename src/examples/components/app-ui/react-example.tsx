import { SearchBookWidget, SidebarNav } from '@/components/ui'
import { LayoutDashboard, Train, Settings } from 'lucide-react'

export function AppUIExample() {
  return (
    <div className="space-y-6">
      <SearchBookWidget />
      <SidebarNav
        items={[
          { icon: LayoutDashboard, label: 'Dashboard' },
          { icon: Train, label: 'Jadwal Kereta' },
          { icon: Settings, label: 'Pengaturan' },
        ]}
      />
    </div>
  )
}

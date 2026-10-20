import clsx from 'clsx'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export type SidebarNavItem = {
  icon: ElementType
  label: ReactNode
  href?: string
  badge?: ReactNode
}

export type SidebarNavProps = Omit<HTMLAttributes<HTMLElement>, 'onSelect'> & {
  items: SidebarNavItem[]
  activeIndex?: number
  onSelect?: (index: number) => void
  ariaLabel?: string
}

export function SidebarNav({
  items,
  activeIndex = 0,
  onSelect,
  ariaLabel = 'Internal application navigation',
  className,
  ...props
}: SidebarNavProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={clsx(
        'relux-sidebar w-full max-w-64 border border-border shadow-xs',
        className,
      )}
      {...props}
    >
      <ul className="space-y-1">
        {items.map((item, i) => {
          const Icon = item.icon
          const isActive = i === activeIndex
          return (
            <li key={i}>
              <a
                href={item.href ?? '#'}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  if (!item.href || item.href === '#') {
                    e.preventDefault()
                  }
                  onSelect?.(i)
                }}
                className={clsx(
                  'flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isActive
                    ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                    : 'text-sidebar-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    aria-hidden="true"
                    className="size-4 shrink-0"
                    strokeWidth={isActive ? 2 : 1.75}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

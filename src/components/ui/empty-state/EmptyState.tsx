import { type ReactNode } from 'react'
import { Search, Inbox, AlertTriangle } from 'lucide-react'
import { clsx } from 'clsx'

export type EmptyStateVariant = 'empty' | 'search' | 'error'

export type EmptyStateProps = {
  variant?: EmptyStateVariant
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  variant = 'empty',
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const defaultIcon = () => {
    switch (variant) {
      case 'search':
        return <Search className="size-6" aria-hidden="true" />
      case 'error':
        return <AlertTriangle className="size-6 text-destructive" aria-hidden="true" />
      default:
        return <Inbox className="size-6" aria-hidden="true" />
    }
  }

  return (
    <div className={clsx('relux-empty-state', className)} role="status">
      <div className="relux-empty-state__icon-box">
        {icon || defaultIcon()}
      </div>

      <h3 className="relux-empty-state__title">{title}</h3>

      {description && (
        <p className="relux-empty-state__description">{description}</p>
      )}

      {action && <div className="relux-empty-state__actions">{action}</div>}
    </div>
  )
}

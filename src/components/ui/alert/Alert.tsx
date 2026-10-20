import clsx from 'clsx'
import {
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
  X,
} from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'error'
export type AlertVariant = 'inline' | 'banner'

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: AlertTone
  variant?: AlertVariant
  title?: ReactNode
  icon?: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  closeAriaLabel?: string
  children?: ReactNode
}

const DEFAULT_ICONS: Record<AlertTone, typeof Info> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleX,
  error: CircleX,
}

const TONE_CLASSES: Record<AlertTone, string> = {
  info: 'relux-tone--info border-primary/20',
  success: 'relux-tone--success border-success/30',
  warning: 'relux-tone--warning border-warning/30',
  danger: 'relux-tone--danger border-destructive/30',
  error: 'relux-tone--danger border-destructive/30',
}

export function Alert({
  tone = 'info',
  variant = 'inline',
  title,
  icon,
  dismissible,
  onDismiss,
  closeAriaLabel = 'Dismiss alert',
  className,
  children,
  role: userRole,
  ...props
}: AlertProps) {
  const normalizedTone: AlertTone = tone === 'error' ? 'danger' : tone
  const computedRole =
    userRole ?? (normalizedTone === 'danger' ? 'alert' : 'status')
  const IconComponent = DEFAULT_ICONS[normalizedTone]

  if (variant === 'banner') {
    return (
      <div
        role={computedRole}
        className={clsx(
          'flex items-center gap-3 rounded-md bg-primary px-4 py-3 text-sm text-primary-foreground',
          className,
        )}
        {...props}
      >
        <span aria-hidden="true" className="shrink-0">
          {icon ?? <IconComponent className="size-5" />}
        </span>
        <div className="flex-1 text-sm">
          {title && <span className="font-semibold">{title} · </span>}
          {children}
        </div>
        {dismissible && (
          <button
            type="button"
            aria-label={closeAriaLabel}
            onClick={onDismiss}
            className="grid size-8 shrink-0 place-items-center rounded-md text-primary-foreground/80 hover:bg-primary-foreground/15 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      role={computedRole}
      className={clsx(
        'relux-alert border',
        TONE_CLASSES[normalizedTone],
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="shrink-0">
        {icon ?? <IconComponent className="mt-0.5 size-5" strokeWidth={2} />}
      </span>
      <div className="min-w-0 flex-1">
        {title && <p className="text-sm font-semibold text-foreground">{title}</p>}
        {children && (
          <div className="mt-0.5 text-sm text-foreground/90 text-pretty">
            {children}
          </div>
        )}
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label={closeAriaLabel}
          onClick={onDismiss}
          className="-mr-1 -mt-1 grid size-7 shrink-0 place-items-center rounded text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      )}
    </div>
  )
}

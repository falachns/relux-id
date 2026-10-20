import clsx from 'clsx'
import {
  useState,
  type Children,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  src?: string
  alt?: string
  name: string
  size?: AvatarSize
  status?: AvatarStatus
  className?: string
}

const SIZE_MAP: Record<AvatarSize, { sizeClass: string; textClass: string; dotClass: string }> = {
  xs: { sizeClass: 'size-6', textClass: 'text-xs leading-none', dotClass: 'size-2' },
  sm: { sizeClass: 'size-8', textClass: 'text-xs', dotClass: 'size-2.5' },
  md: { sizeClass: 'size-10', textClass: 'text-sm', dotClass: 'size-3' },
  lg: { sizeClass: 'size-12', textClass: 'text-base', dotClass: 'size-3.5' },
  xl: { sizeClass: 'size-16', textClass: 'text-xl', dotClass: 'size-4' },
  '2xl': { sizeClass: 'size-20', textClass: 'text-2xl', dotClass: 'size-5' },
}

const STATUS_MAP: Record<AvatarStatus, { bg: string; label: string }> = {
  online: { bg: 'bg-success', label: 'Online' },
  offline: { bg: 'bg-muted-foreground', label: 'Offline' },
  busy: { bg: 'bg-destructive', label: 'Busy' },
  away: { bg: 'bg-warning', label: 'Away' },
}

function getInitials(name: string): string {
  if (!name) return ''
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  status,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)
  const conf = SIZE_MAP[size]
  const initials = getInitials(name)

  const showImage = Boolean(src && !imageError)

  return (
    <span
      role="img"
      aria-label={name}
      className={clsx('relative inline-block shrink-0', className)}
      {...props}
    >
      <span
        className={clsx(
          'relux-avatar overflow-hidden rounded-full font-semibold',
          conf.sizeClass,
          conf.textClass,
          showImage
            ? 'bg-muted'
            : 'bg-primary text-primary-foreground',
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? name}
            onError={() => setImageError(true)}
            className="size-full object-cover"
          />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
      </span>

      {status && (
        <span
          aria-hidden="true"
          title={STATUS_MAP[status].label}
          className={clsx(
            'absolute bottom-0 end-0 rounded-full ring-2 ring-card',
            conf.dotClass,
            STATUS_MAP[status].bg,
          )}
        />
      )}
    </span>
  )
}

export type AvatarGroupProps = HTMLAttributes<HTMLDivElement> & {
  max?: number
  children: ReactNode
}

export function AvatarGroup({
  max,
  className,
  children,
  ...props
}: AvatarGroupProps) {
  const items = Array.isArray(children) ? children : [children]
  const visible = max != null ? items.slice(0, max) : items
  const excess = max != null && items.length > max ? items.length - max : 0

  return (
    <div
      role="group"
      className={clsx('flex items-center -space-x-2', className)}
      {...props}
    >
      {visible.map((child, i) => (
        <span key={i} className="ring-2 ring-card rounded-full">
          {child}
        </span>
      ))}
      {excess > 0 && (
        <span
          aria-hidden="true"
          className="inline-grid size-10 place-items-center rounded-full bg-muted text-sm font-semibold text-muted-foreground ring-2 ring-card"
        >
          +{excess}
        </span>
      )}
    </div>
  )
}

Avatar.Group = AvatarGroup

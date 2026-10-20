import clsx from 'clsx'
import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'kai'
  | 'esa'
  | 'commuter'
  | 'bandara'
  | 'logistik'

export type BadgeVariant = 'soft' | 'outline' | 'solid'
export type BadgeSize = 'sm' | 'md' | 'lg'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  icon?: ReactNode
  children?: ReactNode
}

const TONE_CLASSES: Record<BadgeVariant, Record<BadgeTone, string>> = {
  soft: {
    neutral: 'relux-tone--neutral',
    info: 'relux-tone--info',
    success: 'relux-tone--success',
    warning: 'relux-tone--warning',
    danger: 'relux-tone--danger',
    kai: 'bg-primary/10 text-primary',
    esa: 'bg-accent/15 text-accent',
    commuter: 'bg-destructive/10 text-destructive',
    bandara: 'bg-primary/15 text-primary',
    logistik: 'bg-primary/20 text-primary',
  },
  outline: {
    neutral: 'border border-border bg-card text-muted-foreground',
    info: 'border border-primary/30 bg-card text-primary',
    success: 'border border-success/30 bg-card text-success',
    warning: 'border border-warning/30 bg-card text-warning',
    danger: 'border border-destructive/30 bg-card text-destructive',
    kai: 'border border-primary/40 bg-card text-primary',
    esa: 'border border-accent/40 bg-card text-accent',
    commuter: 'border border-destructive/40 bg-card text-destructive',
    bandara: 'border border-primary/40 bg-card text-primary',
    logistik: 'border border-primary/40 bg-card text-primary',
  },
  solid: {
    neutral: 'bg-muted text-muted-foreground',
    info: 'bg-primary text-primary-foreground',
    success: 'bg-success text-card',
    warning: 'bg-warning text-foreground',
    danger: 'bg-destructive text-destructive-foreground',
    kai: 'bg-primary text-primary-foreground',
    esa: 'bg-accent text-accent-foreground',
    commuter: 'bg-destructive text-destructive-foreground',
    bandara: 'bg-primary text-primary-foreground',
    logistik: 'bg-primary text-primary-foreground',
  },
}

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs font-medium gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
  lg: 'px-3 py-1.5 text-sm gap-2',
}

export function Badge({
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  dot,
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'relux-badge whitespace-nowrap',
        TONE_CLASSES[variant][tone],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full bg-current"
        />
      )}
      {icon}
      {children}
    </span>
  )
}

export type BadgeCountProps = HTMLAttributes<HTMLSpanElement> & {
  count: number | string
  max?: number
  tone?: 'neutral' | 'danger' | 'primary'
  srText?: string
}

export function BadgeCount({
  count,
  max = 99,
  tone = 'danger',
  srText,
  className,
  ...props
}: BadgeCountProps) {
  const display =
    typeof count === 'number' && max != null && count > max ? `${max}+` : count

  const toneClass =
    tone === 'danger'
      ? 'bg-destructive text-destructive-foreground'
      : tone === 'primary'
        ? 'bg-primary text-primary-foreground'
        : 'bg-muted text-muted-foreground'

  return (
    <span
      className={clsx(
        'inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 font-mono text-xs font-semibold tabular-nums leading-none',
        toneClass,
        className,
      )}
      {...props}
    >
      {display}
      {srText && <span className="sr-only"> {srText}</span>}
    </span>
  )
}

Badge.Count = BadgeCount

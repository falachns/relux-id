import clsx from 'clsx'
import type { HTMLAttributes, ReactNode } from 'react'

export type ProgressTone = 'primary' | 'success' | 'warning' | 'danger' | 'accent'
export type ProgressSize = 'sm' | 'md' | 'lg'

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  value?: number
  min?: number
  max?: number
  tone?: ProgressTone
  size?: ProgressSize
  label?: ReactNode
  showValue?: boolean
  indeterminate?: boolean
  className?: string
}

const TONE_CLASSES: Record<ProgressTone, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-destructive',
  accent: 'bg-accent',
}

const SIZE_CLASSES: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
}

export function Progress({
  value,
  min = 0,
  max = 100,
  tone = 'primary',
  size = 'md',
  label,
  showValue = false,
  indeterminate = false,
  className,
  ...props
}: ProgressProps) {
  const isDeterminate = !indeterminate && value != null
  const percent = isDeterminate
    ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
    : undefined

  return (
    <div className={clsx('w-full', className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && <span className="font-medium text-foreground">{label}</span>}
          {showValue && isDeterminate && (
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {Math.round(percent!)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={isDeterminate ? Math.round(value) : undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        className={clsx(
          'relux-progress overflow-hidden rounded-full bg-muted',
          SIZE_CLASSES[size],
        )}
        {...props}
      >
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-300 ease-out',
            TONE_CLASSES[tone],
            !isDeterminate && 'w-1/3 animate-[pulse_1.5s_ease-in-out_infinite]',
          )}
          style={isDeterminate ? { width: `${percent}%` } : undefined}
        />
      </div>
    </div>
  )
}

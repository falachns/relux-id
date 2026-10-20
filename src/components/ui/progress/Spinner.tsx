import clsx from 'clsx'
import { Loader2 } from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg'

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  size?: SpinnerSize
  label?: ReactNode
  srOnlyLabel?: boolean
  className?: string
}

const SIZE_CLASSES: Record<SpinnerSize, string> = {
  xs: 'size-3.5',
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
}

export function Spinner({
  size = 'md',
  label = 'Loading…',
  srOnlyLabel = false,
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      className={clsx('inline-flex items-center gap-2 text-sm text-foreground', className)}
      {...props}
    >
      <Loader2
        aria-hidden="true"
        className={clsx(
          'text-primary motion-safe:animate-spin',
          SIZE_CLASSES[size],
        )}
      />
      {label && (
        <span className={srOnlyLabel ? 'sr-only' : undefined}>
          {label}
        </span>
      )}
    </span>
  )
}

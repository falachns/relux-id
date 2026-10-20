import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  circle?: boolean
  variant?: 'text' | 'rectangular' | 'circular'
}

export function Skeleton({
  circle = false,
  variant,
  className,
  ...props
}: SkeletonProps) {
  const isCircle = circle || variant === 'circular'
  const isText = variant === 'text'

  return (
    <div
      role="status"
      aria-label="Loading content"
      className={clsx(
        'bg-muted motion-safe:animate-pulse',
        isCircle ? 'rounded-full' : isText ? 'rounded' : 'rounded-md',
        className,
      )}
      {...props}
    />
  )
}

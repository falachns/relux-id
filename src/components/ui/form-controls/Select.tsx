import clsx from 'clsx'
import type { SelectHTMLAttributes } from 'react'

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
  isInvalid?: boolean
  size?: 'sm' | 'md'
}

export function Select({ isInvalid, size = 'md', className, children, ...props }: SelectProps) {
  const isSm = size === 'sm'

  return (
    <div className="relative w-full">
      <select
        aria-invalid={isInvalid || undefined}
        className={clsx(
          'relux-field appearance-none transition-[border-color,box-shadow]',
          isSm ? 'relux-field--sm pe-8' : 'h-11 min-h-[44px] pe-10',
          isInvalid && 'border-destructive bg-danger-soft focus-visible:border-destructive',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className={clsx(
          'pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground',
          isSm ? 'end-2.5 size-3.5' : 'end-3.5 size-4',
        )}
      >
        <path
          d="m6 8 4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

import clsx from 'clsx'
import type { SelectHTMLAttributes } from 'react'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  isInvalid?: boolean
}

export function Select({ isInvalid, className, children, ...props }: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        aria-invalid={isInvalid || undefined}
        className={clsx(
          'relux-field appearance-none pe-9 transition-[border-color,box-shadow]',
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
        className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
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

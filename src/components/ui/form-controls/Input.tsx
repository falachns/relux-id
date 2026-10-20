import clsx from 'clsx'
import type { InputHTMLAttributes, ReactNode } from 'react'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  isInvalid?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  size?: 'sm' | 'md'
}

export function Input({
  isInvalid,
  leftIcon,
  rightIcon,
  className,
  size = 'md',
  type = 'text',
  ...props
}: InputProps) {
  const isSm = size === 'sm'

  if (leftIcon || rightIcon) {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span
            aria-hidden="true"
            className={clsx(
              'pointer-events-none absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground shrink-0',
              isSm ? 'start-2.5 size-4 [&>svg]:size-4' : 'start-3.5 size-5 [&>svg]:size-5',
            )}
          >
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          aria-invalid={isInvalid || undefined}
          className={clsx(
            'relux-field transition-[border-color,box-shadow]',
            isSm ? 'relux-field--sm' : 'h-11 min-h-[44px]',
            leftIcon && (isSm ? 'ps-8' : 'ps-10.5'),
            rightIcon && (isSm ? 'pe-8' : 'pe-10.5'),
            isInvalid && 'border-destructive bg-danger-soft focus-visible:border-destructive focus-visible:ring-destructive/30',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span
            aria-hidden="true"
            className={clsx(
              'pointer-events-none absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground shrink-0',
              isSm ? 'end-2.5 size-4 [&>svg]:size-4' : 'end-3.5 size-5 [&>svg]:size-5',
            )}
          >
            {rightIcon}
          </span>
        )}
      </div>
    )
  }

  return (
    <input
      type={type}
      aria-invalid={isInvalid || undefined}
      className={clsx(
        'relux-field transition-[border-color,box-shadow]',
        isSm ? 'relux-field--sm' : 'h-11 min-h-[44px]',
        isInvalid && 'border-destructive bg-danger-soft focus-visible:border-destructive focus-visible:ring-destructive/30',
        className,
      )}
      {...props}
    />
  )
}

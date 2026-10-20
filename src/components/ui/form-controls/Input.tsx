import clsx from 'clsx'
import type { InputHTMLAttributes, ReactNode } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isInvalid?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Input({
  isInvalid,
  leftIcon,
  rightIcon,
  className,
  type = 'text',
  ...props
}: InputProps) {
  if (leftIcon || rightIcon) {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute start-3 text-muted-foreground flex items-center justify-center"
          >
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          aria-invalid={isInvalid || undefined}
          className={clsx(
            'relux-field transition-[border-color,box-shadow]',
            leftIcon && 'ps-9',
            rightIcon && 'pe-9',
            isInvalid && 'border-destructive bg-danger-soft focus-visible:border-destructive focus-visible:ring-destructive/30',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute end-3 text-muted-foreground flex items-center justify-center"
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
        isInvalid && 'border-destructive bg-danger-soft focus-visible:border-destructive focus-visible:ring-destructive/30',
        className,
      )}
      {...props}
    />
  )
}

import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'brand-kai'
    | 'brand-esa'
    | 'brand-commuter'
    | 'brand-bandara'
    | 'brand-logistik'
    | 'brand-wisata'
    | 'brand-pariwisata'
    | 'brand-services'
    | 'brand-service'
    | 'brand-property'
}

export function Button({
  asChild,
  children,
  className,
  disabled,
  leftIcon,
  loading,
  rightIcon,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={clsx(
        'relux-button relux-focus cursor-pointer',
        `relux-button--${variant}`,
        size !== 'md' && `relux-button--${size}`,
        className,
      )}
      disabled={!asChild ? disabled || loading : undefined}
      aria-busy={loading || undefined}
      aria-disabled={asChild ? disabled || loading : undefined}
      {...props}
    >
      {!loading && leftIcon}
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
        />
      )}
      {children}
      {!loading && rightIcon}
    </Comp>
  )
}

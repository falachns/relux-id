import clsx from 'clsx'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export type CardVariant = 'elevated' | 'flat' | 'outlined'

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  variant?: CardVariant
  children?: ReactNode
}

export function Card({
  as: Component = 'article',
  variant = 'outlined',
  className,
  children,
  ...props
}: CardProps) {
  const variantClass =
    variant === 'elevated'
      ? 'shadow-md border border-border'
      : variant === 'flat'
        ? 'bg-muted/50 border-transparent shadow-none'
        : 'border border-border shadow-sm'

  return (
    <Component
      className={clsx(
        'relux-card flex flex-col overflow-hidden',
        variantClass,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={clsx('flex flex-col gap-1.5 p-5 pb-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children?: ReactNode
}

export function CardTitle({
  as: Component = 'h3',
  className,
  children,
  ...props
}: CardTitleProps) {
  return (
    <Component
      className={clsx('text-base font-semibold text-card-foreground', className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement> & {
  children?: ReactNode
}

export function CardDescription({
  className,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={clsx('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
}

export type CardBodyProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
}

export function CardBody({ className, children, ...props }: CardBodyProps) {
  return (
    <div className={clsx('p-5 flex-1', className)} {...props}>
      {children}
    </div>
  )
}

export type CardFooterProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between border-t border-border p-5 pt-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Body = CardBody
Card.Content = CardBody
Card.Footer = CardFooter

import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'
import type { HTMLAttributes, ReactNode } from 'react'

export type BreadcrumbItem = {
  label: ReactNode
  href?: string
  onClick?: () => void
}

export type BreadcrumbProps = HTMLAttributes<HTMLElement> & {
  items: BreadcrumbItem[]
  ariaLabel?: string
  separator?: ReactNode
}

export function Breadcrumb({
  items,
  ariaLabel = 'Breadcrumb',
  separator,
  className,
  ...props
}: BreadcrumbProps) {
  const defaultSeparator = (
    <ChevronRight
      aria-hidden="true"
      className="size-4 text-muted-foreground shrink-0 rtl:-scale-x-100"
    />
  )

  return (
    <nav aria-label={ariaLabel} className={clsx('w-full', className)} {...props}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-2">
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold text-foreground"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={item.onClick}
                      className="rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={item.onClick}
                      className="rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.label}
                    </button>
                  )}
                  {separator ?? defaultSeparator}
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

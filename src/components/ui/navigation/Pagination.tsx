import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { HTMLAttributes } from 'react'

export type PaginationProps = HTMLAttributes<HTMLElement> & {
  page: number
  total: number
  onPageChange: (page: number) => void
  ariaLabel?: string
  previousLabel?: string
  nextLabel?: string
}

export function Pagination({
  page,
  total,
  onPageChange,
  ariaLabel = 'Pagination',
  previousLabel = 'Previous page',
  nextLabel = 'Next page',
  className,
  ...props
}: PaginationProps) {
  const btn =
    'inline-grid size-9 place-items-center rounded-md text-sm font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed'

  return (
    <nav aria-label={ariaLabel} className={clsx('w-full', className)} {...props}>
      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            aria-label={previousLabel}
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className={clsx(btn, 'text-muted-foreground hover:bg-muted hover:text-foreground')}
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </button>
        </li>

        {Array.from({ length: total }, (_, i) => i + 1).map((p) => {
          const isCurrent = p === page
          return (
            <li key={p}>
              <button
                type="button"
                aria-label={`Page ${p}`}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => onPageChange(p)}
                className={clsx(
                  btn,
                  isCurrent
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-foreground hover:bg-muted',
                )}
              >
                {p}
              </button>
            </li>
          )
        })}

        <li>
          <button
            type="button"
            aria-label={nextLabel}
            disabled={page >= total}
            onClick={() => onPageChange(page + 1)}
            className={clsx(btn, 'text-muted-foreground hover:bg-muted hover:text-foreground')}
          >
            <ChevronRight aria-hidden="true" className="size-4" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

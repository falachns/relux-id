import { useMemo, useState, type ReactNode } from 'react'
import clsx from 'clsx'
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from 'lucide-react'

export type ColumnDef<T> = {
  key: string
  header: ReactNode
  sortable?: boolean
  cell?: (item: T) => ReactNode
  className?: string
  headerClassName?: string
}

export type DataTableProps<T> = {
  data: T[]
  columns: ColumnDef<T>[]
  caption?: string
  searchable?: boolean
  searchPlaceholder?: string
  searchFilter?: (item: T, query: string) => boolean
  emptyMessage?: ReactNode
  className?: string
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  caption,
  searchable = false,
  searchPlaceholder = 'Search…',
  searchFilter,
  emptyMessage,
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else {
        setSortKey(null)
        setSortDirection('asc')
      }
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const filteredData = useMemo(() => {
    if (!query.trim()) return data
    if (searchFilter) {
      return data.filter((item) => searchFilter(item, query))
    }
    const q = query.toLowerCase()
    return data.filter((item) =>
      Object.values(item).some(
        (val) => val != null && String(val).toLowerCase().includes(q),
      ),
    )
  }, [data, query, searchFilter])

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey]
      const valB = b[sortKey]
      if (valA == null) return 1
      if (valB == null) return -1
      const comparison = String(valA).localeCompare(String(valB), undefined, {
        numeric: true,
      })
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortKey, sortDirection])

  return (
    <div className={clsx('w-full space-y-3', className)}>
      {searchable && (
        <div className="relative max-w-sm">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-border bg-input-background py-2 ps-9 pe-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-xs">
        <table className="relux-table border-collapse text-left text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="bg-muted/60">
            <tr>
              {columns.map((col) => {
                const isSorted = sortKey === col.key
                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={
                      col.sortable
                        ? isSorted
                          ? sortDirection === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : 'none'
                        : undefined
                    }
                    className={clsx(
                      'px-4 py-3 font-semibold text-foreground whitespace-nowrap',
                      col.headerClassName,
                    )}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => handleSort(col.key)}
                        className="inline-flex items-center gap-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span>{col.header}</span>
                        {isSorted ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp aria-hidden="true" className="size-3.5 text-primary" />
                          ) : (
                            <ArrowDown aria-hidden="true" className="size-3.5 text-primary" />
                          )
                        ) : (
                          <ArrowUpDown aria-hidden="true" className="size-3.5 text-muted-foreground" />
                        )}
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedData.length > 0 ? (
              sortedData.map((row, idx) => (
                <tr key={idx} className="transition-colors hover:bg-muted/40">
                  {columns.map((col, cIdx) => (
                    <td
                      key={col.key}
                      className={clsx('px-4 py-3', col.className)}
                    >
                      {col.cell ? col.cell(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  {emptyMessage ?? (
                    <div>
                      <p className="font-medium text-foreground">
                        {query ? `No results found for "${query}"` : 'No data available'}
                      </p>
                      {query && (
                        <button
                          type="button"
                          onClick={() => setQuery('')}
                          className="mt-2 text-sm font-medium text-primary underline"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

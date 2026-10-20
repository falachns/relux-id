import type { ReactNode } from 'react'

export type PropsTableColumn = {
  key: string
  header: string
  mono?: boolean
}

export type PropsTableRow = Record<string, ReactNode>

export function PropsTable({
  columns,
  rows,
}: {
  columns: PropsTableColumn[]
  rows: PropsTableRow[]
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
      <table className="w-full min-w-xl border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/60 sticky top-0 backdrop-blur">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {rows.map((row, i) => (
            <tr
              key={i}
              className="align-top hover:bg-muted/30 transition-colors"
            >
              {columns.map((col) => {
                const cellVal = row[col.key]
                const isTypeCol = col.key.toLowerCase().includes('type') || col.key.toLowerCase().includes('tipe')
                const isPropCol = col.key.toLowerCase().includes('prop') || col.key.toLowerCase().includes('token')
                const isDefCol = col.key.toLowerCase().includes('def') || col.key.toLowerCase().includes('nilai')

                return (
                  <td
                    key={col.key}
                    className="px-4 py-3.5 text-sm"
                  >
                    {isTypeCol && typeof cellVal === 'string' ? (
                      <span className="inline-block rounded-md bg-muted/80 border border-border/70 px-2 py-0.5 font-mono text-xs text-foreground/90 font-medium">
                        {cellVal}
                      </span>
                    ) : isPropCol ? (
                      <code className="font-mono text-xs sm:text-sm font-semibold text-primary">
                        {cellVal}
                      </code>
                    ) : isDefCol ? (
                      <span className="font-mono text-xs text-muted-foreground">
                        {cellVal}
                      </span>
                    ) : (
                      <div className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                        {cellVal}
                      </div>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

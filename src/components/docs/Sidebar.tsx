import { useMemo, useState } from 'react'
import { NAV, type SectionId } from '../../lib/nav'
import { useLang } from '../../lib/i18n'

export function Sidebar({
  active,
  onNavigate,
  query,
}: {
  active: SectionId
  onNavigate: (section: SectionId) => void
  query: string
}) {
  const { t, label } = useLang()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return NAV
    return NAV.map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(q) || item.labelEn.toLowerCase().includes(q),
      ),
    })).filter((group) => group.items.length > 0)
  }, [query])

  const searching = query.trim().length > 0

  return (
    <nav className="flex flex-col" aria-label={t.nav}>
      {groups.length === 0 && (
        <p className="px-2.5 py-2 text-xs text-muted-foreground">
          {t.noResults(query)}
        </p>
      )}
      {groups.map((group) => {
        const isCollapsed = !searching && collapsed[group.label]
        return (
          <div key={group.label}>
            <button
              type="button"
              onClick={() =>
                setCollapsed((prev) => ({
                  ...prev,
                  [group.label]: !prev[group.label],
                }))
              }
              aria-expanded={!isCollapsed}
              className="flex w-full items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-2.5 pt-4 pb-1.5 first:pt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-md"
            >
              <span>{label(group)}</span>
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className={
                  'size-3.5 text-muted-foreground/70 transition-transform ' +
                  (isCollapsed ? '' : 'rotate-180')
                }
              >
                <path
                  d="M6 8l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {!isCollapsed && (
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = item.section === active
                  const clickable = Boolean(item.section)
                  return (
                    <li key={item.id} className="relative">
                      <button
                        type="button"
                        disabled={!clickable}
                        onClick={() => item.section && onNavigate(item.section)}
                        aria-current={isActive ? 'page' : undefined}
                        className={
                          'group relative flex w-full items-center justify-between text-[13px] px-2.5 py-1.5 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
                          (isActive
                            ? 'bg-muted text-foreground font-semibold rounded-md'
                            : clickable
                              ? 'cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted/60'
                              : 'cursor-not-allowed text-muted-foreground/50')
                        }
                      >
                        <span className="truncate">{label(item)}</span>
                        {item.soon && (
                          <span className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] leading-none uppercase tracking-wider text-muted-foreground font-semibold">
                            {t.soon}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}

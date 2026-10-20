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
    <nav className="flex flex-col gap-6 py-6 pr-3" aria-label={t.nav}>
      {groups.length === 0 && (
        <p className="px-3 text-sm text-muted-foreground">
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
              className="mb-1 flex w-full items-center justify-between px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-md"
            >
              <span>{label(group)}</span>
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className={
                  'size-4 text-muted-foreground/70 transition-transform ' +
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
              <ul className="space-y-0.5 pt-0.5">
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
                          'group relative flex w-full items-center justify-between rounded-lg pe-2.5 ps-3 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ' +
                          (isActive
                            ? 'bg-primary/10 font-semibold text-primary border-l-2 border-primary rounded-l-none py-2'
                            : clickable
                              ? 'cursor-pointer text-slate-700 dark:text-slate-300 font-medium py-1.5 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                              : 'cursor-not-allowed text-slate-400 dark:text-slate-600 py-1.5')
                        }
                      >
                        {isActive && (
                          <span
                            className="sr-only"
                            aria-hidden="true"
                          />
                        )}
                        <span className="truncate">{label(item)}</span>
                        {item.soon && (
                          <span className="rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-xs leading-none uppercase tracking-wider text-slate-700 dark:text-slate-300 font-semibold">
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

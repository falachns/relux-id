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
        <p className="px-3 py-2 text-xs text-muted-foreground">
          {t.noResults(query)}
        </p>
      )}
      {groups.map((group) => {
        const isCollapsed = !searching && collapsed[group.label]
        return (
          <div key={group.label} className="mt-6 first:mt-0">
            <button
              type="button"
              onClick={() =>
                setCollapsed((prev) => ({
                  ...prev,
                  [group.label]: !prev[group.label],
                }))
              }
              aria-expanded={!isCollapsed}
              className="flex items-center justify-between w-full py-1 px-3 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-md"
            >
              <span>{label(group)}</span>
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className={
                  'h-3.5 w-3.5 text-slate-500 stroke-[2.2] transition-transform ' +
                  (isCollapsed ? '' : 'rotate-180')
                }
              >
                <path
                  d="M6 8l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {!isCollapsed && (
              <ul className="mt-1.5 space-y-1">
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
                          'flex items-center justify-between w-full px-3.5 py-2 text-sm rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
                          (isActive
                            ? 'font-semibold text-slate-900 bg-[#EBF2FE]'
                            : clickable
                              ? 'font-normal text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 cursor-pointer'
                              : 'font-normal text-slate-400 cursor-not-allowed')
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

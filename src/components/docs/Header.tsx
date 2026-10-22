import { useRef, type KeyboardEvent } from 'react'
import { useLang, type Lang } from '../../lib/i18n'
import { RelUXLogo } from '../brand/RelUXLogo'

const LANGS: { value: Lang; short: string; name: string }[] = [
  { value: 'id', short: 'ID', name: 'Bahasa Indonesia' },
  { value: 'en', short: 'EN', name: 'English' },
]

export function Header({
  query,
  onQuery,
  onToggleMenu,
  onHome,
  onManage,
  onOpenCommandMenu,
}: {
  query: string
  onQuery: (v: string) => void
  onToggleMenu: () => void
  onHome: () => void
  onManage?: () => void
  onOpenCommandMenu?: () => void
}) {
  const { lang, setLang, t } = useLang()
  const languageRefs = useRef<(HTMLButtonElement | null)[]>([])
  const handleLanguageKey = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const next =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? (index + 1) % LANGS.length
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? (index - 1 + LANGS.length) % LANGS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? LANGS.length - 1
              : -1
    if (next < 0) return
    event.preventDefault()
    setLang(LANGS[next].value)
    languageRefs.current[next]?.focus()
  }

  return (
    <header className="sticky top-0 z-50 w-full h-16 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMenu}
            aria-label={t.openMenu}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          <a
            href="#/introduction"
            onClick={(e) => {
              e.preventDefault()
              onHome()
            }}
            aria-label={t.home}
            className="flex items-center gap-2.5 shrink-0 rounded-md p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RelUXLogo className="h-6 w-auto text-foreground" height={24} />
            <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground font-mono">
              v1.0.0
            </span>
          </a>
        </div>

        <div className="shrink-0 flex items-center gap-2 sm:gap-3">
          <div
            onClick={onOpenCommandMenu}
            className="relative hidden w-44 sm:w-64 cursor-pointer md:block"
          >
            <svg
              viewBox="0 0 20 20"
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            >
              <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="m14 14 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              readOnly={!!onOpenCommandMenu}
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.search}
              className="w-full rounded-lg border border-border bg-secondary py-2 ps-9 pe-12 text-sm text-secondary-foreground placeholder:text-muted-foreground hover:border-border/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all cursor-pointer"
            />
            <kbd className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-xs font-semibold leading-none text-muted-foreground shadow-xs">
              ⌘K
            </kbd>
          </div>

          <div
            role="radiogroup"
            aria-label={t.language}
            className="flex gap-1 rounded-xl border border-border bg-secondary p-1"
          >
            {LANGS.map((l) => {
              const on = lang === l.value
              return (
                <button
                  key={l.value}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  aria-label={l.name}
                  lang={l.value}
                  ref={(node) => {
                    languageRefs.current[LANGS.indexOf(l)] = node
                  }}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setLang(l.value)}
                  onKeyDown={(event) =>
                    handleLanguageKey(event, LANGS.indexOf(l))
                  }
                  className={
                    'rounded-lg px-2.5 py-1 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-all ' +
                    (on ? 'bg-background text-foreground shadow-xs border border-border' : 'text-muted-foreground hover:text-foreground')
                  }
                >
                  {l.short}
                </button>
              )
            })}
          </div>

          {onManage && (
            <button
              type="button"
              onClick={onManage}
              title="Area Manajemen & Change Request (PRD §5.11 / Dev Mode)"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground shadow-2xs hover:bg-muted hover:border-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>Manage</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

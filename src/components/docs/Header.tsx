import { useRef, type KeyboardEvent } from 'react'
import { RelUXLogo } from '../brand/RelUXLogo'
import { useLang, type Lang } from '../../lib/i18n'

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
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-8">
        <button
          type="button"
          onClick={onToggleMenu}
          aria-label={t.openMenu}
          className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
        >
          <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onHome}
          aria-label={t.home}
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RelUXLogo height={26} aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            by KAI
          </span>
        </button>

        <div
          onClick={onOpenCommandMenu}
          className="relative ml-auto hidden max-w-xs flex-1 sm:block cursor-pointer"
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
            className="w-full rounded-lg border border-border bg-input-background py-2 ps-9 pe-12 text-base text-foreground placeholder:text-muted-foreground transition-[border-color,box-shadow] hover:border-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 sm:text-sm cursor-pointer"
          />
          <kbd className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 rounded bg-muted px-1.5 py-0.5 text-xs leading-none font-mono font-medium text-muted-foreground border border-border">
            ⌘K
          </kbd>
        </div>

        <div
          role="radiogroup"
          aria-label={t.language}
          className="ml-auto flex gap-1 rounded-xl border border-border bg-secondary p-1 sm:ml-0"
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
                  'rounded-md px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
                  (on ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-primary')
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
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
          >
            <span className="size-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            <span>Manage</span>
          </button>
        )}
      </div>
    </header>
  )
}

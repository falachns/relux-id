import { useLang } from '../../lib/i18n'
import { RelUXLogo } from '../brand/RelUXLogo'

export function Header({
  query,
  onQuery,
  onToggleMenu,
  onHome,
  onManage,
  onOpenCommandMenu,
}: {
  query?: string
  onQuery?: (v: string) => void
  onToggleMenu: () => void
  onHome: () => void
  onManage?: () => void
  onOpenCommandMenu?: () => void
}) {
  const { lang, setLang, t } = useLang()

  return (
    <header className="sticky top-0 z-50 w-full h-16 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Official Logo */}
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
            <RelUXLogo
              variant="full"
              height={26}
              iconColor="#083e7b"
              textColor="#0D1B3E"
              className="h-[26px] w-auto"
            />
            <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground font-mono">
              v1.0.0
            </span>
          </a>
        </div>

        {/* Right: Make Kit KAI Search Bar & Language Switcher */}
        <div className="shrink-0 flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenCommandMenu}
            className="h-9 w-56 sm:w-64 md:w-72 flex items-center justify-between px-3 rounded-md border border-border bg-background hover:bg-muted/40 text-xs text-muted-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={t.search}
          >
            <div className="flex items-center gap-2 min-w-0">
              <svg className="h-4 w-4 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="truncate">{t.searchPlaceholder}</span>
            </div>
            <kbd className="inline-flex items-center gap-0.5 rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </button>

          <div
            role="radiogroup"
            aria-label={t.language}
            className="inline-flex h-9 items-center rounded-md border border-border bg-muted/30 p-0.5 text-xs"
          >
            <button
              type="button"
              role="radio"
              aria-checked={lang === 'id'}
              onClick={() => setLang('id')}
              className={`px-2.5 py-1 rounded-[4px] text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                lang === 'id'
                  ? 'bg-background text-foreground shadow-2xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              ID
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={lang === 'en'}
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-[4px] text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                lang === 'en'
                  ? 'bg-background text-foreground shadow-2xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

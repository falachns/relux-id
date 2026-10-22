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
            <span className="hidden sm:inline-flex rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground font-mono">
              v1.0.0
            </span>
          </a>
        </div>

        {/* Right: Make Kit KAI Search Bar, Language Switcher & Quick Links */}
        <div className="shrink-0 flex items-center gap-2.5 sm:gap-4">
          {/* 1. Search Bar */}
          <button
            type="button"
            onClick={onOpenCommandMenu}
            className="h-9 w-36 xs:w-44 sm:w-56 md:w-60 flex items-center justify-between px-2.5 sm:px-3 rounded-md border border-border/70 bg-background hover:bg-muted/60 hover:border-border text-xs transition-all cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={t.search}
          >
            <div className="flex items-center gap-2 min-w-0">
              <svg className="h-4 w-4 text-foreground/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="truncate text-foreground/70 font-normal">{t.searchPlaceholder}</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-muted/80 px-1.5 py-0.5 text-[10px] font-mono font-medium text-foreground/70">
              ⌘K
            </kbd>
          </button>

          {/* 2. Language Switcher */}
          <div
            role="radiogroup"
            aria-label={t.language}
            className="inline-flex h-9 items-center rounded-md border border-border/70 bg-muted/50 p-1 text-xs"
          >
            <button
              type="button"
              role="radio"
              aria-checked={lang === 'id'}
              onClick={() => setLang('id')}
              className={`px-2.5 py-1 rounded-[4px] text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                lang === 'id'
                  ? 'bg-background text-primary font-bold shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground font-medium'
              }`}
            >
              ID
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={lang === 'en'}
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-[4px] text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                lang === 'en'
                  ? 'bg-background text-primary font-bold shadow-xs border border-border/80'
                  : 'text-muted-foreground hover:text-foreground font-medium'
              }`}
            >
              EN
            </button>
          </div>

          {/* 3. GitHub Icon */}
          <a
            href="https://github.com/falachns/relux-id"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/70 bg-background hover:bg-muted/70 hover:border-border text-muted-foreground hover:text-foreground transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* 4. Figma Icon (Outline) */}
          <a
            href="https://www.figma.com/design/Lbqu1BYMXUvO0h9p04G8rz/Design-System-KAI-v.1?m=auto&t=cYWauGA96ZUpgiwM-6"
            target="_blank"
            rel="noreferrer"
            aria-label="Figma Design System"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/70 bg-background hover:bg-muted/70 hover:border-border text-muted-foreground hover:text-foreground transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
              <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
              <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
              <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
              <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}

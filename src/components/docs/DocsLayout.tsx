import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { useLang } from '../../lib/i18n'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { TableOfContents } from './TableOfContents'
import { CommandMenuModal } from './CommandMenuModal'
import type { SectionId } from '../../lib/nav'

export function DocsLayout({
  active,
  onNavigate,
  children,
}: {
  active: SectionId
  onNavigate: (section: SectionId) => void
  children: ReactNode
}) {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const drawerRef = useRef<HTMLElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const { t, lang } = useLang()

  const navigate = (section: SectionId) => {
    onNavigate(section)
    setMenuOpen(false)
    setCommandOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Global ⌘K / Ctrl+K shortcut listener
  useEffect(() => {
    const handleGlobalKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleGlobalKey)
    return () => window.removeEventListener('keydown', handleGlobalKey)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    previousFocus.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => drawerRef.current?.focus())
    return () => {
      document.body.style.overflow = ''
      previousFocus.current?.focus()
    }
  }, [menuOpen])

  const handleDrawerKey = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      setMenuOpen(false)
      return
    }
    if (event.key !== 'Tab') return
    const controls = drawerRef.current?.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], input:not(:disabled), [tabindex]:not([tabindex="-1"])',
    )
    if (!controls?.length) return
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Skip-to-content for keyboard / screen-reader users (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        {t.skip}
      </a>

      <Header
        query={query}
        onQuery={setQuery}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        onHome={() => navigate('introduction')}
        onManage={() => navigate('manage')}
        onOpenCommandMenu={() => setCommandOpen(true)}
      />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-[14rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)_13rem]">
        {/* Desktop sidebar */}
        <aside
          aria-label={t.navAside}
          className="sticky top-16 hidden h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain border-r border-border pl-4 pr-3 pb-16 lg:block"
        >
          <Sidebar active={active} onNavigate={navigate} query={query} />
        </aside>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              aria-label={t.closeMenu}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-foreground/40"
            />
            <aside
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={t.navAside}
              tabIndex={-1}
              onKeyDown={handleDrawerKey}
              className="absolute left-0 top-0 h-full w-72 overflow-y-auto border-r border-border bg-background px-4 shadow-xl"
            >
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="relux-focus mt-3 rounded-md px-3 py-2 text-sm font-semibold text-primary"
              >
                {t.closeMenu}
              </button>
              <Sidebar active={active} onNavigate={navigate} query={query} />
            </aside>
          </div>
        )}

        <main
          id="main-content"
          aria-label={t.main}
          className="flex min-w-0 flex-1 flex-col justify-between transition-opacity duration-200 ease-out animate-in fade-in-50"
          tabIndex={-1}
        >
          <div className="px-4 py-10 lg:px-10">
            {children}
          </div>

          <footer
            role="contentinfo"
            className="bg-background px-4 py-6 text-center"
          >
            <p className="font-mono text-xs text-muted-foreground">
              {lang === 'en'
                ? 'Property of KAI IT Development'
                : 'Milik KAI IT Development'}{' '}
              &copy; 2026
            </p>
          </footer>
        </main>

        {/* Table of Contents — desktop xl+ */}
        <aside
          aria-label={t.toc}
          className="sticky top-20 hidden h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain py-4 px-4 pr-2 xl:block"
        >
          <TableOfContents activePage={active} />
        </aside>
      </div>

      {/* Global ⌘K Command Menu Modal */}
      <CommandMenuModal
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onNavigate={navigate}
      />
    </div>
  )
}

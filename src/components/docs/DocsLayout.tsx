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
    <div className="min-h-screen bg-background flex flex-col">
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

      <div className="w-full px-4 sm:px-6 lg:px-8 flex-1 flex">
        {/* Desktop sidebar */}
        <aside
          aria-label={t.navAside}
          className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto overscroll-contain px-3 py-4 border-r border-border lg:block"
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
              className="absolute left-0 top-0 h-full w-64 overflow-y-auto border-r border-border bg-background px-3 py-4 shadow-xl"
            >
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="relux-focus mb-2 rounded-md px-2.5 py-1.5 text-xs font-semibold text-primary"
              >
                {t.closeMenu}
              </button>
              <Sidebar active={active} onNavigate={navigate} query={query} />
            </aside>
          </div>
        )}

        {/* Konten Utama */}
        <main
          id="main-content"
          aria-label={t.main}
          className="max-w-4xl py-8 px-6 lg:px-10 min-w-0 flex-1 flex flex-col justify-between transition-opacity duration-200 ease-out animate-in fade-in-50"
          tabIndex={-1}
        >
          <div>
            {children}
          </div>

          <footer
            role="contentinfo"
            className="bg-background pt-12 pb-6 text-center"
          >
            <p className="font-mono text-xs text-muted-foreground">
              {lang === 'en'
                ? 'Property of KAI IT Development'
                : 'Milik KAI IT Development'}{' '}
              &copy; 2026
            </p>
          </footer>
        </main>

        {/* Table of Contents Kanan */}
        <aside
          aria-label={t.toc}
          className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto overscroll-contain py-6 pr-4 pl-4 text-xs xl:block"
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

import { useLang } from '../../lib/i18n'
import { PAGE_ORDER, type SectionId } from '../../lib/nav'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function PageNavigation({
  currentSection,
  onNavigate,
}: {
  currentSection: SectionId
  onNavigate: (section: SectionId) => void
}) {
  const { lang, label } = useLang()
  const currentIndex = PAGE_ORDER.findIndex((item) => item.section === currentSection)

  if (currentIndex === -1) return null

  const prev = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null
  const next = currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null

  if (!prev && !next) return null

  return (
    <nav
      aria-label={lang === 'en' ? 'Document pagination' : 'Navigasi halaman dokumen'}
      className="mt-14 pt-8 border-t border-border/80 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {prev?.section ? (
        <button
          type="button"
          onClick={() => prev.section && onNavigate(prev.section)}
          className="group relux-focus flex items-center gap-3.5 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-muted/30 active:scale-[0.99]"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-xs leading-none font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              {lang === 'en' ? 'Previous' : 'Sebelumnya'}
            </p>
            <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {label(prev)}
            </p>
          </div>
        </button>
      ) : (
        <div aria-hidden="true" className="hidden sm:block" />
      )}

      {next?.section ? (
        <button
          type="button"
          onClick={() => next.section && onNavigate(next.section)}
          className="group relux-focus flex items-center justify-between gap-3.5 rounded-xl border border-border bg-card p-4 text-right transition-all hover:border-primary/50 hover:bg-muted/30 active:scale-[0.99]"
        >
          <div className="min-w-0 text-left sm:text-right flex-1">
            <p className="font-mono text-xs leading-none font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              {lang === 'en' ? 'Next' : 'Berikutnya'}
            </p>
            <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {label(next)}
            </p>
          </div>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </div>
        </button>
      ) : (
        <div aria-hidden="true" className="hidden sm:block" />
      )}
    </nav>
  )
}

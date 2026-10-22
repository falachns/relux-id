import { useLang } from '../lib/i18n'
import type { SectionId } from '../lib/nav'
import { FileQuestion, ArrowLeft, Home, Compass } from 'lucide-react'

export function NotFoundPage({ onNavigate }: { onNavigate: (section: SectionId) => void }) {
  const { lang } = useLang()

  return (
    <div className="py-16 text-center flex flex-col items-center justify-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 ring-8 ring-primary/5">
        <FileQuestion className="h-8 w-8" aria-hidden="true" />
      </div>

      <span className="rounded-full bg-muted border border-border px-3 py-1 text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        Error 404
      </span>

      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-3">
        {lang === 'id' ? 'Halaman Tidak Ditemukan' : 'Page Not Found'}
      </h1>

      <p className="max-w-md text-sm text-muted-foreground mb-8 leading-relaxed">
        {lang === 'id'
          ? 'Rute atau tautan yang Anda tuju tidak tersedia dalam dokumentasi RelUX Design System KAI. Periksa kembali URL atau gunakan tautan navigasi di bawah.'
          : 'The route or link you followed does not exist in the RelUX Design System KAI documentation. Please check the URL or use the navigation links below.'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onNavigate('introduction')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          {lang === 'id' ? 'Kembali ke Pengenalan' : 'Back to Introduction'}
        </button>

        <button
          type="button"
          onClick={() => onNavigate('getting-started')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border bg-background text-foreground text-sm font-medium hover:bg-muted/70 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Compass className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          {lang === 'id' ? 'Mulai Menggunakan' : 'Getting Started'}
        </button>
      </div>
    </div>
  )
}

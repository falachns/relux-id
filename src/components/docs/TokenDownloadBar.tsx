import { useState } from 'react'
import { Check, Copy, Download, FileCode, FileJson } from 'lucide-react'
import { useLang } from '../../lib/i18n'
import { downloadTokensZip } from '../../lib/zipExporter'

export function TokenDownloadBar() {
  const { lang } = useLang()
  const [copiedPkg, setCopiedPkg] = useState(false)
  const [zipping, setZipping] = useState(false)

  const handleDownloadZip = async () => {
    setZipping(true)
    try {
      await downloadTokensZip()
    } finally {
      setTimeout(() => setZipping(false), 1500)
    }
  }

  const copyNpm = async () => {
    await navigator.clipboard.writeText('npm i @kai/relux-css')
    setCopiedPkg(true)
    setTimeout(() => setCopiedPkg(false), 2000)
  }

  return (
    <div className="my-6 rounded-lg border border-border bg-muted/40 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {lang === 'en' ? 'Export & Download Tokens' : 'Ekspor & Unduh Token'}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {lang === 'en'
              ? 'Synchronized canonical tokens ready for frontend development in CSS and W3C format.'
              : 'Token kanonikal tersinkronisasi siap pakai untuk pengembangan frontend dalam format CSS dan W3C.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/tokens.css"
            download="relux-tokens.css"
            className="relux-focus inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-xs font-semibold text-foreground shadow-xs hover:border-primary transition-colors"
          >
            <FileCode className="size-3.5 text-primary" aria-hidden="true" />
            <span>tokens.css</span>
            <Download className="size-3 text-muted-foreground" aria-hidden="true" />
          </a>

          <a
            href="/tokens.json"
            download="relux-tokens.json"
            className="relux-focus inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-xs font-semibold text-foreground shadow-xs hover:border-primary transition-colors"
          >
            <FileJson className="size-3.5 text-accent" aria-hidden="true" />
            <span>tokens.json (W3C)</span>
            <Download className="size-3 text-muted-foreground" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={handleDownloadZip}
            className="relux-focus inline-flex h-8 items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-3 text-xs font-semibold text-primary shadow-xs hover:bg-primary/20 transition-colors"
            title={lang === 'en' ? 'Download tokens archive (.zip)' : 'Unduh paket token (.zip)'}
          >
            <Download className="size-3.5" aria-hidden="true" />
            <span>{zipping ? (lang === 'en' ? 'Zipping...' : 'Mengompres...') : 'All Tokens (Zip)'}</span>
          </button>

          <button
            type="button"
            onClick={copyNpm}
            className="relux-focus inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors"
            title="npm i @kai/relux-css"
          >
            <span>{copiedPkg ? (lang === 'en' ? 'Copied!' : 'Tersalin!') : 'npm i @kai/relux-css'}</span>
            {copiedPkg ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
          </button>
        </div>
      </div>
    </div>
  )
}

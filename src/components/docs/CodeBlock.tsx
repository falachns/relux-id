import { useState } from 'react'
import { useLang } from '../../lib/i18n'
import { Check, Copy } from 'lucide-react'

export type CodeBlockProps = {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, language, className = '' }: CodeBlockProps) {
  const { lang } = useLang()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div
      className={
        'group relative overflow-hidden rounded-xl border border-border relux-code-surface shadow-xs ' +
        className
      }
    >
      <div className="flex items-center justify-between border-b border-background/10 px-4 py-2 bg-background/5">
        <span className="font-mono text-xs uppercase tracking-widest text-background/60">
          {language ?? 'code'}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-background/80 transition-all hover:bg-background/15 hover:text-background active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50"
        >
          {copied ? (
            <>
              <Check className="size-3 text-success" aria-hidden="true" />
              <span className="text-success">{lang === 'en' ? 'Copied' : 'Tersalin'}</span>
            </>
          ) : (
            <>
              <Copy className="size-3" aria-hidden="true" />
              <span>{lang === 'en' ? 'Copy' : 'Salin'}</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-xs sm:text-sm leading-relaxed text-background">
          {code}
        </code>
      </pre>
    </div>
  )
}

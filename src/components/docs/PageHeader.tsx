import { useState, type ReactNode } from 'react'
import { StatusBadge, type Status } from './StatusBadge'
import { Check, Copy } from 'lucide-react'

export type PageHeaderProps = {
  category?: string
  title: string
  description?: string
  status?: Status
  badge?: ReactNode
  version?: string
  packageName?: string
  figmaUrl?: string
  githubUrl?: string
  children?: ReactNode
  className?: string
}

export function PageHeader({
  category,
  title,
  description,
  status,
  badge,
  packageName,
  children,
  className = '',
}: PageHeaderProps) {
  const [copiedPkg, setCopiedPkg] = useState(false)

  const handleCopyPkg = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedPkg(true)
      setTimeout(() => setCopiedPkg(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <header className={`mb-10 border-b border-border/80 pb-8 ${className}`}>
      {category && (
        <p className="mb-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
          {category}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="display-md-bold text-foreground text-balance">
          {title}
        </h1>
        <div className="inline-flex items-center gap-2">
          {status && <StatusBadge status={status} />}
          {badge}
        </div>
      </div>

      {description && (
        <p className="mt-3.5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      )}

      {packageName && (
        <div className="mt-5 flex flex-wrap items-center gap-2 pt-1 text-xs">
          <button
            type="button"
            onClick={() => handleCopyPkg(packageName)}
            title={`Salin nama package: ${packageName}`}
            className="relux-focus inline-flex h-7 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 font-mono text-xs font-medium text-foreground hover:bg-muted hover:border-primary/40 transition-colors active:scale-[0.98] shadow-xs"
          >
            <span>{packageName}</span>
            {copiedPkg ? (
              <Check className="size-3 text-success" aria-hidden="true" />
            ) : (
              <Copy className="size-3 text-muted-foreground" aria-hidden="true" />
            )}
          </button>
        </div>
      )}

      {children}
    </header>
  )
}

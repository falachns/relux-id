import type { ReactNode } from 'react'
import { Check, X } from 'lucide-react'

export type GuidelineTone = 'do' | 'dont'

export type GuidelineCardProps = {
  tone: GuidelineTone
  title: string
  items?: string[]
  children?: ReactNode
  className?: string
}

export function GuidelineCard({
  tone,
  title,
  items,
  children,
  className = '',
}: GuidelineCardProps) {
  const isDo = tone === 'do'

  return (
    <div
      className={
        `rounded-xl border p-5 sm:p-6 shadow-xs transition-shadow hover:shadow-sm ${
          isDo
            ? 'border-success/35 bg-card ring-1 ring-success/10'
            : 'border-destructive/35 bg-card ring-1 ring-destructive/10'
        } ${className}`
      }
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className={
            'flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ' +
            (isDo
              ? 'bg-success-soft text-success border border-success/30'
              : 'bg-danger-soft text-destructive border border-destructive/30')
          }
          aria-hidden="true"
        >
          {isDo ? <Check className="size-3.5 stroke-[2.5]" /> : <X className="size-3.5 stroke-[2.5]" />}
        </span>
        <h3 className="text-sm font-semibold text-foreground">
          {title}
        </h3>
      </div>
      {items && items.length > 0 && (
        <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span
                className={`mt-1 flex size-4 shrink-0 items-center justify-center rounded-full ${
                  isDo ? 'text-success bg-success-soft/60' : 'text-destructive bg-danger-soft/60'
                }`}
                aria-hidden="true"
              >
                {isDo ? <Check className="size-2.5 stroke-[2.5]" /> : <X className="size-2.5 stroke-[2.5]" />}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  )
}

import { useEffect, useRef, type ReactNode } from 'react'
import clsx from 'clsx'
import { X } from 'lucide-react'

export type SlideOverProps = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  className?: string
}

export function SlideOver({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: SlideOverProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      previousFocus.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => panelRef.current?.focus())
    } else {
      document.body.style.overflow = ''
      previousFocus.current?.focus()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-foreground/40 backdrop-blur-xs transition-opacity"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={clsx(
          'relative z-10 flex h-full w-full max-w-md flex-col border-s border-border bg-popover text-popover-foreground shadow-2xl focus:outline-none',
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            {title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <button
            type="button"
            aria-label="Close panel"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  )
}

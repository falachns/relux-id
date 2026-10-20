import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'
import { X } from 'lucide-react'

export type DialogProps = {
  open: boolean
  onClose: () => void
  role?: 'dialog' | 'alertdialog'
  title?: ReactNode
  description?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children?: ReactNode
  className?: string
}

const SIZE_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

export function Dialog({
  open,
  onClose,
  role = 'dialog',
  title,
  description,
  size = 'md',
  children,
  className,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const id = useId()
  const titleId = `${id}-title`
  const descId = `${id}-desc`

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return

    if (open) {
      previousFocus.current = document.activeElement as HTMLElement
      if (!el.open) {
        el.showModal()
      }
    } else {
      if (el.open) {
        el.close()
      }
      previousFocus.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return

    const handleCancel = (e: Event) => {
      e.preventDefault()
      onClose()
    }

    el.addEventListener('cancel', handleCancel)
    return () => el.removeEventListener('cancel', handleCancel)
  }, [onClose])

  return (
    <dialog
      ref={dialogRef}
      role={role}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      className={clsx(
        'm-auto w-[min(92vw,36rem)] overflow-hidden rounded-2xl border border-border bg-popover p-0 text-popover-foreground shadow-2xl backdrop:bg-foreground/40 backdrop:backdrop-blur-xs',
        SIZE_CLASSES[size],
        className,
      )}
    >
      <div className="flex flex-col">
        {(Boolean(title) || Boolean(onClose)) && (
          <div className="flex items-start justify-between gap-4 border-b border-border p-5">
            <div>
              {title && (
                <h2 id={titleId} className="text-lg font-semibold text-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              aria-label="Close dialog"
              onClick={onClose}
              className="grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </dialog>
  )
}

export function DialogFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        '-mx-5 -mb-5 mt-5 flex items-center justify-end gap-3 border-t border-border bg-muted/30 p-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Dialog.Footer = DialogFooter

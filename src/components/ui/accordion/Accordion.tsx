import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from 'react'
import clsx from 'clsx'

type AccordionContextValue = {
  isOpen: (value: string) => boolean
  toggle: (value: string) => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const ctx = useContext(AccordionContext)
  if (!ctx) throw new Error('Accordion.Item must be used within <Accordion>')
  return ctx
}

export type AccordionProps = {
  /** Allow multiple items open at once. */
  type?: 'single' | 'multiple'
  /** Uncontrolled default open value(s). */
  defaultValue?: string | string[]
  className?: string
  children: ReactNode
}

export function Accordion({
  type = 'single',
  defaultValue,
  className = '',
  children,
}: AccordionProps) {
  const [open, setOpen] = useState<string[]>(() => {
    if (defaultValue == null) return []
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  })

  const isOpen = (value: string) => open.includes(value)

  const toggle = (value: string) => {
    setOpen((prev) => {
      const already = prev.includes(value)
      if (type === 'single') return already ? [] : [value]
      return already ? prev.filter((v) => v !== value) : [...prev, value]
    })
  }

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div
        data-slot="accordion"
        className={clsx(
          'relux-accordion divide-y divide-border bg-card shadow-xs',
          className,
        )}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export type AccordionItemProps = {
  value: string
  title: ReactNode
  children: ReactNode
  className?: string
}

export function AccordionItem({
  value,
  title,
  children,
  className,
}: AccordionItemProps) {
  const { isOpen, toggle } = useAccordion()
  const open = isOpen(value)
  const id = useId()
  const panelId = `${id}-panel`
  const triggerId = `${id}-trigger`

  return (
    <div
      data-slot="accordion-item"
      className={clsx('relux-accordion__item', className)}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={triggerId}
          data-slot="accordion-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => toggle(value)}
          className="relux-accordion__trigger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          <span>{title}</span>
          <svg
            data-slot="accordion-icon"
            viewBox="0 0 20 20"
            aria-hidden="true"
            className={clsx(
              'size-4 shrink-0 text-muted-foreground transition-transform duration-300',
              open ? 'rotate-180' : 'rotate-0',
            )}
          >
            <path
              d="M5 7.5 10 12.5 15 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        data-slot="accordion-panel"
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="relux-accordion__panel text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

Accordion.Item = AccordionItem

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import clsx from 'clsx'

export type TabItem = {
  id?: string
  label: ReactNode
  content: ReactNode
  disabled?: boolean
}

export type TabsVariant = 'underline' | 'pill'

export type TabsProps = {
  items: TabItem[]
  variant?: TabsVariant
  defaultValue?: number
  value?: number
  onValueChange?: (index: number) => void
  ariaLabel?: string
  className?: string
}

export function Tabs({
  items,
  variant = 'underline',
  defaultValue = 0,
  value: controlledValue,
  onValueChange,
  ariaLabel = 'Navigation tabs',
  className,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const activeIndex = isControlled ? controlledValue : internalValue

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const uid = useId()

  const handleSelect = (index: number) => {
    if (items[index]?.disabled) return
    if (!isControlled) {
      setInternalValue(index)
    }
    onValueChange?.(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const total = items.length
    let nextIndex = -1

    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % total
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + total) % total
    } else if (e.key === 'Home') {
      nextIndex = 0
    } else if (e.key === 'End') {
      nextIndex = total - 1
    }

    if (nextIndex >= 0) {
      e.preventDefault()
      while (items[nextIndex]?.disabled && nextIndex !== currentIndex) {
        nextIndex = e.key === 'ArrowLeft'
          ? (nextIndex - 1 + total) % total
          : (nextIndex + 1) % total
      }
      handleSelect(nextIndex)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  const tabId = (i: number) => `${uid}-tab-${i}`
  const panelId = (i: number) => `${uid}-panel-${i}`

  return (
    <div className={clsx('w-full', className)}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={clsx(
          variant === 'pill'
            ? 'inline-flex flex-wrap gap-1 rounded-xl border border-border bg-secondary p-1'
            : 'relative flex gap-6 border-b border-border',
        )}
      >
        {items.map((tab, i) => {
          const isSelected = i === activeIndex
          return (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={tabId(i)}
              aria-selected={isSelected}
              aria-controls={panelId(i)}
              tabIndex={isSelected ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => handleSelect(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={clsx(
                'text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                variant === 'pill'
                  ? clsx(
                      'rounded-lg px-3.5 py-1.5',
                      isSelected
                        ? 'bg-card text-primary shadow-xs font-semibold'
                        : 'text-muted-foreground hover:text-foreground',
                    )
                  : clsx(
                      'relative z-10 -mb-px border-b-2 py-3 px-1 transition-colors',
                      isSelected
                        ? 'border-primary text-primary font-semibold'
                        : 'border-transparent text-muted-foreground hover:border-border/60 hover:text-foreground',
                    ),
                tab.disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {items.map((tab, i) => (
        <div
          key={i}
          role="tabpanel"
          id={panelId(i)}
          aria-labelledby={tabId(i)}
          hidden={i !== activeIndex}
          tabIndex={0}
          className="mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
        >
          {i === activeIndex && tab.content}
        </div>
      ))}
    </div>
  )
}

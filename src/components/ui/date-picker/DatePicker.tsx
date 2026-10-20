import { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

export type DatePickerProps = {
  mode?: 'single' | 'range'
  value?: Date | { from?: Date; to?: Date }
  onChange?: (val: Date | { from?: Date; to?: Date } | undefined) => void
  placeholder?: string
  minDate?: Date
  className?: string
}

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

const DAY_LABELS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

export function DatePicker({
  mode = 'single',
  value,
  onChange,
  placeholder = 'Pilih tanggal perjalanan...',
  minDate,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date())
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1))

  const handleSelectDay = (day: number) => {
    const selected = new Date(year, month, day)

    if (mode === 'single') {
      onChange?.(selected)
      setIsOpen(false)
    } else {
      const range = (value as { from?: Date; to?: Date }) || {}
      if (!range.from || (range.from && range.to)) {
        onChange?.({ from: selected, to: undefined })
      } else {
        if (selected < range.from) {
          onChange?.({ from: selected, to: range.from })
        } else {
          onChange?.({ from: range.from, to: selected })
        }
        setIsOpen(false)
      }
    }
  }

  const formatDateDisplay = () => {
    if (!value) return placeholder
    if (mode === 'single' && value instanceof Date) {
      return `${value.getDate()} ${MONTH_NAMES[value.getMonth()]} ${value.getFullYear()}`
    }
    if (mode === 'range') {
      const range = value as { from?: Date; to?: Date }
      if (range.from && range.to) {
        return `${range.from.getDate()} ${MONTH_NAMES[range.from.getMonth()]} - ${range.to.getDate()} ${MONTH_NAMES[range.to.getMonth()]} ${range.to.getFullYear()}`
      }
      if (range.from) {
        return `Mulai: ${range.from.getDate()} ${MONTH_NAMES[range.from.getMonth()]} ${range.from.getFullYear()}`
      }
    }
    return placeholder
  }

  const isSelected = (day: number) => {
    const target = new Date(year, month, day)
    if (mode === 'single' && value instanceof Date) {
      return target.toDateString() === value.toDateString()
    }
    if (mode === 'range') {
      const range = value as { from?: Date; to?: Date }
      if (range?.from && target.toDateString() === range.from.toDateString()) return true
      if (range?.to && target.toDateString() === range.to.toDateString()) return true
    }
    return false
  }

  const isInRange = (day: number) => {
    if (mode !== 'range' || !value) return false
    const range = value as { from?: Date; to?: Date }
    if (!range.from || !range.to) return false
    const target = new Date(year, month, day)
    return target > range.from && target < range.to
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    )
  }

  return (
    <div ref={containerRef} className={clsx('relux-datepicker', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="relux-datepicker__trigger relux-focus"
      >
        <span className={clsx(!value && 'text-muted-foreground')}>
          {formatDateDisplay()}
        </span>
        <Calendar className="size-4 text-muted-foreground" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Kalender Pemilihan Tanggal"
          className="relux-datepicker__calendar absolute left-0 top-full z-50 mt-2"
        >
          <div className="relux-datepicker__header">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Bulan sebelumnya"
              className="rounded p-1 hover:bg-muted"
            >
              <ChevronLeft className="size-4" />
            </button>

            <span className="text-sm font-semibold text-foreground">
              {MONTH_NAMES[month]} {year}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              aria-label="Bulan berikutnya"
              className="rounded p-1 hover:bg-muted"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground">
            {DAY_LABELS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="relux-datepicker__grid">
            {Array.from({ length: firstDay }).map((_, i) => (
              <span key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const selected = isSelected(day)
              const inRange = isInRange(day)
              const today = isToday(day)

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={clsx(
                    'relux-datepicker__day',
                    selected && 'relux-datepicker__day--selected',
                    inRange && 'relux-datepicker__day--range',
                    today && 'relux-datepicker__day--today',
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

import { useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { ArrowLeftRight } from 'lucide-react'
import { Button } from '../button'

export type SearchBookWidgetProps = {
  defaultOrigin?: string
  defaultDestination?: string
  defaultDate?: string
  defaultPassengers?: string
  onSearch?: (data: {
    origin: string
    destination: string
    date: string
    passengers: string
  }) => void
  submitLabel?: string
  swapAriaLabel?: string
  className?: string
}

export function SearchBookWidget({
  defaultOrigin = 'Gambir (GMR)',
  defaultDestination = 'Surabaya Pasarturi (SBI)',
  defaultDate,
  defaultPassengers = '1',
  onSearch,
  submitLabel = 'Cari tiket',
  swapAriaLabel = 'Tukar stasiun asal dan tujuan',
  className,
}: SearchBookWidgetProps) {
  const [origin, setOrigin] = useState(defaultOrigin)
  const [destination, setDestination] = useState(defaultDestination)
  const [date, setDate] = useState(defaultDate ?? '')
  const [passengers, setPassengers] = useState(defaultPassengers)

  const handleSwap = () => {
    setOrigin(destination)
    setDestination(origin)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch?.({ origin, destination, date, passengers })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'relux-card p-5 shadow-sm space-y-4',
        className,
      )}
      aria-label="Cari tiket kereta"
    >
      <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="widget-origin"
            className="text-sm font-semibold text-foreground"
          >
            Stasiun asal
          </label>
          <input
            id="widget-origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="relux-field"
          />
        </div>

        <button
          type="button"
          aria-label={swapAriaLabel}
          onClick={handleSwap}
          className="grid size-10 place-items-center justify-self-center rounded-full border border-border bg-card text-primary hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeftRight aria-hidden="true" className="size-4" />
        </button>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="widget-destination"
            className="text-sm font-semibold text-foreground"
          >
            Stasiun tujuan
          </label>
          <input
            id="widget-destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="relux-field"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="widget-date"
            className="text-sm font-semibold text-foreground"
          >
            Tanggal berangkat
          </label>
          <input
            id="widget-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="relux-field"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="widget-pax"
            className="text-sm font-semibold text-foreground"
          >
            Penumpang
          </label>
          <select
            id="widget-pax"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="relux-field"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={String(n)}>
                {n} dewasa
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}

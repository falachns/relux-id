import { useState, useMemo, type CSSProperties } from 'react'
import { Copy, Check } from 'lucide-react'

export type TokenSwatchProps = {
  name: string
  cssName: string
  value: string
  category?: string
  figmaName?: string
  className?: string
}

function parseColorToRgb(val: string): [number, number, number] | null {
  const clean = val.trim().toLowerCase()
  if (clean.startsWith('#')) {
    const h = clean.replace('#', '')
    if (h.length === 3) {
      return [
        parseInt(h[0] + h[0], 16),
        parseInt(h[1] + h[1], 16),
        parseInt(h[2] + h[2], 16),
      ]
    }
    if (h.length >= 6) {
      return [
        parseInt(h.substring(0, 2), 16),
        parseInt(h.substring(2, 4), 16),
        parseInt(h.substring(4, 6), 16),
      ]
    }
  }
  const rgbMatch = clean.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (rgbMatch) {
    return [parseInt(rgbMatch[1], 10), parseInt(rgbMatch[2], 10), parseInt(rgbMatch[3], 10)]
  }
  return null
}

function getLuminance(rgb: [number, number, number]): number {
  const sRGB = rgb.map((val) => {
    const v = val / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
}

function getContrast(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const l1 = getLuminance(rgb1)
  const l2 = getLuminance(rgb2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function TokenSwatch({
  name,
  cssName,
  value,
  category,
  figmaName,
  className = '',
}: TokenSwatchProps) {
  const [copied, setCopied] = useState(false)

  const contrastInfo = useMemo(() => {
    const rgb = parseColorToRgb(value)
    if (!rgb) return null
    const vsWhite = getContrast(rgb, [255, 255, 255])
    const vsDark = getContrast(rgb, [15, 23, 42])
    const maxRatio = Math.max(vsWhite, vsDark)
    const rating = maxRatio >= 7 ? 'AAA' : maxRatio >= 4.5 ? 'AA' : maxRatio >= 3 ? 'Large' : 'Fail'
    const bestOn = vsWhite >= vsDark ? 'White' : 'Dark'
    return {
      ratio: maxRatio.toFixed(1),
      rating,
      bestOn,
    }
  }, [value])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`var(${cssName})`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <article className={`relux-card overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-shadow hover:shadow-sm ${className}`}>
      <div
        className="relux-token-swatch relative h-20 sm:h-24 border-b border-border p-2.5 flex items-start justify-between"
        style={
          {
            '--swatch-value': `var(${cssName})`,
          } as CSSProperties
        }
        aria-hidden="true"
      >
        {category && (
          <span className="rounded-md bg-background/80 backdrop-blur px-1.5 py-0.5 font-mono text-xs leading-none font-medium text-foreground border border-border/50">
            {category}
          </span>
        )}
        {contrastInfo && (
          <span
            title={`Max contrast ratio ${contrastInfo.ratio}:1 vs ${contrastInfo.bestOn} text (${contrastInfo.rating})`}
            className="ms-auto rounded-md bg-background/85 backdrop-blur px-2 py-0.5 font-mono text-xs leading-none font-semibold text-foreground border border-border/50 shadow-xs"
          >
            {contrastInfo.rating} {contrastInfo.ratio}:1
          </span>
        )}
      </div>

      <div className="space-y-2 p-3.5 sm:p-4">
        <div>
          <code className="block truncate font-mono text-xs font-semibold text-foreground/90" title={name}>
            {figmaName || name}
          </code>
          <code className="block truncate font-mono text-xs text-primary" title={`var(${cssName})`}>
            var({cssName})
          </code>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/60">
          <span className="truncate font-mono text-xs text-muted-foreground" title={value}>
            {value}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={`Copy CSS variable for ${name}`}
            className="relux-focus inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-border/70 bg-muted/40 px-2 text-xs font-medium text-foreground hover:bg-muted active:scale-[0.98] transition-all"
          >
            {copied ? (
              <>
                <Check aria-hidden="true" className="size-3 text-success" />
                <span className="text-success font-semibold">Tersalin</span>
              </>
            ) : (
              <>
                <Copy aria-hidden="true" className="size-3 text-muted-foreground" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

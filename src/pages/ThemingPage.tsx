import { useState, useMemo } from 'react'
import { PageHeader } from '../components/docs/PageHeader'
import { StatusBadge } from '../components/docs/StatusBadge'
import { useLang } from '../lib/i18n'
import {
  Download,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react'

type BrandPreset = {
  name: string
  nameEn: string
  hex: string
  desc: string
}

const PRESETS: BrandPreset[] = [
  {
    name: 'KAI Corporate Blue',
    nameEn: 'KAI Corporate Blue',
    hex: '#0D47A1',
    desc: 'Warna identitas resmi sarana & korporat PT Kereta Api Indonesia (Persero).',
  },
  {
    name: 'KAI Commuter',
    nameEn: 'KAI Commuter Red',
    hex: '#DC2626',
    desc: 'Warna layanan kereta rel listrik komuter Jabodetabek dan Yogyakarta.',
  },
  {
    name: 'KAI Bandara (Raillink)',
    nameEn: 'KAI Airport Raillink Orange',
    hex: '#EA580C',
    desc: 'Layanan kereta ekspres bandara Soekarno-Hatta, Kualanamu, dan YIA.',
  },
  {
    name: 'KAI Wisata',
    nameEn: 'KAI Tourism Green',
    hex: '#059669',
    desc: 'Layanan kereta wisata panorama, imperial, dan carter eksklusif.',
  },
  {
    name: 'KAI Logistik',
    nameEn: 'KAI Logistics Purple',
    hex: '#7C3AED',
    desc: 'Layanan angkutan kargo, parcel, dan peti kemas terpadu KA.',
  },
]

// Color utility functions
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16) || 0
  const g = parseInt(clean.substring(2, 4), 16) || 0
  const b = parseInt(clean.substring(4, 6), 16) || 0
  return [r, g, b]
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)))
  const toHex = (n: number) => clamp(n).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

function mix(colorA: [number, number, number], colorB: [number, number, number], weight: number): string {
  const w = Math.max(0, Math.min(1, weight))
  const r = colorA[0] * (1 - w) + colorB[0] * w
  const g = colorA[1] * (1 - w) + colorB[1] * w
  const b = colorA[2] * (1 - w) + colorB[2] * w
  return rgbToHex(r, g, b)
}

function getLuminance(rgb: [number, number, number]): number {
  const sRGB = rgb.map((val) => {
    const v = val / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
}

function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const l1 = getLuminance(rgb1)
  const l2 = getLuminance(rgb2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function ThemingPage() {
  const { lang } = useLang()
  const isEn = lang === 'en'

  const [activeHex, setActiveHex] = useState('#0D47A1')
  const [copiedCode, setCopiedCode] = useState(false)

  // Generate 50-950 scale
  const palette = useMemo(() => {
    const baseRgb = hexToRgb(activeHex)
    const white: [number, number, number] = [255, 255, 255]
    const black: [number, number, number] = [17, 24, 39] // gray-900

    return {
      25: mix(white, baseRgb, 0.08),
      50: mix(white, baseRgb, 0.15),
      100: mix(white, baseRgb, 0.3),
      200: mix(white, baseRgb, 0.45),
      300: mix(white, baseRgb, 0.65),
      400: mix(white, baseRgb, 0.85),
      500: activeHex.toUpperCase(),
      600: mix(baseRgb, black, 0.2),
      700: mix(baseRgb, black, 0.4),
      800: mix(baseRgb, black, 0.6),
      900: mix(baseRgb, black, 0.75),
      950: mix(baseRgb, black, 0.88),
    }
  }, [activeHex])

  // Contrast calculations for base color (500)
  const contrastAgainstWhite = useMemo(() => {
    const baseRgb = hexToRgb(activeHex)
    return getContrastRatio(baseRgb, [255, 255, 255])
  }, [activeHex])

  const contrastAgainstDark = useMemo(() => {
    const baseRgb = hexToRgb(activeHex)
    return getContrastRatio(baseRgb, [17, 24, 39])
  }, [activeHex])

  const generatedCss = useMemo(() => {
    return `/* RelUX Design System — Custom Brand Theme
 * Generated dynamically for: ${activeHex}
 * PT Kereta Api Indonesia (Persero)
 */

:root {
  --colors/kai/primary/25: ${palette[25]};
  --colors/kai/primary/50: ${palette[50]};
  --colors/kai/primary/100: ${palette[100]};
  --colors/kai/primary/200: ${palette[200]};
  --colors/kai/primary/300: ${palette[300]};
  --colors/kai/primary/400: ${palette[400]};
  --colors/kai/primary/500: ${palette[500]};
  --colors/kai/primary/600: ${palette[600]};
  --colors/kai/primary/700: ${palette[700]};
  --colors/kai/primary/800: ${palette[800]};
  --colors/kai/primary/900: ${palette[900]};
  --colors/kai/primary/950: ${palette[950]};

  /* Semantic Brand Overrides */
  --primary: ${palette[500]};
  --primary-foreground: ${contrastAgainstWhite >= 4.5 ? '#ffffff' : '#111827'};
  --ring: ${palette[500]};
}
`
  }, [activeHex, palette, contrastAgainstWhite])

  const copyCss = async () => {
    await navigator.clipboard.writeText(generatedCss)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const downloadCss = () => {
    const blob = new Blob([generatedCss], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'relux-theme.css'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <article className="space-y-8">
      <PageHeader
        title={isEn ? 'Theming Engine & Contrast' : 'Theming Engine & Validasi Kontras'}
        description={
          isEn
            ? 'PRD §5.7: Generate full 50–950 tonal palettes for KAI sub-brands or custom projects with real-time WCAG 2.1 AA/AAA contrast validation.'
            : 'PRD §5.7: Bangkitkan skala tonal 50–950 lengkap untuk sub-brand KAI atau tema kustom, dilengkapi validasi kontras aksesibilitas WCAG 2.1 secara real-time.'
        }
      >
        <StatusBadge status="stable" />
      </PageHeader>

      {/* Preset Selector */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-foreground">
          {isEn ? 'KAI Brand Presets' : 'Pilihan Preset Sub-Brand KAI'}
        </h2>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {PRESETS.map((p) => {
            const isSelected = activeHex.toLowerCase() === p.hex.toLowerCase()
            return (
              <button
                key={p.hex}
                type="button"
                onClick={() => setActiveHex(p.hex)}
                className={`flex flex-col text-left p-3.5 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-xs'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">
                    {isEn ? p.nameEn : p.name}
                  </span>
                  <span
                    className="size-5 rounded-full border border-border shadow-2xs"
                    style={{ backgroundColor: p.hex }}
                  />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {p.desc}
                </p>
                <span className="mt-2 font-mono text-xs text-primary font-semibold">
                  {p.hex}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Custom Color Input & Contrast Validation */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Custom Input */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">
              {isEn ? 'Custom Brand Color' : 'Warna Brand Kustom'}
            </h3>
            <button
              type="button"
              onClick={() => setActiveHex('#0D47A1')}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3" />
              <span>Reset Default</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={activeHex}
              onChange={(e) => setActiveHex(e.target.value)}
              className="size-12 rounded-lg border border-border cursor-pointer p-0.5 bg-card"
            />
            <div className="flex-1">
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Hex Code
              </label>
              <input
                type="text"
                value={activeHex}
                onChange={(e) => setActiveHex(e.target.value)}
                className="relux-input w-full font-mono text-xs uppercase"
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            {isEn
              ? 'Enter any HEX color code to automatically interpolate shades from 25 to 950.'
              : 'Masukkan kode warna HEX apa pun untuk menginterpolasi saturasi dan luminansi dari 25 hingga 950.'}
          </p>
        </div>

        {/* Contrast Validation Box */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-foreground">
            {isEn ? 'WCAG 2.1 Contrast Validator' : 'Validasi Kontras Aksesibilitas WCAG 2.1'}
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {/* Against White */}
            <div className="rounded-lg border border-border p-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Vs. White (#FFF)</span>
                <span className="font-mono">{contrastAgainstWhite.toFixed(2)}:1</span>
              </div>
              <div className="flex items-center gap-1.5">
                {contrastAgainstWhite >= 7 ? (
                  <span className="inline-flex items-center gap-1 rounded bg-success/15 px-2 py-0.5 text-xs font-bold leading-none text-success">
                    <ShieldCheck className="size-3" /> AAA Pass
                  </span>
                ) : contrastAgainstWhite >= 4.5 ? (
                  <span className="inline-flex items-center gap-1 rounded bg-primary/15 px-2 py-0.5 text-xs font-bold leading-none text-primary">
                    <ShieldCheck className="size-3" /> AA Pass
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded bg-danger/15 px-2 py-0.5 text-xs font-bold leading-none text-danger">
                    <AlertTriangle className="size-3" /> Fail (&lt;4.5:1)
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Teks putih di atas background tombol brand.
              </p>
            </div>

            {/* Against Dark */}
            <div className="rounded-lg border border-border p-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Vs. Dark (#111)</span>
                <span className="font-mono">{contrastAgainstDark.toFixed(2)}:1</span>
              </div>
              <div className="flex items-center gap-1.5">
                {contrastAgainstDark >= 7 ? (
                  <span className="inline-flex items-center gap-1 rounded bg-success/15 px-2 py-0.5 text-xs font-bold leading-none text-success">
                    <ShieldCheck className="size-3" /> AAA Pass
                  </span>
                ) : contrastAgainstDark >= 4.5 ? (
                  <span className="inline-flex items-center gap-1 rounded bg-primary/15 px-2 py-0.5 text-xs font-bold leading-none text-primary">
                    <ShieldCheck className="size-3" /> AA Pass
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded bg-danger/15 px-2 py-0.5 text-xs font-bold leading-none text-danger">
                    <AlertTriangle className="size-3" /> Fail (&lt;4.5:1)
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Teks brand di atas background terang.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Palette Scale 25-950 */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-foreground">
          {isEn ? 'Generated Palette (25–950)' : 'Skala Palet Hasil Interpolasi (25–950)'}
        </h3>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
          {Object.entries(palette).map(([step, color]) => {
            const isBase = step === '500'
            return (
              <div
                key={step}
                className={`flex flex-col items-center rounded-lg border p-2 text-center transition-transform hover:scale-105 ${
                  isBase ? 'border-primary ring-2 ring-primary/30' : 'border-border'
                }`}
              >
                <div
                  className="size-8 w-full rounded-md shadow-2xs mb-1.5"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs font-bold text-foreground">{step}</span>
                <span className="font-mono text-xs leading-none text-muted-foreground uppercase">{color}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Live Component Previews */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <h3 className="text-sm font-bold text-foreground">
            {isEn ? 'Live Component Previews' : 'Pratinjau Komponen Langsung'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-4 rounded-lg border border-border bg-muted/20">
          <button
            type="button"
            className="rounded-md px-4 py-2 text-xs font-semibold shadow-xs transition-colors"
            style={{
              backgroundColor: palette[500],
              color: contrastAgainstWhite >= 4.5 ? '#ffffff' : '#111827',
            }}
          >
            Tombol Utama
          </button>

          <button
            type="button"
            className="rounded-md border px-4 py-2 text-xs font-semibold bg-transparent transition-colors"
            style={{
              borderColor: palette[500],
              color: palette[500],
            }}
          >
            Tombol Garis Tepi
          </button>

          <span
            className="rounded-full px-3 py-1 text-xs font-semibold shadow-2xs"
            style={{
              backgroundColor: palette[100],
              color: palette[800],
            }}
          >
            Badge Sub-brand
          </span>
        </div>
      </div>

      {/* Export & Download theme.css */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">
              {isEn ? 'Export theme.css' : 'Ekspor & Unduh theme.css'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isEn
                ? 'Integrate these variables directly into your Laravel, React, or Angular stylesheet.'
                : 'Salin atau unduh variabel CSS ini untuk diintegrasikan langsung pada proyek Anda.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyCss}
              className="relux-button relux-button--secondary text-xs flex items-center gap-1.5"
            >
              {copiedCode ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
              <span>{copiedCode ? 'Tersalin!' : 'Copy CSS'}</span>
            </button>

            <button
              type="button"
              onClick={downloadCss}
              className="relux-button relux-button--primary text-xs flex items-center gap-1.5"
            >
              <Download className="size-3.5" />
              <span>Download theme.css</span>
            </button>
          </div>
        </div>

        <pre className="max-h-60 overflow-y-auto rounded-lg border border-border bg-muted/60 p-3 font-mono text-xs text-foreground">
          <code>{generatedCss}</code>
        </pre>
      </div>
    </article>
  )
}

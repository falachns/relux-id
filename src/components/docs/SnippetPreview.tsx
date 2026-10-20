import { useMemo, useState } from 'react'
import componentsCss from '../../styles/components.css?raw'
import vendorCss from '../../../vendor/design-system-kai-v1/dist/style.css?raw'
import { Grid, Monitor, Moon, RotateCw, Smartphone, Sun, Tablet } from 'lucide-react'

export type SnippetPreviewProps = {
  html: string
  css: string
  javascript?: string
  title?: string
  minHeight?: number
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile'
type CanvasBg = 'neutral' | 'grid' | 'dark'

export function SnippetPreview({
  html,
  css,
  javascript,
  title = 'Snippet Preview',
  minHeight = 180,
}: SnippetPreviewProps) {
  const [reloadKey, setReloadKey] = useState(0)
  const [viewport, setViewport] = useState<ViewportMode>('desktop')
  const [canvasBg, setCanvasBg] = useState<CanvasBg>('grid')

  const srcDoc = useMemo(() => {
    // Strip @import lines from local css to prevent 404s inside srcdoc iframe
    const cleanedCustomCss = css
      .split('\n')
      .filter((line) => !line.trim().startsWith('@import'))
      .join('\n')

    const bgStyles =
      canvasBg === 'dark'
        ? `background-color: var(--colors\\/kai\\/navy\\/pressed); color: var(--colors\\/foreground\\/fg-primary); color-scheme: dark;`
        : canvasBg === 'grid'
          ? `background-color: var(--card); background-image: radial-gradient(var(--border) 1px, transparent 1px); background-size: 16px 16px; color: var(--foreground);`
          : `background-color: var(--card); color: var(--foreground);`

    return `<!DOCTYPE html>
<html lang="id" class="${canvasBg === 'dark' ? 'dark' : ''}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    /* Vendor Make Kit v1 Tokens */
    ${vendorCss}

    /* RelUX Components System */
    ${componentsCss}

    /* Custom Example CSS */
    ${cleanedCustomCss}

    /* Iframe Shell Resets */
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      font-family: var(--font-sans, Inter, system-ui, -apple-system, sans-serif);
      margin: 0;
      padding: 1.5rem;
      ${bgStyles}
      font-size: var(--text-sm, 14px);
      line-height: var(--line-height-sm, 1.5);
      transition: background-color 0.2s ease, color 0.2s ease;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  </style>
</head>
<body>
  ${html}
  ${
    javascript
      ? `<script>
    document.addEventListener("DOMContentLoaded", function() {
      try {
        ${javascript}
      } catch (err) {
        console.error("Snippet JS error:", err);
      }
    });
    if (document.readyState === "complete" || document.readyState === "interactive") {
      try {
        ${javascript}
      } catch (err) {
        console.error("Snippet JS error:", err);
      }
    }
  </script>`
      : ''
  }
</body>
</html>`
  }, [html, css, javascript, canvasBg])

  const viewportWidthClass =
    viewport === 'mobile'
      ? 'max-w-[375px]'
      : viewport === 'tablet'
        ? 'max-w-[768px]'
        : 'w-full'

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      {/* Untitled UI-inspired control toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/40 px-3.5 py-2 text-xs font-medium text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-foreground/80">
            Preview Canvas
          </span>

          {/* Viewport switch controls */}
          <div
            role="group"
            aria-label="Viewport switcher"
            className="flex items-center rounded-md border border-border/70 bg-card p-0.5"
          >
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              aria-pressed={viewport === 'desktop'}
              title="Desktop view (100%)"
              className={`flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors ${
                viewport === 'desktop'
                  ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                  : 'hover:text-foreground'
              }`}
            >
              <Monitor className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">100%</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport('tablet')}
              aria-pressed={viewport === 'tablet'}
              title="Tablet view (768px)"
              className={`flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors ${
                viewport === 'tablet'
                  ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                  : 'hover:text-foreground'
              }`}
            >
              <Tablet className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">768px</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              aria-pressed={viewport === 'mobile'}
              title="Mobile view (375px)"
              className={`flex h-6 items-center gap-1 rounded px-2 text-xs transition-colors ${
                viewport === 'mobile'
                  ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                  : 'hover:text-foreground'
              }`}
            >
              <Smartphone className="size-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">375px</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Canvas Background mode controls */}
          <div
            role="group"
            aria-label="Canvas background mode"
            className="flex items-center rounded-md border border-border/70 bg-card p-0.5"
          >
            <button
              type="button"
              onClick={() => setCanvasBg('grid')}
              aria-pressed={canvasBg === 'grid'}
              title="Dot grid background"
              className={`flex size-6 items-center justify-center rounded transition-colors ${
                canvasBg === 'grid'
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'hover:text-foreground'
              }`}
            >
              <Grid className="size-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setCanvasBg('neutral')}
              aria-pressed={canvasBg === 'neutral'}
              title="Light neutral background"
              className={`flex size-6 items-center justify-center rounded transition-colors ${
                canvasBg === 'neutral'
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'hover:text-foreground'
              }`}
            >
              <Sun className="size-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setCanvasBg('dark')}
              aria-pressed={canvasBg === 'dark'}
              title="Dark contrast background"
              className={`flex size-6 items-center justify-center rounded transition-colors ${
                canvasBg === 'dark'
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'hover:text-foreground'
              }`}
            >
              <Moon className="size-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Reload button */}
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="relux-focus inline-flex h-6 items-center gap-1.5 rounded-md border border-border/70 bg-card px-2 text-xs font-medium hover:bg-muted hover:text-foreground transition-colors active:scale-[0.98]"
            title="Reload preview iframe"
          >
            <RotateCw aria-hidden="true" className="size-3" />
            <span className="hidden sm:inline">Reload</span>
          </button>
        </div>
      </div>

      {/* Centered preview surface frame */}
      <div
        style={canvasBg === 'dark' ? { backgroundColor: 'var(--colors\\/kai\\/navy\\/pressed)' } : undefined}
        className={`flex w-full justify-center p-3 sm:p-5 transition-colors ${
          canvasBg === 'dark'
            ? 'text-white'
            : canvasBg === 'grid'
              ? 'bg-card bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]'
              : 'bg-muted/30'
        }`}
      >
        <div
          className={`w-full transition-all duration-300 ${viewportWidthClass} ${
            viewport !== 'desktop'
              ? 'overflow-hidden rounded-lg border border-border/80 shadow-md ring-1 ring-border/20'
              : ''
          }`}
        >
          <iframe
            key={reloadKey}
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            title={title}
            style={{ minHeight }}
            className="w-full border-0 bg-transparent transition-all block"
          />
        </div>
      </div>
    </div>
  )
}

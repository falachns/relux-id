import { useEffect, useRef, useState } from 'react'
import { useLang } from '../../lib/i18n'

type TocEntry = { id: string; label: string; level: number }

// Debounce: scan once DOM settles after AnimatePresence swap (~300ms).
const SCAN_DELAY = 120

function useToc(dep: unknown): [TocEntry[], string] {
  const [entries, setEntries] = useState<TocEntry[]>([])
  const [activeId, setActiveId] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Clear stale entries immediately on page switch so the TOC doesn't show
    // the previous page's headings while the new page animates in.
    setEntries([])
    setActiveId('')
    observerRef.current?.disconnect()

    let timer = 0
    let signature = ''
    const scan = () => {
      // Selector: main section[id] > h2, and nested h3 inside sections
      const headings = Array.from(
        document.querySelectorAll<HTMLElement>('main section[id] > h2, main section[id] h3'),
      )
      const tocEntries: TocEntry[] = []
      headings.forEach((h, idx) => {
        const isH3 = h.tagName.toLowerCase() === 'h3'
        let id = ''
        if (isH3) {
          if (h.id) {
            id = h.id
          } else {
            const section = h.closest('section')
            id = `${section?.id || 'sec'}-sub-${idx}`
            h.id = id
          }
        } else {
          id = h.closest('section')?.id || ''
        }
        const text = h.textContent?.trim()
        if (id && text) {
          tocEntries.push({
            id,
            label: text,
            level: isH3 ? 3 : 2,
          })
        }
      })

      const sig = tocEntries.map((e) => e.id).join('|')
      if (sig === signature) return
      signature = sig
      setEntries(tocEntries)
      setActiveId(tocEntries[0]?.id ?? '')

      const obs = new IntersectionObserver(
        (ioEntries) => {
          const visible = ioEntries.filter((e) => e.isIntersecting)
          if (visible.length > 0) {
            setActiveId(visible[0].target.id)
          }
        },
        { rootMargin: '-64px 0px -60% 0px', threshold: 0 },
      )

      for (const { id } of tocEntries) {
        const el = document.getElementById(id)
        if (el) obs.observe(el)
      }
      observerRef.current?.disconnect()
      observerRef.current = obs
    }
    // Rescan whenever page content changes (animation, async render), debounced.
    const schedule = () => {
      clearTimeout(timer)
      timer = window.setTimeout(scan, SCAN_DELAY)
    }
    const main = document.querySelector('main')
    const mo = new MutationObserver(schedule)
    if (main) mo.observe(main, { childList: true, subtree: true })
    schedule()

    return () => {
      mo.disconnect()
      clearTimeout(timer)
      observerRef.current?.disconnect()
    }
  }, [dep])

  return [entries, activeId]
}

export function TableOfContents({ activePage }: { activePage: unknown }) {
  const { t, lang } = useLang()
  const [entries, activeId] = useToc(`${activePage}-${lang}`)

  if (entries.length === 0) return null

  return (
    <nav aria-label={t.toc} className="w-full">
      <div className="mb-3 flex items-center gap-2 ps-3 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
        <span>{t.tocTitle}</span>
      </div>
      <ul className="relative space-y-1.5 border-s border-border ps-0">
        {entries.map((entry) => {
          const isActive = entry.id === activeId
          const isSub = entry.level === 3
          return (
            <li key={entry.id} className="relative">
              {/* Active vertical accent bar on the left edge */}
              {isActive && (
                <span
                  className="absolute -start-px top-0.5 bottom-0.5 w-0.5 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
              <a
                href={`#${entry.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={
                  'block pe-2 py-0.5 leading-snug rounded-e-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ' +
                  (isSub ? 'ps-6 text-xs ' : 'ps-3 text-sm ') +
                  (isActive
                    ? 'font-medium text-primary bg-primary/5'
                    : isSub
                      ? 'text-slate-600 dark:text-slate-300 hover:text-primary hover:font-medium hover:bg-muted/40'
                      : 'text-slate-700 dark:text-slate-200 hover:text-primary hover:font-medium hover:bg-muted/40')
                }
              >
                {entry.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

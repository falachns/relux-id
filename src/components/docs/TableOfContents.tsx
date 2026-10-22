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
    // Clear stale entries immediately on page switch
    setEntries([])
    setActiveId('')
    observerRef.current?.disconnect()

    let timer = 0
    let signature = ''
    const scan = () => {
      // Flat H2 only: main section[id] > h2
      const headings = Array.from(
        document.querySelectorAll<HTMLElement>('main section[id] > h2'),
      )
      const tocEntries: TocEntry[] = []
      headings.forEach((h) => {
        const id = h.closest('section')?.id || h.id
        const text = h.textContent?.trim()
        if (id && text) {
          tocEntries.push({
            id,
            label: text,
            level: 2,
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
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
        <span>{t.tocTitle}</span>
      </div>
      <ul className="space-y-0.5">
        {entries.map((entry) => {
          const isActive = entry.id === activeId
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={
                  isActive
                    ? 'block py-1 text-[13px] text-primary font-semibold transition-colors leading-snug relative pl-2.5 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary'
                    : 'block py-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors leading-snug'
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

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
  const { lang } = useLang()
  const [entries, activeId] = useToc(`${activePage}-${lang}`)

  if (entries.length === 0) return null

  return (
    <nav aria-label={lang === 'id' ? 'Di halaman ini' : 'On this page'} className="space-y-3">
      <p className="text-sm font-semibold text-foreground tracking-tight">
        {lang === 'id' ? 'Di halaman ini' : 'On this page'}
      </p>
      <ul className="relative border-l border-border text-sm font-normal">
        {entries.map((heading) => {
          const isActive = activeId === heading.id
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`block py-1.5 pl-4 -ml-px text-sm transition-colors ${
                  isActive
                    ? 'border-l-2 border-primary text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:border-l-2 hover:border-border'
                }`}
              >
                {heading.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

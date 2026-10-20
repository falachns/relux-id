import { useMemo, useState, type CSSProperties } from 'react'
import { Copy, Search } from 'lucide-react'
import { KIT_TOKENS, KIT_VERSION } from '../generated/kit-catalog'
import { PageHeader } from '../components/docs/PageHeader'
import { TokenDownloadBar } from '../components/docs/TokenDownloadBar'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type Token = (typeof KIT_TOKENS)[number]

const COLOR_FAMILIES = new Set([
  'Alpha',
  'Chart',
  'Component aliases',
  'Core semantic',
  'KAI & sub-brand',
  'Semantic background',
  'Semantic border',
  'Semantic foreground',
  'Semantic text',
  'Sidebar',
  'Utility',
])

type PageCopy = {
  title: string
  category: string
  description: string
  catalogTitle: string
  tokenCountSuffix: string
  searchLabel: string
  searchPlaceholder: string
  familyGroupLabel: string
  allLabel: string
  copyVarLabel: string
  copiedLabel: string
}

const COPY = {
  id: {
    title: 'Warna',
    category: 'Fondasi',
    description: `Variabel warna kanonis yang dibuat langsung dari Make Kit ${KIT_VERSION}. Tidak ada palet yang diduplikasi di aplikasi dokumentasi.`,
    catalogTitle: 'Katalog token',
    tokenCountSuffix: 'token warna',
    searchLabel: 'Cari token',
    searchPlaceholder: 'Cari variabel atau nilai…',
    familyGroupLabel: 'Family token',
    allLabel: 'Semua',
    copyVarLabel: 'Salin variabel',
    copiedLabel: 'Tersalin!',
  },
  en: {
    title: 'Colors',
    category: 'Foundation',
    description: `Canonical color variables generated from Make Kit ${KIT_VERSION}. No palette is duplicated in the documentation app.`,
    catalogTitle: 'Token catalog',
    tokenCountSuffix: 'color tokens',
    searchLabel: 'Search tokens',
    searchPlaceholder: 'Search variable or value…',
    familyGroupLabel: 'Token family',
    allLabel: 'All',
    copyVarLabel: 'Copy variable',
    copiedLabel: 'Copied!',
  },
} satisfies Localized<PageCopy>

import { TokenSwatch } from '../components/docs/TokenSwatch'

export function ColorsPage({
  onNavigate,
}: {
  onNavigate?: (section: SectionId) => void
}) {
  const t = useLocalized(COPY)
  const [query, setQuery] = useState('')
  const [family, setFamily] = useState('All')

  const colorTokens = useMemo(
    () => KIT_TOKENS.filter((token) => COLOR_FAMILIES.has(token.family)),
    [],
  )

  const families = useMemo(
    () => ['All', ...new Set(colorTokens.map((token) => token.family))],
    [colorTokens],
  )

  const filtered = colorTokens.filter((token) => {
    const inFamily = family === 'All' || token.family === family
    const q = query.trim().toLowerCase()
    return (
      inFamily &&
      (!q ||
        token.name.toLowerCase().includes(q) ||
        token.value.toLowerCase().includes(q))
    )
  })

  const grouped = filtered.reduce<Record<string, Token[]>>((groups, token) => {
    ;(groups[token.family] ??= []).push(token)
    return groups
  }, {})

  return (
    <article className="mx-auto max-w-3xl">
      <PageHeader
        category={t.category}
        title={t.title}
        status="stable"
        description={t.description}
      />

      <TokenDownloadBar />

      <section id="token-catalog" className="mt-10 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display-xs-semibold text-foreground">
              {t.catalogTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} / {colorTokens.length} {t.tokenCountSuffix}
            </p>
          </div>
          <label className="relative block w-full sm:max-w-xs">
            <span className="sr-only">{t.searchLabel}</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="relux-field ps-9"
            />
          </label>
        </div>

        <div
          className="mt-5 flex gap-2 overflow-x-auto pb-2"
          role="group"
          aria-label={t.familyGroupLabel}
        >
          {families.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFamily(item)}
              aria-pressed={family === item}
              className={
                'relux-focus whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold ' +
                (family === item
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground')
              }
            >
              {item === 'All' ? t.allLabel : item}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-10">
          {Object.entries(grouped).map(([name, tokens]) => (
            <section key={name} aria-labelledby={`family-${name.replace(/ /g, '-')}`}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3
                  id={`family-${name.replace(/ /g, '-')}`}
                  className="text-lg font-semibold text-foreground"
                >
                  {name}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {tokens?.length ?? 0}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {tokens?.map((token) => (
                  <TokenSwatch
                    key={token.name}
                    name={token.name}
                    cssName={token.cssName}
                    value={token.value}
                    category={token.family}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </article>
  )
}

import { useMemo, useState } from 'react'
import { TokenSwatch } from './TokenSwatch'
import { Search } from 'lucide-react'

export type CatalogToken = {
  name: string
  cssName: string
  value: string
  family?: string
}

export type TokenCatalogProps = {
  tokens: CatalogToken[]
  categories?: string[]
  searchPlaceholder?: string
  defaultCategory?: string
  className?: string
}

export function TokenCatalog({
  tokens,
  categories,
  searchPlaceholder = 'Cari token CSS variables...',
  defaultCategory = 'All',
  className = '',
}: TokenCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory)
  const [searchQuery, setSearchQuery] = useState('')

  const availableCategories = useMemo(() => {
    if (categories && categories.length > 0) return ['All', ...categories]
    const set = new Set<string>()
    for (const t of tokens) {
      if (t.family) set.add(t.family)
    }
    return ['All', ...Array.from(set).sort()]
  }, [tokens, categories])

  const filteredTokens = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return tokens.filter((t) => {
      const matchCat =
        selectedCategory === 'All' ||
        (t.family && t.family.toLowerCase() === selectedCategory.toLowerCase())
      const matchQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.value.toLowerCase().includes(q) ||
        (t.family && t.family.toLowerCase().includes(q))
      return matchCat && matchQuery
    })
  }, [tokens, selectedCategory, searchQuery])

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-border bg-input-background py-2 ps-9 pe-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {availableCategories.length > 1 && (
          <div className="flex flex-wrap gap-1.5 overflow-x-auto">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Menampilkan {filteredTokens.length} dari {tokens.length} token
      </p>

      {filteredTokens.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTokens.map((t) => (
            <TokenSwatch
              key={t.name}
              name={t.name}
              cssName={t.cssName}
              value={t.value}
              category={t.family}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
          <p className="font-medium text-foreground">Tidak ada token yang sesuai</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('All')
            }}
            className="mt-2 text-sm font-medium text-primary underline"
          >
            Reset filter
          </button>
        </div>
      )}
    </div>
  )
}

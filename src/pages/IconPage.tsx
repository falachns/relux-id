import { useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../components/docs/Section'
import {
  Home, Menu, ChevronRight, ChevronDown, ArrowLeft, ArrowRight, X, MoreHorizontal,
  Plus, Minus, Search, Pencil, Trash2, Copy, Download, Upload, Share2, Settings, Filter,
  Check, CheckCircle, AlertCircle, AlertTriangle, Info, XCircle, Loader2, Clock,
  Mail, MessageSquare, Bell, Phone,
  File, FileText, Folder, FolderOpen,
  Image, Play, Pause, Volume2,
  User, Users, UserPlus, LogIn, LogOut,
  ArrowUp, ArrowDown, ChevronsUpDown, ExternalLink,
  Calendar, MapPin, Train, Ticket, CreditCard, Star,
} from 'lucide-react'
import { CodeBlock } from '../components/docs/CodeBlock'
import { PageHeader } from '../components/docs/PageHeader'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type IconEntry = { name: string; icon: LucideIcon; category: string }

const ICON_CATALOG: IconEntry[] = [
  ...group('Navigasi', { Home, Menu, ChevronRight, ChevronDown, ArrowLeft, ArrowRight, X, MoreHorizontal }),
  ...group('Aksi', { Plus, Minus, Search, Pencil, Trash2, Copy, Download, Upload, Share2, Settings, Filter }),
  ...group('Status', { Check, CheckCircle, AlertCircle, AlertTriangle, Info, XCircle, Loader2, Clock }),
  ...group('Komunikasi', { Mail, MessageSquare, Bell, Phone }),
  ...group('Berkas', { File, FileText, Folder, FolderOpen }),
  ...group('Media', { Image, Play, Pause, Volume2 }),
  ...group('Pengguna', { User, Users, UserPlus, LogIn, LogOut }),
  ...group('Panah', { ArrowUp, ArrowDown, ChevronsUpDown, ExternalLink }),
  ...group('KAI', { Train, Ticket, MapPin, Calendar, CreditCard, Star }),
]

function group(category: string, icons: Record<string, LucideIcon>): IconEntry[] {
  return Object.entries(icons).map(([name, icon]) => ({ name, icon, category }))
}

type PageCopy = {
  title: string
  category: string
  description: string
  searchTitle: string
  searchPlaceholder: string
  noMatchPrefix: string
  showingPrefix: string
  ofSuffix: string
  sizesTitle: string
  colorsTitle: string
  colorsDesc: string
  usageTitle: string
  alternateCatalogDesc: string
}

const COPY = {
  id: {
    title: 'Icon',
    category: 'Fondasi',
    description: 'RelUX memakai lucide-react sebagai set ikon UI — garis konsisten 2px, dapat diwarnai lewat currentColor, dan ukurannya diatur lewat prop size.',
    searchTitle: 'Pencarian ikon',
    searchPlaceholder: 'Cari ikon… (mis. arrow, user, kai)',
    noMatchPrefix: 'Tidak ada ikon cocok dengan',
    showingPrefix: 'Menampilkan',
    ofSuffix: 'dari',
    sizesTitle: 'Ukuran ikon',
    colorsTitle: 'Warna ikon',
    colorsDesc: 'foreground · muted · accent · destructive · success — ikon mewarisi warna teks induknya.',
    usageTitle: 'Penggunaan',
    alternateCatalogDesc: 'Untuk katalog yang lebih kaya, @mui/icons-material juga tersedia jika dibutuhkan.',
  },
  en: {
    title: 'Icons',
    category: 'Foundation',
    description: 'RelUX standardizes on lucide-react as its core UI icon set — consistent 2px stroke weight, inherit currentColor fill, and sized predictably via the size prop.',
    searchTitle: 'Icon search',
    searchPlaceholder: 'Search icons… (e.g. arrow, user, kai)',
    noMatchPrefix: 'No icons match query',
    showingPrefix: 'Showing',
    ofSuffix: 'of',
    sizesTitle: 'Icon sizes',
    colorsTitle: 'Icon colors',
    colorsDesc: 'foreground · muted · accent · destructive · success — icons inherit parent text color via currentColor.',
    usageTitle: 'Usage',
    alternateCatalogDesc: 'For expanded domain icons, @mui/icons-material is also accessible when specified.',
  },
} satisfies Localized<PageCopy>

export function IconPage({
  onNavigate,
}: {
  onNavigate?: (section: SectionId) => void
}) {
  const t = useLocalized(COPY)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ICON_CATALOG
    return ICON_CATALOG.filter(
      (e) =>
        e.name.toLowerCase().includes(q) || e.category.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <article className="mx-auto max-w-3xl">
      <PageHeader
        category={t.category}
        title={t.title}
        status="stable"
        description={t.description}
      />

      <Section id="search" title={t.searchTitle}>
        <div className="relative mb-4">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        {filtered.length === 0 ? (
          <p className="rounded-lg border border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
            {t.noMatchPrefix} “{query}”.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {filtered.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary"
                title={name}
              >
                <Icon className="size-6 text-foreground" aria-hidden="true" />
                <span className="w-full truncate text-center text-xs text-muted-foreground">
                  {name}
                </span>
              </div>
            ))}
          </div>
        )}
        <p className="mt-2 text-xs text-muted-foreground">
          {t.showingPrefix} {filtered.length} {t.ofSuffix} {ICON_CATALOG.length} ikon.
        </p>
      </Section>

      <Section id="sizes" title={t.sizesTitle}>
        <div className="flex flex-wrap items-end gap-6 rounded-lg border border-border bg-muted/40 p-6">
          {[16, 20, 24, 32].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Train size={s} className="text-foreground" aria-hidden="true" />
              <span className="font-mono text-xs text-muted-foreground">
                {s}px
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="colors" title={t.colorsTitle}>
        <div className="flex flex-wrap items-center gap-6 rounded-lg border border-border bg-muted/40 p-6">
          <Ticket className="size-7 text-foreground" aria-hidden="true" />
          <Ticket className="size-7 text-muted-foreground" aria-hidden="true" />
          <Ticket className="size-7 text-accent" aria-hidden="true" />
          <Ticket className="size-7 text-destructive" aria-hidden="true" />
          <Ticket className="size-7 text-success" aria-hidden="true" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{t.colorsDesc}</p>
      </Section>

      <Section id="usage" title={t.usageTitle}>
        <CodeBlock
          language="tsx"
          code={`import { Ticket } from "lucide-react"

// Ukuran & warna mengikuti prop dan kelas teks
<Ticket size={20} className="text-primary" aria-hidden="true" />`}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {t.alternateCatalogDesc}
        </p>
      </Section>
    </article>
  )
}

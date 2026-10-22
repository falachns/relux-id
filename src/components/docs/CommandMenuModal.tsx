import { useState, useEffect, useRef, useMemo, type KeyboardEvent } from 'react'
import {
  Search,
  BookOpen,
  Layers,
  Component,
  Layout,
  ExternalLink,
  X,
  FileCode,
} from 'lucide-react'
import { useLang } from '../../lib/i18n'
import type { SectionId } from '../../lib/nav'

export type SearchCommandItem = {
  id: string
  title: string
  titleEn: string
  category: 'foundations' | 'components' | 'app-ui' | 'examples' | 'tokens' | 'docs'
  section?: SectionId
  tokenName?: string
  description?: string
}

const COMMAND_INDEX: SearchCommandItem[] = [
  // Docs
  { id: 'intro', title: 'Pengenalan RelUX', titleEn: 'Introduction to RelUX', category: 'docs', section: 'introduction', description: 'Prinsip desain, stack, dan arsitektur token KAI.' },
  { id: 'start', title: 'Mulai Menggunakan (Instalasi)', titleEn: 'Getting Started & Installation', category: 'docs', section: 'getting-started', description: 'Panduan setup Composer, npm, dan HTML CSS.' },
  { id: 'cli', title: 'CLI & Tools (Artisan & npm)', titleEn: 'CLI & Development Tools', category: 'docs', section: 'cli', description: 'Perintah php artisan relux:init, relux:add, relux:list, dan npx @kai/relux.' },
  { id: 'changelog', title: 'Catatan Rilis (Changelog Global)', titleEn: 'Release Notes & Changelog', category: 'docs', section: 'changelog', description: 'Riwayat pembaruan versi library, komponen baru, dan breaking changes.' },
  { id: 'theming', title: 'Theming Engine & Kontras WCAG', titleEn: 'Theming Engine & Contrast', category: 'docs', section: 'theming', description: 'Kalkulator palet 50-950 dan validasi kontras.' },

  // Foundations
  { id: 'logo', title: 'Logo KAI & Sub-brand', titleEn: 'KAI & Sub-brand Logos', category: 'foundations', section: 'logo', description: 'Panduan penggunaan logo resmi korporat.' },
  { id: 'colors', title: 'Palet Warna Kanonikal', titleEn: 'Canonical Color Palette', category: 'foundations', section: 'warna', description: '597 token warna KAI dan sub-brand.' },
  { id: 'typography', title: 'Tipografi Inter & Roboto Mono', titleEn: 'Typography Inter & Roboto Mono', category: 'foundations', section: 'tipografi', description: 'Skala Display, Heading, Body, dan Label.' },
  { id: 'spacing', title: 'Spacing & Sistem Grid', titleEn: 'Spacing & Grid System', category: 'foundations', section: 'spacing', description: 'Skala jarak spasial 4px hingga 128px.' },
  { id: 'radius', title: 'Radius Sudut & Shadow Efek', titleEn: 'Radius & Shadow Tokens', category: 'foundations', section: 'radius', description: 'Kelengkungan sudut dan elevasi bayangan.' },
  { id: 'icons', title: 'Ikonografi Lucide & Material', titleEn: 'Iconography Lucide & Material', category: 'foundations', section: 'icon', description: 'Katalog simbol dan ikon resmi sistem.' },
  { id: 'state', title: 'Interaksi & State Komponen', titleEn: 'Interactive Component States', category: 'foundations', section: 'state', description: 'Hover, Focus-visible, Active, dan Disabled.' },

  // Base Components
  { id: 'btn', title: 'Button (Tombol)', titleEn: 'Button Component', category: 'components', section: 'button', description: 'Aksi primer, sekunder, outline, dan brand KAI.' },
  { id: 'forms', title: 'Form Controls (Input, Checkbox, Toggle)', titleEn: 'Form Controls', category: 'components', section: 'form', description: 'Input teks, switch dwikeadaan, checkbox.' },
  { id: 'badges', title: 'Badges & Tags', titleEn: 'Badges & Tags', category: 'components', section: 'badge', description: 'Label status terkonfirmasi, dot, dan number pill.' },
  { id: 'alerts', title: 'Alert & Notification Banner', titleEn: 'Alert & Banner', category: 'components', section: 'alert', description: 'Banner informasi peron, peringatan, dan error.' },
  { id: 'cards', title: 'Cards (Kartu Informasi)', titleEn: 'Card Component', category: 'components', section: 'card', description: 'Kontainer konten jadwal kereta dan profil.' },
  { id: 'avatars', title: 'Avatar Pengguna', titleEn: 'User Avatar', category: 'components', section: 'avatar', description: 'Foto profil, inisial nama, dan indikator online.' },

  // Application UI
  { id: 'table', title: 'Data Table (Tabel Perjalanan)', titleEn: 'Data Table', category: 'app-ui', section: 'table', description: 'Tabel jadwal KA, nomor sarana, dan status.' },
  { id: 'nav', title: 'Navigation & Tabs', titleEn: 'Navigation & Tabs', category: 'app-ui', section: 'navigation', description: 'Navigasi tab dengan roving tabindex dan keyboard.' },
  { id: 'modals', title: 'Modal & Dialog Konfirmasi', titleEn: 'Modal & Dialogs', category: 'app-ui', section: 'modal', description: 'Dialog pembatalan tiket dan form popup.' },
  { id: 'stepper', title: 'Stepper (Progress Steps)', titleEn: 'Progress Steps Stepper', category: 'app-ui', section: 'app-ui', description: 'Alur tahapan reservasi tiket KA 1-2-3-4.' },
  { id: 'empty', title: 'Empty State (Nirhasil)', titleEn: 'Empty State', category: 'app-ui', section: 'app-ui', description: 'Tampilan informatif saat data tidak ditemukan.' },
  { id: 'upload', title: 'File Uploader (Unggah Dokumen)', titleEn: 'File Uploader', category: 'app-ui', section: 'app-ui', description: 'Area drag & drop scan KTP dan lampiran dinas.' },
  { id: 'date', title: 'Date Picker (Kalender Perjalanan)', titleEn: 'Date Picker & Calendar', category: 'app-ui', section: 'app-ui', description: 'Pemilihan tanggal tunggal dan rentang pergi-pulang.' },

  // Examples
  { id: 'ex-dash', title: 'Dashboard Operasi KAI', titleEn: 'KAI Operations Dashboard', category: 'examples', section: 'example-dashboard', description: 'Surface monitoring kereta aktif dan penumpang.' },
  { id: 'ex-land', title: 'Landing Page KAI', titleEn: 'KAI Official Landing Page', category: 'examples', section: 'example-landing', description: 'Hero promosi perjalanan kereta api.' },
  { id: 'ex-auth', title: 'Panduan Google Auth & ESA', titleEn: 'Google Auth & ESA Guide', category: 'examples', section: 'example-google-auth', description: 'Instruksi aktivasi 2FA akun dinas KAI.' },
  { id: 'ex-login', title: 'Portal Masuk & SSO KAI', titleEn: 'Sign In & SSO KAI Portal', category: 'examples', section: 'example-login', description: 'Layar login NIPP dan SSO SuperApp KAI.' },
  { id: 'ex-settings', title: 'Pengaturan & Preferensi Sistem', titleEn: 'Settings & App Preferences', category: 'examples', section: 'example-settings', description: 'Konfigurasi profil, 2FA, dan tema dinas.' },

  // Tokens
  { id: 'tok-blue', title: '--colors/kai/primary/500 (#0D47A1)', titleEn: '--colors/kai/primary/500', category: 'tokens', tokenName: '--colors/kai/primary/500', description: 'Warna KAI Corporate Blue resmi.' },
  { id: 'tok-red', title: '--colors/kai/commuter-primary/500', titleEn: '--colors/kai/commuter-primary/500', category: 'tokens', tokenName: '--colors/kai/commuter-primary/500', description: 'Warna merah KAI Commuter Line.' },
  { id: 'tok-radius', title: '--radius-lg (12px)', titleEn: '--radius-lg (12px)', category: 'tokens', tokenName: '--radius-lg', description: 'Standar kelengkungan kartu dan dialog.' },
  { id: 'tok-space', title: '--spacing-xl (16px)', titleEn: '--spacing-xl (16px)', category: 'tokens', tokenName: '--spacing-xl', description: 'Standar padding kontainer RelUX.' },
]

export function CommandMenuModal({
  isOpen,
  onClose,
  onNavigate,
}: {
  isOpen: boolean
  onClose: () => void
  onNavigate: (section: SectionId) => void
}) {
  const { lang } = useLang()
  const isEn = lang === 'en'
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Filtered items
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMAND_INDEX
    return COMMAND_INDEX.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q)
      const matchTitleEn = item.titleEn.toLowerCase().includes(q)
      const matchDesc = item.description?.toLowerCase().includes(q)
      const matchToken = item.tokenName?.toLowerCase().includes(q)
      return matchTitle || matchTitleEn || matchDesc || matchToken
    })
  }, [query])

  // Reset index if query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = filtered[selectedIndex]
      if (item) {
        if (item.section) {
          onNavigate(item.section)
        } else if (item.tokenName) {
          navigator.clipboard.writeText(`var(${item.tokenName})`)
        }
        onClose()
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  // Auto scroll active item into view
  useEffect(() => {
    const listEl = listRef.current
    if (!listEl) return
    const activeEl = listEl.children[selectedIndex] as HTMLElement
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  if (!isOpen) return null

  const getCategoryIcon = (category: SearchCommandItem['category']) => {
    switch (category) {
      case 'docs':
        return <BookOpen className="size-4 text-primary" />
      case 'foundations':
        return <Layers className="size-4 text-accent" />
      case 'components':
        return <Component className="size-4 text-success" />
      case 'app-ui':
        return <Layout className="size-4 text-warning" />
      case 'examples':
        return <ExternalLink className="size-4 text-primary" />
      case 'tokens':
        return <FileCode className="size-4 text-primary" />
    }
  }

  const getCategoryLabel = (cat: SearchCommandItem['category']) => {
    switch (cat) {
      case 'docs':
        return isEn ? 'Documentation' : 'Dokumentasi'
      case 'foundations':
        return isEn ? 'Foundations' : 'Fondasi Desain'
      case 'components':
        return isEn ? 'Base Components' : 'Komponen Dasar'
      case 'app-ui':
        return isEn ? 'Application UI' : 'Application UI'
      case 'examples':
        return isEn ? 'Page Examples' : 'Contoh Halaman KAI'
      case 'tokens':
        return isEn ? 'Canonical Tokens' : 'Token Desain KAI'
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu Pencarian Global"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-foreground/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/20">
          <Search className="size-5 text-muted-foreground shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'id' ? 'Cari dokumentasi atau komponen...' : 'Search documentation or components...'}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none pr-14"
          />
          <div className="absolute right-4 flex items-center gap-1.5">
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="rounded p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs leading-none font-mono text-muted-foreground border border-border">
              ESC
            </kbd>
          </div>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground">
              {isEn ? `No results found for "${query}".` : `Tidak ada hasil yang sesuai dengan "${query}".`}
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    if (item.section) onNavigate(item.section)
                    else if (item.tokenName) navigator.clipboard.writeText(`var(${item.tokenName})`)
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-start justify-between gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-primary/10 border border-primary/20 text-foreground'
                      : 'hover:bg-muted/60 text-muted-foreground hover:text-foreground border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3 overflow-hidden">
                    <span className="mt-0.5 shrink-0">{getCategoryIcon(item.category)}</span>
                    <div className="truncate">
                      <p className={`text-xs font-semibold truncate ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                        {isEn ? item.titleEn : item.title}
                      </p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="shrink-0 rounded bg-muted/80 px-2 py-0.5 text-xs leading-none font-medium text-muted-foreground border border-border">
                    {getCategoryLabel(item.category)}
                  </span>
                </div>
              )
            })
          )}
        </div>

        {/* Keyboard Footer */}
        <div className="border-t border-border bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono border border-border">↑</kbd>
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono border border-border">↓</kbd>
              <span>{isEn ? 'Navigate' : 'Navigasi'}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono border border-border">↵</kbd>
              <span>{isEn ? 'Open' : 'Buka'}</span>
            </span>
          </div>
          <span>PT Kereta Api Indonesia (Persero)</span>
        </div>
      </div>
    </div>
  )
}

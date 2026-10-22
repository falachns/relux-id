import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'id' | 'en'
export type Localized<T> = Record<Lang, T>

const UI = {
  id: {
    skip: 'Lewati ke konten utama',
    openMenu: 'Buka menu',
    closeMenu: 'Tutup menu',
    home: 'Beranda RelUX by KAI',
    search: 'Cari komponen',
    searchPlaceholder: 'Cari dokumentasi...',
    noResults: (q: string) => `Tidak ada hasil untuk “${q}”.`,
    nav: 'Navigasi dokumentasi',
    navAside: 'Navigasi',
    toc: 'Daftar isi',
    tocTitle: 'Di halaman ini',
    main: 'Konten dokumentasi',
    next: 'Selanjutnya',
    component: 'Komponen',
    soon: 'segera',
    language: 'Bahasa',
  },
  en: {
    skip: 'Skip to main content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    home: 'RelUX by KAI home',
    search: 'Search components',
    searchPlaceholder: 'Search docs...',
    noResults: (q: string) => `No results for “${q}”.`,
    nav: 'Documentation navigation',
    navAside: 'Navigation',
    toc: 'Table of contents',
    tocTitle: 'On this page',
    main: 'Documentation content',
    next: 'Next',
    component: 'Component',
    soon: 'soon',
    language: 'Language',
  },
}

/** English section headings, keyed by the Indonesian source title. */
const SECTION_EN: Record<string, string> = {
  Aksesibilitas: 'Accessibility',
  'Contoh kode': 'Code example',
  'Panduan penggunaan': 'Usage guidelines',
  Ukuran: 'Sizes',
  Token: 'Tokens',
  Penggunaan: 'Usage',
  Kode: 'Code',
  'Warna ikon': 'Icon colors',
  'Warna bagan (chart)': 'Chart colors',
  'Untuk siapa': 'Who it is for',
  'Ukuran minimum': 'Minimum size',
  'Ukuran ikon': 'Icon sizes',
  'Jenis alert': 'Alert types',
  Tujuan: 'Purpose',
  'Token ukuran font': 'Font size tokens',
  'Token teks & border': 'Text & border tokens',
  'Token tabel': 'Table tokens',
  'Token status dokumentasi': 'Documentation status tokens',
  'Token state': 'State tokens',
  'Token spacing': 'Spacing tokens',
  'Token semantik': 'Semantic tokens',
  'Token lebar & kontainer': 'Width & container tokens',
  'Token latar (background)': 'Background tokens',
  'Token border radius': 'Border radius tokens',
  'Token alpha': 'Alpha tokens',
  'Tabs underline': 'Underline tabs',
  'Tabs pill': 'Pill tabs',
  'Tabel jadwal': 'Schedule table',
  'Badge status': 'Status badges',
  'Ukuran avatar': 'Avatar sizes',
  'Contoh interaktif': 'Interactive example',
  'Skala tipe web display': 'Web display type scale',
  'Skala tipe mobile & aplikasi': 'Mobile & app type scale',
  'Shadow elevasi': 'Elevation shadows',
  'Ruang bebas (clear space)': 'Clear space',
  'Referensi token': 'Token reference',
  'Widget cari tiket (aplikasi publik)': 'Ticket search widget (public app)',
  'Progress bar': 'Progress bar',
  'Prinsip desain': 'Design principles',
  'Prinsip spacing': 'Spacing principles',
  'Prinsip radius': 'Radius principles',
  Penempatan: 'Placement',
  'Pencarian ikon': 'Icon search',
  'Palet sub-merek': 'Sub-brand palette',
  'Palet merek KAI': 'KAI brand palette',
  Paginasi: 'Pagination',
  'Badge outline': 'Outline badges',
  'Badge angka & titik': 'Number & dot badges',
  'Memilih button': 'Choosing a button',
  'Masalah yang kami selesaikan': 'Problems we solve',
  Spinner: 'Spinner',
  'Pratinjau langsung': 'Live preview',
  'Kegunaan kelas': 'Class usage',
  'Kartu statistik': 'Stat cards',
  'Kartu jadwal': 'Schedule cards',
  'Jenis button': 'Button types',
  'Navigasi sidebar (aplikasi internal)': 'Sidebar navigation (internal app)',
  'Input teks': 'Text input',
  'Hierarki button': 'Button hierarchy',
  Grup: 'Group',
  'Gambaran umum state': 'State overview',
  'Font Family': 'Font family',
  Dialog: 'Dialog',
  'Dengan status': 'With status',
  'Checkbox & Radio': 'Checkbox & radio',
  'Cara penggunaan yang disarankan': 'Recommended usage',
  'Cara pakai': 'How to use',
  Cakupan: 'Scope',
  Breadcrumb: 'Breadcrumb',
  Banner: 'Banner',
  'Aset logo': 'Logo assets',
  Anatomi: 'Anatomy',
  Changelog: 'Changelog',
  'Props / API': 'Props / API',
  Skeleton: 'Skeleton',
  Select: 'Select',
  Switch: 'Switch',
  Textarea: 'Textarea',
  Varian: 'Variants',
  'State (keadaan)': 'States',
  Penerapan: 'Applications',
  Spesifikasi: 'Specifications',
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void }
const LangContext = createContext<Ctx>({ lang: 'id', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(
    () => {
      const saved = localStorage.getItem('relux-lang')
      return saved === 'en' || saved === 'id' ? saved : 'id'
    },
  )
  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('relux-lang', lang)
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLocalized<T>(copy: Localized<T>): T {
  const { lang } = useContext(LangContext)
  return copy[lang]
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext)
  return {
    lang,
    setLang,
    t: UI[lang],
    /** Translate a section heading; falls back to the source title. */
    section: (title: string) => (lang === 'en' ? SECTION_EN[title] ?? title : title),
    label: (item: { label: string; labelEn: string }) => (lang === 'en' ? item.labelEn : item.label),
  }
}

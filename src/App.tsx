import { lazy, Suspense, useEffect, useMemo, useState, type ComponentType } from 'react'
import { DocsLayout } from './components/docs/DocsLayout'
import type { SectionId } from './lib/nav'
import { LangProvider, useLang } from './lib/i18n'
import { PageNavigation } from './components/docs/PageNavigation'

type PageProps = { onNavigate: (section: SectionId) => void }

const page = (
  loader: () => Promise<Record<string, unknown>>,
  exportName: string,
) =>
  lazy(async () => {
    const module = await loader()
    return { default: module[exportName] as ComponentType<PageProps> }
  })

const PAGES: Record<SectionId, ReturnType<typeof lazy>> = {
  introduction: page(() => import('./pages/Introduction'), 'Introduction'),
  'getting-started': page(() => import('./pages/GettingStarted'), 'GettingStarted'),
  cli: page(() => import('./pages/CliPage'), 'CliPage'),
  changelog: page(() => import('./pages/ChangelogPage'), 'ChangelogPage'),
  logo: page(() => import('./pages/LogoPage'), 'LogoPage'),
  warna: page(() => import('./pages/ColorsPage'), 'ColorsPage'),
  tipografi: page(() => import('./pages/TypographyPage'), 'TypographyPage'),
  spacing: page(() => import('./pages/SpacingPage'), 'SpacingPage'),
  radius: page(() => import('./pages/RadiusPage'), 'RadiusPage'),
  accordion: page(() => import('./pages/AccordionPage'), 'AccordionPage'),
  button: page(() => import('./pages/ButtonPage'), 'ButtonPage'),
  state: page(() => import('./pages/StatePage'), 'StatePage'),
  icon: page(() => import('./pages/IconPage'), 'IconPage'),
  form: page(() => import('./pages/FormPage'), 'FormPage'),
  badge: page(() => import('./pages/BadgePage'), 'BadgePage'),
  alert: page(() => import('./pages/AlertPage'), 'AlertPage'),
  card: page(() => import('./pages/CardPage'), 'CardPage'),
  avatar: page(() => import('./pages/AvatarPage'), 'AvatarPage'),
  navigation: page(() => import('./pages/NavigationPage'), 'NavigationPage'),
  table: page(() => import('./pages/TablePage'), 'TablePage'),
  progress: page(() => import('./pages/ProgressPage'), 'ProgressPage'),
  modal: page(() => import('./pages/ModalPage'), 'ModalPage'),
  'app-ui': page(() => import('./pages/AppUIPage'), 'AppUIPage'),
  'example-dashboard': page(
    () => import('./pages/examples/DashboardExamplePage'),
    'DashboardExamplePage',
  ),
  'example-landing': page(
    () => import('./pages/examples/LandingExamplePage'),
    'LandingExamplePage',
  ),
  'example-google-auth': page(
    () => import('./pages/examples/GoogleAuthExamplePage'),
    'GoogleAuthExamplePage',
  ),
  'example-login': page(
    () => import('./pages/examples/LoginExamplePage'),
    'LoginExamplePage',
  ),
  'example-settings': page(
    () => import('./pages/examples/SettingsExamplePage'),
    'SettingsExamplePage',
  ),
  theming: page(() => import('./pages/ThemingPage'), 'ThemingPage'),
  manage: page(() => import('./pages/ManagePage'), 'ManagePage'),
  'not-found': page(() => import('./pages/NotFoundPage'), 'NotFoundPage'),
}

const PAGE_META: Record<SectionId, { title: { id: string; en: string }; desc: { id: string; en: string } }> = {
  introduction: {
    title: { id: 'Pengenalan', en: 'Introduction' },
    desc: { id: 'Pengenalan resmi RelUX Design System KAI v1 berbasis Make Kit tokens.', en: 'Official introduction to RelUX Design System KAI v1 powered by Make Kit tokens.' },
  },
  'getting-started': {
    title: { id: 'Mulai Menggunakan', en: 'Getting Started' },
    desc: { id: 'Panduan instalasi paket NPM, konfigurasi CSS, dan integrasi multi-framework RelUX.', en: 'Installation guide, CSS setup, and multi-framework integration with RelUX.' },
  },
  cli: {
    title: { id: 'CLI & Tools', en: 'CLI & Tools' },
    desc: { id: 'Panduan agy CLI, automated token sync, dan generator kode RelUX.', en: 'Guide for agy CLI, automated token sync, and code generation tools.' },
  },
  changelog: {
    title: { id: 'Catatan Rilis', en: 'Release Notes' },
    desc: { id: 'Riwayat pembaruan versi, perbaikan bug, dan token changelog RelUX Design System.', en: 'Version release notes, bug fixes, and token changelog for RelUX Design System.' },
  },
  logo: {
    title: { id: 'Logo & Identitas Merek', en: 'Brand & Logo Assets' },
    desc: { id: 'Panduan penggunaan logo resmi KAI, clear space, dan proporsi varian.', en: 'Official KAI logo guidelines, clear space, and asset variant specifications.' },
  },
  warna: {
    title: { id: 'Warna & Palet Merek', en: 'Colors & Brand Palette' },
    desc: { id: 'Token warna semantik KAI, palet korporat, dan skala netral berkontras tinggi.', en: 'KAI semantic color tokens, corporate palette, and accessible neutral scale.' },
  },
  tipografi: {
    title: { id: 'Tipografi & Skala Teks', en: 'Typography & Type Scale' },
    desc: { id: 'Hirarki tipografi Inter & Roboto Mono serta kelas token display hingga body.', en: 'Inter and Roboto Mono typography hierarchy, display to body text scale tokens.' },
  },
  spacing: {
    title: { id: 'Spacing & Grid', en: 'Spacing & Grid' },
    desc: { id: 'Sistem spasi modular berbasis 4px/8px dan panduan container layout.', en: 'Modular 4px/8px spacing system and container layout grid guidelines.' },
  },
  radius: {
    title: { id: 'Radius & Shadow', en: 'Radius & Shadow' },
    desc: { id: 'Token border-radius konsisten dan skala elevasi bayangan berhierarki.', en: 'Consistent border-radius tokens and hierarchical elevation shadow scale.' },
  },
  icon: {
    title: { id: 'Ikonografi', en: 'Iconography' },
    desc: { id: 'Pustaka ikon antarmuka Lucide berlisensi terbuka yang diselaraskan dengan KAI.', en: 'Lucide interface icon library aligned with KAI design principles.' },
  },
  state: {
    title: { id: 'State Interaksi', en: 'Interactive States' },
    desc: { id: 'Panduan visual state: hover, focus-visible, active, disabled, dan loading.', en: 'Interactive state guidelines: hover, focus-visible, active, disabled, and loading.' },
  },
  button: {
    title: { id: 'Button', en: 'Button' },
    desc: { id: 'Komponen tombol interaktif dengan ragam varian: primary, secondary, outline, ghost, dan link.', en: 'Interactive button component with primary, secondary, outline, ghost, and link variants.' },
  },
  form: {
    title: { id: 'Form Controls', en: 'Form Controls' },
    desc: { id: 'Komponen kontrol formulir: text input, select, textarea, checkbox, radio, dan date picker.', en: 'Form controls: text input, select, textarea, checkbox, radio, and date picker.' },
  },
  badge: {
    title: { id: 'Badges & Tags', en: 'Badges & Tags' },
    desc: { id: 'Indikator status, label kategori, dan tag filter informasi.', en: 'Status indicators, category labels, and information filter tags.' },
  },
  alert: {
    title: { id: 'Alert & Banner', en: 'Alert & Banner' },
    desc: { id: 'Pemberitahuan kontekstual: info, success, warning, dan error.', en: 'Contextual notification components: info, success, warning, and error.' },
  },
  card: {
    title: { id: 'Cards', en: 'Cards' },
    desc: { id: 'Wadah konten modular dengan header, media, body, dan aksi.', en: 'Modular content container with header, media, body, and action footer.' },
  },
  table: {
    title: { id: 'Data Table', en: 'Data Table' },
    desc: { id: 'Tabel data tabular responsif dengan paginasi, sorting, dan status baris.', en: 'Responsive tabular data table with pagination, sorting, and row status.' },
  },
  navigation: {
    title: { id: 'Navigation', en: 'Navigation' },
    desc: { id: 'Komponen navigasi: tabs, breadcrumbs, steppers, dan pagination.', en: 'Navigation components: tabs, breadcrumbs, steppers, and pagination.' },
  },
  accordion: {
    title: { id: 'Accordion', en: 'Accordion' },
    desc: { id: 'Panel lipat ekspansi konten untuk FAQ dan pengelompokan informasi padat.', en: 'Expandable disclosure accordion panels for FAQs and dense information groups.' },
  },
  modal: {
    title: { id: 'Modal & Dialog', en: 'Modal & Dialog' },
    desc: { id: 'Jendela dialog modal untuk aksi konfirmasi, formulir popup, dan alert dialog.', en: 'Modal dialog windows for confirmation actions, popup forms, and alert dialogs.' },
  },
  avatar: {
    title: { id: 'Avatars', en: 'Avatars' },
    desc: { id: 'Representasi profil pengguna dengan foto, inisial teks, dan indikator status.', en: 'User profile representation with photo, initials, and presence status indicators.' },
  },
  progress: {
    title: { id: 'Progress', en: 'Progress' },
    desc: { id: 'Indikator kemajuan proses: progress bar linier dan circular spinner.', en: 'Process progress indicators: linear progress bar and circular spinner.' },
  },
  'app-ui': {
    title: { id: 'App UI Components', en: 'App UI Components' },
    desc: { id: 'Koleksi komponen UI aplikasi internal dan publik standar KAI.', en: 'KAI standard internal and public application UI component library.' },
  },
  'example-dashboard': {
    title: { id: 'Dashboard Operasi KAI', en: 'KAI Operations Dashboard' },
    desc: { id: 'Implementasi contoh dashboard pemantauan perjalanan KA dan performa ketepatan waktu.', en: 'Example implementation of train operations monitoring and on-time performance dashboard.' },
  },
  'example-landing': {
    title: { id: 'Landing Page KAI', en: 'KAI Landing Page' },
    desc: { id: 'Contoh implementasi halaman publik pemesanan tiket kereta api Indonesia.', en: 'Example implementation of public Indonesian railway ticket booking landing page.' },
  },
  'example-google-auth': {
    title: { id: 'Panduan Google Auth & 2FA', en: 'Google Auth & 2FA Guide' },
    desc: { id: 'Panduan integrasi otentikasi Google dan 2FA verifikasi dua langkah.', en: 'Integration guide for Google Authentication and two-factor verification (2FA).' },
  },
  'example-login': {
    title: { id: 'Portal Masuk & SSO', en: 'Sign In & SSO Portal' },
    desc: { id: 'Desain portal login akun pegawai dan integrasi Single Sign-On (SSO) KAI.', en: 'Employee login portal design and KAI Single Sign-On (SSO) integration.' },
  },
  'example-settings': {
    title: { id: 'Pengaturan & Preferensi', en: 'Settings & Preferences' },
    desc: { id: 'Halaman pengaturan profil, keamanan akun, dan preferensi notifikasi.', en: 'Profile settings, account security, and notification preferences page.' },
  },
  theming: {
    title: { id: 'Theming & Kontras', en: 'Theming & Contrast' },
    desc: { id: 'Konfigurasi tema, adaptasi token Make Kit KAI, dan kepatuhan kontras AA.', en: 'Theme configuration, Make Kit KAI token adaptation, and AA contrast compliance.' },
  },
  manage: {
    title: { id: 'Change Requests & Revisi', en: 'Change Requests & Revisions' },
    desc: { id: 'Portal manajemen kontributor untuk alur persetujuan revisi dan tiket perubahan.', en: 'Contributor management portal for revision approval workflows and change tickets.' },
  },
  'not-found': {
    title: { id: 'Halaman Tidak Ditemukan (404)', en: 'Page Not Found (404)' },
    desc: { id: 'Halaman yang Anda tuju tidak ditemukan dalam dokumentasi RelUX Design System KAI.', en: 'The page you requested could not be found in RelUX Design System KAI documentation.' },
  },
}

function parseSectionFromUrl(): SectionId {
  if (typeof window === 'undefined') return 'introduction'

  // 1. Check hash first (#manage, #button, etc.)
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase()
  if (hash) {
    if (hash in PAGES) return hash as SectionId
    if (hash === 'colors') return 'warna'
    if (hash === 'typography') return 'tipografi'
    return 'not-found'
  }

  // 2. Check pathname (/manage, /theming, /components/button, /examples/login, etc.)
  const cleanPath = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase()
  if (!cleanPath) return 'introduction'

  if (cleanPath in PAGES) return cleanPath as SectionId

  // Extract last segment: /components/button -> button, /examples/login -> example-login
  const segments = cleanPath.split('/')
  const lastSegment = segments[segments.length - 1]

  if (lastSegment in PAGES) return lastSegment as SectionId
  if (`example-${lastSegment}` in PAGES) return `example-${lastSegment}` as SectionId

  // Common aliases
  if (lastSegment === 'colors') return 'warna'
  if (lastSegment === 'typography') return 'tipografi'

  return 'not-found'
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  )
}

function AppInner() {
  const [section, setSection] = useState<SectionId>(() => parseSectionFromUrl())
  const { lang } = useLang()
  const ActivePage = useMemo(() => PAGES[section] || PAGES['not-found'] || PAGES.introduction, [section])

  // Dynamic document title & meta tags per page
  useEffect(() => {
    const meta = PAGE_META[section] || PAGE_META.introduction
    const title = meta.title[lang] || meta.title.id
    document.title = `${title} — RelUX Design System KAI`

    const desc = meta.desc[lang] || meta.desc.id
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', desc)
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', `${title} — RelUX Design System KAI`)
    }

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) {
      ogDesc.setAttribute('content', desc)
    }
  }, [section, lang])

  useEffect(() => {
    const handlePopState = () => {
      setSection(parseSectionFromUrl())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (next: SectionId, pushState = true) => {
    setSection(next)
    if (pushState && typeof window !== 'undefined') {
      const targetPath = next === 'introduction' ? '/' : `/${next}`
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ section: next }, '', targetPath)
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <DocsLayout active={section} onNavigate={navigate}>
      <div className="mx-auto max-w-3xl transition-opacity duration-200 ease-out animate-in fade-in-50">
        <Suspense fallback={null}>
          <ActivePage onNavigate={navigate} />
          {section !== 'not-found' && (
            <PageNavigation currentSection={section} onNavigate={navigate} />
          )}
        </Suspense>
      </div>
    </DocsLayout>
  )
}

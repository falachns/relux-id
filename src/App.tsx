import { lazy, Suspense, useEffect, useMemo, useState, type ComponentType } from 'react'
import { DocsLayout } from './components/docs/DocsLayout'
import { PAGE_ORDER, type SectionId } from './lib/nav'
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
}

function parseSectionFromUrl(): SectionId {
  if (typeof window === 'undefined') return 'introduction'

  // 1. Check hash first (#manage, #button, etc.)
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase()
  if (hash && hash in PAGES) return hash as SectionId

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

  return 'introduction'
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
  const ActivePage = useMemo(() => PAGES[section] || PAGES.introduction, [section])

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
      <div className="mx-auto max-w-3xl">
        <Suspense
          fallback={
            <div
              role="status"
              aria-label={lang === 'en' ? 'Loading documentation…' : 'Memuat dokumentasi…'}
              className="flex min-h-[60vh] flex-col items-center justify-center gap-4 animate-[fadeIn_0.3s_ease-in]"
            >
              <svg
                className="size-7 animate-spin text-primary opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <div className="space-y-3 w-full max-w-xl px-4">
                <div className="h-8 w-2/3 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-3 w-full rounded-lg bg-slate-100 dark:bg-slate-800/60 animate-pulse delay-75" />
                <div className="h-3 w-5/6 rounded-lg bg-slate-100 dark:bg-slate-800/60 animate-pulse delay-100" />
                <div className="h-3 w-4/6 rounded-lg bg-slate-100 dark:bg-slate-800/60 animate-pulse delay-150" />
              </div>
              <span className="sr-only">
                {lang === 'en' ? 'Loading documentation…' : 'Memuat dokumentasi…'}
              </span>
            </div>
          }
        >
          <ActivePage onNavigate={navigate} />
          <PageNavigation currentSection={section} onNavigate={navigate} />
        </Suspense>
      </div>
    </DocsLayout>
  )
}


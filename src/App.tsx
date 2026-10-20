import { lazy, Suspense, useMemo, useState, type ComponentType } from 'react'
import { DocsLayout } from './components/docs/DocsLayout'
import { PAGE_ORDER, type SectionId } from './lib/nav'
import { LangProvider, useLang } from './lib/i18n'

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

import { PageNavigation } from './components/docs/PageNavigation'

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  )
}

function AppInner() {
  const [section, setSection] = useState<SectionId>('introduction')
  const { lang } = useLang()
  const ActivePage = useMemo(() => PAGES[section], [section])

  const navigate = (next: SectionId) => {
    setSection(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <DocsLayout active={section} onNavigate={navigate}>
      <div className="mx-auto max-w-3xl">
        <Suspense
          fallback={
            <div role="status" className="relux-card p-6 text-sm text-muted-foreground">
              {lang === 'en' ? 'Loading documentation…' : 'Memuat dokumentasi…'}
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

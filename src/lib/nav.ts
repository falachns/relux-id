import type { Status } from '../components/docs/StatusBadge'

export type SectionId =
  | 'introduction'
  | 'getting-started'
  | 'cli'
  | 'changelog'
  | 'logo'
  | 'warna'
  | 'tipografi'
  | 'spacing'
  | 'radius'
  | 'accordion'
  | 'button'
  | 'state'
  | 'icon'
  | 'form'
  | 'badge'
  | 'alert'
  | 'card'
  | 'avatar'
  | 'navigation'
  | 'table'
  | 'progress'
  | 'modal'
  | 'app-ui'
  | 'example-dashboard'
  | 'example-landing'
  | 'example-google-auth'
  | 'example-login'
  | 'example-settings'
  | 'theming'
  | 'manage'

export type NavItem = {
  id: string
  label: string
  labelEn: string
  /** Live sections are navigable; others are placeholders for the roadmap. */
  section?: SectionId
  status?: Status
  soon?: boolean
}

export type NavGroup = {
  label: string
  labelEn: string
  items: NavItem[]
}

export const NAV: NavGroup[] = [
  {
    label: 'Memulai',
    labelEn: 'Getting started',
    items: [
      { id: 'introduction', label: 'Pengenalan', labelEn: 'Introduction', section: 'introduction' },
      { id: 'getting-started', label: 'Mulai menggunakan', labelEn: 'Getting started', section: 'getting-started' },
      { id: 'cli', label: 'CLI & Tools', labelEn: 'CLI & tools', section: 'cli', status: 'stable' },
      { id: 'changelog', label: 'Catatan Rilis', labelEn: 'Release notes', section: 'changelog', status: 'stable' },
    ],
  },
  {
    label: 'Merek',
    labelEn: 'Brand',
    items: [{ id: 'logo', label: 'Logo', labelEn: 'Logo', section: 'logo' }],
  },
  {
    // Order follows the kit: Colors, Typography, Spacing & Grid, Iconography.
    label: 'Fondasi',
    labelEn: 'Foundations',
    items: [
      { id: 'colors', label: 'Warna', labelEn: 'Colors', section: 'warna' },
      { id: 'typography', label: 'Tipografi', labelEn: 'Typography', section: 'tipografi' },
      { id: 'spacing', label: 'Spacing & Grid', labelEn: 'Spacing & grid', section: 'spacing' },
      { id: 'radius', label: 'Radius & Shadow', labelEn: 'Radius & shadow', section: 'radius' },
      { id: 'icon', label: 'Ikonografi', labelEn: 'Iconography', section: 'icon' },
      { id: 'state', label: 'State', labelEn: 'States', section: 'state' },
      { id: 'theming', label: 'Theming & Kontras', labelEn: 'Theming & contrast', section: 'theming', status: 'stable' },
    ],
  },
  {
    // Order follows the kit ComponentsPage navigation.
    label: 'Komponen',
    labelEn: 'Components',
    items: [
      { id: 'button', label: 'Button', labelEn: 'Button', section: 'button', status: 'stable' },
      { id: 'form', label: 'Form Controls', labelEn: 'Form controls', section: 'form', status: 'stable' },
      { id: 'badge', label: 'Badges & Tags', labelEn: 'Badges & tags', section: 'badge', status: 'stable' },
      { id: 'alert', label: 'Alert & Banner', labelEn: 'Alert & banner', section: 'alert', status: 'stable' },
      { id: 'card', label: 'Cards', labelEn: 'Cards', section: 'card', status: 'stable' },
      { id: 'table', label: 'Data Table', labelEn: 'Data table', section: 'table', status: 'stable' },
      { id: 'navigation', label: 'Navigation', labelEn: 'Navigation', section: 'navigation', status: 'stable' },
      { id: 'accordion', label: 'Accordion', labelEn: 'Accordion', section: 'accordion', status: 'stable' },
      { id: 'modal', label: 'Modal & Dialog', labelEn: 'Modal & dialog', section: 'modal', status: 'stable' },
      { id: 'avatar', label: 'Avatars', labelEn: 'Avatars', section: 'avatar', status: 'stable' },
      { id: 'progress', label: 'Progress', labelEn: 'Progress', section: 'progress', status: 'stable' },
      { id: 'app-ui', label: 'App UI Components', labelEn: 'App UI components', section: 'app-ui', status: 'beta' },
    ],
  },
  {
    label: 'Contoh',
    labelEn: 'Examples',
    items: [
      {
        id: 'example-dashboard',
        label: 'Dashboard Operasi',
        labelEn: 'Operations dashboard',
        section: 'example-dashboard',
        status: 'stable',
      },
      {
        id: 'example-landing',
        label: 'Landing Page KAI',
        labelEn: 'KAI landing page',
        section: 'example-landing',
        status: 'stable',
      },
      {
        id: 'example-google-auth',
        label: 'Panduan Google Auth',
        labelEn: 'Google Auth guide',
        section: 'example-google-auth',
        status: 'stable',
      },
      {
        id: 'example-login',
        label: 'Portal Masuk & SSO',
        labelEn: 'Sign In & SSO portal',
        section: 'example-login',
        status: 'stable',
      },
      {
        id: 'example-settings',
        label: 'Pengaturan & Preferensi',
        labelEn: 'Settings & preferences',
        section: 'example-settings',
        status: 'stable',
      },
    ],
  },
  {
    label: 'Manajemen',
    labelEn: 'Management',
    items: [
      {
        id: 'manage',
        label: 'Change Requests & Revisi',
        labelEn: 'Change requests & revisions',
        section: 'manage',
        status: 'beta',
      },
    ],
  },
]

/** Live pages in sidebar order; drives the automatic "Next" link. */
export const PAGE_ORDER = NAV.flatMap((g) => g.items).filter((i) => i.section)

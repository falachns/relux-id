import { useState } from 'react'
import { Section } from '../components/docs/Section'
import { ComponentCode } from '../components/docs/ComponentCode'
import { ComponentPage, Demo, A11yList, Code } from '../components/docs/ComponentPage'
import { Breadcrumb, Tabs, Pagination } from '../components/ui'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type PageCopy = {
  title: string
  description: string
  breadcrumbTitle: string
  tabsPillTitle: string
  tabsUnderlineTitle: string
  paginationTitle: string
  codeTitle: string
  a11yTitle: string
  breadcrumbHome: string
  breadcrumbBooking: string
  breadcrumbSeat: string
  tabSchedule: string
  tabScheduleContent: string
  tabDelay: string
  tabDelayContent: string
  tabSettings: string
  tabSettingsContent: string
  tabsPillAria: string
  tabsUnderlineAria: string
  paginationAria: string
  a11y1: string
  a11y2: string
  a11y3: string
  a11y4: string
}

const COPY = {
  id: {
    title: 'Navigation',
    description: 'Pola navigasi untuk berpindah antar halaman dan panel: breadcrumb, tabs, dan paginasi.',
    breadcrumbTitle: 'Breadcrumb',
    tabsPillTitle: 'Tabs pill',
    tabsUnderlineTitle: 'Tabs underline',
    paginationTitle: 'Paginasi',
    codeTitle: 'Contoh kode',
    a11yTitle: 'Aksesibilitas',
    breadcrumbHome: 'Beranda',
    breadcrumbBooking: 'Pemesanan',
    breadcrumbSeat: 'Pilih kursi',
    tabSchedule: 'Jadwal kereta',
    tabScheduleContent: 'Jadwal kereta api antarkota dan komuter diperbarui secara real-time.',
    tabDelay: 'Keterlambatan',
    tabDelayContent: 'Informasi keterlambatan dan perubahan peron stasiun.',
    tabSettings: 'Pengaturan',
    tabSettingsContent: 'Preferensi notifikasi dan akun penumpang.',
    tabsPillAria: 'Contoh tabs pill',
    tabsUnderlineAria: 'Contoh tabs underline',
    paginationAria: 'Paginasi jadwal kereta',
    a11y1: 'Tabs memakai roving tabindex; panah kiri/kanan, Home, dan End berpindah tab.',
    a11y2: 'Breadcrumb dan paginasi berada di nav dengan aria-label unik.',
    a11y3: 'Item aktif ditandai aria-current="page".',
    a11y4: 'Tombol panah paginasi punya label teks dan dinonaktifkan di ujung halaman.',
  },
  en: {
    title: 'Navigation',
    description: 'Wayfinding patterns to transition across hierarchy, panels, and paginated records: breadcrumbs, tabs, and pagination.',
    breadcrumbTitle: 'Breadcrumb',
    tabsPillTitle: 'Pill tabs',
    tabsUnderlineTitle: 'Underline tabs',
    paginationTitle: 'Pagination',
    codeTitle: 'Code example',
    a11yTitle: 'Accessibility',
    breadcrumbHome: 'Home',
    breadcrumbBooking: 'Booking',
    breadcrumbSeat: 'Select seat',
    tabSchedule: 'Train schedule',
    tabScheduleContent: 'Intercity and commuter train schedules refreshed in real time.',
    tabDelay: 'Delays',
    tabDelayContent: 'Delay announcements and platform track reassignment information.',
    tabSettings: 'Settings',
    tabSettingsContent: 'Notification preferences and passenger account details.',
    tabsPillAria: 'Pill tabs demonstration',
    tabsUnderlineAria: 'Underline tabs demonstration',
    paginationAria: 'Train schedule pagination',
    a11y1: 'Tabs follow roving tabindex; Arrow keys, Home, and End cycle through tabs.',
    a11y2: 'Breadcrumbs and pagination reside within nav landmarks with unique aria-label.',
    a11y3: 'Active navigational location is declared via aria-current="page".',
    a11y4: 'Directional pagination buttons include readable text and disable at endpoints.',
  },
} satisfies Localized<PageCopy>

export function NavigationPage({ onNavigate }: { onNavigate?: (s: SectionId) => void }) {
  const [currentPage, setCurrentPage] = useState(2)
  const copy = useLocalized(COPY)

  const tabItems = [
    {
      label: copy.tabSchedule,
      content: <p className="text-sm text-foreground">{copy.tabScheduleContent}</p>,
    },
    {
      label: copy.tabDelay,
      content: <p className="text-sm text-foreground">{copy.tabDelayContent}</p>,
    },
    {
      label: copy.tabSettings,
      content: <p className="text-sm text-foreground">{copy.tabSettingsContent}</p>,
    },
  ]

  return (
    <ComponentPage
      title={copy.title}
      description={copy.description}
    >
      <Section id="breadcrumb" title={copy.breadcrumbTitle}>
        <Demo>
          <Breadcrumb
            items={[
              { label: copy.breadcrumbHome, href: '#' },
              { label: copy.breadcrumbBooking, href: '#' },
              { label: copy.breadcrumbSeat },
            ]}
          />
        </Demo>
      </Section>

      <Section id="tabs-pill" title={copy.tabsPillTitle}>
        <Demo>
          <Tabs items={tabItems} variant="pill" ariaLabel={copy.tabsPillAria} />
        </Demo>
      </Section>

      <Section id="tabs-underline" title={copy.tabsUnderlineTitle}>
        <Demo>
          <Tabs items={tabItems} variant="underline" ariaLabel={copy.tabsUnderlineAria} />
        </Demo>
      </Section>

      <Section id="paginasi" title={copy.paginationTitle}>
        <Demo>
          <Pagination
            page={currentPage}
            total={5}
            onPageChange={setCurrentPage}
            ariaLabel={copy.paginationAria}
          />
        </Demo>
      </Section>

      <Section id="contoh-kode" title={copy.codeTitle}>
        <ComponentCode component="navigation" />
      </Section>

      <Section id="aksesibilitas" title={copy.a11yTitle}>
        <A11yList
          items={[
            <>
              {copy.a11y1.split('Home')[0]}
              <Code>Home</Code>
              {copy.a11y1.split('Home')[1]?.split('End')[0]}
              <Code>End</Code>
              {copy.a11y1.split('End')[1] ?? ''}
            </>,
            <>
              {copy.a11y2.split('nav')[0]}
              <Code>nav</Code>
              {copy.a11y2.split('nav')[1]?.split('aria-label')[0]}
              <Code>aria-label</Code>
              {copy.a11y2.split('aria-label')[1] ?? ''}
            </>,
            <>
              {copy.a11y3.split('aria-current="page"')[0]}
              <Code>aria-current="page"</Code>
              {copy.a11y3.split('aria-current="page"')[1] ?? ''}
            </>,
            copy.a11y4,
          ]}
        />
      </Section>
    </ComponentPage>
  )
}

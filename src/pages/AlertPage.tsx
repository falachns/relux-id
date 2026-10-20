import { useState } from 'react'
import { Section } from '../components/docs/Section'
import { ComponentCode } from '../components/docs/ComponentCode'
import { ComponentPage, Demo, A11yList, Code } from '../components/docs/ComponentPage'
import { Alert, type AlertTone } from '../components/ui'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type PageCopy = {
  title: string
  description: string
  typesTitle: string
  bannerTitle: string
  codeTitle: string
  a11yTitle: string
  bannerText: string
  showBannerAgain: string
  closeBannerAria: string
  alerts: { tone: AlertTone; title: string; body: string }[]
  a11y1: string
  a11y2: string
  a11y3: string
  a11y4: string
}

const COPY = {
  id: {
    title: 'Alert & Banner',
    description: 'Pesan kontekstual untuk memberi tahu status sistem. Alert berada di dalam konten; banner berada di atas halaman.',
    typesTitle: 'Jenis alert',
    bannerTitle: 'Banner',
    codeTitle: 'Contoh kode',
    a11yTitle: 'Aksesibilitas',
    bannerText: 'Pemeliharaan sistem Minggu, 02.00–04.00 WIB. Selama itu, pemesanan tiket tidak tersedia.',
    showBannerAgain: 'Tampilkan banner lagi',
    closeBannerAria: 'Tutup banner',
    alerts: [
      { tone: 'info', title: 'Info', body: 'Boarding dibuka 60 menit sebelum keberangkatan.' },
      { tone: 'success', title: 'Berhasil', body: 'Pembayaran diterima. E-tiket dikirim ke email Anda.' },
      { tone: 'warning', title: 'Peringatan', body: 'KA Argo Bromo Anggrek terlambat sekitar 15 menit.' },
      { tone: 'danger', title: 'Gagal', body: 'Pembayaran belum berhasil. Periksa saldo Anda, lalu coba lagi.' },
    ],
    a11y1: 'Pesan gagal memakai role="alert"; info lain memakai role="status".',
    a11y2: 'Setiap alert punya ikon dan judul teks, tidak hanya warna.',
    a11y3: 'Tombol tutup punya aria-label dan area klik minimum 32px.',
    a11y4: 'Pesan error menjelaskan cara memperbaiki, tanpa kata "Oops".',
  },
  en: {
    title: 'Alert & Banner',
    description: 'Contextual messages communicating system status. Alerts live within page content; banners sit across the top.',
    typesTitle: 'Alert types',
    bannerTitle: 'Banner',
    codeTitle: 'Code example',
    a11yTitle: 'Accessibility',
    bannerText: 'System maintenance on Sunday, 02:00–04:00 WIB. Ticket booking will be unavailable during this window.',
    showBannerAgain: 'Show banner again',
    closeBannerAria: 'Dismiss banner',
    alerts: [
      { tone: 'info', title: 'Info', body: 'Boarding opens 60 minutes prior to scheduled departure.' },
      { tone: 'success', title: 'Success', body: 'Payment received. Your e-ticket has been sent to your email.' },
      { tone: 'warning', title: 'Warning', body: 'KA Argo Bromo Anggrek is delayed by approximately 15 minutes.' },
      { tone: 'danger', title: 'Failed', body: 'Payment failed. Please verify your balance and try again.' },
    ],
    a11y1: 'Failure messages use role="alert"; others use role="status".',
    a11y2: 'Every alert includes an icon and clear heading text, not color alone.',
    a11y3: 'Close buttons have descriptive aria-label and a comfortable touch target.',
    a11y4: 'Error messages explain actionable resolution steps constructively.',
  },
} satisfies Localized<PageCopy>

export function AlertPage({ onNavigate }: { onNavigate?: (s: SectionId) => void }) {
  const [banner, setBanner] = useState(true)
  const copy = useLocalized(COPY)

  return (
    <ComponentPage
      title={copy.title}
      description={copy.description}
    >
      <Section id="jenis-alert" title={copy.typesTitle}>
        <Demo className="space-y-3">
          {copy.alerts.map(({ tone, title, body }) => (
            <Alert key={title} tone={tone} title={title}>
              {body}
            </Alert>
          ))}
        </Demo>
      </Section>

      <Section id="banner" title={copy.bannerTitle}>
        <Demo>
          {banner ? (
            <Alert
              variant="banner"
              dismissible
              onDismiss={() => setBanner(false)}
              closeAriaLabel={copy.closeBannerAria}
            >
              {copy.bannerText}
            </Alert>
          ) : (
            <button
              type="button"
              onClick={() => setBanner(true)}
              className="text-sm font-medium text-primary underline"
            >
              {copy.showBannerAgain}
            </button>
          )}
        </Demo>
      </Section>

      <Section id="contoh-kode" title={copy.codeTitle}>
        <ComponentCode component="alert" />
      </Section>

      <Section id="aksesibilitas" title={copy.a11yTitle}>
        <A11yList
          items={[
            <>
              {copy.a11y1.split('role="alert"')[0]}
              <Code>role="alert"</Code>
              {copy.a11y1.split('role="alert"')[1]?.split('role="status"')[0]}
              <Code>role="status"</Code>
              {copy.a11y1.split('role="status"')[1] ?? ''}
            </>,
            copy.a11y2,
            <>
              {copy.a11y3.split('aria-label')[0]}
              <Code>aria-label</Code>
              {copy.a11y3.split('aria-label')[1] ?? ''}
            </>,
            copy.a11y4,
          ]}
        />
      </Section>
    </ComponentPage>
  )
}

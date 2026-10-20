import { Section } from '../components/docs/Section'
import { ComponentCode } from '../components/docs/ComponentCode'
import { PropsTable } from '../components/docs/PropsTable'
import { ComponentPage, Demo, A11yList } from '../components/docs/ComponentPage'
import { Badge, type BadgeTone } from '../components/ui'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type PageCopy = {
  title: string
  description: string
  statusTitle: string
  outlineTitle: string
  subBrandTitle: string
  numbersTitle: string
  codeTitle: string
  tokensTitle: string
  a11yTitle: string
  notificationLabel: string
  unreadSrText: string
  onlineLabel: string
  newBadgeLabel: string
  statuses: { tone: BadgeTone; label: string }[]
  outlineBadges: { tone: BadgeTone; label: string }[]
  a11yItems: string[]
}

const COPY = {
  id: {
    title: 'Badges & Tags',
    description: 'Label ringkas untuk status perjalanan, kelas kereta, dan jumlah notifikasi. Warna selalu didampingi teks atau ikon.',
    statusTitle: 'Badge status',
    outlineTitle: 'Badge outline',
    subBrandTitle: 'Sub-brand tones',
    numbersTitle: 'Badge angka & titik',
    codeTitle: 'Contoh kode',
    tokensTitle: 'Token',
    a11yTitle: 'Aksesibilitas',
    notificationLabel: 'Notifikasi',
    unreadSrText: 'belum dibaca',
    onlineLabel: 'Online',
    newBadgeLabel: 'Baru',
    statuses: [
      { tone: 'success', label: 'Tepat waktu' },
      { tone: 'warning', label: 'Terlambat' },
      { tone: 'danger', label: 'Dibatalkan' },
      { tone: 'info', label: 'Dalam perjalanan' },
      { tone: 'neutral', label: 'Dijadwalkan' },
    ],
    outlineBadges: [
      { tone: 'neutral', label: 'Ekonomi' },
      { tone: 'info', label: 'Bisnis' },
      { tone: 'success', label: 'Eksekutif' },
      { tone: 'warning', label: 'Luxury' },
    ],
    a11yItems: [
      'Status tidak hanya dibedakan lewat warna; selalu ada teks.',
      'Badge angka menyertakan teks sr-only, misalnya "12 belum dibaca".',
      'Badge bukan kontrol. Jangan beri onClick; pakai Button bila perlu aksi.',
    ],
  },
  en: {
    title: 'Badges & Tags',
    description: 'Compact labels for journey status, train class, and notification count. Colors are always accompanied by text or icons.',
    statusTitle: 'Status badges',
    outlineTitle: 'Outline badges',
    subBrandTitle: 'Sub-brand tones',
    numbersTitle: 'Number & dot badges',
    codeTitle: 'Code example',
    tokensTitle: 'Tokens',
    a11yTitle: 'Accessibility',
    notificationLabel: 'Notifications',
    unreadSrText: 'unread',
    onlineLabel: 'Online',
    newBadgeLabel: 'New',
    statuses: [
      { tone: 'success', label: 'On time' },
      { tone: 'warning', label: 'Delayed' },
      { tone: 'danger', label: 'Cancelled' },
      { tone: 'info', label: 'In transit' },
      { tone: 'neutral', label: 'Scheduled' },
    ],
    outlineBadges: [
      { tone: 'neutral', label: 'Economy' },
      { tone: 'info', label: 'Business' },
      { tone: 'success', label: 'Executive' },
      { tone: 'warning', label: 'Luxury' },
    ],
    a11yItems: [
      'Statuses are never communicated solely by color; text is always provided.',
      'Number badges include sr-only text, for example "12 unread".',
      'Badges are not interactive controls. Do not attach onClick; use Button for actions.',
    ],
  },
} satisfies Localized<PageCopy>

export function BadgePage({ onNavigate }: { onNavigate?: (s: SectionId) => void }) {
  const copy = useLocalized(COPY)

  return (
    <ComponentPage
      title={copy.title}
      description={copy.description}
    >
      <Section id="badge-status" title={copy.statusTitle}>
        <Demo className="flex flex-wrap gap-2">
          {copy.statuses.map((s) => (
            <Badge key={s.label} tone={s.tone} variant="soft" dot>
              {s.label}
            </Badge>
          ))}
        </Demo>
      </Section>

      <Section id="badge-outline" title={copy.outlineTitle}>
        <Demo className="flex flex-wrap gap-2">
          {copy.outlineBadges.map((item) => (
            <Badge key={item.label} variant="outline" tone={item.tone}>
              {item.label}
            </Badge>
          ))}
        </Demo>
      </Section>

      <Section id="sub-brand-tones" title={copy.subBrandTitle}>
        <Demo className="flex flex-wrap gap-2">
          <Badge tone="kai" variant="soft">KAI</Badge>
          <Badge tone="esa" variant="soft">ESA</Badge>
          <Badge tone="commuter" variant="soft">Commuter</Badge>
          <Badge tone="bandara" variant="soft">Bandara</Badge>
          <Badge tone="logistik" variant="soft">Logistik</Badge>
        </Demo>
      </Section>

      <Section id="badge-angka-titik" title={copy.numbersTitle}>
        <Demo className="flex flex-wrap items-center gap-6">
          <span className="relative inline-flex items-center gap-2 text-sm text-foreground">
            {copy.notificationLabel}
            <Badge.Count count={12} srText={copy.unreadSrText} />
          </span>
          <Badge dot tone="success" variant="soft">
            {copy.onlineLabel}
          </Badge>
          <Badge tone="esa" variant="solid">{copy.newBadgeLabel}</Badge>
        </Demo>
      </Section>

      <Section id="contoh-kode" title={copy.codeTitle}>
        <ComponentCode component="badge" />
      </Section>

      <Section id="token" title={copy.tokensTitle}>
        <PropsTable
          columns={[{ key: 'tone', header: 'Tone', mono: true }, { key: 'token', header: 'Token', mono: true }]}
          rows={[
            { tone: 'success', token: '--colors/foreground/fg-success-primary / --colors/background/bg-success-primary' },
            { tone: 'warning', token: '--colors/foreground/fg-warning-primary / --colors/background/bg-warning-primary' },
            { tone: 'danger', token: '--colors/foreground/fg-error-primary / --colors/background/bg-error-primary' },
            { tone: 'info', token: '--primary / --colors/background/bg-brand-primary' },
            { tone: 'neutral', token: '--muted / --muted-foreground' },
          ]}
        />
      </Section>

      <Section id="aksesibilitas" title={copy.a11yTitle}>
        <A11yList items={copy.a11yItems} />
      </Section>
    </ComponentPage>
  )
}

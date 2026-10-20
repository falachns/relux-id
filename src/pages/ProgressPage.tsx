import { Section } from '../components/docs/Section'
import { ComponentCode } from '../components/docs/ComponentCode'
import { ComponentPage, Demo, A11yList, Code } from '../components/docs/ComponentPage'
import { Progress, Spinner, Skeleton, Button, Card } from '../components/ui'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type PageCopy = {
  title: string
  description: string
  barTitle: string
  indeterminateTitle: string
  spinnerTitle: string
  skeletonTitle: string
  codeTitle: string
  a11yTitle: string
  labelProfile: string
  labelUpload: string
  labelVerify: string
  labelSync: string
  spinnerSchedule: string
  buttonProcessing: string
  a11y1: string
  a11y2: string
  a11y3: string
}

const COPY = {
  id: {
    title: 'Progress',
    description: 'Indikator kemajuan proses: progress bar untuk proses terukur, spinner dan skeleton untuk proses tanpa durasi pasti.',
    barTitle: 'Progress bar',
    indeterminateTitle: 'Progress indeterminate',
    spinnerTitle: 'Spinner',
    skeletonTitle: 'Skeleton',
    codeTitle: 'Contoh kode',
    a11yTitle: 'Aksesibilitas',
    labelProfile: 'Penyelesaian Profil',
    labelUpload: 'Upload Dokumen',
    labelVerify: 'Verifikasi Data',
    labelSync: 'Menyinkronkan data perjalanan…',
    spinnerSchedule: 'Memuat jadwal…',
    buttonProcessing: 'Memproses pembayaran…',
    a11y1: 'Progress bar memakai role="progressbar" dengan nilai min, max, dan saat ini.',
    a11y2: 'Spinner dibungkus role="status" dan teks deskriptif yang terbaca screen reader.',
    a11y3: 'Animasi memakai utility motion-safe untuk menghormati preferensi reduced motion.',
  },
  en: {
    title: 'Progress',
    description: 'Progress indicators: determinate progress bars for measurable tasks, alongside spinners and skeletons for indeterminate wait states.',
    barTitle: 'Progress bar',
    indeterminateTitle: 'Indeterminate progress',
    spinnerTitle: 'Spinner',
    skeletonTitle: 'Skeleton placeholder',
    codeTitle: 'Code example',
    a11yTitle: 'Accessibility',
    labelProfile: 'Profile Completion',
    labelUpload: 'Document Upload',
    labelVerify: 'Data Verification',
    labelSync: 'Synchronizing journey data…',
    spinnerSchedule: 'Loading schedule…',
    buttonProcessing: 'Processing payment…',
    a11y1: 'Progress bars use role="progressbar" with min, max, and now attributes.',
    a11y2: 'Spinners are wrapped in role="status" accompanied by readable screen-reader text.',
    a11y3: 'Animations apply motion-safe utilities respecting reduced motion system preferences.',
  },
} satisfies Localized<PageCopy>

export function ProgressPage({ onNavigate }: { onNavigate?: (s: SectionId) => void }) {
  const copy = useLocalized(COPY)

  return (
    <ComponentPage
      title={copy.title}
      description={copy.description}
    >
      <Section id="progress-bar" title={copy.barTitle}>
        <Demo className="space-y-5">
          <Progress label={copy.labelProfile} value={75} showValue tone="primary" />
          <Progress label={copy.labelUpload} value={45} showValue tone="warning" />
          <Progress label={copy.labelVerify} value={100} showValue tone="success" />
        </Demo>
      </Section>

      <Section id="progress-indeterminate" title={copy.indeterminateTitle}>
        <Demo>
          <Progress indeterminate label={copy.labelSync} />
        </Demo>
      </Section>

      <Section id="spinner" title={copy.spinnerTitle}>
        <Demo className="flex flex-wrap items-center gap-8">
          <Spinner size="md" label={copy.spinnerSchedule} />
          <Button disabled loading>
            {copy.buttonProcessing}
          </Button>
        </Demo>
      </Section>

      <Section id="skeleton" title={copy.skeletonTitle}>
        <Demo>
          <Card variant="outlined" className="p-5 space-y-3">
            <Skeleton variant="rectangular" className="h-4 w-1/2" />
            <Skeleton variant="rectangular" className="h-3 w-3/4" />
            <Skeleton variant="rectangular" className="h-3 w-1/3" />
          </Card>
        </Demo>
      </Section>

      <Section id="contoh-kode" title={copy.codeTitle}>
        <ComponentCode component="progress" />
      </Section>

      <Section id="aksesibilitas" title={copy.a11yTitle}>
        <A11yList
          items={[
            <>
              {copy.a11y1.split('role="progressbar"')[0]}
              <Code>role="progressbar"</Code>
              {copy.a11y1.split('role="progressbar"')[1] ?? ''}
            </>,
            <>
              {copy.a11y2.split('role="status"')[0]}
              <Code>role="status"</Code>
              {copy.a11y2.split('role="status"')[1] ?? ''}
            </>,
            <>
              {copy.a11y3.split('motion-safe')[0]}
              <Code>motion-safe</Code>
              {copy.a11y3.split('motion-safe')[1] ?? ''}
            </>,
          ]}
        />
      </Section>
    </ComponentPage>
  )
}

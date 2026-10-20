import { Section } from '../components/docs/Section'
import { ComponentCode } from '../components/docs/ComponentCode'
import { PropsTable } from '../components/docs/PropsTable'
import { ComponentPage, Demo, A11yList } from '../components/docs/ComponentPage'
import { Avatar, type AvatarSize } from '../components/ui'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type PageCopy = {
  title: string
  description: string
  sizesTitle: string
  statusTitle: string
  groupTitle: string
  tableTitle: string
  codeTitle: string
  a11yTitle: string
  sizesHeader: string
  utilityHeader: string
  onlineStatus: string
  offlineStatus: string
  busyStatus: string
  a11yItems: string[]
}

const COPY = {
  id: {
    title: 'Avatars',
    description: 'Representasi visual pengguna atau petugas. Memakai inisial bila foto tidak tersedia.',
    sizesTitle: 'Ukuran avatar',
    statusTitle: 'Dengan status',
    groupTitle: 'Grup avatar',
    tableTitle: 'Spesifikasi ukuran',
    codeTitle: 'Contoh kode',
    a11yTitle: 'Aksesibilitas',
    sizesHeader: 'Ukuran',
    utilityHeader: 'Utility',
    onlineStatus: 'Online',
    offlineStatus: 'Offline',
    busyStatus: 'Busy',
    a11yItems: [
      'Avatar inisial punya nama lengkap sebagai label aksesibel, bukan sekadar inisial.',
      'Status online selalu disertai teks pembantu, tidak hanya titik warna.',
      'Foto avatar wajib punya atribut alt berisi nama pengguna atau jabatan petugas.',
    ],
  },
  en: {
    title: 'Avatars',
    description: 'Visual representation of users or personnel, displaying initials when photos are unavailable.',
    sizesTitle: 'Avatar sizes',
    statusTitle: 'With status indicator',
    groupTitle: 'Avatar group',
    tableTitle: 'Size specifications',
    codeTitle: 'Code example',
    a11yTitle: 'Accessibility',
    sizesHeader: 'Size',
    utilityHeader: 'Utility',
    onlineStatus: 'Online',
    offlineStatus: 'Offline',
    busyStatus: 'Busy',
    a11yItems: [
      'Initial avatars provide the full name as accessible label, never raw abbreviated characters.',
      'Online statuses are always accompanied by contextual helper text, not sole color dots.',
      'Avatar photographs must include alt text containing the user or personnel title.',
    ],
  },
} satisfies Localized<PageCopy>

const SIZES: { k: AvatarSize; label: string; c: string }[] = [
  { k: 'xs', label: 'XS (24px)', c: 'size-6' },
  { k: 'sm', label: 'SM (32px)', c: 'size-8' },
  { k: 'md', label: 'MD (40px)', c: 'size-10' },
  { k: 'lg', label: 'LG (48px)', c: 'size-12' },
  { k: 'xl', label: 'XL (64px)', c: 'size-16' },
  { k: '2xl', label: '2XL (80px)', c: 'size-20' },
]

export function AvatarPage({ onNavigate }: { onNavigate?: (s: SectionId) => void }) {
  const copy = useLocalized(COPY)
  const team = [
    { name: 'Budi Santoso' },
    { name: 'Siti Rahma' },
    { name: 'Agus Wibowo' },
    { name: 'Dewi Lestari' },
  ]

  return (
    <ComponentPage
      title={copy.title}
      description={copy.description}
    >
      <Section id="ukuran-avatar" title={copy.sizesTitle}>
        <Demo className="flex flex-wrap items-end gap-4">
          {SIZES.map((s) => (
            <div key={s.k} className="flex flex-col items-center gap-2">
              <Avatar name="Budi Santoso" size={s.k} />
              <span className="font-mono text-xs text-muted-foreground">{s.k.toUpperCase()}</span>
            </div>
          ))}
        </Demo>
      </Section>

      <Section id="dengan-status" title={copy.statusTitle}>
        <Demo className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <Avatar name="Siti Rahma" size="md" status="online" />
            <span className="text-sm text-foreground">
              Siti Rahma <span className="text-muted-foreground">· {copy.onlineStatus}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Avatar name="Agus Wibowo" size="md" status="offline" />
            <span className="text-sm text-foreground">
              Agus Wibowo <span className="text-muted-foreground">· {copy.offlineStatus}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Avatar name="Dewi Lestari" size="md" status="busy" />
            <span className="text-sm text-foreground">
              Dewi Lestari <span className="text-muted-foreground">· {copy.busyStatus}</span>
            </span>
          </div>
        </Demo>
      </Section>

      <Section id="grup-avatar" title={copy.groupTitle}>
        <Demo>
          <Avatar.Group max={3}>
            {team.map((m) => (
              <Avatar key={m.name} name={m.name} size="md" />
            ))}
          </Avatar.Group>
        </Demo>
      </Section>

      <Section id="spesifikasi-ukuran" title={copy.tableTitle}>
        <PropsTable
          columns={[{ key: 'label', header: copy.sizesHeader, mono: true }, { key: 'c', header: copy.utilityHeader, mono: true }]}
          rows={SIZES}
        />
      </Section>

      <Section id="contoh-kode" title={copy.codeTitle}>
        <ComponentCode component="avatar" />
      </Section>

      <Section id="aksesibilitas" title={copy.a11yTitle}>
        <A11yList items={copy.a11yItems} />
      </Section>
    </ComponentPage>
  )
}

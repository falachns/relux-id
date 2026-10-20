import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const registryDir = path.join(rootDir, 'registry/components')

const COMPONENTS = [
  {
    name: 'Button',
    slug: 'buttons',
    category: 'Actions',
    description: 'Tombol memicu aksi utama, sekunder, atau destruktif dalam alur aplikasi.',
    figmaNode: '124:4501',
    props: [
      { name: 'variant', type: 'primary | secondary | outline | ghost | destructive', default: 'primary' },
      { name: 'size', type: 'sm | md | lg', default: 'md' },
      { name: 'loading', type: 'boolean', default: 'false' },
      { name: 'disabled', type: 'boolean', default: 'false' }
    ],
    variants: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'brand-kai', 'brand-commuter', 'brand-bandara', 'brand-logistik', 'brand-wisata', 'brand-services']
  },
  {
    name: 'Input',
    slug: 'inputs',
    category: 'Form Controls',
    description: 'Field input teks tunggal untuk menangkap data pengguna.',
    figmaNode: '124:4620',
    props: [
      { name: 'type', type: 'text | email | password | number | date', default: 'text' },
      { name: 'isInvalid', type: 'boolean', default: 'false' },
      { name: 'disabled', type: 'boolean', default: 'false' }
    ],
    variants: ['default', 'focus', 'error', 'disabled']
  },
  {
    name: 'Badge',
    slug: 'badges',
    category: 'Indicators',
    description: 'Label ringkas untuk status perjalanan, kelas kereta, dan status sistem.',
    figmaNode: '124:4711',
    props: [
      { name: 'tone', type: 'primary | success | warning | danger | info | neutral', default: 'primary' },
      { name: 'variant', type: 'filled | outline', default: 'filled' },
      { name: 'size', type: 'sm | md', default: 'md' },
      { name: 'dot', type: 'boolean', default: 'false' }
    ],
    variants: ['filled', 'outline', 'with-dot', 'number-pill']
  },
  {
    name: 'Checkbox',
    slug: 'checkboxes',
    category: 'Form Controls',
    description: 'Memilih satu atau beberapa opsi dalam suatu grup.',
    figmaNode: '124:4800',
    props: [
      { name: 'checked', type: 'boolean', default: 'false' },
      { name: 'disabled', type: 'boolean', default: 'false' },
      { name: 'label', type: 'string', default: '-' }
    ],
    variants: ['default', 'checked', 'indeterminate', 'disabled']
  },
  {
    name: 'Toggle (Switch)',
    slug: 'toggles',
    category: 'Form Controls',
    description: 'Kontrol dwikeadaan aktif/nonaktif untuk preferensi atau setelan.',
    figmaNode: '124:4890',
    props: [
      { name: 'checked', type: 'boolean', default: 'false' },
      { name: 'disabled', type: 'boolean', default: 'false' },
      { name: 'label', type: 'string', default: '-' }
    ],
    variants: ['default', 'checked', 'disabled']
  },
  {
    name: 'Select (Dropdown)',
    slug: 'select',
    category: 'Form Controls',
    description: 'Dropdown pilihan opsi dari daftar panjang.',
    figmaNode: '124:4950',
    props: [
      { name: 'value', type: 'string', default: '-' },
      { name: 'disabled', type: 'boolean', default: 'false' },
      { name: 'isInvalid', type: 'boolean', default: 'false' }
    ],
    variants: ['default', 'focus', 'error', 'disabled']
  },
  {
    name: 'Tooltip',
    slug: 'tooltips',
    category: 'Feedback',
    description: 'Informasi kontekstual ringkas yang muncul saat hover atau fokus.',
    figmaNode: '124:5020',
    props: [
      { name: 'content', type: 'string', default: '-' },
      { name: 'placement', type: 'top | right | bottom | left', default: 'top' }
    ],
    variants: ['light', 'dark']
  },
  {
    name: 'Avatar',
    slug: 'avatars',
    category: 'Media',
    description: 'Representasi visual profil pengguna dengan foto atau inisial.',
    figmaNode: '124:5100',
    props: [
      { name: 'size', type: 'xs | sm | md | lg | xl | 2xl', default: 'md' },
      { name: 'src', type: 'string', default: '-' },
      { name: 'name', type: 'string', default: '-' },
      { name: 'status', type: 'online | offline', default: '-' }
    ],
    variants: ['image', 'initials', 'status-badge', 'group']
  },
  {
    name: 'Tag',
    slug: 'tags',
    category: 'Indicators',
    description: 'Elemen kategori atau metadata yang dapat difilter atau dihapus.',
    figmaNode: '124:5180',
    props: [
      { name: 'removable', type: 'boolean', default: 'false' },
      { name: 'tone', type: 'neutral | brand', default: 'neutral' }
    ],
    variants: ['default', 'removable']
  },
  {
    name: 'Alert',
    slug: 'alerts',
    category: 'Feedback',
    description: 'Pesan banner kontekstual untuk pemberitahuan status dan error.',
    figmaNode: '124:5250',
    props: [
      { name: 'tone', type: 'info | success | warning | danger', default: 'info' },
      { name: 'title', type: 'string', default: '-' },
      { name: 'dismissible', type: 'boolean', default: 'false' }
    ],
    variants: ['info', 'success', 'warning', 'danger']
  },
  {
    name: 'Stepper',
    slug: 'steppers',
    category: 'Application UI',
    description: 'Indikator langkah bertahap untuk alur pemesanan tiket atau verifikasi dinas.',
    figmaNode: '124:5320',
    props: [
      { name: 'orientation', type: 'horizontal | vertical', default: 'horizontal' },
      { name: 'steps', type: 'StepItem[]', default: '[]' }
    ],
    variants: ['horizontal', 'vertical', 'completed', 'current', 'error']
  },
  {
    name: 'Empty State',
    slug: 'empty-states',
    category: 'Application UI',
    description: 'Tampilan informatif saat data kosong, pencarian nirhasil, atau kendala jaringan.',
    figmaNode: '124:5380',
    props: [
      { name: 'variant', type: 'empty | search | error', default: 'empty' },
      { name: 'title', type: 'string', default: '-' },
      { name: 'description', type: 'string', default: '-' }
    ],
    variants: ['empty', 'search', 'error']
  },
  {
    name: 'File Upload',
    slug: 'file-uploads',
    category: 'Application UI',
    description: 'Area unggah dokumen reservasi, identitas penumpang, dan lampiran dinas.',
    figmaNode: '124:5420',
    props: [
      { name: 'accept', type: 'string', default: '.pdf,.png,.jpg' },
      { name: 'maxSizeMB', type: 'number', default: '10' },
      { name: 'multiple', type: 'boolean', default: 'true' }
    ],
    variants: ['dropzone', 'preview-list', 'error']
  },
  {
    name: 'Date Picker',
    slug: 'date-pickers',
    category: 'Application UI',
    description: 'Komponen pemilihan tanggal tunggal dan rentang tanggal perjalanan kereta api.',
    figmaNode: '124:5460',
    props: [
      { name: 'mode', type: 'single | range', default: 'single' },
      { name: 'placeholder', type: 'string', default: 'Pilih tanggal...' }
    ],
    variants: ['single', 'range', 'today-highlight']
  }
]

for (const comp of COMPONENTS) {
  const dir = path.join(registryDir, comp.slug)
  fs.mkdirSync(dir, { recursive: true })

  const manifest = {
    $schema: 'https://relux.kai.id/schema/component.json',
    name: comp.name,
    slug: comp.slug,
    version: '1.0.0',
    status: 'stable',
    category: comp.category,
    description: comp.description,
    figma: {
      file: 'Design System KAI v.1',
      node: comp.figmaNode
    },
    packages: {
      blade: 'kai/relux-ui',
      react: '@kai/relux-react',
      angular: '@kai/relux-angular',
      css: '@kai/relux-css'
    },
    dependencies: ['@kai/relux-css'],
    props: comp.props,
    variants: comp.variants
  }

  fs.writeFileSync(path.join(dir, 'component.json'), JSON.stringify(manifest, null, 2), 'utf8')
}

console.log(`Generated component manifests for ${COMPONENTS.length} components in registry/components/`)

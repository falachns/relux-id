import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outDir = path.join(rootDir, 'public/components')
fs.mkdirSync(outDir, { recursive: true })

const COMPONENTS = [
  { slug: 'button', name: 'Button', category: 'Actions', desc: 'Tombol pemicu aksi utama, sekunder, dan destruktif pada aplikasi KAI.' },
  { slug: 'accordion', name: 'Accordion', category: 'Disclosure', desc: 'Komponen lipat/buka konten dengan animasi dan aksesibilitas ARIA.' },
  { slug: 'form', name: 'Form Controls', category: 'Form', desc: 'Elemen input form aksesibel: text, password show/hide, select, textarea, checkbox, radio, switch.' },
  { slug: 'badge', name: 'Badges & Tags', category: 'Indicators', desc: 'Label ringkas untuk status perjalanan, kelas kereta, dan status sistem.' },
  { slug: 'alert', name: 'Alert & Banner', category: 'Feedback', desc: 'Pesan banner kontekstual untuk pemberitahuan status dan notifikasi error.' },
  { slug: 'card', name: 'Cards', category: 'Surfaces', desc: 'Kontainer informasi terkelompok untuk jadwal, profil, dan statistik.' },
  { slug: 'table', name: 'Data Table', category: 'Data Display', desc: 'Tabel data terstruktur dengan pencarian, sorting, status badges, dan paginasi.' },
  { slug: 'navigation', name: 'Navigation', category: 'Navigation', desc: 'Pola navigasi antar halaman dan panel: breadcrumbs, tabs, dan pagination.' },
  { slug: 'modal', name: 'Modal & Dialog', category: 'Overlays', desc: 'Dialog modal berbasis native HTML5 dialog dengan focus trap dan escape handler.' },
  { slug: 'avatar', name: 'Avatars', category: 'Media', desc: 'Representasi visual profil pengguna dengan inisial fallback dan status online.' },
  { slug: 'progress', name: 'Progress & Loaders', category: 'Feedback', desc: 'Progress bar linear, spinner berputar, dan skeleton shimmer placeholder.' },
  { slug: 'app-ui', name: 'App UI Components', category: 'Patterns', desc: 'Widget pemesanan tiket KAI dan sidebar navigation cards.' },
]

for (const comp of COMPONENTS) {
  const md = `# RelUX by KAI — ${comp.name}
> ${comp.desc}

- **Kategori:** ${comp.category}
- **Status:** Stable (Make Kit KAI v1)
- **Paket Resmi:**
  - Blade: \`kai/relux-ui\` (\`<x-relux::${comp.slug}>\`)
  - React: \`@kai/relux-react\` (\`<${comp.name} />\`)
  - Angular: \`@kai/relux-angular\` (\`relux-${comp.slug}\`)
  - CSS: \`@kai/relux-css\` (\`.relux-${comp.slug}\`)

## Standar Penggunaan
- Selalu gunakan token semantik Make Kit KAI (\`--colors/kai/...\`, \`--radius-...\`, \`--spacing-...\`).
- Hindari inline style dan arbitrary classes.
- Pertahankan touch target minimal 44x44px pada layar mobile.
- Pastikan interaksi keyboard (Tab, Enter, Space, Escape, Arrow keys) berfungsi penuh.
`
  fs.writeFileSync(path.join(outDir, `${comp.slug}.md`), md, 'utf8')
}

console.log(`Generated ${COMPONENTS.length} AI markdown files in public/components/`)

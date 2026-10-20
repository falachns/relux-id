import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const baseDir = resolve(root, 'src/examples/components')

const cssImport = `@import "@make-kits/design-system-kai-v-1/style.css";
@import "@/styles/components.css";`

const components = {
  button: {
    react: `import { Button } from '@/components/ui'

export function ButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Pesan tiket</Button>
      <Button variant="secondary">Cek jadwal</Button>
      <Button variant="outline">Detail rute</Button>
      <Button variant="brand-kai">KAI Brand</Button>
    </div>
  )
}
`,
    html: `<div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center;">
  <button class="relux-button relux-button--primary relux-focus">
    Pesan tiket
  </button>
  <button class="relux-button relux-button--secondary relux-focus">
    Cek jadwal
  </button>
  <button class="relux-button relux-button--outline relux-focus">
    Detail rute
  </button>
  <button class="relux-button relux-button--brand-kai relux-focus">
    KAI Brand
  </button>
</div>`,
    css: cssImport,
    js: `// Button doesn't require native JavaScript for basic interaction.
document.querySelectorAll('.relux-button').forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('Button clicked:', btn.textContent.trim())
  })
})`,
  },

  accordion: {
    react: `import { Accordion } from '@/components/ui'

export function AccordionExample() {
  return (
    <Accordion defaultValue="booking">
      <Accordion.Item value="booking" title="Bagaimana cara memesan tiket?">
        Pilih stasiun asal dan tujuan, tanggal keberangkatan, kelas kereta, lalu selesaikan pembayaran.
      </Accordion.Item>
      <Accordion.Item value="cancel" title="Apakah tiket bisa dibatalkan?">
        Pembatalan tiket dapat dilakukan maksimal 2 jam sebelum keberangkatan melalui loket atau aplikasi.
      </Accordion.Item>
    </Accordion>
  )
}
`,
    html: `<div class="relux-accordion">
  <div class="relux-accordion__item">
    <button class="relux-accordion__trigger" aria-expanded="true" aria-controls="panel-1">
      <span>Bagaimana cara memesan tiket?</span>
      <span aria-hidden="true">▾</span>
    </button>
    <div id="panel-1" class="relux-accordion__panel" role="region">
      Pilih stasiun asal dan tujuan, tanggal keberangkatan, kelas kereta, lalu selesaikan pembayaran.
    </div>
  </div>
  <div class="relux-accordion__item">
    <button class="relux-accordion__trigger" aria-expanded="false" aria-controls="panel-2">
      <span>Apakah tiket bisa dibatalkan?</span>
      <span aria-hidden="true">▾</span>
    </button>
    <div id="panel-2" class="relux-accordion__panel" role="region" hidden>
      Pembatalan tiket dapat dilakukan maksimal 2 jam sebelum keberangkatan melalui loket atau aplikasi.
    </div>
  </div>
</div>`,
    css: cssImport,
    js: `document.querySelectorAll('.relux-accordion__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true'
    const panelId = trigger.getAttribute('aria-controls')
    const panel = document.getElementById(panelId)
    if (panel) {
      trigger.setAttribute('aria-expanded', String(!isExpanded))
      panel.hidden = isExpanded
    }
  })
})`,
  },

  badge: {
    react: `import { Badge } from '@/components/ui'

export function BadgeExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone="success" variant="soft" dot>Tepat waktu</Badge>
      <Badge tone="warning" variant="soft" dot>Terlambat</Badge>
      <Badge tone="danger" variant="soft" dot>Dibatalkan</Badge>
      <Badge tone="info" variant="outline">Bisnis</Badge>
      <Badge tone="kai" variant="solid">KAI</Badge>
      <Badge.Count count={12} srText="belum dibaca" />
    </div>
  )
}
`,
    html: `<div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
  <span class="relux-badge relux-tone--success">● Tepat waktu</span>
  <span class="relux-badge relux-tone--warning">● Terlambat</span>
  <span class="relux-badge relux-tone--danger">● Dibatalkan</span>
  <span class="relux-badge relux-tone--info">Bisnis</span>
  <span class="relux-badge relux-tone--neutral">Dijadwalkan</span>
</div>`,
    css: cssImport,
    js: `// Badges are static semantic indicators.`,
  },

  alert: {
    react: `import { Alert } from '@/components/ui'

export function AlertExample() {
  return (
    <div className="space-y-3">
      <Alert tone="info" title="Info Keberangkatan">
        Boarding dibuka 60 menit sebelum keberangkatan.
      </Alert>
      <Alert tone="success" title="Pembayaran Berhasil">
        E-tiket telah dikirimkan ke alamat email terdaftar.
      </Alert>
      <Alert tone="warning" title="Peringatan Keterlambatan">
        KA Argo Bromo Anggrek diperkirakan terlambat 15 menit.
      </Alert>
    </div>
  )
}
`,
    html: `<div style="display: flex; flex-direction: column; gap: 0.75rem;">
  <div class="relux-alert relux-tone--info" role="status">
    <strong>Info:</strong> Boarding dibuka 60 menit sebelum keberangkatan.
  </div>
  <div class="relux-alert relux-tone--success" role="status">
    <strong>Berhasil:</strong> Pembayaran diterima. E-tiket dikirim ke email Anda.
  </div>
  <div class="relux-alert relux-tone--warning" role="status">
    <strong>Peringatan:</strong> KA Argo Bromo Anggrek terlambat sekitar 15 menit.
  </div>
  <div class="relux-alert relux-tone--danger" role="alert">
    <strong>Gagal:</strong> Pembayaran belum berhasil. Silakan coba metode lain.
  </div>
</div>`,
    css: cssImport,
    js: `// Alert triggers and dismissal logic`,
  },

  card: {
    react: `import { Card, Button, Badge } from '@/components/ui'

export function CardExample() {
  return (
    <Card variant="outlined" className="max-w-md">
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title>Argo Bromo Anggrek</Card.Title>
          <Badge tone="info" variant="soft">Eksekutif</Badge>
        </div>
        <Card.Description>Gambir (GMR) – Surabaya Pasarturi (SBI)</Card.Description>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-muted-foreground">Berangkat 08.20 WIB · Tiba 16.30 WIB</p>
      </Card.Body>
      <Card.Footer>
        <span className="font-semibold text-foreground">Rp650.000</span>
        <Button size="sm">Pilih tiket</Button>
      </Card.Footer>
    </Card>
  )
}
`,
    html: `<article class="relux-card" style="padding: 1.25rem; max-width: 24rem;">
  <div style="display: flex; justify-content: space-between; align-items: start;">
    <div>
      <h3 style="margin: 0; font-size: 1rem; font-weight: 600;">Argo Bromo Anggrek</h3>
      <p style="margin: 0.25rem 0 0; font-size: 0.875rem; color: var(--muted-foreground);">Gambir – Surabaya Pasarturi</p>
    </div>
    <span class="relux-badge relux-tone--info">Eksekutif</span>
  </div>
  <p style="margin: 1rem 0 0; font-size: 0.875rem; color: var(--muted-foreground);">Berangkat 08.20 WIB · Tiba 16.30 WIB</p>
  <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
    <span style="font-weight: 600; font-size: 1rem;">Rp650.000</span>
    <button class="relux-button relux-button--primary relux-button--sm">Pilih tiket</button>
  </div>
</article>`,
    css: `${cssImport}
.relux-card { padding: calc(var(--spacing-3xl) * 1px); }`,
    js: `// Card interaction logic`,
  },

  avatar: {
    react: `import { Avatar } from '@/components/ui'

export function AvatarExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar name="Budi Santoso" size="lg" status="online" />
      <Avatar name="Siti Rahma" size="md" status="offline" />
      <Avatar name="Agus Wibowo" size="sm" status="busy" />
      <Avatar.Group max={3}>
        <Avatar name="Budi Santoso" />
        <Avatar name="Siti Rahma" />
        <Avatar name="Agus Wibowo" />
        <Avatar name="Dewi Lestari" />
      </Avatar.Group>
    </div>
  )
}
`,
    html: `<div style="display: flex; gap: 1rem; align-items: center;">
  <span class="relux-avatar" role="img" aria-label="Budi Santoso">BS</span>
  <span class="relux-avatar" role="img" aria-label="Siti Rahma" style="background: var(--colors\/background\/bg-secondary); color: var(--secondary-foreground);">SR</span>
  <span class="relux-avatar" role="img" aria-label="Agus Wibowo" style="background: var(--colors\/kai\/primary\/600); color: var(--colors\/text\/text-primary_on-brand);">AW</span>
</div>`,
    css: cssImport,
    js: `// Avatar component logic`,
  },

  progress: {
    react: `import { Progress, Spinner } from '@/components/ui'

export function ProgressExample() {
  return (
    <div className="space-y-4 max-w-md">
      <Progress label="Penyelesaian Profil" value={75} showValue tone="primary" />
      <Progress label="Verifikasi Dokumen" value={45} showValue tone="warning" />
      <div className="flex items-center gap-3">
        <Spinner size="sm" label="Memuat data perjalanan..." />
        <span className="text-sm text-muted-foreground">Sinkronisasi jadwal kereta</span>
      </div>
    </div>
  )
}
`,
    html: `<div style="display: flex; flex-direction: column; gap: 1rem; max-width: 24rem;">
  <div>
    <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.375rem;">
      <span>Penyelesaian Profil</span>
      <span>75%</span>
    </div>
    <div class="relux-progress" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
      <div class="relux-progress__bar"></div>
    </div>
  </div>
</div>`,
    css: `${cssImport}
.relux-progress__bar { --progress-value: 75%; }`,
    js: `// Dynamic progress updates`,
  },

  form: {
    react: `import { FormField, Input, Select, Checkbox, Switch, Button } from '@/components/ui'

export function FormExample() {
  return (
    <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
      <FormField label="Nama lengkap" hint="Sesuai KTP/Paspor" required>
        <Input placeholder="Budi Santoso" />
      </FormField>
      <FormField label="Kelas kereta">
        <Select defaultValue="eksekutif">
          <option value="ekonomi">Ekonomi</option>
          <option value="bisnis">Bisnis</option>
          <option value="eksekutif">Eksekutif</option>
        </Select>
      </FormField>
      <Checkbox label="Asuransi perjalanan" defaultChecked />
      <Switch label="Kirim notifikasi SMS" />
      <Button type="submit">Lanjutkan Pemesanan</Button>
    </form>
  )
}
`,
    html: `<form style="display: flex; flex-direction: column; gap: 1rem; max-width: 24rem;">
  <div>
    <label for="name" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.375rem;">Nama lengkap</label>
    <input id="name" class="relux-field" type="text" placeholder="Budi Santoso" autocomplete="name">
  </div>
  <div>
    <label for="email" style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.375rem;">Email</label>
    <input id="email" class="relux-field" type="email" placeholder="nama@domain.com" autocomplete="email">
  </div>
  <button type="submit" class="relux-button relux-button--primary">Kirim formulir</button>
</form>`,
    css: cssImport,
    js: `// Form validation and submit handling`,
  },

  modal: {
    react: `import { useState } from 'react'
import { Dialog, Button } from '@/components/ui'

export function ModalExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Buka Detail Perjalanan</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Detail Perjalanan"
        description="Informasi jadwal keberangkatan kereta api"
      >
        <p className="text-sm text-foreground">
          KA Argo Bromo Anggrek · Berangkat 08.20 WIB dari Stasiun Gambir.
        </p>
        <Dialog.Footer>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Tutup
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}
`,
    html: `<div>
  <button class="relux-button relux-button--primary" data-open-dialog>
    Buka dialog perjalanan
  </button>
  <dialog class="relux-dialog">
    <h2 style="margin: 0 0 0.5rem; font-size: 1.125rem; font-weight: 600;">Detail Perjalanan</h2>
    <p style="margin: 0 0 1rem; font-size: 0.875rem; color: var(--muted-foreground);">
      KA Argo Bromo Anggrek · Berangkat 08.20 WIB dari Gambir.
    </p>
    <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem;">
      <button class="relux-button relux-button--secondary" data-close-dialog>Tutup</button>
    </div>
  </dialog>
</div>`,
    css: cssImport,
    js: `const dialog = document.querySelector(".relux-dialog")
const openBtn = document.querySelector("[data-open-dialog]")
const closeBtn = document.querySelector("[data-close-dialog]")

if (openBtn && dialog) {
  openBtn.addEventListener("click", () => dialog.showModal())
}
if (closeBtn && dialog) {
  closeBtn.addEventListener("click", () => dialog.close())
}`,
  },

  navigation: {
    react: `import { Tabs, Breadcrumb, Pagination } from '@/components/ui'

export function NavigationExample() {
  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: 'Beranda', href: '#' },
          { label: 'Pemesanan', href: '#' },
          { label: 'Pilih Kursi' },
        ]}
      />
      <Tabs
        variant="pill"
        items={[
          { label: 'Jadwal KA', content: <p className="text-sm">Jadwal keberangkatan harian.</p> },
          { label: 'Tarif', content: <p className="text-sm">Tarif tiket semua kelas.</p> },
        ]}
      />
      <Pagination page={1} total={5} onPageChange={() => {}} />
    </div>
  )
}
`,
    html: `<div class="relux-tabs" role="tablist" aria-label="Jadwal kereta">
  <button class="relux-tab" role="tab" aria-selected="true" id="tab-1" aria-controls="panel-tab-1">Jadwal KA</button>
  <button class="relux-tab" role="tab" aria-selected="false" id="tab-2" aria-controls="panel-tab-2">Tarif Tiket</button>
  <button class="relux-tab" role="tab" aria-selected="false" id="tab-3" aria-controls="panel-tab-3">Info Peron</button>
</div>`,
    css: cssImport,
    js: `document.querySelectorAll(".relux-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".relux-tab").forEach(item => {
      item.setAttribute("aria-selected", String(item === tab))
    })
  })
})`,
  },

  table: {
    react: `import { DataTable, Badge } from '@/components/ui'

export function TableExample() {
  const data = [
    { ka: 'Argo Bromo Anggrek', rute: 'Gambir–Surabaya', jam: '08.20', status: 'Tepat waktu' },
    { ka: 'Gajayana', rute: 'Gambir–Malang', jam: '18.40', status: 'Terlambat' },
  ]
  return (
    <DataTable
      data={data}
      searchable
      columns={[
        { key: 'ka', header: 'Kereta', sortable: true },
        { key: 'rute', header: 'Rute' },
        { key: 'jam', header: 'Berangkat', sortable: true },
        {
          key: 'status',
          header: 'Status',
          cell: (r) => (
            <Badge tone={r.status === 'Tepat waktu' ? 'success' : 'warning'} variant="soft" dot>
              {r.status}
            </Badge>
          ),
        },
      ]}
    />
  )
}
`,
    html: `<table class="relux-table">
  <caption>Jadwal keberangkatan kereta hari ini</caption>
  <thead>
    <tr>
      <th scope="col">Kereta</th>
      <th scope="col">Rute</th>
      <th scope="col">Berangkat</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Argo Bromo Anggrek</th>
      <td>Gambir – Surabaya Pasarturi</td>
      <td>08.20</td>
      <td><span class="relux-badge relux-tone--success">Tepat waktu</span></td>
    </tr>
    <tr>
      <th scope="row">Gajayana</th>
      <td>Gambir – Malang</td>
      <td>18.40</td>
      <td><span class="relux-badge relux-tone--warning">Terlambat</span></td>
    </tr>
  </tbody>
</table>`,
    css: cssImport,
    js: `// Table sorting and filtering logic`,
  },

  'app-ui': {
    react: `import { SearchBookWidget, SidebarNav } from '@/components/ui'
import { LayoutDashboard, Train, Settings } from 'lucide-react'

export function AppUIExample() {
  return (
    <div className="space-y-6">
      <SearchBookWidget />
      <SidebarNav
        items={[
          { icon: LayoutDashboard, label: 'Dashboard' },
          { icon: Train, label: 'Jadwal Kereta' },
          { icon: Settings, label: 'Pengaturan' },
        ]}
      />
    </div>
  )
}
`,
    html: `<nav class="relux-sidebar" aria-label="Navigasi aplikasi">
  <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.25rem;">
    <li><a href="#" style="display: block; padding: 0.5rem 0.75rem; border-radius: var(--radius); text-decoration: none; color: inherit; font-weight: 600; background: var(--sidebar-primary); color: var(--sidebar-primary-foreground);" aria-current="page">Dashboard</a></li>
    <li><a href="#" style="display: block; padding: 0.5rem 0.75rem; border-radius: var(--radius); text-decoration: none; color: inherit;">Jadwal Kereta</a></li>
    <li><a href="#" style="display: block; padding: 0.5rem 0.75rem; border-radius: var(--radius); text-decoration: none; color: inherit;">Pengaturan</a></li>
  </ul>
</nav>`,
    css: cssImport,
    js: `// App UI widget interaction logic`,
  },
}

for (const [name, files] of Object.entries(components)) {
  const dir = resolve(baseDir, name)
  await mkdir(dir, { recursive: true })
  await writeFile(resolve(dir, 'react-example.tsx'), files.react, 'utf8')
  await writeFile(resolve(dir, 'html-example.html'), files.html, 'utf8')
  await writeFile(resolve(dir, 'html-example.css'), files.css, 'utf8')
  await writeFile(resolve(dir, 'html-example.js'), files.js, 'utf8')
}

console.log(`Successfully generated isolated examples for ${Object.keys(components).length} components in src/examples/components/`)

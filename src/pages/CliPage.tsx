import { useState } from 'react'
import { Section } from '../components/docs/Section'
import { PageHeader } from '../components/docs/PageHeader'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'
import { Check, Copy, Terminal, Box, ShieldCheck, RefreshCw, Layers } from 'lucide-react'

type PageCopy = {
  title: string
  category: string
  description: string
  composerTab: string
  npmTab: string
  philosophyTitle: string
  philosophyDesc: string
  copyCodeVsPkgTitle: string
  artisanCommandsTitle: string
  npmCommandsTitle: string
  argumentsOptionsTitle: string
  troubleshootingTitle: string
}

const COPY = {
  id: {
    title: 'CLI & Tools',
    category: 'Dokumentasi',
    description: 'Antarmuka baris perintah resmi RelUX untuk scaffolding komponen secara instan ke dalam project Laravel Livewire, React, dan Angular tanpa dependensi runtime yang mengunci.',
    composerTab: 'PHP Artisan (Composer)',
    npmTab: 'npm CLI (Fase Berikutnya)',
    philosophyTitle: 'Filosofi CLI — Model Kepemilikan Kode Penuh',
    philosophyDesc: 'Mengikuti model arsitektur shadcn/ui dan Untitled UI, RelUX CLI menyalin komponen langsung ke dalam codebase project aplikasi Anda. Tim developer memiliki kendali 100% atas struktur markup, logika interaksi, dan integrasi backend tanpa terhalang abstraksi paket vendor pihak ketiga.',
    copyCodeVsPkgTitle: 'Perbandingan: Copy Code (CLI) vs Managed Package (npm/Composer)',
    artisanCommandsTitle: 'Perintah Artisan Resmi (kai/relux-ui)',
    npmCommandsTitle: 'Rencana Perintah npm CLI (@kai/relux)',
    argumentsOptionsTitle: 'Parameter Argumen & Opsi',
    troubleshootingTitle: 'Troubleshooting & Konfigurasi Lingkungan',
  },
  en: {
    title: 'CLI & Development Tools',
    category: 'Documentation',
    description: 'Official RelUX command-line interface for instant component scaffolding into Laravel Livewire, React, and Angular projects without restrictive runtime lock-in.',
    composerTab: 'PHP Artisan (Composer)',
    npmTab: 'npm CLI (Next Phase)',
    philosophyTitle: 'CLI Philosophy — Full Code Ownership Model',
    philosophyDesc: 'Adopting the architectural model of shadcn/ui and Untitled UI, RelUX CLI scaffolds components directly into your application codebase. Engineering teams maintain 100% ownership of markup, interaction logic, and backend integrations without third-party vendor lock-in.',
    copyCodeVsPkgTitle: 'Comparison: Copy Code (CLI) vs Managed Package (npm/Composer)',
    artisanCommandsTitle: 'Official Artisan Commands (kai/relux-ui)',
    npmCommandsTitle: 'Planned npm CLI Commands (@kai/relux)',
    argumentsOptionsTitle: 'Arguments & Options Parameters',
    troubleshootingTitle: 'Troubleshooting & Environment Configuration',
  },
} satisfies Localized<PageCopy>

function TerminalMock({
  command,
  output,
  lang,
}: {
  command: string
  output?: string
  lang: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border relux-code-surface shadow-md">
      <div className="flex items-center justify-between border-b border-background/10 bg-background/5 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-destructive/80" />
          <div className="size-3 rounded-full bg-warning/80" />
          <div className="size-3 rounded-full bg-success/80" />
          <span className="ms-2 font-mono text-xs leading-none text-background/60">terminal — zsh</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-xs text-background/80 transition-all hover:bg-background/15 hover:text-background active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="size-3 text-success" />
              <span className="text-success">{lang === 'en' ? 'Copied' : 'Tersalin'}</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span>{lang === 'en' ? 'Copy command' : 'Salin perintah'}</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed text-background">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <span className="text-muted-foreground select-none">$</span>
          <span>{command}</span>
        </div>
        {output && (
          <div className="mt-3 whitespace-pre-wrap text-background/70 font-normal border-t border-background/10 pt-3">
            {output}
          </div>
        )}
      </div>
    </div>
  )
}

export function CliPage({
  onNavigate: _onNavigate,
}: {
  onNavigate?: (section: SectionId) => void
}) {
  const t = useLocalized(COPY)
  const [activeTab, setActiveTab] = useState<'composer' | 'npm'>('composer')

  return (
    <article className="mx-auto max-w-3xl">
      <PageHeader
        category={t.category}
        title={t.title}
        status="stable"
        packageName="kai/relux-ui"
        description={t.description}
      />

      {/* Philosophy Section */}
      <Section id="philosophy" title={t.philosophyTitle}>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{t.philosophyDesc}</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
            <Box className="size-5 text-primary mb-2" />
            <h4 className="font-semibold text-sm text-foreground">Zero Runtime Lock-In</h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Komponen tersimpan di folder lokal Anda, bebas dimodifikasi tanpa merusak update package.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
            <ShieldCheck className="size-5 text-success mb-2" />
            <h4 className="font-semibold text-sm text-foreground">Kepatuhan Standar KAI</h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Token kanonikal 597 variabel CSS Make Kit dan aturan WCAG terkonfigurasi otomatis.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
            <RefreshCw className="size-5 text-accent mb-2" />
            <h4 className="font-semibold text-sm text-foreground">Multi-Framework Parity</h4>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Class dan struktur markup identik antara Blade Livewire, React, dan Angular.
            </p>
          </div>
        </div>
      </Section>

      {/* Tab Switcher: Composer vs npm */}
      <Section id="commands" title="Perintah & Dokumentasi CLI">
        <div className="mb-6 flex gap-1 rounded-lg border border-border/80 bg-muted/60 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('composer')}
            className={`flex-1 rounded-md py-2 text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'composer'
                ? 'bg-card text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.composerTab}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('npm')}
            className={`flex-1 rounded-md py-2 text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'npm'
                ? 'bg-card text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.npmTab}
          </button>
        </div>

        {activeTab === 'composer' ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                1. Inisialisasi Project (`relux:init`)
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Mempublikasikan token CSS Make Kit, konfigurasi aset, dan script pendukung ke dalam project Laravel.
              </p>
              <TerminalMock
                command="php artisan relux:init"
                output={`[✓] Publishing Make Kit canonical tokens to resources/css/relux-tokens.css...
[✓] Registering @kai/relux-css in resources/css/app.css...
[✓] Publishing relux.js helper to resources/js/relux.js...
[✓] RelUX Design System successfully initialized in your Laravel application!`}
                lang="id"
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                2. Menambahkan Komponen (`relux:add`)
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Menyalin source code komponen Blade langsung ke folder `resources/views/components/` Anda.
              </p>
              <TerminalMock
                command="php artisan relux:add button alert stepper --overwrite"
                output={`[✓] Downloading verified Blade template for <x-relux::button />...
[✓] Downloading verified Blade template for <x-relux::alert />...
[✓] Downloading verified Blade template for <x-relux::stepper />...
[✓] Copied 3 components to resources/views/components/relux/
Ready to use in Blade templates: <x-relux::button variant="primary">Pesan Tiket</x-relux::button>`}
                lang="id"
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                3. Melihat Daftar Komponen (`relux:list`)
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Memeriksa daftar seluruh 14 komponen kanonikal yang tersedia di registry dan status instalasinya.
              </p>
              <TerminalMock
                command="php artisan relux:list"
                output={`+--------------+-------------+------------------+----------+
| Component    | Category    | Blade Component  | Status   |
+--------------+-------------+------------------+----------+
| button       | Actions     | x-relux::button  | Installed|
| alert        | Feedback    | x-relux::alert   | Installed|
| stepper      | App UI      | x-relux::stepper | Installed|
| date-picker  | Form / Date | x-relux::date    | Available|
| file-upload  | App UI      | x-relux::upload  | Available|
| empty-state  | App UI      | x-relux::empty   | Available|
| ... (8 more) |             |                  |          |
+--------------+-------------+------------------+----------+`}
                lang="id"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
              <div className="flex items-center gap-2">
                <Layers className="size-4 text-primary" />
                <span className="font-semibold text-xs text-primary">Status Roadmap Fase 3 (PRD §5.3)</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Perintah `npx @kai/relux` dirancang untuk ekosistem React (Next.js / Vite) dan Angular standalone. Saat ini Anda dapat menginstal paket `@kai/relux-react` dan `@kai/relux-angular` via npm/pnpm.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                1. Inisialisasi React / Angular (`npx @kai/relux init`)
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Memasang `@kai/relux-css`, mengimpor tokens ke `src/index.css`, dan mengonfigurasi Vite/Angular workspace.
              </p>
              <TerminalMock
                command="npx @kai/relux init"
                output={`✔ Detected React + Vite project structure.
✔ Installed @kai/relux-css@1.0.0.
✔ Imported tokens.css into src/index.css.
✔ Initialized RelUX configuration in relux.config.json.`}
                lang="en"
              />
            </div>

            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                2. Menambahkan Komponen (`npx @kai/relux add`)
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Menyalin file komponen TypeScript/TSX ke `src/components/ui/`.
              </p>
              <TerminalMock
                command="npx @kai/relux add button stepper date-picker"
                output={`✔ Scaffolding Button.tsx -> src/components/ui/button/
✔ Scaffolding Stepper.tsx -> src/components/ui/stepper/
✔ Scaffolding DatePicker.tsx -> src/components/ui/date-picker/
✔ All 3 components successfully added to your project.`}
                lang="en"
              />
            </div>
          </div>
        )}
      </Section>

      {/* Arguments Table */}
      <Section id="arguments" title={t.argumentsOptionsTitle}>
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
          <table className="w-full min-w-lg border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Opsi / Argumen</th>
                <th className="px-4 py-3 font-semibold">Tipe</th>
                <th className="px-4 py-3 font-semibold">Default</th>
                <th className="px-4 py-3 font-semibold">Deskripsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs sm:text-sm">
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold text-primary">component</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">string</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">required</td>
                <td className="px-4 py-3 text-muted-foreground">Nama komponen yang akan ditambahkan (mis. `button`, `alert`, `table`).</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold text-primary">--path</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">string</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">resources/views/components</td>
                <td className="px-4 py-3 text-muted-foreground">Direktori tujuan penyimpanan file template Blade.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold text-primary">--overwrite (-f)</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">boolean</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">Menimpa berkas yang sudah ada tanpa menanyakan konfirmasi ulang.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold text-primary">--all</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">boolean</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">Men-scaffold seluruh 14 komponen kanonikal secara simultan.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Troubleshooting */}
      <Section id="troubleshooting" title={t.troubleshootingTitle}>
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Private Repository KAI:</strong> Jika project Anda berada di jaringan intranet tertutup KAI, atur environment variabel:
          </p>
          <pre className="overflow-x-auto rounded-lg relux-code-surface p-3 font-mono text-xs text-background">
{`export RELUX_COMPOSER_REGISTRY="https://repo.keretaapi.co.id/composer"
export RELUX_NPM_REGISTRY="https://repo.keretaapi.co.id/npm"`}
          </pre>
          <p>
            <strong className="text-foreground">Pembaruan Komponen:</strong> Setelah mengkustomisasi komponen lokal, jalankan `git diff` sebelum melakukan `relux:add --overwrite` untuk meninjau perubahan upstream dari tim Design System KAI.
          </p>
        </div>
      </Section>
    </article>
  )
}
export default CliPage

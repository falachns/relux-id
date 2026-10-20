import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const llmsTxtPath = path.join(rootDir, 'public/llms.txt')
const componentsDir = path.join(rootDir, 'public/components')
const tokensJsonPath = path.join(rootDir, 'packages/relux-css/tokens.json')
const registryDir = path.join(rootDir, 'registry/components')
const outPath = path.join(rootDir, 'public/llms-full.txt')

console.log('🤖 Generating Aggregated LLM Context (public/llms-full.txt)...')

let sections = []

// 1. Header & Overview
sections.push(`# RelUX Design System by KAI — Complete LLM Context (Full Specification)
> Single Source of Truth untuk KAI Digital Ecosystem (Laravel Livewire Blade, React, Angular, & CSS Canonical).
> Generated automatically by \`scripts/generate-llms-full.mjs\` (PRD §5.10).
> Synchronized with Make Kit \`@make-kits/design-system-kai-v-1@0.0.2\` & Untitled UI foundations.

- Total Canonical Tokens: 597 CSS variables
- Component Parity: 100% across 3 Frameworks (14 Core Components)
- Primary UI Font: Inter (Display, Headings, Body, Labels)
- Monospace Font: Roboto Mono (Code, Data Tables, Booking Codes)
`)

// 2. Base llms.txt Content
if (fs.existsSync(llmsTxtPath)) {
  const baseLlms = fs.readFileSync(llmsTxtPath, 'utf8')
  sections.push(`---
## 1. Global System Summary (llms.txt)

${baseLlms.trim()}
`)
}

// 3. Monorepo Distribution & Package Architecture (PRD §7.2)
sections.push(`---
## 2. Monorepo Distribution & Package Architecture (PRD §7.2)

RelUX didistribusikan melalui 4 paket terstandarisasi untuk memastikan 100% konsistensi visual di seluruh lini aplikasi KAI:

### A. @kai/relux-css (Canonical CSS & Design Tokens)
- Paket dasar yang memuat variabel CSS kanonikal \`tokens.css\`, kamus token \`tokens.json\` (format W3C Design Tokens), dan kelas komponen standar \`components.css\` (seluruh kelas menggunakan prefiks \`.relux-*\`).
- Mendukung mode gelap/terang (\`.dark\`), kontras WCAG 2.1 AA/AAA, dan reset box-sizing border-box.

### B. @kai/relux-react (React 19 Components)
- Komponen React siap pakai berbasis Radix UI Primitives, Lucide Icons, dan Tailwind v4 / CSS Canonical.
- Tipe data TypeScript lengkap, dukungan Server Components (Next.js App Router) & SSR.
- Komponen: \`Button\`, \`Accordion\`, \`Badge\`, \`Alert\`, \`Card\`, \`Dialog/Modal\`, \`Input\`, \`Textarea\`, \`Select\`, \`Checkbox\`, \`Radio\`, \`Switch\`, \`Avatar\`, \`Progress\`, \`Table\`, \`Navigation\`, \`Stepper\`, \`EmptyState\`, \`FileUpload\`, \`DatePicker\`.

### C. @kai/relux-angular (Angular 19 Standalone Components)
- Komponen Angular berbasis standalone components & signals (\`relux-*\`).
- Styling terhubung 1:1 ke \`@kai/relux-css\`.

### D. kai/relux-ui (Laravel Livewire Blade Components via Composer)
- Paket Composer resmi untuk aplikasi Laravel / Livewire: \`<x-relux::component>\`.
- Di-scaffold ke dalam project via Artisan CLI:
  \`\`\`bash
  php artisan relux:init
  php artisan relux:add {component} [--path] [--overwrite]
  php artisan relux:list
  \`\`\`
`)

// 4. Token Canonical Summary
if (fs.existsSync(tokensJsonPath)) {
  try {
    const rawTokens = JSON.parse(fs.readFileSync(tokensJsonPath, 'utf8'))
    const tokenCategories = Object.keys(rawTokens)
    let tokenStats = []

    for (const cat of tokenCategories) {
      const keys = Object.keys(rawTokens[cat] || {})
      tokenStats.push(`- **${cat.toUpperCase()}**: ${keys.length} tokens`)
    }

    sections.push(`---
## 3. Design Tokens Specification (Make Kit KAI v1)

RelUX menyediakan 597 token CSS kanonikal yang dipetakan secara deterministik:
${tokenStats.join('\n')}

### Palet Warna Kunci KAI:
- **KAI Navy (Corporate Primary):**
  - \`--colors/kai/navy/default\`: #002A54 (Brand utama KAI, rasio kontras 12.8:1 pada latar putih - WCAG AAA)
  - \`--colors/kai/navy/hover\`: #001D3B
  - \`--colors/kai/navy/pressed\`: #001224
  - \`--colors/kai/navy/subtle\`: #E6EAF0
- **KAI Orange (Accent / Call-to-Action):**
  - \`--colors/kai/orange/default\`: #ED6B23 (Aksen primer tiket & konfirmasi)
  - \`--colors/kai/orange/hover\`: #D55712
  - \`--colors/kai/orange/subtle\`: #FDF3ED
- **Semantic Feedback States:**
  - Success: \`--colors/kai/green/*\` (#10B981)
  - Warning: \`--colors/kai/yellow/*\` (#F59E0B)
  - Danger / Destructive: \`--colors/kai/red/*\` (#EF4444)
  - Neutral / Slate: \`--colors/kai/slate/*\` (#64748B)

### Tipografi Skala Make Kit:
- **Display**: \`display-2xl\`, \`display-xl\`, \`display-lg\`, \`display-md\`, \`display-sm\`, \`display-xs\`
- **Heading**: \`heading-xl\`, \`heading-lg\`, \`heading-md\`, \`heading-sm\`, \`heading-xs\`
- **Body**: \`body-xl\`, \`body-lg\`, \`body-md\`, \`body-sm\`, \`body-xs\`
- **Label**: \`label-xl\`, \`label-lg\`, \`label-md\`, \`label-sm\`, \`label-xs\`
- Seluruh skala tipografi memiliki 3 bobot kanonikal: Regular (400), Medium (500), SemiBold (600), Bold (700).
`)
  } catch (err) {
    console.warn(`Failed to parse tokens.json: ${err.message}`)
  }
}

// 5. Multi-Framework Component Registry Manifests
if (fs.existsSync(registryDir)) {
  sections.push(`---
## 4. Multi-Framework Parity Registry (14 Components)
`)
  const compDirs = fs
    .readdirSync(registryDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  for (const slug of compDirs) {
    const manifestPath = path.join(registryDir, slug, 'component.json')
    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
        sections.push(`### Komponen: ${manifest.name} (\`${manifest.slug}\`)
- **Status:** ${manifest.status} (Version: ${manifest.version})
- **Paket:**
  - Blade: \`${manifest.packages?.blade}\`
  - React: \`${manifest.packages?.react}\`
  - Angular: \`${manifest.packages?.angular}\`
  - CSS: \`${manifest.packages?.css}\`
- **Varian:** ${(manifest.variants || []).join(', ') || 'Default'}
- **Ukuran:** ${(manifest.sizes || []).join(', ') || 'md'}
- **Props Utama:**
${Object.entries(manifest.props || {})
  .map(([k, v]) => `  - \`${k}\` (${v.type || 'string'}): ${v.description || ''} [Default: ${v.default || 'undefined'}]`)
  .join('\n')}
`)
      } catch {
        // continue
      }
    }
  }
}

// 6. Detailed Component Markdown Documentation
if (fs.existsSync(componentsDir)) {
  sections.push(`---
## 5. Comprehensive Component Guides (public/components/*.md)
`)
  const mdFiles = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.md')).sort()

  for (const file of mdFiles) {
    const filePath = path.join(componentsDir, file)
    const content = fs.readFileSync(filePath, 'utf8')
    sections.push(`### File: public/components/${file}

${content.trim()}
`)
  }
}

// 7. CLI Quick Reference
sections.push(`---
## 6. CLI Quick Reference

### PHP Artisan (kai/relux-ui)
\`\`\`bash
# 1. Inisialisasi token & konfigurasi CSS ke Laravel
php artisan relux:init

# 2. Tambah komponen spesifik ke resources/views/components/relux/
php artisan relux:add button alert card --overwrite

# 3. Cek daftar seluruh komponen kanonikal
php artisan relux:list
\`\`\`

### npm CLI (@kai/relux)
\`\`\`bash
# Inisialisasi konfigurasi React / Vite
npx @kai/relux init

# Tambah komponen React ke src/components/ui/
npx @kai/relux add button stepper date-picker
\`\`\`
`)

const finalOutput = sections.join('\n\n')
fs.writeFileSync(outPath, finalOutput, 'utf8')

console.log(`✓ Successfully generated ${outPath} (${(finalOutput.length / 1024).toFixed(1)} KB)`)

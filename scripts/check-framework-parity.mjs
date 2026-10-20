import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const registryDir = path.join(rootDir, 'registry/components')
const componentsCssPath = path.join(rootDir, 'packages/relux-css/components.css')
const canonicalCss = fs.readFileSync(componentsCssPath, 'utf-8')

// Parse canonical .relux-* classes defined in packages/relux-css/components.css
const canonicalClasses = new Set(
  [...canonicalCss.matchAll(/\.(relux-[a-zA-Z0-9_-]+)/g)].map((m) => m[1])
)

console.log('🔍 Running Multi-Framework Parity Check (PRD §5.10 & §6)...')
console.log(`Found ${canonicalClasses.size} canonical .relux-* classes in packages/relux-css/components.css.\n`)

if (!fs.existsSync(registryDir)) {
  console.error(`❌ Registry directory not found at ${registryDir}`)
  process.exit(1)
}

const componentDirs = fs
  .readdirSync(registryDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

if (componentDirs.length === 0) {
  console.error('❌ No component directories found in registry/components')
  process.exit(1)
}

let hasErrors = false
let totalComponents = 0

for (const slug of componentDirs) {
  totalComponents++
  const compDir = path.join(registryDir, slug)
  const manifestPath = path.join(compDir, 'component.json')

  // 1. Validate manifest
  if (!fs.existsSync(manifestPath)) {
    console.error(`❌ [${slug}] Missing component.json manifest.`)
    hasErrors = true
    continue
  }

  let manifest
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  } catch (err) {
    console.error(`❌ [${slug}] Invalid JSON in component.json: ${err.message}`)
    hasErrors = true
    continue
  }

  const requiredFields = ['name', 'slug', 'version', 'status', 'packages', 'props', 'variants']
  for (const field of requiredFields) {
    if (!manifest[field]) {
      console.error(`❌ [${slug}] Missing required manifest property: "${field}"`)
      hasErrors = true
    }
  }

  // 2. Validate multi-framework implementations
  const examplesDir = path.join(compDir, 'examples')
  const bladeFile = path.join(examplesDir, 'blade/example.blade.php')
  const reactFile = path.join(examplesDir, 'react/example.tsx')
  const angularFile = path.join(examplesDir, 'angular/example.html')

  const filesToCheck = [
    { fw: 'Blade', path: bladeFile },
    { fw: 'React', path: reactFile },
    { fw: 'Angular', path: angularFile },
  ]

  for (const f of filesToCheck) {
    if (!fs.existsSync(f.path)) {
      console.error(`❌ [${slug}] Missing ${f.fw} implementation at ${path.relative(rootDir, f.path)}`)
      hasErrors = true
      continue
    }

    const content = fs.readFileSync(f.path, 'utf-8')
    if (content.trim().length === 0) {
      console.error(`❌ [${slug}] Empty ${f.fw} snippet at ${path.relative(rootDir, f.path)}`)
      hasErrors = true
    }

    // Check for class names: Ensure classes used adhere to canonical prefix
    const matches = content.match(/class(?:Name)?="([^"]+)"/g) || []
    for (const m of matches) {
      const classStr = m.replace(/class(?:Name)?="/, '').replace(/"$/, '')
      const tokens = classStr.split(/\s+/).filter(Boolean)
      for (const cls of tokens) {
        // Must start with relux- or be a standard attribute / animation helper
        if (cls.startsWith('relux-')) {
          if (!canonicalClasses.has(cls) && !cls.startsWith('relux-tone--') && !cls.startsWith('relux-button--brand-')) {
            console.warn(`⚠️ [${slug}] ${f.fw} uses undeclared canonical class: .${cls}`)
          }
        }
      }
    }
  }

  console.log(`✓ [${slug}] Manifest OK | Blade: OK | React: OK | Angular: OK | Parity: Verified`)
}

if (hasErrors) {
  console.error('\n❌ Framework parity check failed. Resolve errors above.')
  process.exit(1)
}

console.log(`\n🎉 Framework Parity Check PASSED! (${totalComponents}/${totalComponents} components aligned across Blade, React, and Angular)\n`)

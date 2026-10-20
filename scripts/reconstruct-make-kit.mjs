import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { KIT_TOKENS, KIT_TYPOGRAPHY, KIT_VERSION } from '../src/generated/kit-catalog.ts'

const root = process.cwd()
const vendorDir = resolve(root, 'vendor/design-system-kai-v1')
const distDir = resolve(vendorDir, 'dist')

await mkdir(distDir, { recursive: true })

// 1. Write package.json
const pkg = {
  name: '@make-kits/design-system-kai-v-1',
  version: KIT_VERSION,
  main: 'style.css',
  style: 'style.css',
  exports: {
    '.': './style.css',
    './style.css': './style.css',
    './dist/style.css': './style.css',
  },
}
await writeFile(
  resolve(vendorDir, 'package.json'),
  JSON.stringify(pkg, null, 2) + '\n',
  'utf8',
)

// 2. Build dist/style.css
const cssLines = ['/* Make Kit Design System KAI v.1 (reconstructed vendor) */', ':root {']

for (const t of KIT_TOKENS) {
  // In CSS, escape slashes in var references if any
  const val = t.value.replace(/var\(--([^)]+)\)/g, (match, p1) => {
    return `var(--${p1.replaceAll('/', '\\/')})`
  })
  cssLines.push(`  ${t.cssName}: ${val};`)
}

cssLines.push('}\n')

for (const typo of KIT_TYPOGRAPHY) {
  cssLines.push(`.${typo.className} {`)
  if (typo['font-family']) cssLines.push(`  font-family: ${typo['font-family']};`)
  if (typo['font-size']) cssLines.push(`  font-size: ${typo['font-size']};`)
  if (typo['font-weight']) cssLines.push(`  font-weight: ${typo['font-weight']};`)
  if (typo['line-height']) cssLines.push(`  line-height: ${typo['line-height']};`)
  cssLines.push('}\n')
}

await writeFile(resolve(distDir, 'style.css'), cssLines.join('\n'), 'utf8')
await writeFile(resolve(vendorDir, 'style.css'), cssLines.join('\n'), 'utf8')
console.log('Successfully reconstructed Make Kit in vendor/design-system-kai-v1')

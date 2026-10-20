import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// Copy assets
const filesToCopy = ['tokens.css', 'tokens.json', 'components.css', 'relux.js']
for (const file of filesToCopy) {
  const src = path.resolve(__dirname, file)
  const dest = path.resolve(distDir, file)
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
  }
}

// Generate canonical bundle index.css
const tokensCss = fs.readFileSync(path.resolve(__dirname, 'tokens.css'), 'utf-8')
const componentsCss = fs.readFileSync(path.resolve(__dirname, 'components.css'), 'utf-8')
const bundleCss = `/* @kai/relux-css Canonical Bundle (Tokens + Component Classes) */\n\n${tokensCss}\n\n${componentsCss}\n`
fs.writeFileSync(path.resolve(distDir, 'index.css'), bundleCss, 'utf-8')

console.log('✓ @kai/relux-css built to dist/ successfully.')

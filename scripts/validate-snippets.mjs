import { readFile, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const css = await readFile(resolve(root, 'src/styles/components.css'), 'utf8')
const pages = [
  'button',
  'accordion',
  'form',
  'badge',
  'alert',
  'card',
  'table',
  'navigation',
  'modal',
  'avatar',
  'progress',
  'app-ui',
]

const examplesDir = resolve(root, 'src/examples/components')
const indexFile = await readFile(resolve(examplesDir, 'index.ts'), 'utf8')
const generated = await readFile(
  resolve(root, 'src/generated/kit-catalog.ts'),
  'utf8',
)
const tokenNames = new Set(
  [...generated.matchAll(/"name": "(--[^"]+)"/g)].map((match) => match[1]),
)
const localVariables = new Set([
  '--default-transition-duration',
  '--progress-value',
  '--swatch-value',
  '--success-foreground',
  '--success-text',
])

let allSnippetSources = indexFile

for (const page of pages) {
  const componentDir = resolve(examplesDir, page)
  const files = [
    'react-example.tsx',
    'html-example.html',
    'html-example.css',
    'html-example.js',
  ]

  for (const file of files) {
    const filePath = resolve(componentDir, file)
    try {
      const s = await stat(filePath)
      if (!s.isFile()) {
        throw new Error(`Expected file at ${filePath}`)
      }
      const content = await readFile(filePath, 'utf8')
      allSnippetSources += `\n${content}`

      if (file === 'react-example.tsx' && !content.includes('@/components/ui')) {
        throw new Error(`React example in ${page} must import from @/components/ui`)
      }
    } catch (err) {
      throw new Error(`Missing ${file} for component ${page}: ${err.message}`)
    }
  }

  if (!indexFile.includes(`${page}: {`) && !indexFile.includes(`'${page}': {`)) {
    throw new Error(`Missing export in index.ts for component ${page}`)
  }
}

for (const match of allSnippetSources.matchAll(/relux-[a-z0-9_-]+/g)) {
  const className = match[0]
  if (!css.includes(`.${className}`) && !className.startsWith('relux-tone--')) {
    throw new Error(`Snippet class .${className} is not defined in components.css`)
  }
}

for (const match of `${allSnippetSources}\n${css}`.matchAll(/var\((--[^),\s]+)/g)) {
  const token = match[1].replaceAll('\\/', '/')
  if (!tokenNames.has(token) && !localVariables.has(token)) {
    throw new Error(`Snippet/component CSS references unknown token ${token}`)
  }
}

console.log(`Snippet catalog OK: ${pages.length} component groups verified in src/examples/components/.`)

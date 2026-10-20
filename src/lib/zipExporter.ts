import JSZip from 'jszip'
import type { Framework } from './useFramework'

export interface DownloadComponentZipOptions {
  componentName: string
  slug: string
  framework: Framework
  code: string
  css?: string
  includeTokens?: boolean
}

/**
 * Generates and triggers download of a single component zip bundle per framework (PRD §5.8).
 * Contains: framework code file, associated CSS, tokens info, and installation README.
 */
export async function downloadComponentZip({
  componentName,
  slug,
  framework,
  code,
  css,
  includeTokens = true,
}: DownloadComponentZipOptions): Promise<void> {
  const zip = new JSZip()
  const bundleFolderName = `relux-${slug}-${framework}`
  const folder = zip.folder(bundleFolderName) || zip

  const fileExtensions: Record<Framework, string> = {
    blade: 'blade.php',
    react: 'tsx',
    angular: 'ts',
    css: 'html',
  }

  const primaryFilename = `${slug}.${fileExtensions[framework]}`
  folder.file(primaryFilename, code)

  if (css) {
    folder.file(`${slug}.css`, css)
  }

  // Installation & usage README
  const installCommands: Record<Framework, string> = {
    blade: 'composer require kai/relux-ui',
    react: 'npm i @kai/relux-react @kai/relux-css',
    angular: 'npm i @kai/relux-angular @kai/relux-css',
    css: 'npm i @kai/relux-css',
  }

  const readmeContent = `# RelUX by KAI — ${componentName} (${framework.toUpperCase()})

This bundle is generated from **RelUX Design System** (PT Kereta Api Indonesia).

## Contents
- \`${primaryFilename}\`: Official component code for ${framework}
${css ? `- \`${slug}.css\`: Canonical CSS styling for this component\n` : ''}- \`README.md\`: Quick start instructions

## Package Installation (Recommended)
\`\`\`bash
${installCommands[framework]}
\`\`\`

## Manual Integration
1. Copy \`${primaryFilename}\` into your project's component directory.
2. Ensure canonical tokens are imported in your global layout:
   \`\`\`html
   <link rel="stylesheet" href="/tokens.css">
   \`\`\`
3. If using vanilla interactive behaviors (modals, tabs, accordions), import \`relux.js\`.

## License
Confidential & Proprietary — PT Kereta Api Indonesia (Persero).
`
  folder.file('README.md', readmeContent)

  if (includeTokens) {
    folder.file(
      'tokens.info.json',
      JSON.stringify(
        {
          name: 'RelUX Canonical Tokens Reference',
          brand: 'PT Kereta Api Indonesia (Persero)',
          tokensCssUrl: 'https://relux.kai.id/tokens.css',
          tokensW3CUrl: 'https://relux.kai.id/tokens.json',
        },
        null,
        2,
      ),
    )
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const downloadUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = downloadUrl
  anchor.download = `${bundleFolderName}.zip`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(downloadUrl)
}

/**
 * Downloads a complete tokens archive containing tokens.css, tokens.json (W3C), and README.
 */
export async function downloadTokensZip(): Promise<void> {
  const zip = new JSZip()
  const folder = zip.folder('relux-tokens-package') || zip

  try {
    const [cssRes, jsonRes] = await Promise.all([
      fetch('/tokens.css').then((r) => r.text()),
      fetch('/tokens.json').then((r) => r.text()),
    ])

    folder.file('tokens.css', cssRes)
    folder.file('tokens.json', jsonRes)
  } catch {
    folder.file('tokens.css', '/* See https://relux.kai.id/tokens.css */')
    folder.file('tokens.json', '/* See https://relux.kai.id/tokens.json */')
  }

  folder.file(
    'README.md',
    `# RelUX Design System — Canonical Tokens (W3C + CSS)
PT Kereta Api Indonesia (Persero)

Contains:
- tokens.css (597 custom properties for CSS)
- tokens.json (W3C Design Tokens Community Group format)
`,
  )

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'relux-tokens-bundle.zip'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const catalogPath = path.join(rootDir, 'src/generated/kit-catalog.ts')

const code = fs.readFileSync(catalogPath, 'utf8')
const jsonMatch = code.match(/export const KIT_TOKENS = (\[[\s\S]*?\])\s*as const/)
if (!jsonMatch) {
  console.error('Could not extract KIT_TOKENS from catalog')
  process.exit(1)
}

const tokens = JSON.parse(jsonMatch[1])

const w3cTokens = {
  $schema: 'https://design-tokens.github.io/community-group/format/',
  name: 'RelUX by KAI Design Tokens',
  version: '1.0.0',
  description: 'Canonical design tokens for PT Kereta Api Indonesia (Persero) - RelUX Design System',
  tokenCount: tokens.length,
  tokens: {}
}

for (const t of tokens) {
  const cleanName = t.name.replace(/^--/, '')
  const parts = cleanName.split(/[\/\-_]/).filter(Boolean)
  
  let current = w3cTokens.tokens
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    current[key] = current[key] || {}
    current = current[key]
  }

  const leaf = parts[parts.length - 1]
  let type = 'color'
  if (t.family.includes('Spacing') || t.family.includes('Layout')) type = 'dimension'
  else if (t.family.includes('Radius')) type = 'dimension'
  else if (t.family.includes('Effects')) type = 'shadow'
  else if (t.family.includes('Typography')) type = 'typography'

  current[leaf] = {
    $value: t.value,
    $type: type,
    $description: `Canonical token ${t.name} from Make Kit KAI v1 (${t.family})`,
    cssVariable: t.name
  }
}

const outDir = path.join(rootDir, 'packages/relux-css')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'tokens.json'), JSON.stringify(w3cTokens, null, 2), 'utf8')

// Also write to public/ for direct download in docs
const publicDir = path.join(rootDir, 'public')
fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, 'tokens.json'), JSON.stringify(w3cTokens, null, 2), 'utf8')

console.log(`Generated W3C tokens.json with ${tokens.length} tokens at packages/relux-css/tokens.json and public/tokens.json`)

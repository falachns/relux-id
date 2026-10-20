import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const packages = [
  { name: '@kai/relux-css', dir: 'packages/relux-css' },
  { name: '@kai/relux-react', dir: 'packages/relux-react' },
  { name: '@kai/relux-angular', dir: 'packages/relux-angular' },
]

console.log('📦 Building RelUX distribution packages...\n')

for (const pkg of packages) {
  const pkgDir = path.resolve(rootDir, pkg.dir)
  console.log(`🔨 Building ${pkg.name} in ${pkg.dir}...`)
  try {
    execSync('node build.mjs', { cwd: pkgDir, stdio: 'inherit' })
  } catch (err) {
    console.error(`❌ Failed to build ${pkg.name}:`, err)
    process.exit(1)
  }
}

console.log('\n✨ All RelUX distribution packages built successfully!\n')

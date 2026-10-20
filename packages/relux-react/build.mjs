import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// Build library bundle with Vite
await build({
  root: __dirname,
  logLevel: 'warn',
  build: {
    outDir: distDir,
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReluxReact',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'clsx',
        'lucide-react',
        /^@radix-ui\/.*/,
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          clsx: 'clsx',
          'lucide-react': 'LucideReact',
        },
      },
    },
  },
})

// Emit declaration file
const dtsContent = `// TypeScript definitions for @kai/relux-react
export * from '../../../src/components/ui/index';
`
fs.writeFileSync(path.resolve(distDir, 'index.d.ts'), dtsContent, 'utf-8')

console.log('✓ @kai/relux-react built to dist/ successfully.')

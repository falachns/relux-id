import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// Build Angular standalone package
await build({
  root: __dirname,
  logLevel: 'warn',
  build: {
    outDir: distDir,
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReluxAngular',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        /^@angular\/.*/,
      ],
      output: {
        globals: {
          '@angular/core': 'ng.core',
          '@angular/common': 'ng.common',
        },
      },
    },
  },
})

// Emit declaration file
const srcContent = fs.readFileSync(path.resolve(__dirname, 'src/index.ts'), 'utf-8')
fs.writeFileSync(path.resolve(distDir, 'index.d.ts'), srcContent, 'utf-8')

console.log('✓ @kai/relux-angular built to dist/ successfully.')

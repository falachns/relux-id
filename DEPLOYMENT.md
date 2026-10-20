# Panduan Deployment RelUX Design System ke Vercel

Dokumen ini memuat panduan lengkap penerapan (deployment) aplikasi dokumentasi **RelUX Design System** ke platform Vercel dengan target domain **`relux-id.vercel.app`**.

---

## 1. Arsitektur Deployment & Spesifikasi

- **Framework Preset**: Vite (React 19 + TypeScript + Tailwind CSS v4)
- **Monorepo Architecture**: pnpm Workspace (`packages/relux-css`, `packages/relux-react`, `packages/relux-angular`)
- **Routing**: Single Page Application (SPA) dengan fallback rewrites ke `/index.html` via `vercel.json`
- **Output Directory**: `dist`
- **Target Domain**: `relux-id.vercel.app`

---

## 2. Cara 1: Deploy Menggunakan Vercel CLI

Metode ini disarankan untuk rilis langsung dari mesin lokal tanpa perantara CI/CD git.

### Langkah 1: Instalasi & Login Vercel CLI
```bash
# Install Vercel CLI secara global (jika belum terpasang)
npm install -g vercel

# Login ke akun Vercel Anda
vercel login
```

### Langkah 2: Hubungkan Project & Tentukan Nama Project (`relux-id`)
Jalankan perintah berikut di root folder repositori:
```bash
# Link project ke Vercel dengan nama 'relux-id'
vercel link --project relux-id
```
> **Catatan**: Jika project belum ada di dashboard Vercel, pilih `Create a new project` dan beri nama **`relux-id`**. Dengan nama ini, Vercel otomatis memberikan URL kanonikal **`https://relux-id.vercel.app`**.

### Langkah 3: Deploy Langsung ke Production
```bash
# Jalankan deployment ke environment production
vercel --prod
```

Vercel akan otomatis mendeteksi konfigurasi `vercel.json`, menjalankan `pnpm install`, mengeksekusi pipeline `pnpm build`, dan mempublikasikan folder `dist`.

---

## 3. Cara 2: Deploy Otomatis via GitHub / GitLab (Vercel Dashboard)

Metode ini direkomendasikan untuk alur kerja GitOps berbasis push/merge request.

1. Buka [Vercel Dashboard](https://vercel.com/dashboard) dan klik tombol **Add New...** > **Project**.
2. Hubungkan repository Git Anda (`relux-kai` / `relux-design-system`).
3. Pada halaman **Configure Project**, sesuaikan pengaturan berikut:
   - **Project Name**: `relux-id` *(menghasilkan URL: `relux-id.vercel.app`)*
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `pnpm build` *(menjalankan verifikasi tokens, parity, typecheck, compile packages, dan vite build)*
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`
4. Klik **Deploy**.
5. Setelah build selesai, navigasikan ke menu **Settings > Domains** untuk memastikan domain **`relux-id.vercel.app`** aktif.

---

## 4. Konfigurasi `vercel.json`

File konfigurasi `vercel.json` di root telah dikonfigurasi dengan:

1. **SPA Rewrites**:
   Seluruh rute non-file (`/(.*)`) diarahkan ke `/index.html` sehingga navigasi internal seperti `/docs/*`, `/components/*`, `/examples/*`, dan `/manage` tetap berfungsi normal saat di-refresh tanpa error 404.

2. **Asset Caching Headers**:
   Seluruh aset di `/assets/*` yang memiliki hash unik dikonfigurasi dengan header cache jangka panjang:
   `Cache-Control: public, max-age=31536000, immutable`.

3. **AI Integration Headers (`llms.txt`)**:
   File `/llms.txt` dan `/llms-full.txt` dikonfigurasi dengan header resmi:
   `Content-Type: text/plain; charset=utf-8`.

4. **Security Headers**:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN`
   - `Referrer-Policy: strict-origin-when-cross-origin`

---

## 5. Verifikasi Pra-Deploy (Lokal)

Sebelum melakukan deployment, pastikan seluruh pipeline lokal berstatus hijau:

```bash
# 1. Jalankan pipeline build lengkap
pnpm build

# 2. Periksa keberadaan artefak penting di folder dist/
ls -la dist/index.html dist/llms.txt dist/llms-full.txt dist/tokens.css dist/tokens.json

# 3. Jalankan preview lokal untuk menguji server statis
pnpm preview
```

Jika server preview berjalan lancar pada port `http://localhost:4173`, aplikasi siap 100% untuk dirilis ke Vercel.

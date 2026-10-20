import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const examplesDir = path.join(rootDir, 'src/examples/components')

const SNIPPETS = {
  button: {
    blade: `{{-- Blade / Livewire Syntax --}}
<div class="flex flex-wrap items-center gap-3">
    <x-relux::button variant="primary">Pesan tiket</x-relux::button>
    <x-relux::button variant="secondary">Cek jadwal</x-relux::button>
    <x-relux::button variant="outline">Detail rute</x-relux::button>
    <x-relux::button variant="brand-kai">KAI Brand</x-relux::button>
    <x-relux::button variant="primary" :loading="true">Memproses...</x-relux::button>
</div>`,
    angular: `<!-- Standalone Angular Syntax -->
<div class="flex flex-wrap items-center gap-3">
  <button reluxButton variant="primary">Pesan tiket</button>
  <button reluxButton variant="secondary">Cek jadwal</button>
  <button reluxButton variant="outline">Detail rute</button>
  <button reluxButton variant="brand-kai">KAI Brand</button>
  <button reluxButton variant="primary" [loading]="true">Memproses...</button>
</div>`
  },
  accordion: {
    blade: `{{-- Blade / Livewire Syntax --}}
<x-relux::accordion type="single">
    <div data-relux-accordion-item class="border-b border-border">
        <button type="button" data-relux-accordion-trigger aria-expanded="true" class="flex w-full items-center justify-between p-4 font-semibold text-foreground">
            <span>Bagaimana cara memesan tiket kereta?</span>
            <span aria-hidden="true">&darr;</span>
        </button>
        <div data-relux-accordion-panel class="p-4 text-sm text-muted-foreground">
            Buka aplikasi Access by KAI, pilih stasiun asal dan tujuan, tentukan tanggal keberangkatan, lalu selesaikan pembayaran.
        </div>
    </div>
</x-relux::accordion>`,
    angular: `<!-- Standalone Angular Syntax -->
<relux-accordion type="single">
  <div data-relux-accordion-item class="border-b border-border">
    <button type="button" data-relux-accordion-trigger aria-expanded="true" class="flex w-full items-center justify-between p-4 font-semibold text-foreground">
      <span>Bagaimana cara memesan tiket kereta?</span>
      <span aria-hidden="true">&darr;</span>
    </button>
    <div data-relux-accordion-panel class="p-4 text-sm text-muted-foreground">
      Buka aplikasi Access by KAI, pilih stasiun asal dan tujuan, tentukan tanggal keberangkatan, lalu selesaikan pembayaran.
    </div>
  </div>
</relux-accordion>`
  },
  form: {
    blade: `{{-- Blade / Livewire Syntax --}}
<form wire:submit.prevent="submit" class="space-y-4">
    <div>
        <label for="name" class="block text-sm font-semibold text-foreground mb-1">Nama Lengkap</label>
        <x-relux::input id="name" name="name" wire:model="name" placeholder="Budi Santoso" />
    </div>
    <div>
        <label for="email" class="block text-sm font-semibold text-foreground mb-1">Alamat Email</label>
        <x-relux::input type="email" id="email" name="email" wire:model="email" placeholder="nama@domain.com" />
    </div>
    <x-relux::button type="submit" variant="primary">Kirim Data</x-relux::button>
</form>`,
    angular: `<!-- Standalone Angular Syntax -->
<form (ngSubmit)="onSubmit()" class="space-y-4">
  <div>
    <label for="name" class="block text-sm font-semibold text-foreground mb-1">Nama Lengkap</label>
    <input reluxInput id="name" [(ngModel)]="name" name="name" placeholder="Budi Santoso" />
  </div>
  <div>
    <label for="email" class="block text-sm font-semibold text-foreground mb-1">Alamat Email</label>
    <input reluxInput type="email" id="email" [(ngModel)]="email" name="email" placeholder="nama@domain.com" />
  </div>
  <button reluxButton type="submit" variant="primary">Kirim Data</button>
</form>`
  },
  badge: {
    blade: `{{-- Blade / Livewire Syntax --}}
<div class="flex flex-wrap gap-2">
    <x-relux::badge tone="success">Tepat waktu</x-relux::badge>
    <x-relux::badge tone="warning">Terlambat</x-relux::badge>
    <x-relux::badge tone="danger">Dibatalkan</x-relux::badge>
    <x-relux::badge tone="info" variant="outline">Bisnis</x-relux::badge>
    <x-relux::badge tone="primary" :dot="true">Eksekutif</x-relux::badge>
</div>`,
    angular: `<!-- Standalone Angular Syntax -->
<div class="flex flex-wrap gap-2">
  <relux-badge tone="success">Tepat waktu</relux-badge>
  <relux-badge tone="warning">Terlambat</relux-badge>
  <relux-badge tone="danger">Dibatalkan</relux-badge>
  <relux-badge tone="info" variant="outline">Bisnis</relux-badge>
  <relux-badge tone="primary" [dot]="true">Eksekutif</relux-badge>
</div>`
  },
  alert: {
    blade: `{{-- Blade / Livewire Syntax --}}
<div class="space-y-3">
    <x-relux::alert tone="info" title="Pembaruan Jadwal">
        Perjalanan KA Argo Bromo Anggrek beroperasi normal hari ini.
    </x-relux::alert>
    <x-relux::alert tone="warning" title="Perhatian Peron" :dismissible="true">
        Keberangkatan jalur 3 mengalami penundaan 10 menit.
    </x-relux::alert>
</div>`,
    angular: `<!-- Standalone Angular Syntax -->
<div class="space-y-3">
  <relux-alert tone="info" title="Pembaruan Jadwal">
    Perjalanan KA Argo Bromo Anggrek beroperasi normal hari ini.
  </relux-alert>
  <relux-alert tone="warning" title="Perhatian Peron" [dismissible]="true">
    Keberangkatan jalur 3 mengalami penundaan 10 menit.
  </relux-alert>
</div>`
  },
  card: {
    blade: `{{-- Blade / Livewire Syntax --}}
<x-relux::card variant="elevated">
    <h3 class="text-base font-semibold text-foreground">Argo Wilis</h3>
    <p class="text-sm text-muted-foreground mt-1">Bandung — Surabaya Gubeng</p>
    <div class="mt-4 flex items-center justify-between">
        <span class="font-mono text-sm font-bold text-primary">Rp450.000</span>
        <x-relux::button size="sm" variant="primary">Pilih Kursi</x-relux::button>
    </div>
</x-relux::card>`,
    angular: `<!-- Standalone Angular Syntax -->
<relux-card variant="elevated">
  <h3 class="text-base font-semibold text-foreground">Argo Wilis</h3>
  <p class="text-sm text-muted-foreground mt-1">Bandung — Surabaya Gubeng</p>
  <div class="mt-4 flex items-center justify-between">
    <span class="font-mono text-sm font-bold text-primary">Rp450.000</span>
    <button reluxButton size="sm" variant="primary">Pilih Kursi</button>
  </div>
</relux-card>`
  },
  table: {
    blade: `{{-- Blade / Livewire Syntax --}}
<div class="overflow-x-auto rounded-lg border border-border">
    <table class="relux-table w-full text-sm">
        <thead>
            <tr>
                <th>No KA</th>
                <th>Nama Kereta</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Argo Bromo Anggrek</td>
                <td><x-relux::badge tone="success">Tepat waktu</x-relux::badge></td>
            </tr>
            <tr>
                <td>7</td>
                <td>Argo Lawu</td>
                <td><x-relux::badge tone="warning">Terlambat</x-relux::badge></td>
            </tr>
        </tbody>
    </table>
</div>`,
    angular: `<!-- Standalone Angular Syntax -->
<div class="overflow-x-auto rounded-lg border border-border">
  <table class="relux-table w-full text-sm">
    <thead>
      <tr>
        <th>No KA</th>
        <th>Nama Kereta</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Argo Bromo Anggrek</td>
        <td><relux-badge tone="success">Tepat waktu</relux-badge></td>
      </tr>
      <tr>
        <td>7</td>
        <td>Argo Lawu</td>
        <td><relux-badge tone="warning">Terlambat</relux-badge></td>
      </tr>
    </tbody>
  </table>
</div>`
  },
  navigation: {
    blade: `{{-- Blade / Livewire Syntax --}}
<div role="tablist" class="flex gap-4 border-b border-border">
    <button role="tab" aria-selected="true" class="border-b-2 border-primary py-3 px-1 font-semibold text-primary">
        Jadwal Perjalanan
    </button>
    <button role="tab" aria-selected="false" class="border-b-2 border-transparent py-3 px-1 font-semibold text-muted-foreground">
        Rincian Tarif
    </button>
</div>`,
    angular: `<!-- Standalone Angular Syntax -->
<div role="tablist" class="flex gap-4 border-b border-border">
  <button role="tab" aria-selected="true" class="border-b-2 border-primary py-3 px-1 font-semibold text-primary">
    Jadwal Perjalanan
  </button>
  <button role="tab" aria-selected="false" class="border-b-2 border-transparent py-3 px-1 font-semibold text-muted-foreground">
    Rincian Tarif
  </button>
</div>`
  },
  modal: {
    blade: `{{-- Blade / Livewire Syntax --}}
<button type="button" data-relux-dialog-trigger="ticket-modal" class="relux-button relux-button--primary">
    Buka Modal
</button>

<dialog id="ticket-modal" class="relux-dialog rounded-xl border border-border p-6 shadow-2xl">
    <h3 class="text-lg font-semibold text-foreground">Detail Pemesanan</h3>
    <p class="mt-2 text-sm text-muted-foreground">Konfirmasi rincian sebelum melanjutkan ke pembayaran.</p>
    <div class="mt-6 flex justify-end gap-3">
        <button type="button" data-relux-dialog-close class="relux-button relux-button--outline">Batal</button>
        <button type="button" class="relux-button relux-button--primary">Bayar Sekarang</button>
    </div>
</dialog>`,
    angular: `<!-- Standalone Angular Syntax -->
<button reluxButton variant="primary" (click)="openDialog()">Buka Modal</button>

<relux-dialog id="ticket-modal">
  <h3 class="text-lg font-semibold text-foreground">Detail Pemesanan</h3>
  <p class="mt-2 text-sm text-muted-foreground">Konfirmasi rincian sebelum melanjutkan ke pembayaran.</p>
  <div class="mt-6 flex justify-end gap-3">
    <button reluxButton variant="outline" (click)="closeDialog()">Batal</button>
    <button reluxButton variant="primary">Bayar Sekarang</button>
  </div>
</relux-dialog>`
  },
  avatar: {
    blade: `{{-- Blade / Livewire Syntax --}}
<div class="flex items-center gap-3">
    <x-relux::avatar name="Budi Santoso" size="md" status="online" />
    <x-relux::avatar name="Siti Rahma" size="lg" />
</div>`,
    angular: `<!-- Standalone Angular Syntax -->
<div class="flex items-center gap-3">
  <relux-avatar name="Budi Santoso" size="md" status="online"></relux-avatar>
  <relux-avatar name="Siti Rahma" size="lg"></relux-avatar>
</div>`
  },
  progress: {
    blade: `{{-- Blade / Livewire Syntax --}}
<div class="space-y-4">
    <div role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" class="relux-progress">
        <div class="relux-progress__bar" style="width: 65%;"></div>
    </div>
</div>`,
    angular: `<!-- Standalone Angular Syntax -->
<div class="space-y-4">
  <div role="progressbar" [attr.aria-valuenow]="65" aria-valuemin="0" aria-valuemax="100" class="relux-progress">
    <div class="relux-progress__bar" [style.width.%]="65"></div>
  </div>
</div>`
  },
  'app-ui': {
    blade: `{{-- Blade / Livewire Syntax: Search & Book Widget --}}
<div class="relux-card p-6">
    <h3 class="text-base font-bold text-foreground">Pemesanan Tiket KAI</h3>
    <div class="mt-4 grid gap-3 sm:grid-cols-3">
        <x-relux::input placeholder="Stasiun Asal" />
        <x-relux::input placeholder="Stasiun Tujuan" />
        <x-relux::button variant="primary">Cari Tiket</x-relux::button>
    </div>
</div>`,
    angular: `<!-- Standalone Angular Syntax: Search & Book Widget -->
<div class="relux-card p-6">
  <h3 class="text-base font-bold text-foreground">Pemesanan Tiket KAI</h3>
  <div class="mt-4 grid gap-3 sm:grid-cols-3">
    <input reluxInput placeholder="Stasiun Asal" />
    <input reluxInput placeholder="Stasiun Tujuan" />
    <button reluxButton variant="primary">Cari Tiket</button>
  </div>
</div>`
  }
}

for (const [comp, snips] of Object.entries(SNIPPETS)) {
  const compDir = path.join(examplesDir, comp)
  if (!fs.existsSync(compDir)) continue
  fs.writeFileSync(path.join(compDir, 'blade-example.blade.php'), snips.blade, 'utf8')
  fs.writeFileSync(path.join(compDir, 'angular-example.html'), snips.angular, 'utf8')
}

console.log('Successfully generated blade and angular examples for all 12 component groups!')

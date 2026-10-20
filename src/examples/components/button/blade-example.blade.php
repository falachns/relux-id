{{-- Blade / Livewire Syntax --}}
<div class="flex flex-wrap items-center gap-3">
    <x-relux::button variant="primary">Pesan tiket</x-relux::button>
    <x-relux::button variant="secondary">Cek jadwal</x-relux::button>
    <x-relux::button variant="outline">Detail rute</x-relux::button>
    <x-relux::button variant="brand-kai">KAI Brand</x-relux::button>
    <x-relux::button variant="primary" :loading="true">Memproses...</x-relux::button>
</div>
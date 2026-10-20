{{-- Blade / Livewire Syntax: Search & Book Widget --}}
<div class="relux-card p-6">
    <h3 class="text-base font-bold text-foreground">Pemesanan Tiket KAI</h3>
    <div class="mt-4 grid gap-3 sm:grid-cols-3">
        <x-relux::input placeholder="Stasiun Asal" />
        <x-relux::input placeholder="Stasiun Tujuan" />
        <x-relux::button variant="primary">Cari Tiket</x-relux::button>
    </div>
</div>
{{-- Blade / Livewire Syntax --}}
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
</form>
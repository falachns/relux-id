{{-- Blade / Livewire Syntax --}}
<div class="space-y-3">
    <x-relux::alert tone="info" title="Pembaruan Jadwal">
        Perjalanan KA Argo Bromo Anggrek beroperasi normal hari ini.
    </x-relux::alert>
    <x-relux::alert tone="warning" title="Perhatian Peron" :dismissible="true">
        Keberangkatan jalur 3 mengalami penundaan 10 menit.
    </x-relux::alert>
</div>
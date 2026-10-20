{{-- Blade / Livewire Syntax --}}
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
</x-relux::accordion>
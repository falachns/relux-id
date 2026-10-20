{{-- Blade / Livewire Syntax --}}
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
</dialog>
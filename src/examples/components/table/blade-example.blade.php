{{-- Blade / Livewire Syntax --}}
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
</div>
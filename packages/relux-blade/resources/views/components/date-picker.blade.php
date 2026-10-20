@props([
    'name' => 'travel_date',
    'value' => null,
    'min' => null,
    'placeholder' => 'Pilih tanggal...',
])

<div {{ $attributes->merge(['class' => 'relux-datepicker']) }}>
    <input
        type="date"
        name="{{ $name }}"
        value="{{ $value }}"
        @if($min) min="{{ $min }}" @endif
        class="relux-datepicker__trigger relux-focus"
    />
</div>

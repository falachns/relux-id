@props([
    'type' => 'single',
])

<div data-relux-accordion data-relux-type="{{ $type }}" {{ $attributes->merge(['class' => 'relux-accordion divide-y divide-border rounded-lg border border-border bg-card']) }}>
    {{ $slot }}
</div>

@props([
    'variant' => 'flat',
])

@php
    $variantClass = match($variant) {
        'elevated' => 'shadow-md border border-border bg-card',
        'outlined' => 'border border-border bg-transparent',
        default => 'relux-card',
    };
@endphp

<div {{ $attributes->merge(['class' => 'rounded-xl ' . $variantClass . ' p-5']) }}>
    {{ $slot }}
</div>

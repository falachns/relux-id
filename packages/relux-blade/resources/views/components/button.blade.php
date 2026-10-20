@props([
    'variant' => 'primary',
    'size' => 'md',
    'loading' => false,
    'disabled' => false,
    'type' => 'button',
])

@php
    $variantClass = match($variant) {
        'primary' => 'relux-button--primary',
        'secondary' => 'relux-button--secondary',
        'outline' => 'relux-button--outline',
        'ghost' => 'relux-button--ghost',
        'destructive' => 'relux-button--destructive',
        default => str_starts_with($variant, 'brand-') ? 'relux-button--' . $variant : 'relux-button--primary',
    };

    $sizeClass = match($size) {
        'sm' => 'relux-button--sm',
        'lg' => 'relux-button--lg',
        default => '',
    };
@endphp

<button
    type="{{ $type }}"
    {{ $attributes->merge([
        'class' => 'relux-button relux-focus ' . $variantClass . ' ' . $sizeClass,
        'disabled' => $disabled || $loading,
        'aria-busy' => $loading ? 'true' : null,
    ]) }}
>
    @if($loading)
        <svg class="size-4 animate-spin text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
    @endif
    {{ $slot }}
</button>

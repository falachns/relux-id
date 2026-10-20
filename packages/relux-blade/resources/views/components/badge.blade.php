@props([
    'tone' => 'primary',
    'variant' => 'filled',
    'size' => 'md',
    'dot' => false,
])

@php
    $toneClass = match($tone) {
        'success' => 'relux-tone--success',
        'warning' => 'relux-tone--warning',
        'danger' => 'relux-tone--danger',
        'info' => 'relux-tone--info',
        'neutral' => 'relux-tone--neutral',
        default => 'relux-tone--primary',
    };

    $variantClass = $variant === 'outline' ? 'relux-badge--outline' : '';
    $sizeClass = $size === 'sm' ? 'relux-badge--sm' : '';
@endphp

<span {{ $attributes->merge(['class' => 'relux-badge ' . $toneClass . ' ' . $variantClass . ' ' . $sizeClass]) }}>
    @if($dot)
        <span class="relux-badge__dot" aria-hidden="true"></span>
    @endif
    {{ $slot }}
</span>

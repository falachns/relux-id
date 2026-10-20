@props([
    'src' => null,
    'name' => null,
    'size' => 'md',
    'status' => null,
])

@php
    $sizeClass = match($size) {
        'xs' => 'relux-avatar--xs',
        'sm' => 'relux-avatar--sm',
        'lg' => 'relux-avatar--lg',
        'xl' => 'relux-avatar--xl',
        '2xl' => 'relux-avatar--2xl',
        default => 'relux-avatar--md',
    };

    $initials = '';
    if ($name) {
        $parts = explode(' ', trim($name));
        $initials = strtoupper(substr($parts[0] ?? '', 0, 1) . substr($parts[1] ?? '', 0, 1));
    }
@endphp

<div {{ $attributes->merge(['class' => 'relux-avatar ' . $sizeClass]) }}>
    @if($src)
        <img src="{{ $src }}" alt="{{ $name ?? 'Avatar' }}" class="relux-avatar__image" />
    @else
        <span class="relux-avatar__initials">{{ $initials ?: '?' }}</span>
    @endif

    @if($status)
        <span class="relux-avatar__status relux-avatar__status--{{ $status }}" aria-label="{{ $status }}"></span>
    @endif
</div>

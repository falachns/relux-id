@props([
    'content' => '',
    'placement' => 'top',
])

<span class="relux-tooltip-trigger" data-relux-tooltip="{{ $content }}" data-relux-placement="{{ $placement }}">
    {{ $slot }}
</span>

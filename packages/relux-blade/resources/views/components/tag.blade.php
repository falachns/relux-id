@props([
    'tone' => 'neutral',
    'removable' => false,
])

<span {{ $attributes->merge(['class' => 'relux-tag relux-tag--' . $tone]) }}>
    <span class="relux-tag__label">{{ $slot }}</span>
    @if($removable)
        <button type="button" class="relux-tag__remove" aria-label="Hapus tag">&times;</button>
    @endif
</span>

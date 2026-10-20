@props([
    'tone' => 'info',
    'title' => null,
    'dismissible' => false,
])

@php
    $role = in_array($tone, ['danger', 'warning']) ? 'alert' : 'status';
    $toneClass = 'relux-alert--' . $tone;
@endphp

<div role="{{ $role }}" {{ $attributes->merge(['class' => 'relux-alert ' . $toneClass]) }}>
    <div class="relux-alert__content">
        @if($title)
            <strong class="relux-alert__title">{{ $title }}</strong>
        @endif
        <div class="relux-alert__body">
            {{ $slot }}
        </div>
    </div>
    @if($dismissible)
        <button type="button" data-relux-alert-dismiss aria-label="Tutup notifikasi" class="relux-alert__close">
            &times;
        </button>
    @endif
</div>

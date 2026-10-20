@props([
    'checked' => false,
    'disabled' => false,
    'label' => null,
    'id' => null,
])

@php
    $id = $id ?? 'relux-tog-' . uniqid();
@endphp

<div class="relux-toggle-wrapper">
    <label for="{{ $id }}" class="relux-toggle">
        <input
            type="checkbox"
            id="{{ $id }}"
            role="switch"
            {{ $attributes->merge([
                'class' => 'relux-toggle__input',
                'checked' => $checked ? 'checked' : null,
                'disabled' => $disabled ? 'disabled' : null,
            ]) }}
        />
        <span class="relux-toggle__slider" aria-hidden="true"></span>
        @if($label)
            <span class="relux-toggle__label">{{ $label }}</span>
        @endif
    </label>
</div>

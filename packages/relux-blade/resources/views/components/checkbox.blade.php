@props([
    'checked' => false,
    'disabled' => false,
    'label' => null,
    'id' => null,
])

@php
    $id = $id ?? 'relux-chk-' . uniqid();
@endphp

<div class="relux-checkbox-wrapper">
    <input
        type="checkbox"
        id="{{ $id }}"
        {{ $attributes->merge([
            'class' => 'relux-checkbox',
            'checked' => $checked ? 'checked' : null,
            'disabled' => $disabled ? 'disabled' : null,
        ]) }}
    />
    @if($label)
        <label for="{{ $id }}" class="relux-checkbox__label">{{ $label }}</label>
    @endif
</div>

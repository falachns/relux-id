@props([
    'type' => 'text',
    'isInvalid' => false,
])

<input
    type="{{ $type }}"
    {{ $attributes->merge([
        'class' => 'relux-field' . ($isInvalid ? ' border-destructive ring-2 ring-destructive/30' : ''),
        'aria-invalid' => $isInvalid ? 'true' : null,
    ]) }}
/>

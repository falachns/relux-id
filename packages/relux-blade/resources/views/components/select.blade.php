@props([
    'disabled' => false,
    'isInvalid' => false,
    'options' => [],
    'selected' => null,
])

<select
    {{ $attributes->merge([
        'class' => 'relux-select relux-focus' . ($isInvalid ? ' relux-select--invalid' : ''),
        'disabled' => $disabled ? 'disabled' : null,
        'aria-invalid' => $isInvalid ? 'true' : null,
    ]) }}
>
    @if(count($options) > 0)
        @foreach($options as $val => $lbl)
            <option value="{{ $val }}" {{ (string)$selected === (string)$val ? 'selected' : '' }}>
                {{ $lbl }}
            </option>
        @endforeach
    @else
        {{ $slot }}
    @endif
</select>

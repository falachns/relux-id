@props([
    'title' => '',
    'description' => null,
])

<div role="status" {{ $attributes->merge(['class' => 'relux-empty-state']) }}>
    <div class="relux-empty-state__icon-box">
        {{ $icon ?? '∅' }}
    </div>
    <h3 class="relux-empty-state__title">{{ $title }}</h3>
    @if($description)
        <p class="relux-empty-state__description">{{ $description }}</p>
    @endif
    @if(isset($action))
        <div class="relux-empty-state__actions">
            {{ $action }}
        </div>
    @endif
</div>

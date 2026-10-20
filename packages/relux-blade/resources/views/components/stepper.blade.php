@props([
    'steps' => [],
    'orientation' => 'horizontal',
])

<nav aria-label="Progress Stepper" {{ $attributes->merge(['class' => 'relux-stepper ' . ($orientation === 'vertical' ? 'relux-stepper--vertical' : 'relux-stepper--horizontal')]) }}>
    @foreach($steps as $idx => $step)
        @php
            $status = $step['status'] ?? 'pending';
            $indicatorClass = match($status) {
                'completed' => 'relux-stepper__indicator--completed',
                'current' => 'relux-stepper__indicator--current',
                'error' => 'relux-stepper__indicator--error',
                default => 'relux-stepper__indicator--pending',
            };
        @endphp
        <div class="relux-stepper__item" @if($status === 'current') aria-current="step" @endif>
            <div class="flex items-center gap-3">
                <span class="relux-stepper__indicator {{ $indicatorClass }}">
                    @if($status === 'completed')
                        ✓
                    @elseif($status === 'error')
                        !
                    @else
                        {{ $idx + 1 }}
                    @endif
                </span>
                <div class="relux-stepper__content text-left">
                    <span class="relux-stepper__title">{{ $step['title'] ?? '' }}</span>
                    @if(isset($step['description']))
                        <span class="relux-stepper__desc">{{ $step['description'] }}</span>
                    @endif
                </div>
            </div>
            @if($orientation === 'horizontal' && $idx < count($steps) - 1)
                <div class="relux-stepper__connector mx-4 hidden sm:block" aria-hidden="true"></div>
            @endif
        </div>
    @endforeach
</nav>

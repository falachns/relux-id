import { type ReactNode } from 'react'
import { Check, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'

export type StepItem = {
  id: string | number
  title: string
  description?: string
  status: 'completed' | 'current' | 'pending' | 'error'
  icon?: ReactNode
}

export type StepperProps = {
  steps: StepItem[]
  orientation?: 'horizontal' | 'vertical'
  onStepClick?: (step: StepItem, index: number) => void
  className?: string
}

export function Stepper({
  steps,
  orientation = 'horizontal',
  onStepClick,
  className,
}: StepperProps) {
  return (
    <nav
      aria-label="Progress Stepper"
      className={clsx(
        'relux-stepper',
        orientation === 'vertical' ? 'relux-stepper--vertical' : 'relux-stepper--horizontal',
        className,
      )}
    >
      {steps.map((step, index) => {
        const isClickable = !!onStepClick && step.status !== 'pending'
        const isCurrent = step.status === 'current'
        const isCompleted = step.status === 'completed'
        const isError = step.status === 'error'

        return (
          <div
            key={step.id}
            className="relux-stepper__item"
            aria-current={isCurrent ? 'step' : undefined}
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => onStepClick?.(step, index)}
                aria-label={`Langkah ${index + 1}: ${step.title} (${step.status})`}
                className={clsx(
                  'relux-stepper__indicator',
                  isCompleted && 'relux-stepper__indicator--completed',
                  isCurrent && 'relux-stepper__indicator--current',
                  step.status === 'pending' && 'relux-stepper__indicator--pending',
                  isError && 'relux-stepper__indicator--error',
                  isClickable && 'cursor-pointer hover:opacity-90',
                )}
              >
                {isCompleted ? (
                  <Check className="size-4" aria-hidden="true" />
                ) : isError ? (
                  <AlertCircle className="size-4" aria-hidden="true" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>

              <div className="relux-stepper__content text-left">
                <span className="relux-stepper__title">{step.title}</span>
                {step.description && (
                  <span className="relux-stepper__desc">{step.description}</span>
                )}
              </div>
            </div>

            {orientation === 'horizontal' && index < steps.length - 1 && (
              <div
                className={clsx(
                  'relux-stepper__connector mx-4 hidden sm:block',
                  isCompleted ? 'bg-primary' : 'bg-border',
                )}
                aria-hidden="true"
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}

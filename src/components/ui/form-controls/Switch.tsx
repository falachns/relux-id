import clsx from 'clsx'
import {
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'

export type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: ReactNode
  hint?: ReactNode
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  label,
  hint,
  disabled,
  className,
  id,
  ...props
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked

  const toggle = () => {
    if (disabled) return
    const next = !isChecked
    if (controlledChecked === undefined) {
      setInternalChecked(next)
    }
    onCheckedChange?.(next)
  }

  const button = (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={isChecked}
      disabled={disabled}
      onClick={toggle}
      className={clsx(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
        isChecked ? 'bg-primary' : 'bg-muted',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={clsx(
          'pointer-events-none inline-block size-5 transform rounded-full bg-card shadow-sm ring-0 transition duration-200 ease-in-out',
          isChecked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  )

  if (!label) return button

  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 select-none"
    >
      {button}
      <div>
        <span className="text-sm font-medium text-foreground">{label}</span>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </label>
  )
}

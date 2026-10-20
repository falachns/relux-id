import clsx from 'clsx'
import type { InputHTMLAttributes, ReactNode } from 'react'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: ReactNode
  hint?: ReactNode
}

export function Checkbox({
  label,
  hint,
  className,
  id,
  ...props
}: CheckboxProps) {
  const content = (
    <input
      type="checkbox"
      id={id}
      className={clsx(
        'size-4 rounded border-border text-primary accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer',
        className,
      )}
      {...props}
    />
  )

  if (!label) return content

  return (
    <label
      htmlFor={id}
      className="flex min-h-6 cursor-pointer items-start gap-2 text-sm text-foreground select-none"
    >
      <span className="mt-0.5">{content}</span>
      <div>
        <span>{label}</span>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </label>
  )
}

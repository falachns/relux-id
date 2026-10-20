import clsx from 'clsx'
import {
  cloneElement,
  isValidElement,
  useId,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'

export type FormFieldProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode
  hint?: ReactNode
  error?: ReactNode
  required?: boolean
  htmlFor?: string
  children:
    | ReactNode
    | ((props: { id: string; describedBy?: string; isInvalid: boolean }) => ReactNode)
}

export function FormField({
  label,
  hint,
  error,
  required,
  htmlFor: explicitHtmlFor,
  className,
  children,
  ...props
}: FormFieldProps) {
  const generatedId = useId()
  const fieldId = explicitHtmlFor ?? generatedId
  const hintId = `${fieldId}-hint`
  const errorId = `${fieldId}-error`

  const hasError = Boolean(error)
  const hasHint = Boolean(hint)

  const describedBy = [
    hasError ? errorId : null,
    hasHint ? hintId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div className={clsx('flex flex-col gap-1.5', className)} {...props}>
      <label
        htmlFor={fieldId}
        className="text-sm font-semibold text-foreground flex items-center gap-1"
      >
        <span>{label}</span>
        {required && (
          <span className="text-destructive font-bold" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {typeof children === 'function'
        ? children({ id: fieldId, describedBy, isInvalid: hasError })
        : isValidElement(children)
          ? cloneElement(
              children as ReactElement<{
                id?: string
                'aria-describedby'?: string
                isInvalid?: boolean
              }>,
              {
                id: (children.props as { id?: string }).id ?? fieldId,
                'aria-describedby':
                  (children.props as { 'aria-describedby'?: string })['aria-describedby'] ?? describedBy,
                isInvalid:
                  (children.props as { isInvalid?: boolean }).isInvalid ?? hasError,
              },
            )
          : children}

      {hasError ? (
        <p id={errorId} role="alert" className="text-xs text-destructive mt-0.5">
          {error}
        </p>
      ) : hasHint ? (
        <p id={hintId} className="text-xs text-muted-foreground mt-0.5">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

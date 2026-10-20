import clsx from 'clsx'
import type { TextareaHTMLAttributes } from 'react'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  isInvalid?: boolean
}

export function Textarea({ isInvalid, className, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={isInvalid || undefined}
      className={clsx(
        'relux-field min-h-24 py-2.5 resize-y transition-[border-color,box-shadow]',
        isInvalid && 'border-destructive bg-danger-soft focus-visible:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input, type InputProps } from './Input'

export type PasswordInputProps = Omit<InputProps, 'type'> & {
  showPasswordLabel?: string
  hidePasswordLabel?: string
}

export function PasswordInput({
  showPasswordLabel = 'Show password',
  hidePasswordLabel = 'Hide password',
  ...props
}: PasswordInputProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="relative flex items-center w-full">
      <Input
        type={show ? 'text' : 'password'}
        className="pe-10"
        {...props}
      />
      <button
        type="button"
        aria-label={show ? hidePasswordLabel : showPasswordLabel}
        onClick={() => setShow((s) => !s)}
        className="absolute end-2 grid size-7 place-items-center rounded text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {show ? (
          <EyeOff aria-hidden="true" className="size-4" />
        ) : (
          <Eye aria-hidden="true" className="size-4" />
        )}
      </button>
    </div>
  )
}

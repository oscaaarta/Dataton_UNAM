import type { ReactNode } from 'react'

interface Props {
  id: string
  label: string
  error?: string
  optional?: boolean
  className?: string
  children: ReactNode
}

export default function FormField({ id, label, error, optional, className, children }: Props) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-tinta/50">(opcional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

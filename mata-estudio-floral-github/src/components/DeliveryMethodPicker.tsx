import type { UseFormRegisterReturn } from 'react-hook-form'
import { Store, Truck } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  register: UseFormRegisterReturn
  value: string | undefined
  error?: string
  name: string
}

const OPTIONS = [
  { value: 'domicilio', label: 'Entrega a domicilio', hint: 'Costo según zona', icon: Truck },
  { value: 'recoger', label: 'Recoger en estudio', hint: 'Sin costo', icon: Store },
] as const

export default function DeliveryMethodPicker({ register, value, error, name }: Props) {
  return (
    <fieldset>
      <legend className="field-label">Método de entrega</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((opt) => {
          const checked = value === opt.value
          return (
            <label
              key={opt.value}
              className={clsx(
                'flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-borgona/40',
                checked ? 'border-borgona bg-rosa/30' : 'border-tinta/15 bg-white/60 hover:border-borgona/40',
              )}
            >
              <input type="radio" value={opt.value} className="sr-only" {...register} name={name} />
              <span
                className={clsx(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                  checked ? 'bg-borgona text-crema' : 'bg-olivo/10 text-olivo',
                )}
              >
                <opt.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-medium">{opt.label}</span>
                <span className="block text-xs text-tinta/60">{opt.hint}</span>
              </span>
            </label>
          )
        })}
      </div>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}

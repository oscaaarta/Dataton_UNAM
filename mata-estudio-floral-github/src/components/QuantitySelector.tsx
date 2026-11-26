import { Minus, Plus } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'md'
  label?: string
}

export default function QuantitySelector({ value, onChange, min = 1, max = 99, size = 'md', label = 'Cantidad' }: Props) {
  const btn = clsx(
    'flex items-center justify-center rounded-full text-borgona transition hover:bg-rosa/50 disabled:opacity-30 disabled:hover:bg-transparent',
    size === 'sm' ? 'h-8 w-8' : 'h-10 w-10',
  )
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-full border border-tinta/15 bg-white/70 p-1"
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        className={clsx('min-w-8 text-center font-medium tabular-nums', size === 'sm' ? 'text-sm' : 'text-base')}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

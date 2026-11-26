import { formatPrice } from '../lib/format'

interface Props {
  total: number
}

export default function OrderSummary({ total }: Props) {
  const deposit = total / 2
  const rest = total - deposit
  return (
    <dl className="space-y-3">
      <div className="flex items-baseline justify-between">
        <dt className="text-sm text-tinta/70">Total</dt>
        <dd className="font-serif text-3xl font-semibold text-borgona tabular-nums">{formatPrice(total)}</dd>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-borgona px-4 py-3 text-crema">
        <dt className="text-sm font-medium">Anticipo para apartar (50 %)</dt>
        <dd className="text-lg font-semibold tabular-nums">{formatPrice(deposit)}</dd>
      </div>
      <div className="flex items-center justify-between rounded-xl bg-rosa/60 px-4 py-3 text-borgona">
        <dt className="text-sm font-medium">Resta a liquidar al recibir (50 %)</dt>
        <dd className="text-lg font-semibold tabular-nums">{formatPrice(rest)}</dd>
      </div>
    </dl>
  )
}

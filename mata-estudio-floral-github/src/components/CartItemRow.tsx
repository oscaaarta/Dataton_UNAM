import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart, type CartItem } from '../store/cart'
import { formatPrice } from '../lib/format'
import QuantitySelector from './QuantitySelector'
import SmartImage from './SmartImage'

export default function CartItemRow({ item, onNavigate }: { item: CartItem; onNavigate?: () => void }) {
  const updateQuantity = useCart((s) => s.updateQuantity)
  const removeItem = useCart((s) => s.removeItem)

  return (
    <li className="flex gap-4 py-5">
      <Link
        to={`/producto/${item.slug}`}
        onClick={onNavigate}
        className="block h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-rosa/30"
        aria-label={`Ver ${item.name}`}
      >
        <SmartImage src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-serif text-xl font-medium leading-tight text-borgona">{item.name}</p>
            <p className="mt-0.5 text-sm text-tinta/70">{formatPrice(item.price)} c/u</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="rounded-full p-2 text-tinta/50 transition hover:bg-rosa/50 hover:text-borgona"
            aria-label={`Eliminar ${item.name} del carrito`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        {item.cardMessage && (
          <p className="mt-1 line-clamp-2 break-words text-xs italic text-tinta/60">Tarjeta: “{item.cardMessage}”</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <QuantitySelector
            size="sm"
            value={item.quantity}
            onChange={(q) => updateQuantity(item.id, q)}
            label={`Cantidad de ${item.name}`}
          />
          <span className="font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </li>
  )
}

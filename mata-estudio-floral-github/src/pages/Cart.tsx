import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart, selectSubtotal } from '../store/cart'
import { formatPrice } from '../lib/format'
import CartItemRow from '../components/CartItemRow'
import OrderSummary from '../components/OrderSummary'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'

export default function Cart() {
  const items = useCart((s) => s.items)
  const subtotal = useCart(selectSubtotal)

  return (
    <>
      <PageTitle title="Carrito" />
      <PageHeader eyebrow="Tu selección" title="Carrito" />
      <div className="container-x">
        {items.length === 0 ? (
          <div className="card mx-auto flex max-w-lg flex-col items-center gap-4 p-10 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-rosa/50 text-borgona">
              <ShoppingBag className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="font-serif text-2xl text-borgona">Tu carrito está vacío</p>
            <p className="text-sm text-tinta/70">Elige un ramo de nuestro catálogo o cotiza uno a tu medida.</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Link to="/catalogo" className="btn btn-primary">
                Ver catálogo
              </Link>
              <Link to="/cotizar" className="btn btn-outline">
                Cotizar
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <section className="card px-5 sm:px-8" aria-label="Productos en el carrito">
              <ul className="divide-y divide-tinta/10">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </ul>
            </section>
            <aside className="card h-fit p-6 lg:sticky lg:top-32" aria-label="Resumen">
              <h2 className="mb-5 text-2xl font-medium">Resumen</h2>
              <div className="mb-5 flex justify-between text-sm">
                <span className="text-tinta/70">Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <OrderSummary total={subtotal} />
              <p className="mt-4 text-xs leading-relaxed text-tinta/60">
                El costo de envío a domicilio se calcula según la zona y se confirma por WhatsApp.
              </p>
              <Link to="/checkout" className="btn btn-primary mt-6 w-full">
                Continuar al pedido
              </Link>
              <Link to="/catalogo" className="mt-3 block text-center text-sm text-olivo hover:underline">
                Seguir comprando
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  )
}

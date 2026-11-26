import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, X } from 'lucide-react'
import { useCart, selectSubtotal } from '../store/cart'
import { formatPrice } from '../lib/format'
import CartItemRow from './CartItemRow'

export default function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen)
  const close = useCart((s) => s.close)
  const items = useCart((s) => s.items)
  const subtotal = useCart(selectSubtotal)
  const navigate = useNavigate()
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-tinta/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            aria-hidden="true"
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-crema shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <header className="flex items-center justify-between border-b border-tinta/10 px-5 py-4">
              <h2 className="text-2xl font-medium">Tu carrito</h2>
              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                className="rounded-full p-2 text-tinta/70 transition hover:bg-rosa/50 hover:text-borgona"
                aria-label="Cerrar carrito"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-rosa/50 text-borgona">
                  <ShoppingBag className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="font-serif text-2xl text-borgona">Tu carrito está vacío</p>
                <p className="text-sm text-tinta/70">Elige un ramo y lo preparamos con todo el cariño.</p>
                <Link to="/catalogo" onClick={close} className="btn btn-primary mt-2">
                  Ver catálogo
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-tinta/10 overflow-y-auto px-5">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} onNavigate={close} />
                  ))}
                </ul>
                <footer className="border-t border-tinta/10 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-tinta/70">Subtotal</span>
                    <span className="font-serif text-2xl font-semibold text-borgona">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-tinta/60">Aparta con el 50 %: {formatPrice(subtotal / 2)}</p>
                  <button
                    type="button"
                    className="btn btn-primary mt-4 w-full"
                    onClick={() => {
                      close()
                      navigate('/checkout')
                    }}
                  >
                    Continuar al pedido
                  </button>
                  <Link
                    to="/carrito"
                    onClick={close}
                    className="mt-3 block text-center text-sm text-olivo underline-offset-4 hover:underline"
                  >
                    Ver carrito completo
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

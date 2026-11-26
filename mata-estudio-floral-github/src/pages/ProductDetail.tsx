import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ShoppingBag, Sparkles, Store, Truck } from 'lucide-react'
import { toast } from 'sonner'
import { getProduct, products } from '../data/products'
import { formatPrice } from '../lib/format'
import { useCart } from '../store/cart'
import QuantitySelector from '../components/QuantitySelector'
import SmartImage from '../components/SmartImage'
import PageTitle from '../components/PageTitle'
import ProductCard from '../components/ProductCard'
import NotFound from './NotFound'

const MAX_MESSAGE = 200

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const addItem = useCart((s) => s.addItem)
  const openCart = useCart((s) => s.open)
  const navigate = useNavigate()

  if (!product) return <NotFound />

  const isQuote = product.price === null
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3)

  function handleAdd() {
    if (!product) return
    if (product.price === null) {
      navigate(`/cotizar?ramo=${product.slug}`)
      return
    }
    addItem(
      { slug: product.slug, name: product.name, image: product.image, price: product.price, cardMessage: message },
      quantity,
    )
    toast.success('Agregado al carrito', {
      description: `${quantity} × ${product.name}`,
    })
    setQuantity(1)
    setMessage('')
    openCart()
  }

  return (
    <>
      <PageTitle title={product.name} />
      <div className="container-x pt-8">
        <Link to="/catalogo" className="inline-flex items-center gap-1 text-sm text-olivo hover:text-borgona">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Volver al catálogo
        </Link>
      </div>

      <section className="container-x mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl bg-rosa/30"
        >
          <SmartImage
            src={product.image}
            alt={`${product.name}: ${product.shortDescription}`}
            loading="eager"
            className="aspect-[4/5] w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:py-6"
        >
          <span className="inline-block rounded-full bg-rosa/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-borgona">
            {product.tag}
          </span>
          <h1 className="mt-4 text-4xl font-medium leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-4 font-serif text-3xl font-semibold text-borgona">
            {isQuote ? 'Bajo cotización' : formatPrice(product.price!)}
          </p>
          <p className="mt-6 text-base leading-relaxed text-tinta/80">{product.longDescription}</p>

          {isQuote ? (
            <div className="mt-8">
              <p className="text-sm leading-relaxed text-tinta/70">
                Este ramo se diseña contigo. Completa el formulario de cotización y te enviamos una propuesta por
                WhatsApp.
              </p>
              <button type="button" onClick={handleAdd} className="btn btn-primary mt-6 w-full sm:w-auto">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> Cotizar
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              <div>
                <span className="field-label" id="qty-label">
                  Cantidad
                </span>
                <QuantitySelector value={quantity} onChange={setQuantity} label="Cantidad" />
              </div>
              <div>
                <label htmlFor="card-message" className="field-label">
                  Mensaje para la tarjeta <span className="font-normal text-tinta/50">(opcional)</span>
                </label>
                <textarea
                  id="card-message"
                  rows={3}
                  maxLength={MAX_MESSAGE}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ej. ¡Feliz cumpleaños, mamá! Te quiero mucho."
                  className="field resize-none"
                />
                <p className="mt-1 text-right text-xs text-tinta/50">
                  {message.length}/{MAX_MESSAGE}
                </p>
              </div>
              <button type="button" onClick={handleAdd} className="btn btn-primary w-full">
                <ShoppingBag className="h-4 w-4" aria-hidden="true" /> Agregar al carrito ·{' '}
                {formatPrice(product.price! * quantity)}
              </button>
            </div>
          )}

          <ul className="mt-10 space-y-3 border-t border-tinta/10 pt-6 text-sm text-tinta/75">
            <li className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-olivo" aria-hidden="true" /> Entrega a domicilio (costo según zona)
            </li>
            <li className="flex items-center gap-3">
              <Store className="h-4 w-4 text-olivo" aria-hidden="true" /> Recoge sin costo en nuestro estudio
            </li>
            <li className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-olivo" aria-hidden="true" /> Aparta con el 50 %, liquida al recibir
            </li>
          </ul>
        </motion.div>
      </section>

      <section className="container-x mt-24" aria-labelledby="otros">
        <h2 id="otros" className="mb-8 text-3xl font-medium">
          También te puede gustar
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  )
}

import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import type { Product } from '../data/products'
import { formatPrice } from '../lib/format'
import { useCart } from '../store/cart'
import SmartImage from './SmartImage'

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem)
  const openCart = useCart((s) => s.open)
  const navigate = useNavigate()
  const isQuote = product.price === null

  function handleClick() {
    if (product.price === null) {
      navigate(`/cotizar?ramo=${product.slug}`)
      return
    }
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      cardMessage: '',
    })
    toast.success('Agregado al carrito', { description: product.name })
    openCart()
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="card group flex h-full flex-col overflow-hidden"
    >
      <Link
        to={`/producto/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-rosa/30"
        aria-label={`Ver detalles de ${product.name}`}
      >
        <SmartImage
          src={product.image}
          alt={`${product.name}: ${product.shortDescription}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-crema/90 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-olivo backdrop-blur">
          {product.tag}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl font-medium leading-tight">
          <Link to={`/producto/${product.slug}`} className="hover:underline decoration-1 underline-offset-4">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-tinta/70">{product.shortDescription}</p>

        <div className="mt-auto pt-5">
          {isQuote ? (
            <span className="inline-block rounded-full bg-rosa/60 px-3 py-1 text-sm font-medium text-borgona">
              Bajo cotización
            </span>
          ) : (
            <span className="font-serif text-2xl font-semibold text-borgona">{formatPrice(product.price!)}</span>
          )}
          <button
            type="button"
            onClick={handleClick}
            className={isQuote ? 'btn btn-outline mt-4 w-full' : 'btn btn-primary mt-4 w-full'}
          >
            {isQuote ? <Sparkles className="h-4 w-4" aria-hidden="true" /> : <ShoppingBag className="h-4 w-4" aria-hidden="true" />}
            {isQuote ? 'Cotizar' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </motion.article>
  )
}

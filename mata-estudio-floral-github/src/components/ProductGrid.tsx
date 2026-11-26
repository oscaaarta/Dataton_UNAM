import { products } from '../data/products'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, i) => (
        <Reveal key={product.slug} delay={i * 0.08} className="h-full">
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  )
}

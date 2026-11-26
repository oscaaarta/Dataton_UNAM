import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'
import ProductGrid from '../components/ProductGrid'

export default function Catalog() {
  return (
    <>
      <PageTitle title="Catálogo" />
      <PageHeader
        eyebrow="Catálogo"
        title="Elige tu ramo"
        subtitle="Ramos listos para pedir o diseñados a tu medida. Todos se preparan con flores frescas el día de la entrega."
      />
      <section className="container-x" aria-label="Productos">
        <ProductGrid />
        <div className="card mt-16 flex flex-col items-center gap-4 p-8 text-center sm:p-12">
          <p className="font-serif text-3xl text-borgona">¿Buscas algo diferente?</p>
          <p className="max-w-lg text-sm leading-relaxed text-tinta/70">
            Cuéntanos tu idea, tus colores favoritos y la ocasión. Diseñamos un ramo único para ti.
          </p>
          <Link to="/cotizar" className="btn btn-secondary">
            Cotiza un ramo personalizado
          </Link>
        </div>
      </section>
    </>
  )
}

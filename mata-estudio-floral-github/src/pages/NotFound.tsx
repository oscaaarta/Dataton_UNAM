import { Link } from 'react-router-dom'
import { Sprig } from '../components/icons'
import PageTitle from '../components/PageTitle'

export default function NotFound() {
  return (
    <>
      <PageTitle title="Página no encontrada" />
      <section className="container-x flex min-h-[60svh] flex-col items-center justify-center py-20 text-center">
        <p className="font-serif text-8xl font-medium text-rosa sm:text-9xl" aria-hidden="true">
          404
        </p>
        <h1 className="-mt-4 text-4xl font-medium sm:text-5xl">Esta flor no está en nuestro jardín</h1>
        <Sprig className="mx-auto mt-5 h-5 w-28 text-olivo" />
        <p className="mt-5 max-w-md text-sm leading-relaxed text-tinta/70">
          La página que buscas no existe o cambió de lugar. Te invitamos a volver al inicio o descubrir nuestros ramos.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
          <Link to="/catalogo" className="btn btn-outline">
            Ver catálogo
          </Link>
        </div>
      </section>
    </>
  )
}

import { Link } from 'react-router-dom'
import { Store, Truck } from 'lucide-react'
import Reveal from './Reveal'
import SmartImage from './SmartImage'
import { Sprig } from './icons'

export default function DeliverySection() {
  return (
    <section className="bg-rosa/30 py-20 sm:py-28" aria-labelledby="entregas-titulo">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-2xl">
            <SmartImage
              src="/assets/entregas.png"
              alt="Ramo de MATA listo para entregarse a domicilio"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow mb-3">Entregas</p>
          <h2 id="entregas-titulo" className="text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            Tu ramo, donde lo necesites
          </h2>
          <Sprig className="mt-4 h-5 w-28 text-olivo" />
          <div className="mt-8 space-y-5">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-crema text-olivo">
                <Truck className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-2xl font-medium">Entrega a domicilio</h3>
                <p className="mt-1 text-sm leading-relaxed text-tinta/75">
                  Llevamos tu ramo hasta la puerta en la fecha y horario que elijas. El costo de envío depende de la
                  zona y te lo confirmamos por WhatsApp.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-crema text-olivo">
                <Store className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-2xl font-medium">Recoger en estudio</h3>
                <p className="mt-1 text-sm leading-relaxed text-tinta/75">
                  Pasa por tu ramo a nuestro estudio sin costo adicional. Te compartimos la ubicación al confirmar tu
                  pedido.
                </p>
              </div>
            </div>
          </div>
          <Link to="/entregas" className="btn btn-outline mt-8">
            Conoce cómo entregamos
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

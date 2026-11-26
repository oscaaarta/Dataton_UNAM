import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, HandCoins, PackageCheck, Store, Truck } from 'lucide-react'
import clsx from 'clsx'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'

const FAQS = [
  {
    q: '¿Con cuánta anticipación pido?',
    a: 'Te recomendamos pedir con al menos 24 a 48 horas de anticipación para ramos del catálogo, y de 3 a 5 días para ramos temáticos o personalizados. En fechas especiales como San Valentín o Día de las Madres, aparta con más tiempo porque los lugares se llenan rápido.',
  },
  {
    q: '¿Puedo agregar tarjeta?',
    a: '¡Claro! Cada ramo puede llevar una tarjeta con tu mensaje sin costo adicional. Escríbelo en el campo “Mensaje para la tarjeta” al agregar el ramo al carrito y lo escribimos a mano.',
  },
  {
    q: '¿Cuánto cuesta el envío?',
    a: 'El costo de envío a domicilio depende de la zona de entrega. Al recibir tu pedido por WhatsApp te confirmamos el costo exacto antes de que apartes. Si prefieres, puedes recoger tu ramo en el estudio sin costo.',
  },
  {
    q: '¿Qué pasa si quiero cambiar mi pedido?',
    a: 'Escríbenos por WhatsApp lo antes posible. Podemos ajustar fecha, horario, dirección o detalles del ramo con al menos 24 horas de anticipación, siempre que aún no hayamos comprado las flores para tu pedido. El anticipo se respeta para el pedido modificado.',
  },
]

export default function Delivery() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      <PageTitle title="Entregas y pagos" />
      <PageHeader
        eyebrow="Entregas"
        title="Entregas y forma de pago"
        subtitle="Elige cómo recibir tu ramo. Aparta con la mitad y liquida el resto al recibirlo."
      />

      <section className="container-x grid gap-6 md:grid-cols-2" aria-label="Modalidades de entrega">
        <Reveal>
          <article className="card h-full p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-olivo/10 text-olivo">
              <Truck className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-3xl font-medium">Entrega a domicilio</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-tinta/75">
              <li>• Llevamos tu ramo a la dirección que indiques, en la fecha y horario que elijas.</li>
              <li>• El costo de envío varía según la zona y se confirma por WhatsApp.</li>
              <li>• Puede recibirlo cualquier persona; nosotras nos encargamos de entregarlo con cuidado.</li>
              <li>• Te avisamos cuando tu ramo vaya en camino.</li>
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.1}>
          <article className="card h-full p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-olivo/10 text-olivo">
              <Store className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-3xl font-medium">Recoger en estudio</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-tinta/75">
              <li>• Pasa por tu ramo sin costo adicional.</li>
              <li>• Te compartimos la ubicación exacta al confirmar tu pedido.</li>
              <li>• Elige el horario de recolección que mejor te acomode.</li>
              <li>• Tu ramo estará listo y fresco a la hora acordada.</li>
            </ul>
          </article>
        </Reveal>
      </section>

      <section className="mt-20 bg-rosa/30 py-16 sm:py-20" aria-labelledby="pago">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">Forma de pago</p>
            <h2 id="pago" className="text-3xl font-medium sm:text-4xl">
              Aparta con el 50 %, liquida al recibir
            </h2>
            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-borgona text-crema">
                  <HandCoins className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium">1. Anticipo del 50 %</p>
                  <p className="text-sm text-tinta/75">
                    Al confirmar tu pedido por WhatsApp te compartimos los datos para el anticipo. Con él apartamos tu
                    fecha y compramos tus flores.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-olivo text-crema">
                  <PackageCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-medium">2. Resto al recibir</p>
                  <p className="text-sm text-tinta/75">
                    Liquidas el 50 % restante (más el envío, si aplica) cuando recibes o recoges tu ramo.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl">
              <SmartImage src="/assets/entregas.png" alt="Entrega de un ramo de MATA estudio floral" className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x mt-20 max-w-3xl" aria-labelledby="faq">
        <h2 id="faq" className="mb-8 text-center text-3xl font-medium sm:text-4xl">
          Preguntas frecuentes
        </h2>
        <div className="divide-y divide-tinta/10 rounded-2xl border border-tinta/10 bg-white/50">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <h3 className="font-sans text-tinta">
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium transition hover:text-borgona"
                  >
                    {f.q}
                    <ChevronDown
                      className={clsx('h-5 w-5 shrink-0 text-olivo transition-transform duration-300', isOpen && 'rotate-180')}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-tinta/75">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
        <div className="mt-10 text-center">
          <Link to="/catalogo" className="btn btn-primary">
            Elige tu ramo
          </Link>
        </div>
      </section>
    </>
  )
}

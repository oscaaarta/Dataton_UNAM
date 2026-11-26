import { Flower2, HandCoins, PackageCheck } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const STEPS = [
  {
    icon: Flower2,
    title: 'Elige tu ramo o cotiza uno personalizado',
    text: 'Explora nuestro catálogo o cuéntanos tu idea y diseñamos un ramo a tu medida.',
  },
  {
    icon: HandCoins,
    title: 'Aparta con el 50 %',
    text: 'Confirmamos tu pedido por WhatsApp y lo apartas con la mitad del total.',
  },
  {
    icon: PackageCheck,
    title: 'Liquida el 50 % restante al recibir',
    text: 'Pagas el resto cuando recibes tu ramo a domicilio o al recogerlo en el estudio.',
  },
]

export default function StepsSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="como-pedir">
      <div className="container-x">
        <div id="como-pedir">
          <SectionHeading eyebrow="Así de sencillo" title="¿Cómo pedir?" />
        </div>
        <ol className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <li className="card relative h-full list-none p-8 text-center">
                <span className="absolute right-6 top-4 font-serif text-6xl font-medium text-rosa" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-olivo/10 text-olivo">
                  <step.icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="relative mt-5 text-2xl font-medium leading-snug">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-tinta/70">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import StepsSection from '../components/StepsSection'
import DeliverySection from '../components/DeliverySection'
import SocialBanner from '../components/SocialBanner'
import ProductGrid from '../components/ProductGrid'
import SectionHeading from '../components/SectionHeading'
import SmartImage from '../components/SmartImage'
import PageTitle from '../components/PageTitle'

const ease = [0.22, 1, 0.36, 1] as const

export default function Home() {
  return (
    <>
      <PageTitle />
      {/* Hero */}
      <section className="relative isolate overflow-hidden" aria-labelledby="hero-titulo">
        <SmartImage
          src="/assets/hero.png"
          alt="Ramo de flores de MATA estudio floral sobre fondo crema"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-crema/90 via-crema/75 to-crema/40 md:bg-gradient-to-r md:from-crema/95 md:via-crema/60 md:to-transparent"
          aria-hidden="true"
        />
        <div className="container-x flex min-h-[78svh] items-center py-20 sm:min-h-[86svh]">
          <div className="max-w-xl">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              Estudio floral · Ramos hechos a mano
            </motion.p>
            <motion.h1
              id="hero-titulo"
              className="mt-4 text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
            >
              Flores que cuentan <em className="font-normal italic">tu historia</em>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-md text-base leading-relaxed text-tinta/80 sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease }}
            >
              Ramos artesanales con flores frescas, diseñados para celebrar, agradecer y decir lo que a veces no cabe
              en palabras. Entrega a domicilio o recoge en nuestro estudio.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease }}
            >
              <Link to="/catalogo" className="btn btn-primary">
                Elige tu ramo <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/cotizar" className="btn btn-outline bg-crema/60">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> Cotiza tu ramo
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <StepsSection />

      {/* Destacados */}
      <section className="pb-20 sm:pb-28" aria-labelledby="destacados">
        <div className="container-x">
          <div id="destacados">
            <SectionHeading
              eyebrow="Nuestros ramos"
              title="Favoritos del estudio"
              subtitle="Cada ramo se arma a mano el día de tu entrega, con flores frescas de temporada."
            />
          </div>
          <ProductGrid />
          <div className="mt-12 text-center">
            <Link to="/catalogo" className="btn btn-outline">
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      <DeliverySection />
      <SocialBanner />
    </>
  )
}

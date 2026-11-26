import { Phone } from 'lucide-react'
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  TIKTOK_HANDLE,
  TIKTOK_URL,
  whatsappLink,
} from '../lib/contact'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from '../components/icons'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'
import Reveal from '../components/Reveal'

export default function Contact() {
  return (
    <>
      <PageTitle title="Contacto" />
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos de flores"
        subtitle="Escríbenos o llámanos para pedidos, cotizaciones o cualquier duda. Con gusto te atendemos."
      />
      <div className="container-x grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <section className="card flex h-full flex-col items-center p-8 text-center sm:p-12" aria-labelledby="cel">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-olivo/10 text-olivo">
              <Phone className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="eyebrow mt-6">Celular y WhatsApp</p>
            <h2 id="cel" className="mt-2 text-4xl font-semibold tabular-nums sm:text-5xl">
              {PHONE_DISPLAY}
            </h2>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={PHONE_TEL} className="btn btn-outline">
                <Phone className="h-4 w-4" aria-hidden="true" /> Llamar
              </a>
              <a
                href={whatsappLink('¡Hola, MATA! Me gustaría información sobre sus ramos.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <WhatsAppIcon size={18} /> WhatsApp
              </a>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section className="card h-full p-8 sm:p-10" aria-labelledby="redes">
            <h2 id="redes" className="text-3xl font-medium">
              Síguenos
            </h2>
            <p className="mt-2 text-sm text-tinta/70">Inspiración, novedades y ramos recién hechos.</p>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-tinta/10 bg-white/60 p-4 transition hover:border-borgona/40 hover:bg-rosa/20"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-borgona text-crema">
                    <InstagramIcon size={20} />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">Instagram</span>
                    <span className="block text-sm text-tinta/60">{INSTAGRAM_HANDLE}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-tinta/10 bg-white/60 p-4 transition hover:border-borgona/40 hover:bg-rosa/20"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olivo text-crema">
                    <TikTokIcon size={20} />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">TikTok</span>
                    <span className="block text-sm text-tinta/60">{TIKTOK_HANDLE}</span>
                  </span>
                </a>
              </li>
            </ul>
          </section>
        </Reveal>
      </div>
    </>
  )
}

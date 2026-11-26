import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  TIKTOK_HANDLE,
  TIKTOK_URL,
  WHATSAPP_URL,
} from '../lib/contact'
import { InstagramIcon, Sprig, TikTokIcon, WhatsAppIcon } from './icons'
import { NAV_LINKS } from '../lib/nav'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-tinta/10 bg-white/40">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <img src="/assets/logo-mata.svg" alt="MATA estudio floral" className="h-16 w-auto" loading="lazy" width={168} height={64} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-tinta/70">
            Ramos artesanales y arreglos personalizados, hechos a mano con flores frescas para acompañar tus momentos
            más importantes.
          </p>
          <Sprig className="mt-5 h-5 w-28 text-olivo" />
        </div>

        <nav aria-label="Pie de página">
          <p className="eyebrow mb-4">Navegación</p>
          <ul className="space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-tinta/80 transition hover:text-borgona">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/carrito" className="text-tinta/80 transition hover:text-borgona">
                Carrito
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">Contacto</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={PHONE_TEL} className="inline-flex items-center gap-2 text-tinta/80 hover:text-borgona">
                <Phone className="h-4 w-4 text-olivo" aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-tinta/80 hover:text-borgona">
                <WhatsAppIcon size={16} className="text-olivo" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-tinta/80 hover:text-borgona">
                <InstagramIcon size={16} className="text-olivo" /> {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-tinta/80 hover:text-borgona">
                <TikTokIcon size={16} className="text-olivo" /> {TIKTOK_HANDLE}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-tinta/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-tinta/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MATA estudio floral. Todos los derechos reservados.</p>
          <p>Hecho con flores y cariño en México.</p>
        </div>
      </div>
    </footer>
  )
}

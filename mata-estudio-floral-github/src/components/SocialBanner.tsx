import { INSTAGRAM_HANDLE, INSTAGRAM_URL, TIKTOK_HANDLE, TIKTOK_URL } from '../lib/contact'
import { InstagramIcon, TikTokIcon } from './icons'
import Reveal from './Reveal'

export default function SocialBanner() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="redes-titulo">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-borgona px-6 py-14 text-center text-crema sm:px-12">
            <svg className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 text-rosa/15" viewBox="0 0 100 100" aria-hidden="true">
              <g fill="currentColor">
                {[0, 72, 144, 216, 288].map((r) => (
                  <ellipse key={r} cx="50" cy="28" rx="14" ry="22" transform={`rotate(${r} 50 50)`} />
                ))}
              </g>
            </svg>
            <svg className="pointer-events-none absolute -bottom-12 -right-8 h-56 w-56 text-olivo/40" viewBox="0 0 100 100" aria-hidden="true">
              <path d="M10 90 C 40 70, 60 40, 70 10" stroke="currentColor" strokeWidth="2" fill="none" />
              <g fill="currentColor">
                <ellipse cx="40" cy="70" rx="10" ry="4" transform="rotate(-40 40 70)" />
                <ellipse cx="55" cy="52" rx="10" ry="4" transform="rotate(30 55 52)" />
                <ellipse cx="60" cy="32" rx="9" ry="3.6" transform="rotate(-50 60 32)" />
              </g>
            </svg>

            <p className="relative text-xs font-medium uppercase tracking-[0.25em] text-rosa">Síguenos</p>
            <h2 id="redes-titulo" className="relative mt-3 text-3xl font-medium text-crema sm:text-5xl">
              Inspiración floral todos los días
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-crema/80 sm:text-base">
              Descubre nuestros ramos más recientes, detrás de cámaras y novedades de temporada en nuestras redes.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full bg-crema text-borgona hover:bg-rosa sm:w-auto"
              >
                <InstagramIcon size={18} /> {INSTAGRAM_HANDLE}
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full border border-crema/40 text-crema hover:bg-crema hover:text-borgona sm:w-auto"
              >
                <TikTokIcon size={18} /> {TIKTOK_HANDLE}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

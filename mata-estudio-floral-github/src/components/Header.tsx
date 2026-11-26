import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, ShoppingBag, X } from 'lucide-react'
import clsx from 'clsx'
import { useCart, selectCount } from '../store/cart'
import { PHONE_DISPLAY, PHONE_TEL, INSTAGRAM_URL, TIKTOK_URL } from '../lib/contact'
import { NAV_LINKS } from '../lib/nav'
import { InstagramIcon, TikTokIcon } from './icons'

export default function Header() {
  const count = useCart(selectCount)
  const openCart = useCart((s) => s.open)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300',
        scrolled || menuOpen ? 'bg-crema/95 shadow-[0_1px_0_rgba(58,42,42,0.08)] backdrop-blur' : 'bg-crema/70 backdrop-blur-sm',
      )}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-full focus:bg-borgona focus:px-4 focus:py-2 focus:text-crema"
      >
        Saltar al contenido
      </a>

      <div className="hidden border-b border-tinta/5 bg-borgona text-crema sm:block">
        <div className="container-x flex h-8 items-center justify-between text-xs tracking-wide">
          <p>Aparta tu ramo con el 50 % · Liquida al recibir</p>
          <div className="flex items-center gap-4">
            <a href={PHONE_TEL} className="inline-flex items-center gap-1.5 hover:text-rosa">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {PHONE_DISPLAY}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram de MATA" className="hover:text-rosa">
              <InstagramIcon size={14} />
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok de MATA" className="hover:text-rosa">
              <TikTokIcon size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link to="/" className="shrink-0" aria-label="MATA estudio floral, ir al inicio">
          <img src="/assets/logo-mata.svg" alt="MATA estudio floral" className="h-12 w-auto sm:h-14" width={147} height={56} />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    clsx(
                      'relative rounded-full px-4 py-2 text-sm tracking-wide transition',
                      isActive ? 'text-borgona' : 'text-tinta/80 hover:text-borgona',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-4 -bottom-0.5 h-px bg-borgona"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openCart}
            className="relative rounded-full p-2.5 text-borgona transition hover:bg-rosa/50"
            aria-label={`Abrir carrito, ${count} ${count === 1 ? 'pieza' : 'piezas'}`}
          >
            <ShoppingBag className="h-6 w-6" strokeWidth={1.6} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-borgona px-1 text-[0.68rem] font-semibold text-crema"
                  aria-hidden="true"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full p-2.5 text-borgona transition hover:bg-rosa/50 md:hidden"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="menu-movil"
            aria-label="Menú móvil"
            className="overflow-hidden border-t border-tinta/10 bg-crema md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="container-x flex flex-col py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      clsx(
                        'block border-b border-tinta/5 py-3.5 font-serif text-2xl',
                        isActive ? 'text-borgona' : 'text-tinta/80',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="flex items-center gap-4 pt-5 text-olivo">
                <a href={PHONE_TEL} className="inline-flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE_DISPLAY}
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram de MATA">
                  <InstagramIcon />
                </a>
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok de MATA">
                  <TikTokIcon />
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

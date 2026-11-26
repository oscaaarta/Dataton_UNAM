import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const Catalog = lazy(() => import('./pages/Catalog'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Quote = lazy(() => import('./pages/Quote'))
const Delivery = lazy(() => import('./pages/Delivery'))
const Contact = lazy(() => import('./pages/Contact'))

export default function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <ScrollToTop />
      <Header />
      <main id="contenido" className="flex-1 pt-16 sm:pt-28">
        <Suspense fallback={<div className="min-h-[60svh]" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/producto/:slug" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cotizar" element={<Quote />} />
          <Route path="/entregas" element={<Delivery />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#F7F1E6',
            color: '#3A2A2A',
            border: '1px solid rgba(122,31,61,0.2)',
            fontFamily: 'Montserrat, sans-serif',
          },
        }}
      />
    </div>
  )
}

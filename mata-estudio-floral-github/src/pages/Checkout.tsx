import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { useCart, selectSubtotal } from '../store/cart'
import { checkoutSchema, TIME_SLOTS, type CheckoutValues } from '../lib/schemas'
import { formatDate, formatPrice, todayISO } from '../lib/format'
import { openWhatsApp } from '../lib/openWhatsApp'
import FormField from '../components/FormField'
import DeliveryMethodPicker from '../components/DeliveryMethodPicker'
import OrderSummary from '../components/OrderSummary'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'
import SmartImage from '../components/SmartImage'
import { WhatsAppIcon } from '../components/icons'

export default function Checkout() {
  const items = useCart((s) => s.items)
  const total = useCart(selectSubtotal)
  const clear = useCart((s) => s.clear)
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nombre: '',
      celular: '',
      correo: '',
      metodo: 'domicilio',
      direccion: '',
      colonia: '',
      alcaldia: '',
      cp: '',
      referencias: '',
      fecha: '',
      horario: '',
    },
  })

  const metodo = useWatch({ control, name: 'metodo' })

  function onSubmit(data: CheckoutValues) {
    const deposit = total / 2
    const lines: string[] = [
      '🌸 *Nuevo pedido — MATA estudio floral*',
      '',
      '*Productos:*',
      ...items.map((i) => {
        const base = `• ${i.quantity} × ${i.name} — ${formatPrice(i.price * i.quantity)}`
        return i.cardMessage ? `${base}\n   Tarjeta: "${i.cardMessage}"` : base
      }),
      '',
      '*Cliente:*',
      `Nombre: ${data.nombre}`,
      `Celular: ${data.celular}`,
    ]
    if (data.correo) lines.push(`Correo: ${data.correo}`)
    lines.push('', `*Método de entrega:* ${data.metodo === 'domicilio' ? 'Entrega a domicilio' : 'Recoger en estudio'}`)
    if (data.metodo === 'domicilio') {
      lines.push(
        `Dirección: ${data.direccion}`,
        `Colonia: ${data.colonia}`,
        `Alcaldía/Municipio: ${data.alcaldia}`,
        `C.P.: ${data.cp}`,
      )
      if (data.referencias) lines.push(`Referencias: ${data.referencias}`)
    }
    lines.push(
      `Fecha: ${formatDate(data.fecha)}`,
      `Horario: ${data.horario} h`,
      '',
      `*Total:* ${formatPrice(total)}`,
      `*Anticipo para apartar (50 %):* ${formatPrice(deposit)}`,
      `*Resta a liquidar al recibir (50 %):* ${formatPrice(total - deposit)}`,
    )
    if (data.metodo === 'domicilio') lines.push('', '_Costo de envío por confirmar según zona._')

    openWhatsApp(lines.join('\n'))
    toast.success('Pedido enviado', { description: 'Te confirmaremos por WhatsApp en breve.' })
    clear()
    setSent(true)
  }

  if (sent) {
    return (
      <>
        <PageTitle title="Pedido enviado" />
        <div className="container-x pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mx-auto flex max-w-lg flex-col items-center gap-4 p-10 text-center"
          >
            <CheckCircle2 className="h-14 w-14 text-olivo" strokeWidth={1.4} aria-hidden="true" />
            <h1 className="text-4xl font-medium">¡Gracias por tu pedido!</h1>
            <p className="text-sm leading-relaxed text-tinta/75">
              Abrimos WhatsApp con el resumen de tu pedido. Envía el mensaje y te confirmaremos los datos para el
              anticipo del 50 %.
            </p>
            <Link to="/" className="btn btn-primary mt-2">
              Volver al inicio
            </Link>
          </motion.div>
        </div>
      </>
    )
  }

  if (items.length === 0) {
    return (
      <>
        <PageTitle title="Pedido" />
        <PageHeader eyebrow="Pedido" title="Finaliza tu pedido" />
        <div className="container-x">
          <div className="card mx-auto flex max-w-lg flex-col items-center gap-4 p-10 text-center">
            <ShoppingBag className="h-10 w-10 text-borgona" strokeWidth={1.4} aria-hidden="true" />
            <p className="font-serif text-2xl text-borgona">Aún no tienes ramos en tu carrito</p>
            <Link to="/catalogo" className="btn btn-primary">
              Ver catálogo
            </Link>
          </div>
        </div>
      </>
    )
  }

  const err = (k: keyof CheckoutValues) => errors[k]?.message
  const aria = (k: keyof CheckoutValues) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  })

  return (
    <>
      <PageTitle title="Pedido" />
      <PageHeader eyebrow="Pedido" title="Finaliza tu pedido" subtitle="Completa tus datos y envíanos tu pedido por WhatsApp." />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="container-x grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <section className="card space-y-5 p-6 sm:p-8" aria-labelledby="datos">
            <h2 id="datos" className="text-2xl font-medium">
              Tus datos
            </h2>
            <FormField id="nombre" label="Nombre completo" error={err('nombre')}>
              <input id="nombre" autoComplete="name" className="field" {...register('nombre')} {...aria('nombre')} />
            </FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="celular" label="Celular (10 dígitos)" error={err('celular')}>
                <input
                  id="celular"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="55 1234 5678"
                  className="field"
                  {...register('celular')}
                  {...aria('celular')}
                />
              </FormField>
              <FormField id="correo" label="Correo" optional error={err('correo')}>
                <input id="correo" type="email" autoComplete="email" className="field" {...register('correo')} {...aria('correo')} />
              </FormField>
            </div>
          </section>

          <section className="card space-y-5 p-6 sm:p-8" aria-labelledby="entrega">
            <h2 id="entrega" className="text-2xl font-medium">
              Entrega
            </h2>
            <DeliveryMethodPicker register={register('metodo')} name="metodo" value={metodo} error={err('metodo')} />

            <AnimatePresence initial={false}>
              {metodo === 'domicilio' && (
                <motion.div
                  key="address"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-5 p-1 sm:grid-cols-2">
                    <FormField id="direccion" label="Calle y número" error={err('direccion')} className="sm:col-span-2">
                      <input id="direccion" autoComplete="address-line1" className="field" {...register('direccion')} {...aria('direccion')} />
                    </FormField>
                    <FormField id="colonia" label="Colonia" error={err('colonia')}>
                      <input id="colonia" autoComplete="address-level3" className="field" {...register('colonia')} {...aria('colonia')} />
                    </FormField>
                    <FormField id="alcaldia" label="Alcaldía / Municipio" error={err('alcaldia')}>
                      <input id="alcaldia" autoComplete="address-level2" className="field" {...register('alcaldia')} {...aria('alcaldia')} />
                    </FormField>
                    <FormField id="cp" label="C.P." error={err('cp')}>
                      <input
                        id="cp"
                        inputMode="numeric"
                        maxLength={5}
                        autoComplete="postal-code"
                        className="field"
                        {...register('cp')}
                        {...aria('cp')}
                      />
                    </FormField>
                    <FormField id="referencias" label="Referencias" optional className="sm:col-span-2">
                      <textarea
                        id="referencias"
                        rows={2}
                        placeholder="Ej. Portón negro, entre calle X y calle Y"
                        className="field resize-none"
                        {...register('referencias')}
                      />
                    </FormField>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                id="fecha"
                label={metodo === 'recoger' ? 'Fecha de recolección' : 'Fecha de entrega'}
                error={err('fecha')}
              >
                <input id="fecha" type="date" min={todayISO()} className="field" {...register('fecha')} {...aria('fecha')} />
              </FormField>
              <FormField id="horario" label="Horario deseado" error={err('horario')}>
                <select id="horario" className="field" {...register('horario')} {...aria('horario')}>
                  <option value="">Selecciona un horario</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t} h
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
          </section>
        </div>

        <aside className="card h-fit p-6 sm:p-8 lg:sticky lg:top-32" aria-labelledby="resumen">
          <h2 id="resumen" className="text-2xl font-medium">
            Resumen del pedido
          </h2>
          <ul className="mt-5 divide-y divide-tinta/10">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-3 py-3">
                <SmartImage src={i.image} alt="" className="h-14 w-12 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{i.name}</p>
                  <p className="text-xs text-tinta/60">
                    {i.quantity} × {formatPrice(i.price)}
                  </p>
                  {i.cardMessage && <p className="truncate text-xs italic text-tinta/50">“{i.cardMessage}”</p>}
                </div>
                <span className="text-sm tabular-nums">{formatPrice(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-tinta/10 pt-5">
            <OrderSummary total={total} />
          </div>
          <p className="mt-5 flex gap-2 rounded-xl bg-olivo/10 p-4 text-xs leading-relaxed text-tinta/80">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-olivo" aria-hidden="true" />
            Tu pedido se aparta con el 50 % de anticipo y el resto se liquida al recibir. Costo de envío a domicilio
            según zona; se confirma por WhatsApp.
          </p>
          <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-6 w-full">
            <WhatsAppIcon size={18} /> Enviar pedido por WhatsApp
          </button>
        </aside>
      </form>
    </>
  )
}

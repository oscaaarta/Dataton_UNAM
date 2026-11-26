import { useSearchParams } from 'react-router-dom'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Palette, Sparkles, Wallet } from 'lucide-react'
import { products, getProduct } from '../data/products'
import { OCASIONES, quoteSchema, type QuoteValues } from '../lib/schemas'
import { formatDate, todayISO } from '../lib/format'
import { openWhatsApp } from '../lib/openWhatsApp'
import FormField from '../components/FormField'
import DeliveryMethodPicker from '../components/DeliveryMethodPicker'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'
import SmartImage from '../components/SmartImage'
import { WhatsAppIcon } from '../components/icons'

const PERSONALIZADO = 'personalizado'

export default function Quote() {
  const [params] = useSearchParams()
  const preselected = getProduct(params.get('ramo') ?? undefined)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      ramo: preselected?.slug ?? PERSONALIZADO,
      nombre: '',
      celular: '',
      colores: '',
      presupuesto: '',
      fecha: '',
      metodo: 'domicilio',
      descripcion: '',
    },
  })

  const metodo = useWatch({ control, name: 'metodo' })
  const ramo = useWatch({ control, name: 'ramo' })
  const selected = getProduct(ramo)

  function onSubmit(data: QuoteValues) {
    const ramoName = getProduct(data.ramo)?.name ?? 'Ramo personalizado'
    const msg = [
      '✨ *Solicitud de cotización — MATA estudio floral*',
      '',
      `*Ramo:* ${ramoName}`,
      `*Nombre:* ${data.nombre}`,
      `*Celular:* ${data.celular}`,
      `*Ocasión:* ${data.ocasion}`,
      `*Colores preferidos:* ${data.colores}`,
      `*Presupuesto aproximado:* ${data.presupuesto}`,
      `*Fecha:* ${formatDate(data.fecha)}`,
      `*Entrega:* ${data.metodo === 'domicilio' ? 'Entrega a domicilio' : 'Recoger en estudio'}`,
      '',
      '*Mi idea:*',
      data.descripcion,
    ].join('\n')
    openWhatsApp(msg)
    toast.success('Cotización enviada', { description: 'Te responderemos por WhatsApp con una propuesta.' })
    reset()
  }

  const err = (k: keyof QuoteValues) => errors[k]?.message
  const aria = (k: keyof QuoteValues) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  })

  return (
    <>
      <PageTitle title="Cotiza tu ramo" />
      <PageHeader
        eyebrow="Ramos personalizados"
        title="Cotiza tu ramo"
        subtitle="Cuéntanos tu idea y diseñamos un ramo único. Te enviamos la propuesta y el precio por WhatsApp."
      />

      <div className="container-x grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="card space-y-6 p-6 sm:p-8">
          <FormField id="ramo" label="Ramo de referencia">
            <select id="ramo" className="field" {...register('ramo')}>
              <option value={PERSONALIZADO}>Ramo personalizado (desde cero)</option>
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="nombre" label="Nombre" error={err('nombre')}>
              <input id="nombre" autoComplete="name" className="field" {...register('nombre')} {...aria('nombre')} />
            </FormField>
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
          </div>

          <fieldset>
            <legend className="field-label">Ocasión</legend>
            <div className="flex flex-wrap gap-2">
              {OCASIONES.map((o) => (
                <label key={o} className="cursor-pointer">
                  <input type="radio" value={o} className="peer sr-only" {...register('ocasion')} />
                  <span className="inline-block rounded-full border border-tinta/15 bg-white/60 px-4 py-2 text-sm transition hover:border-borgona/40 peer-checked:border-borgona peer-checked:bg-borgona peer-checked:text-crema peer-focus-visible:ring-2 peer-focus-visible:ring-borgona/40">
                    {o}
                  </span>
                </label>
              ))}
            </div>
            {err('ocasion') && (
              <p className="field-error" role="alert">
                {err('ocasion')}
              </p>
            )}
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField id="colores" label="Colores preferidos" error={err('colores')}>
              <input id="colores" placeholder="Ej. rosa palo y blanco" className="field" {...register('colores')} {...aria('colores')} />
            </FormField>
            <FormField id="presupuesto" label="Presupuesto aproximado" error={err('presupuesto')}>
              <input
                id="presupuesto"
                placeholder="Ej. $500 a $700"
                className="field"
                {...register('presupuesto')}
                {...aria('presupuesto')}
              />
            </FormField>
          </div>

          <FormField id="fecha" label="Fecha deseada" error={err('fecha')}>
            <input id="fecha" type="date" min={todayISO()} className="field" {...register('fecha')} {...aria('fecha')} />
          </FormField>

          <DeliveryMethodPicker register={register('metodo')} name="metodo" value={metodo} error={err('metodo')} />

          <FormField id="descripcion" label="Describe tu idea" error={err('descripcion')}>
            <textarea
              id="descripcion"
              rows={5}
              placeholder="Cuéntanos para quién es, qué estilo te gusta, flores favoritas, temática, si lleva globo, chocolates, etc."
              className="field resize-none"
              {...register('descripcion')}
              {...aria('descripcion')}
            />
          </FormField>

          <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
            <WhatsAppIcon size={18} /> Enviar cotización por WhatsApp
          </button>
        </form>

        <aside className="space-y-6 lg:sticky lg:top-32 lg:h-fit">
          {selected && (
            <div className="card overflow-hidden">
              <SmartImage src={selected.image} alt={selected.name} className="aspect-[4/5] w-full object-cover" />
              <div className="p-5">
                <p className="eyebrow">Referencia</p>
                <p className="mt-1 font-serif text-2xl text-borgona">{selected.name}</p>
              </div>
            </div>
          )}
          <div className="card space-y-5 p-6">
            <p className="font-serif text-2xl text-borgona">Tips para tu cotización</p>
            <div className="flex gap-3 text-sm text-tinta/75">
              <Palette className="h-5 w-5 shrink-0 text-olivo" aria-hidden="true" />
              Si tienes una foto de inspiración, mándala en el chat de WhatsApp.
            </div>
            <div className="flex gap-3 text-sm text-tinta/75">
              <Wallet className="h-5 w-5 shrink-0 text-olivo" aria-hidden="true" />
              Con tu presupuesto proponemos la mejor combinación de flores.
            </div>
            <div className="flex gap-3 text-sm text-tinta/75">
              <Sparkles className="h-5 w-5 shrink-0 text-olivo" aria-hidden="true" />
              Al aprobarla, apartas con el 50 % y liquidas al recibir.
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

import { z } from 'zod'

const phone = z
  .string()
  .trim()
  .refine((v) => /^\d{10}$/.test(v.replace(/[\s-]/g, '')), 'Escribe un celular de 10 dígitos')

export const TIME_SLOTS = [
  '9:00 a 11:00',
  '11:00 a 13:00',
  '13:00 a 15:00',
  '15:00 a 17:00',
  '17:00 a 19:00',
] as const

export const checkoutSchema = z
  .object({
    nombre: z.string().trim().min(3, 'Escribe tu nombre completo'),
    celular: phone,
    correo: z.union([z.literal(''), z.string().trim().email('Correo no válido')]),
    metodo: z.enum(['domicilio', 'recoger'], { message: 'Elige un método de entrega' }),
    direccion: z.string().trim(),
    colonia: z.string().trim(),
    alcaldia: z.string().trim(),
    cp: z.string().trim(),
    referencias: z.string().trim(),
    fecha: z.string().min(1, 'Elige una fecha'),
    horario: z.string().min(1, 'Elige un horario'),
  })
  .superRefine((data, ctx) => {
    if (data.metodo !== 'domicilio') return
    if (data.direccion.length < 5)
      ctx.addIssue({ code: 'custom', path: ['direccion'], message: 'Escribe calle y número' })
    if (data.colonia.length < 2) ctx.addIssue({ code: 'custom', path: ['colonia'], message: 'Escribe la colonia' })
    if (data.alcaldia.length < 2)
      ctx.addIssue({ code: 'custom', path: ['alcaldia'], message: 'Escribe la alcaldía o municipio' })
    if (!/^\d{5}$/.test(data.cp)) ctx.addIssue({ code: 'custom', path: ['cp'], message: 'El C.P. tiene 5 dígitos' })
  })

export type CheckoutValues = z.infer<typeof checkoutSchema>

export const OCASIONES = ['Cumpleaños', 'Aniversario', 'Graduación', 'San Valentín', 'Otro'] as const

export const quoteSchema = z.object({
  ramo: z.string(),
  nombre: z.string().trim().min(3, 'Escribe tu nombre'),
  celular: phone,
  ocasion: z.enum(OCASIONES, { message: 'Elige una ocasión' }),
  colores: z.string().trim().min(2, 'Cuéntanos qué colores prefieres'),
  presupuesto: z.string().trim().min(1, 'Indica un presupuesto aproximado'),
  fecha: z.string().min(1, 'Elige una fecha'),
  metodo: z.enum(['domicilio', 'recoger'], { message: 'Elige una opción' }),
  descripcion: z.string().trim().min(10, 'Cuéntanos un poco más de tu idea (mínimo 10 caracteres)'),
})

export type QuoteValues = z.infer<typeof quoteSchema>

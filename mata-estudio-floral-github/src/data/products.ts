export interface Product {
  slug: string
  name: string
  image: string
  price: number | null
  shortDescription: string
  longDescription: string
  tag: string
}

export const products: Product[] = [
  {
    slug: 'ramo-otono',
    name: 'Ramo de Otoño',
    image: '/assets/ramo-otono.png',
    price: 350,
    shortDescription: 'Tonos terracota, ocre y follaje dorado: la calidez de la temporada en tus manos.',
    longDescription:
      'Inspirado en las tardes doradas de otoño, este ramo combina flores en tonos terracota, durazno y ocre con follaje de temporada y texturas secas. Es ideal para agradecer, celebrar un nuevo comienzo o simplemente llenar de calidez un espacio. Cada pieza se arma a mano el mismo día de la entrega y se envuelve en papel de estilo artesanal.',
    tag: 'Temporada',
  },
  {
    slug: 'ramo-tematico',
    name: 'Ramo Temático',
    image: '/assets/ramo-tematico.png',
    price: null,
    shortDescription: 'Diseñado contigo, para una fecha, una persona o una historia única.',
    longDescription:
      'Cuéntanos la ocasión, los colores que te gustan y lo que quieres expresar, y diseñamos un ramo que hable por ti. Desde cumpleaños y graduaciones hasta aniversarios o detalles con temática especial, cuidamos cada flor, cada listón y cada detalle para que el resultado sea irrepetible. El precio se define según tamaño, flores y complementos.',
    tag: 'Personalizado',
  },
  {
    slug: 'ramo-rosas-rojas',
    name: 'Ramo Rosas Rojas',
    image: '/assets/ramo-rosas-rojas.png',
    price: 300,
    shortDescription: 'El clásico que nunca falla: rosas rojas frescas, elegantes y llenas de intención.',
    longDescription:
      'Un ramo atemporal de rosas rojas seleccionadas una por una, acompañadas de follaje fresco y envueltas con un acabado limpio y elegante. Perfecto para declarar amor, pedir perdón o recordarle a alguien lo importante que es. Puedes agregar un mensaje para la tarjeta y nosotras nos encargamos de que llegue impecable.',
    tag: 'Clásico',
  },
  {
    slug: 'ramo-pastel',
    name: 'Ramo Pastel',
    image: '/assets/ramo-pastel.png',
    price: 340,
    shortDescription: 'Rosas suaves, blancos y lilas en una composición delicada y romántica.',
    longDescription:
      'Una composición ligera y romántica en tonos rosa, crema y lila, pensada para quienes aman los detalles sutiles. Es el ramo perfecto para nacimientos, cumpleaños, baby showers o para sorprender sin motivo. Lo armamos con flores frescas de temporada, por lo que la combinación exacta puede variar ligeramente, siempre dentro de la paleta pastel.',
    tag: 'Romántico',
  },
]

export function getProduct(slug: string | undefined) {
  return products.find((p) => p.slug === slug)
}

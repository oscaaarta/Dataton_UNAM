# MATA estudio floral — Tienda en línea

Tienda en línea de **MATA estudio floral**: catálogo de ramos, carrito, pedido y cotización por WhatsApp.

Hecha con Vite + React + TypeScript, Tailwind CSS v4, Zustand, Framer Motion, React Hook Form + Zod y Sonner.

## Cómo correrlo en tu computadora

Necesitas [Node.js](https://nodejs.org) 20 o más reciente.

```bash
npm install
npm run dev
```

Abre la dirección que aparece en la terminal (normalmente http://localhost:5173).

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Fotos

Las imágenes van en `public/assets/` con estos nombres exactos:

| Archivo | Dónde se usa |
|---|---|
| `logo-mata.svg` | Header y footer (incluido) |
| `favicon.svg` | Ícono de la pestaña (incluido) |
| `hero.png` | Banner principal del inicio y vista previa al compartir el link |
| `ramo-otono.png` | Ramo de Otoño |
| `ramo-tematico.png` | Ramo Temático |
| `ramo-rosas-rojas.png` | Ramo Rosas Rojas |
| `ramo-pastel.png` | Ramo Pastel |
| `entregas.png` | Sección de entregas |

Si falta alguna foto, la página muestra un recuadro rosa con una flor en su lugar.

## Editar productos, precios y contacto

- Productos y precios: `src/data/products.ts` (usa `price: null` para que un ramo sea "Bajo cotización").
- Teléfono, WhatsApp y redes: `src/lib/contact.ts`.
- Colores de la marca: `src/index.css` (bloque `@theme`).
- Horarios de entrega: `TIME_SLOTS` en `src/lib/schemas.ts`.

## Publicar gratis

### Vercel (recomendado)

1. Sube este repositorio a GitHub.
2. Entra a [vercel.com](https://vercel.com), inicia sesión con GitHub y elige **Add New → Project**.
3. Importa el repositorio. Vercel detecta Vite solo; deja todo como está y da clic en **Deploy**.
4. Para tu dominio: **Settings → Domains → Add**, escribe tu dominio y copia los registros DNS que te indique (normalmente un registro `A` a `76.76.21.21` para el dominio raíz y un `CNAME` a `cname.vercel-dns.com` para `www`) en el panel de tu proveedor de dominio.

`vercel.json` ya está configurado para que las rutas como `/catalogo` funcionen al recargar.

### Netlify

1. Entra a [netlify.com](https://netlify.com) → **Add new site → Import an existing project** → GitHub.
2. Elige el repositorio. `netlify.toml` ya trae el comando (`npm run build`) y la carpeta (`dist`).
3. Para tu dominio: **Domain management → Add a domain** y sigue las instrucciones de DNS.

Cada vez que hagas `git push`, el sitio se actualiza solo.

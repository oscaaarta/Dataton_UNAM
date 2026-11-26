import { useState, type ImgHTMLAttributes } from 'react'
import clsx from 'clsx'
import { Flower2 } from 'lucide-react'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
  wrapperClassName?: string
}

/**
 * Imagen con carga diferida y un respaldo elegante si el archivo todavía no existe
 * en /public/assets (evita íconos de imagen rota).
 */
export default function SmartImage({ src, alt, className, wrapperClassName, loading = 'lazy', ...rest }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={clsx(
          'flex items-center justify-center bg-gradient-to-br from-rosa/70 via-crema to-rosa/40 text-borgona/50',
          className,
          wrapperClassName,
        )}
      >
        <Flower2 className="h-12 w-12" strokeWidth={1.2} aria-hidden="true" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  )
}

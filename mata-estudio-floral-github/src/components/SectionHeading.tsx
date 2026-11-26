import clsx from 'clsx'
import { Sprig } from './icons'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
  as?: 'h1' | 'h2'
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', as = 'h2' }: Props) {
  const Tag = as
  return (
    <div className={clsx('mb-10 sm:mb-14', align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl')}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag className={clsx('font-medium leading-tight', as === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-5xl')}>
        {title}
      </Tag>
      <Sprig className={clsx('mt-4 h-5 w-28 text-olivo', align === 'center' && 'mx-auto')} />
      {subtitle && <p className="mt-4 text-base leading-relaxed text-tinta/75">{subtitle}</p>}
    </div>
  )
}

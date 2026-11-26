import SectionHeading from './SectionHeading'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function PageHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="container-x pt-12 sm:pt-16">
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} subtitle={subtitle} />
    </div>
  )
}

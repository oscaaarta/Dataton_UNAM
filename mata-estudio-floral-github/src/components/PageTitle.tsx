import { useEffect } from 'react'

const BASE = 'MATA estudio floral'

/** Actualiza el <title> del documento por página. */
export default function PageTitle({ title }: { title?: string }) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} | Ramos y flores a domicilio`
  }, [title])
  return null
}

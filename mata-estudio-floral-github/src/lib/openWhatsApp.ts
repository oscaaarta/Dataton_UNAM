import { whatsappLink } from './contact'

/** Abre WhatsApp en una pestaña nueva; si el navegador lo bloquea, navega en la misma. */
export function openWhatsApp(message: string) {
  const url = whatsappLink(message)
  const win = window.open(url, '_blank', 'noopener,noreferrer')
  if (!win) window.location.href = url
}

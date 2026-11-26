export const PHONE_DISPLAY = '55 3108 0271'
export const PHONE_TEL = 'tel:+525531080271'
export const WHATSAPP_NUMBER = '525531080271'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
export const INSTAGRAM_HANDLE = '@_mataestudio'
export const INSTAGRAM_URL = 'https://instagram.com/_mataestudio'
export const TIKTOK_HANDLE = '@mata_estudio'
export const TIKTOK_URL = 'https://www.tiktok.com/@mata_estudio'

export function whatsappLink(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}

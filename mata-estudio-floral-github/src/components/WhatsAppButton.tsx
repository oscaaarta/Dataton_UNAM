import { motion } from 'framer-motion'
import { whatsappLink } from '../lib/contact'
import { WhatsAppIcon } from './icons'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink('¡Hola, MATA! Me gustaría información sobre sus ramos.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-olivo text-crema shadow-lg shadow-olivo/30 transition-colors hover:bg-borgona"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-olivo/30 [animation-duration:2.6s] group-hover:hidden" aria-hidden="true" />
      <WhatsAppIcon size={28} className="relative" />
    </motion.a>
  )
}

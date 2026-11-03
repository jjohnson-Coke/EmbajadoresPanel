import { motion } from 'framer-motion'
import { Maximize, Minimize } from 'lucide-react'

type Props = {
  index: number
  total: number
  idle: boolean
  isFullscreen: boolean
  onToggleFullscreen: () => void
  onGo: (index: number) => void
}

export function Controls({ index, total, idle, isFullscreen, onToggleFullscreen, onGo }: Props) {
  const Icon = isFullscreen ? Minimize : Maximize
  return (
    <>
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onToggleFullscreen()
        }}
        aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        title={isFullscreen ? 'Salir de pantalla completa (F)' : 'Pantalla completa (F)'}
        className="glass fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors hover:text-blue-electric focus-visible:outline-2 focus-visible:outline-blue-electric"
        animate={{ opacity: idle ? 0 : 1, y: idle ? -8 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: idle ? 'none' : 'auto' }}
      >
        <Icon size={18} strokeWidth={2.25} />
      </motion.button>

      <motion.nav
        aria-label="Navegación entre diapositivas"
        className="glass fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5"
        animate={{ opacity: idle ? 0 : 1, y: idle ? 8 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: idle ? 'none' : 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onGo(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            aria-current={i === index ? 'step' : undefined}
            className="group flex h-6 items-center justify-center px-1 focus-visible:outline-2 focus-visible:outline-blue-electric"
          >
            <motion.span
              className="block h-2 rounded-full"
              initial={false}
              animate={{
                width: i === index ? 26 : 8,
                backgroundColor: i === index ? '#2547FF' : i < index ? '#9BB0FF' : '#B5CFEE',
              }}
              whileHover={{ scale: 1.35 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </button>
        ))}
      </motion.nav>

      <motion.div
        className="fixed bottom-4 right-5 z-50 font-sans text-[13px] font-medium tracking-wide text-blue-deep/70 tabular-nums"
        animate={{ opacity: idle ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        aria-live="polite"
      >
        {index + 1} / {total}
      </motion.div>

      <div className="fixed inset-x-0 bottom-0 z-50 h-[3px] bg-blue-electric/10">
        <motion.div
          className="h-full origin-left bg-blue-electric"
          initial={false}
          animate={{ scaleX: (index + 1) / total }}
          transition={{ type: 'spring', stiffness: 120, damping: 24 }}
        />
      </div>
    </>
  )
}

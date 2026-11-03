import { motion } from 'framer-motion'
import { Maximize, Minimize } from 'lucide-react'

type Props = {
  index: number
  total: number
  idle: boolean
  isFullscreen: boolean
  onToggleFullscreen: () => void
}

export function Controls({ index, total, idle, isFullscreen, onToggleFullscreen }: Props) {
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

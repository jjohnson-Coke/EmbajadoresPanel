import { motion } from 'framer-motion'

/** Título de slide revelado palabra por palabra. */
export function SlideTitle({ text, delay = 0.1 }: { text: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <h1
      aria-label={text}
      className="absolute left-[120px] top-[84px] font-display text-[80px] font-extrabold uppercase leading-none tracking-[-0.01em] text-blue-title"
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ delay: delay + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
      <motion.span
        aria-hidden
        className="absolute -bottom-3 left-0 block h-[6px] w-[120px] origin-left rounded-full bg-blue-electric"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + words.length * 0.07 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </h1>
  )
}

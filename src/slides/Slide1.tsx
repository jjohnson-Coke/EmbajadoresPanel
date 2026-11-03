import { motion } from 'framer-motion'
import { LOGO } from '../assets'
import { SafeImage } from '../components/SafeImage'

const ease = [0.22, 1, 0.36, 1] as const

function Letters({ text, delay, className }: { text: string; delay: number; className: string }) {
  return (
    <span aria-label={text} role="text" className={`block whitespace-nowrap ${className}`}>
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 48, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: delay + i * 0.035, duration: 0.6, ease }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

export function Slide1() {
  return (
    <div className="absolute inset-0">
      {/* Franja de luz que cruza la pantalla al cargar */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 h-[150%] w-[420px] -skew-x-[18deg]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(155,176,255,0.0) 20%, rgba(155,176,255,0.45) 45%, rgba(255,255,255,0.9) 50%, rgba(155,176,255,0.45) 55%, transparent 80%)',
          filter: 'blur(24px)',
        }}
        initial={{ left: '-30%', opacity: 0 }}
        animate={{ left: '120%', opacity: [0, 1, 1, 0] }}
        transition={{ delay: 0.5, duration: 2.4, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute left-[120px] top-[96px] h-[400px] w-[378px]"
        initial={{ opacity: 0, scale: 0.4, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 170, damping: 11, mass: 0.9, delay: 0.15 }}
        style={{ filter: 'drop-shadow(0 30px 40px rgba(35,43,94,0.22))' }}
      >
        <SafeImage src={LOGO} alt="Escudo Embajadores Tec" fit="contain" className="h-full w-full rounded-[48px]" />
      </motion.div>

      <motion.p
        className="absolute right-[150px] top-[104px] text-[28px] font-medium tracking-[0.02em] text-blue-title"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease }}
      >
        Noviembre 2026
      </motion.p>

      <h1 className="absolute bottom-[170px] left-[112px] font-display font-extrabold uppercase leading-[0.95] tracking-[-0.015em]">
        <Letters text="VISIÓN Y EVOLUCIÓN" delay={0.6} className="text-[112px] text-blue-deep" />
        <Letters text="EMBAJADORES TEC" delay={1.15} className="text-[176px] text-blue-title" />
      </h1>

      <motion.div
        aria-hidden
        className="absolute bottom-[132px] left-[120px] h-[8px] w-[220px] origin-left rounded-full bg-blue-electric"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.9, duration: 0.8, ease }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[132px] left-[356px] h-[8px] w-[56px] origin-left rounded-full bg-blue-soft"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.2, duration: 0.6, ease }}
      />
    </div>
  )
}

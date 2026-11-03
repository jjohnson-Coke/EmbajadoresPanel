import { motion, useReducedMotion } from 'framer-motion'
import { CircleCheck } from 'lucide-react'
import { SlideTitle } from '../components/SlideTitle'

const ease = [0.22, 1, 0.36, 1] as const
const C = 380

const RINGS = [
  { r: 365, label: 'Admisiones', fill: 'rgba(255,255,255,0.35)', stroke: '#B5CFEE', color: '#1B4170' },
  { r: 290, label: 'Equipo nacional', fill: 'rgba(205,239,234,0.45)', stroke: '#9BB0FF', color: '#1B4170' },
  { r: 210, label: 'Coordinadores', fill: 'rgba(181,207,238,0.55)', stroke: '#3A7FC1', color: '#232B5E' },
]
const CORE_R = 122
const ringDelay = (i: number) => 0.5 + (RINGS.length - i) * 0.35 // de adentro hacia afuera

function Rings() {
  const reduce = useReducedMotion()
  const radii = [...RINGS.map((r) => r.r), CORE_R]
  return (
    <svg viewBox="0 0 760 760" className="h-full w-full overflow-visible" role="img" aria-label="Embajadores en el centro, rodeados por Coordinadores, Equipo nacional y Admisiones">
      <defs>
        <radialGradient id="core" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#3A7FC1" />
          <stop offset="60%" stopColor="#2547FF" />
          <stop offset="100%" stopColor="#232B5E" />
        </radialGradient>
      </defs>

      {RINGS.map((ring, i) => (
        <motion.circle
          key={ring.label}
          cx={C}
          cy={C}
          r={ring.r}
          fill={ring.fill}
          stroke={ring.stroke}
          strokeWidth={3}
          style={{ transformOrigin: `${C}px ${C}px` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: ringDelay(i), type: 'spring', stiffness: 120, damping: 15 }}
        />
      ))}

      {/* Ondas que nacen del embajador */}
      {!reduce &&
        [0, 1, 2].map((k) => (
          <motion.circle
            key={k}
            cx={C}
            cy={C}
            r={CORE_R}
            fill="none"
            stroke="#2547FF"
            strokeWidth={3}
            style={{ transformOrigin: `${C}px ${C}px` }}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 365 / CORE_R], opacity: [0.55, 0] }}
            transition={{ delay: 2.2 + k * 1.2, duration: 3.6, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}

      <motion.circle
        cx={C}
        cy={C}
        r={CORE_R}
        fill="url(#core)"
        style={{ transformOrigin: `${C}px ${C}px`, filter: 'drop-shadow(0 18px 30px rgba(37,71,255,0.45))' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 12 }}
      />
      <motion.text
        x={C}
        y={C + 10}
        textAnchor="middle"
        fontSize="30"
        fontWeight={700}
        fill="#FFFFFF"
        className="font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Embajadores
      </motion.text>

      {RINGS.map((ring, i) => {
        const inner = radii[i + 1]
        const y = C - (ring.r + inner) / 2 + 9
        return (
          <motion.text
            key={ring.label}
            x={C}
            y={y}
            textAnchor="middle"
            fontSize="26"
            fontWeight={600}
            fill={ring.color}
            className="font-sans"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ringDelay(i) + 0.3, duration: 0.5, ease }}
          >
            {ring.label}
          </motion.text>
        )
      })}
    </svg>
  )
}

export function Slide5() {
  return (
    <div className="absolute inset-0">
      <SlideTitle text="EL MOTOR: LAS Y LOS EMBAJADORES" />

      <div className="absolute left-[130px] top-[262px] h-[740px] w-[740px]">
        <Rings />
      </div>

      <div className="absolute left-[980px] top-[262px] w-[820px]">
        <motion.div
          className="glass relative rounded-[32px] px-11 py-9"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.9, duration: 0.8, ease }}
        >
          <p className="relative text-[33px] font-semibold leading-[1.3] text-navy">
            ¿Cómo aseguramos que el embajador está cumpliendo su rol y su impacto en Admisiones?
          </p>
          <ul className="mt-7 space-y-4">
            {['Indicadores claros', 'Coordinadores con dominio del programa y vinculados con el equipo nacional'].map((a, i) => (
              <motion.li
                key={a}
                className="flex items-start gap-4 text-[26px] leading-snug text-text"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4 + i * 0.25, duration: 0.6, ease }}
              >
                <CircleCheck size={30} strokeWidth={2.2} className="mt-[2px] shrink-0 text-blue-electric" />
                <span>{a}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.blockquote
          className="relative mt-12 border-l-[6px] border-blue-electric pl-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 1, ease }}
        >
          <p className="font-display text-[38px] font-extrabold leading-[1.18] text-blue-deep">
            Con Embajadores, Coordinadores y equipo nacional comprometidos y que aman lo que hacen,{' '}
            <span className="text-blue-electric">
              el impacto positivo en la meta y en los indicadores sucede por su propio peso.
            </span>
          </p>
        </motion.blockquote>
      </div>
    </div>
  )
}

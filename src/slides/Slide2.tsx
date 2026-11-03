import { motion, useReducedMotion } from 'framer-motion'
import { Lightbulb, Search } from 'lucide-react'
import { SlideTitle } from '../components/SlideTitle'

const ease = [0.22, 1, 0.36, 1] as const

const LEGS = [
  { id: 'emb', d: 'M175 290 L105 640', label: 'Embajadores', lx: 105, ly: 692, delay: 0.5 },
  { id: 'coord', d: 'M350 306 L350 690', label: 'Coordinadores', lx: 350, ly: 742, delay: 1.0 },
  { id: 'eq', d: 'M525 290 L595 640', label: 'Equipo nacional', lx: 595, ly: 692, delay: 1.5 },
]
const SEAT_DELAY = 2.35

function Stool() {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 700 790" className="h-full w-full overflow-visible" role="img" aria-label="Banco de tres patas">
      <defs>
        <filter id="legGlow" x="-200%" y="-20%" width="500%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <linearGradient id="seatTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#B5CFEE" />
        </linearGradient>
        <linearGradient id="seatRim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3A7FC1" />
          <stop offset="100%" stopColor="#1B4170" />
        </linearGradient>
      </defs>

      {/* Sombra en el piso */}
      <motion.ellipse
        cx="350" cy="700" rx="280" ry="22" fill="#B5CFEE"
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={{ opacity: 0.55, scaleX: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        style={{ transformOrigin: '350px 700px' }}
      />

      {/* Brillo pulsante en la pata de Coordinadores */}
      <motion.path
        d={LEGS[1].d}
        stroke="#2547FF"
        strokeWidth="44"
        strokeLinecap="round"
        filter="url(#legGlow)"
        initial={{ opacity: 0 }}
        animate={reduce ? { opacity: 0.35 } : { opacity: [0, 0.55, 0.15, 0.55] }}
        transition={{ delay: 1.6, duration: 2.4, times: [0, 0.25, 0.6, 1], repeat: reduce ? 0 : Infinity, repeatType: 'reverse' }}
      />

      {/* Travesaños */}
      {['M148 500 L350 548', 'M552 500 L350 548'].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="#9BB0FF"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 2.0 + i * 0.12, duration: 0.45, ease: 'easeOut' }}
        />
      ))}

      {/* Patas, dibujadas en secuencia */}
      {LEGS.map((leg) => {
        const isCoord = leg.id === 'coord'
        return (
          <g key={leg.id}>
            <motion.path
              d={leg.d}
              stroke="#232B5E"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: leg.delay, duration: 0.6, ease: 'easeInOut' }}
            />
            <motion.text
              x={leg.lx}
              y={leg.ly}
              textAnchor="middle"
              className="font-sans"
              fontSize="27"
              fontWeight={600}
              fill={isCoord ? '#2547FF' : '#1B4170'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: leg.delay + 0.45, duration: 0.5, ease }}
            >
              {leg.label}
            </motion.text>
          </g>
        )
      })}

      {/* Asiento: aparece al final, encima de las tres patas */}
      <motion.g
        initial={{ opacity: 0, y: -90 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: SEAT_DELAY, type: 'spring', stiffness: 260, damping: 14 }}
      >
        <path d="M110 236 L110 268 A240 62 0 0 0 590 268 L590 236 Z" fill="url(#seatRim)" />
        <ellipse cx="350" cy="236" rx="240" ry="62" fill="url(#seatTop)" stroke="#232B5E" strokeWidth="5" />
        <ellipse cx="350" cy="232" rx="170" ry="36" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.9" />
      </motion.g>
    </svg>
  )
}

type CardProps = {
  icon: typeof Lightbulb
  title: string
  items: string[]
  delay: number
  accent: 'deep' | 'electric'
}

function Card({ icon: Icon, title, items, delay, accent }: CardProps) {
  const color = accent === 'electric' ? 'text-blue-electric' : 'text-blue-title'
  return (
    <motion.div
      className="glass relative rounded-[32px] px-12 py-10"
      initial={{ opacity: 0, x: 60, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease }}
    >
      <div className="mb-6 flex items-center gap-5">
        <motion.span
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white ${color} shadow-[0_10px_24px_-10px_rgba(37,71,255,0.45)]`}
          initial={{ rotate: -20, scale: 0.6 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: delay + 0.2, type: 'spring', stiffness: 220, damping: 12 }}
        >
          <Icon size={32} strokeWidth={2} />
        </motion.span>
        <h2 className="font-display text-[44px] font-extrabold leading-none text-blue-deep">{title}</h2>
      </div>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <motion.li
            key={item}
            className="flex items-start gap-4 text-[27px] leading-snug text-text"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.35 + i * 0.12, duration: 0.5, ease }}
          >
            <span className={`mt-[14px] h-2.5 w-2.5 shrink-0 rounded-full ${accent === 'electric' ? 'bg-blue-electric' : 'bg-blue-title'}`} />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export function Slide2() {
  return (
    <div className="absolute inset-0">
      <SlideTitle text="LOS 3 PILARES DE EMBAJADORES" />

      <div className="absolute left-[110px] top-[240px] h-[680px] w-[620px]">
        <Stool />
      </div>
      <motion.p
        className="absolute left-[120px] top-[950px] w-[600px] text-center text-[22px] italic text-blue-deep/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: SEAT_DELAY + 0.6, duration: 0.8 }}
      >
        Si falta una pata, el programa no se sostiene.
      </motion.p>

      <div className="absolute right-[120px] top-[260px] flex w-[920px] flex-col gap-8">
        <Card
          icon={Lightbulb}
          title="Hoy funciona"
          accent="deep"
          delay={0.8}
          items={['Equipo nacional sólido', 'Dominio de la operación del programa', 'Experiencia memorable para los embajadores']}
        />
        <Card
          icon={Search}
          title="Retos"
          accent="electric"
          delay={1.1}
          items={['Empoderamiento, captación y desarrollo de coordinadores', 'Indicadores internos y externos']}
        />
      </div>
    </div>
  )
}

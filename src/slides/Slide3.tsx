import { motion, useReducedMotion } from 'framer-motion'
import { BarChart3, Ear, Quote, Users } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { SlideTitle } from '../components/SlideTitle'

const ease = [0.22, 1, 0.36, 1] as const

const chevron = (tip: number, notch = 0) =>
  `polygon(0 0, calc(100% - ${tip}px) 0, 100% 50%, calc(100% - ${tip}px) 100%, 0 100%, ${notch}px 50%)`

/** Bloque en forma de chevron que se revela de izquierda a derecha. */
function Block({
  style,
  delay,
  tip,
  notch,
  background,
  className = '',
  children,
}: {
  style: CSSProperties
  delay: number
  tip: number
  notch?: number
  background: string
  className?: string
  children: ReactNode
}) {
  return (
    <motion.div
      className="absolute"
      style={{ ...style, filter: 'drop-shadow(0 18px 24px rgba(37,71,255,0.22))' }}
      initial={{ clipPath: 'inset(-40% 100% -60% 0%)' }}
      animate={{ clipPath: 'inset(-40% -10% -60% 0%)' }}
      transition={{ delay, duration: 0.8, ease }}
    >
      <div
        className={`relative flex h-full w-full items-center overflow-hidden ${className}`}
        style={{ clipPath: chevron(tip, notch), background }}
      >
        {children}
      </div>
    </motion.div>
  )
}

function Chip({ style, delay, children }: { style: CSSProperties; delay: number; children: ReactNode }) {
  return (
    <motion.div
      className="glass absolute flex items-start gap-3 rounded-2xl px-5 py-3 text-[20px] leading-snug text-text"
      style={style}
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Users size={20} strokeWidth={2.25} className="mt-[3px] shrink-0 text-blue-electric" />
      <span>
        <span className="font-semibold text-blue-deep">Apoyo clave: </span>
        {children}
      </span>
    </motion.div>
  )
}

export function Slide3() {
  const reduce = useReducedMotion()
  return (
    <div className="absolute inset-0">
      <SlideTitle text="3 PRINCIPALES DECISIONES" />

      {/* Diagrama de flujo */}
      <div className="absolute left-[120px] top-[250px] h-[500px] w-[1680px]">
        <Chip style={{ left: 0, top: 0, width: 470 }} delay={0.75}>
          equipo nacional, líderes de Admisiones y coordinadores
        </Chip>

        <Block
          style={{ left: 0, top: 96, width: 450, height: 284 }}
          delay={0.35}
          tip={56}
          background="linear-gradient(135deg, #232B5E 0%, #1B4170 100%)"
          className="pl-10 pr-20"
        >
          <p className="font-display text-[42px] font-extrabold leading-[1.05] text-white">
            Radiografía
            <br />
            del programa
          </p>
        </Block>

        {/* Bifurcación */}
        <svg className="absolute left-0 top-0 h-[500px] w-[600px] overflow-visible" aria-hidden>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 Z" fill="#2547FF" />
            </marker>
          </defs>
          {['M456 238 C 500 238, 496 162, 548 162', 'M456 238 C 500 238, 496 316, 548 316'].map((d, i) => (
            <motion.path
              key={d}
              d={d}
              fill="none"
              stroke="#2547FF"
              strokeWidth="5"
              strokeLinecap="round"
              markerEnd="url(#arrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1.05 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
            />
          ))}
        </svg>

        <Block
          style={{ left: 572, top: 96, width: 680, height: 134 }}
          delay={1.35}
          tip={40}
          notch={0}
          background="linear-gradient(90deg, #2547FF 0%, #3A7FC1 100%)"
          className="pl-10 pr-16"
        >
          <p className="text-[27px] font-semibold leading-[1.25] text-white">
            Estrategia de captación, desarrollo y empoderamiento de coordinadores
          </p>
        </Block>
        <Block
          style={{ left: 572, top: 246, width: 680, height: 134 }}
          delay={1.55}
          tip={40}
          background="linear-gradient(90deg, #9BB0FF 0%, #B5CFEE 100%)"
          className="pl-10 pr-16"
        >
          <p className="text-[27px] font-semibold leading-[1.25] text-navy">Estrategia de indicadores internos y externos</p>
        </Block>

        <Chip style={{ left: 1280, top: 118, width: 400 }} delay={1.85}>
          coordinadores y equipo nacional
        </Chip>
        <Chip style={{ left: 1280, top: 258, width: 400 }} delay={2.05}>
          Analítica de datos, equipo nacional y coordinadores
        </Chip>

        {/* Barra continua */}
        <Block
          style={{ left: 0, top: 404, width: 1680, height: 92 }}
          delay={2.35}
          tip={44}
          background="linear-gradient(90deg, #1B4170 0%, #2547FF 100%)"
          className="justify-center"
        >
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute inset-y-0 w-[260px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)' }}
              initial={{ left: '-20%' }}
              animate={{ left: '110%' }}
              transition={{ delay: 3.2, duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
            />
          )}
          <p className="relative text-[32px] font-semibold tracking-[0.01em] text-white">
            Operación diaria del Programa Embajadores Tec
          </p>
        </Block>
      </div>

      {/* Nota sobre la operación diaria */}
      <motion.div
        className="absolute left-[120px] top-[792px] flex w-[760px] gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.85, duration: 0.7, ease }}
      >
        <Quote size={40} className="shrink-0 fill-blue-soft text-blue-soft" />
        <p className="text-[25px] leading-[1.45] text-blue-deep">
          No se trata de dejar de operar el día a día, sino de <span className="font-semibold text-blue-electric">confiar y delegar</span>{' '}
          la operación en el equipo, siempre acompañándolo.
        </p>
      </motion.div>

      {/* Panel de indicadores */}
      <motion.div
        className="glass absolute left-[940px] top-[782px] w-[860px] rounded-[28px] px-9 py-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.8, ease }}
      >
        <div className="mb-4 flex items-center gap-3">
          <BarChart3 size={26} className="text-blue-electric" />
          <h2 className="font-display text-[26px] font-extrabold uppercase tracking-[0.06em] text-navy">Indicadores</h2>
        </div>
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-8 text-[21px] leading-snug">
          <div>
            <p className="mb-1 font-semibold text-blue-title">Internos</p>
            <p>CSAT por hito clave</p>
          </div>
          <div>
            <p className="mb-1 font-semibold text-blue-title">Externos</p>
            <p>Participación del embajador en el proceso</p>
            <p>CSAT Admisiones–Embajadores</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-blue-soft/50 pt-3 text-[20px] text-blue-deep">
          <Ear size={22} className="shrink-0 text-blue-electric" />
          En ambos casos se complementa con escucha activa.
        </div>
      </motion.div>
    </div>
  )
}

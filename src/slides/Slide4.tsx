import { motion, useReducedMotion } from 'framer-motion'
import { Award, HandHeart, UserCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { SlideTitle } from '../components/SlideTitle'

const ease = [0.22, 1, 0.36, 1] as const

function Bullet({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <motion.li
      className="flex items-start gap-4 text-[24px] leading-[1.35] text-text"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease }}
    >
      <span className="mt-[12px] h-2 w-2 shrink-0 rounded-full bg-blue-electric" />
      <span>{children}</span>
    </motion.li>
  )
}

/** Mini escalera de 3 niveles: Inducción → Desarrollo → Dominio. */
function Levels({ delay }: { delay: number }) {
  const levels = ['Inducción', 'Desarrollo', 'Dominio']
  return (
    <motion.li
      className="text-[24px] leading-[1.35] text-text"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease }}
    >
      <div className="flex items-start gap-4">
        <span className="mt-[12px] h-2 w-2 shrink-0 rounded-full bg-blue-electric" />
        <span>Capacitación por niveles</span>
      </div>
      <div className="mt-4 flex items-end gap-2 pl-6" role="list" aria-label="Inducción, Desarrollo y Dominio">
        {levels.map((level, i) => (
          <div key={level} role="listitem" className="flex flex-1 flex-col items-center gap-2">
            <motion.div
              className="w-full origin-bottom rounded-t-xl"
              style={{
                height: 26 + i * 22,
                background: ['#B5CFEE', '#9BB0FF', '#2547FF'][i],
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: delay + 0.25 + i * 0.22, type: 'spring', stiffness: 220, damping: 16 }}
            />
            <span className={`text-[18px] font-semibold ${i === 2 ? 'text-blue-electric' : 'text-blue-deep'}`}>{level}</span>
          </div>
        ))}
      </div>
    </motion.li>
  )
}

type CardDef = {
  icon: typeof UserCheck
  title: string
  loop: Record<string, number[]>
  body: (base: number) => ReactNode
}

const CARDS: CardDef[] = [
  {
    icon: UserCheck,
    title: 'Seguimiento y acompañamiento',
    loop: { y: [0, -6, 0] },
    body: (b) => (
      <>
        <Bullet delay={b}>Creación del journey del coordinador</Bullet>
        <Bullet delay={b + 0.1}>Sesiones 1:1</Bullet>
        <Bullet delay={b + 0.2}>Escucha activa constante</Bullet>
        <Bullet delay={b + 0.3}>Programa de inducción para nuevas coordinadoras y coordinadores</Bullet>
      </>
    ),
  },
  {
    icon: Award,
    title: 'Capacitación y desarrollo del talento',
    loop: { rotate: [0, -8, 8, 0] },
    body: (b) => (
      <>
        <Levels delay={b} />
        <Bullet delay={b + 0.8}>Reconocimiento por lealtad y desempeño</Bullet>
        <Bullet delay={b + 0.9}>Coordinador mentor</Bullet>
      </>
    ),
  },
  {
    icon: HandHeart,
    title: 'Integración',
    loop: { scale: [1, 1.1, 1] },
    body: (b) => (
      <>
        <Bullet delay={b}>Sesiones de mejores prácticas</Bullet>
        <Bullet delay={b + 0.1}>Reuniones mensuales</Bullet>
        <Bullet delay={b + 0.2}>“Mi historia como coordinador”</Bullet>
        <Bullet delay={b + 0.3}>Espacios de convivencia presenciales y en línea</Bullet>
      </>
    ),
  },
]

export function Slide4() {
  const reduce = useReducedMotion()
  return (
    <div className="absolute inset-0">
      <SlideTitle text="LOS COORDIS: UN ACTOR CLAVE" />

      <div className="absolute left-[120px] top-[280px] grid w-[1680px] grid-cols-3 gap-12">
        {CARDS.map((card, i) => {
          const Icon = card.icon
          const delay = 0.45 + i * 0.2
          return (
            <motion.article
              key={card.title}
              className="glass flex h-[660px] flex-col rounded-[36px] px-11 pb-10 pt-11"
              initial={{ opacity: 0, y: 70, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{
                y: -12,
                boxShadow: '0 40px 80px -30px rgba(37,71,255,0.45), 0 12px 30px -14px rgba(35,43,94,0.2)',
                transition: { duration: 0.3, ease },
              }}
              transition={{ delay, duration: 0.8, ease }}
            >
              <motion.div
                className="mb-7 flex h-[88px] w-[88px] items-center justify-center rounded-[26px] text-white shadow-[0_18px_34px_-14px_rgba(37,71,255,0.7)]"
                style={{ background: 'linear-gradient(135deg, #2547FF 0%, #3A7FC1 100%)' }}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: delay + 0.25, type: 'spring', stiffness: 240, damping: 13 }}
              >
                <motion.span
                  className="flex"
                  animate={reduce ? undefined : card.loop}
                  transition={{ delay: delay + 1.2, duration: 2.6, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
                >
                  <Icon size={44} strokeWidth={1.9} />
                </motion.span>
              </motion.div>
              <h2 className="mb-7 min-h-[96px] font-display text-[38px] font-extrabold leading-[1.1] text-blue-deep">
                {card.title}
              </h2>
              <ul className="space-y-[18px]">{card.body(delay + 0.5)}</ul>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}

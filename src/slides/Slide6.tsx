import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FOTOS, LOGO } from '../assets'
import { SafeImage } from '../components/SafeImage'
import { STAGE_H, STAGE_W } from '../components/Stage'

const ease = [0.22, 1, 0.36, 1] as const
const PLACEHOLDERS = 12
const STAGGER = 0.09
const FRAME = 14 // borde de la polaroid
const CAPTION = 46 // borde inferior de la polaroid
const IMG_RATIO = 3 / 4 // alto / ancho de la foto

type Layout = {
  src: string | null
  x: number
  y: number
  w: number
  rotate: number
  fromX: number
  fromY: number
  fromRotate: number
  delay: number
  depth: number
  z: number
  floatDur: number
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)

/** Calcula un collage que cubre el lienzo y se adapta a la cantidad de fotos. */
function buildLayout(srcs: (string | null)[]): Layout[] {
  const n = srcs.length
  const polaroidAspect = 1 / (IMG_RATIO + 0.12) // ancho / alto aproximado de la polaroid
  const cols = Math.max(1, Math.round(Math.sqrt((n * (STAGE_W / STAGE_H)) / polaroidAspect)))
  const rows = Math.ceil(n / cols)
  const cellW = STAGE_W / cols
  const cellH = STAGE_H / rows
  const w = Math.min(cellW * 1.02, cellH * 1.1 * polaroidAspect)
  const order = srcs.map((_, i) => i).sort(() => Math.random() - 0.5)

  return srcs.map((src, i) => {
    const row = Math.floor(i / cols)
    const inRow = row === rows - 1 ? n - row * cols : cols
    const offset = (cols - inRow) * cellW * 0.5 // centra la última fila si está incompleta
    const cx = offset + (i % cols) * cellW + cellW / 2 + rand(-0.13, 0.13) * cellW
    const cy = row * cellH + cellH / 2 + rand(-0.13, 0.13) * cellH
    // Entra desde fuera, en la dirección de su posición respecto al centro.
    let angle = Math.atan2(cy - STAGE_H / 2, cx - STAGE_W / 2)
    if (Math.hypot(cx - STAGE_W / 2, cy - STAGE_H / 2) < 120) angle = rand(0, Math.PI * 2)
    angle += rand(-0.35, 0.35)
    const dist = rand(1250, 1550)
    const rotate = rand(-8, 8)
    return {
      src,
      x: cx - w / 2,
      y: cy,
      w,
      rotate,
      fromX: Math.cos(angle) * dist,
      fromY: Math.sin(angle) * dist,
      fromRotate: rotate + rand(-45, 45),
      delay: 0.15 + order[i] * STAGGER,
      depth: rand(0.4, 1.3),
      z: order[i] + 1,
      floatDur: rand(5, 8),
    }
  })
}

function Polaroid({ p, mx, my, reduce }: { p: Layout; mx: MotionValue<number>; my: MotionValue<number>; reduce: boolean }) {
  const px = useTransform(mx, (v) => v * 26 * p.depth)
  const py = useTransform(my, (v) => v * 18 * p.depth)
  const imgH = (p.w - FRAME * 2) * IMG_RATIO
  const h = imgH + FRAME + CAPTION

  return (
    <motion.div
      className="absolute"
      style={{ left: p.x, top: p.y - h / 2, width: p.w, height: h, zIndex: p.z }}
      initial={{ x: p.fromX, y: p.fromY, rotate: p.fromRotate, scale: 1.35, opacity: 0 }}
      animate={{ x: 0, y: 0, rotate: p.rotate, scale: 1, opacity: 1 }}
      transition={{ delay: p.delay, type: 'spring', stiffness: 60, damping: 15, mass: 1, opacity: { delay: p.delay, duration: 0.3 } }}
    >
      <motion.div className="h-full w-full" style={{ x: px, y: py }}>
        <motion.div
          className="h-full w-full bg-white"
          style={{
            padding: `${FRAME}px ${FRAME}px ${CAPTION}px`,
            borderRadius: 6,
            boxShadow: '0 30px 50px -20px rgba(35,43,94,0.45), 0 8px 18px -6px rgba(35,43,94,0.25)',
          }}
          animate={reduce ? undefined : { y: [0, -7, 0], rotate: [0, 0.7, 0] }}
          transition={{ delay: p.delay + 1.6, duration: p.floatDur, repeat: Infinity, ease: 'easeInOut' }}
        >
          {p.src ? (
            <SafeImage src={p.src} alt="Embajadores Tec" className="block h-full w-full" />
          ) : (
            <div
              aria-hidden
              className="h-full w-full"
              style={{ background: 'linear-gradient(135deg, #9BB0FF 0%, #3A7FC1 50%, #1B4170 100%)' }}
            />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function Slide6() {
  const reduce = Boolean(useReducedMotion())
  const [layout] = useState(() =>
    buildLayout(FOTOS.length ? FOTOS : Array.from({ length: PLACEHOLDERS }, () => null)),
  )
  const veilDelay = 0.15 + layout.length * STAGGER + 2.6

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 40, damping: 18 })
  const my = useSpring(rawY, { stiffness: 40, damping: 18 })

  useEffect(() => {
    if (reduce) return
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1)
      rawY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY, reduce])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {layout.map((p, i) => (
        <Polaroid key={i} p={p} mx={mx} my={my} reduce={reduce} />
      ))}

      {/* Velo azul con el cierre */}
      <motion.div
        className="absolute inset-0 z-[100] flex flex-col items-center justify-center"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(35,43,94,0.78) 0%, rgba(27,65,112,0.62) 55%, rgba(37,71,255,0.38) 100%)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: veilDelay, duration: 1.2, ease: 'easeInOut' }}
      >
        <motion.h1
          className="font-display text-[240px] font-extrabold leading-none tracking-[-0.02em] text-white"
          style={{ textShadow: '0 20px 60px rgba(35,43,94,0.5)' }}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: veilDelay + 0.4, duration: 1.1, ease }}
        >
          Gracias
        </motion.h1>
        <motion.div
          className="mt-10 flex items-center gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: veilDelay + 1, duration: 0.9, ease }}
        >
          <SafeImage src={LOGO} alt="Escudo Embajadores Tec" fit="contain" className="h-[104px] w-[98px] rounded-2xl" />
          <span className="font-display text-[64px] font-extrabold tracking-[0.01em] text-white">Embajadores Tec</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

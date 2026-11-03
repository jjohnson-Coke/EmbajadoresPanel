import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useState, type ComponentType } from 'react'
import { preloadAll } from './assets'
import { Background } from './components/Background'
import { Controls } from './components/Controls'
import { Stage } from './components/Stage'
import { useFullscreen } from './hooks/useFullscreen'
import { useIdle } from './hooks/useIdle'
import { Slide1 } from './slides/Slide1'
import { Slide2 } from './slides/Slide2'
import { Slide3 } from './slides/Slide3'
import { Slide4 } from './slides/Slide4'
import { Slide5 } from './slides/Slide5'
import { Slide6 } from './slides/Slide6'

const SLIDES: ComponentType[] = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6]
const TOTAL = SLIDES.length

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 140 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -140 }),
}

export default function App() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1])
  const idle = useIdle(3000)
  const { isFullscreen, toggle } = useFullscreen()
  const reduce = useReducedMotion()

  useEffect(preloadAll, [])

  const go = useCallback((target: number) => {
    setState(([current]) => {
      const next = Math.max(0, Math.min(TOTAL - 1, target))
      return next === current ? [current, 1] : [next, next > current ? 1 : -1]
    })
  }, [])

  // Navegación relativa sin depender del índice capturado.
  const step = useCallback((delta: number) => {
    setState(([current, d]) => {
      const next = Math.max(0, Math.min(TOTAL - 1, current + delta))
      return next === current ? [current, d] : [next, delta > 0 ? 1 : -1]
    })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          step(1)
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          step(-1)
          break
        case 'Home':
          e.preventDefault()
          go(0)
          break
        case 'End':
          e.preventDefault()
          go(TOTAL - 1)
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggle()
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, step, toggle])

  const Current = SLIDES[index]

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={idle ? 'hide-cursor' : undefined}
        onClick={(e) => {
          if (e.clientX > window.innerWidth / 2) step(1)
        }}
      >
        <Stage>
          <Background />
          <AnimatePresence initial={false} custom={dir}>
            <motion.section
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${TOTAL}`}
            >
              <Current />
            </motion.section>
          </AnimatePresence>
        </Stage>
        <Controls index={index} total={TOTAL} idle={idle} isFullscreen={isFullscreen} onToggleFullscreen={toggle} onGo={go} />
      </div>
    </MotionConfig>
  )
}

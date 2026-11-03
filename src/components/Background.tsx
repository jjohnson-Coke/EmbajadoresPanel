import { motion, useReducedMotion } from 'framer-motion'

const BLOBS = [
  { color: '#B5CFEE', size: 760, x: '62%', y: '-18%', dx: [0, -90, 40, 0], dy: [0, 70, 120, 0], d: 34 },
  { color: '#CDEFEA', size: 640, x: '74%', y: '48%', dx: [0, 60, -70, 0], dy: [0, -90, 30, 0], d: 40 },
  { color: '#B5CFEE', size: 560, x: '-12%', y: '58%', dx: [0, 110, 50, 0], dy: [0, -50, -110, 0], d: 38 },
  { color: '#CDEFEA', size: 460, x: '18%', y: '-14%', dx: [0, 80, -40, 0], dy: [0, 60, 20, 0], d: 44 },
  { color: '#9BB0FF', size: 380, x: '86%', y: '8%', dx: [0, -60, -20, 0], dy: [0, 90, 40, 0], d: 30 },
]

/** Manchas de color difuminadas que se mueven muy lentamente en loop. */
export function Background() {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            background: b.color,
            opacity: b.color === '#9BB0FF' ? 0.35 : 0.75,
            filter: 'blur(110px)',
            willChange: 'transform',
          }}
          animate={reduce ? undefined : { x: b.dx, y: b.dy, scale: [1, 1.12, 0.94, 1] }}
          transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

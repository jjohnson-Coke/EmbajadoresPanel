import { useEffect, useState, type ReactNode } from 'react'

export const STAGE_W = 1920
export const STAGE_H = 1080

/** Lienzo 16:9 de 1920×1080 escalado para llenar la pantalla sin deformarse (letterbox). */
export function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-bg">
      <div className="relative shrink-0" style={{ width: STAGE_W * scale, height: STAGE_H * scale }}>
        <div
          className="absolute left-0 top-0 overflow-hidden bg-bg"
          style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})`, transformOrigin: '0 0' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

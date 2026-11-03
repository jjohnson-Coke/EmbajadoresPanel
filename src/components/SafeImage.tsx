import { useState, type CSSProperties } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
  /** `cover` para fotos (por defecto); `contain` para el logo. */
  fit?: 'cover' | 'contain'
}

/** Imagen que nunca rompe la app: si falla la carga, muestra un degradado azul. */
export function SafeImage({ src, alt, className = '', style, fit = 'cover' }: Props) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={className}
        style={{
          ...style,
          background: 'linear-gradient(135deg, #3A7FC1 0%, #2547FF 55%, #232B5E 100%)',
        }}
      />
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      onError={() => setFailed(true)}
      className={className}
      style={{ objectFit: fit, ...style }}
    />
  )
}

import fotos from 'virtual:fotos'

export const LOGO = '/logo.png'
export const FOTOS: string[] = fotos

/** Encuadre por foto (object-position) cuando el recorte centrado corta caras. */
export const FOCUS: Record<string, string> = {
  '/fotos/foto-10.jpg': 'center 12%',
}

/** Precarga y decodifica el logo y todas las fotos al iniciar. */
export function preloadAll() {
  ;[LOGO, ...FOTOS].forEach((src) => {
    const img = new Image()
    img.decoding = 'async'
    img.src = src
    img.decode?.().catch(() => undefined)
  })
}

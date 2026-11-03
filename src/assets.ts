import fotos from 'virtual:fotos'

export const LOGO = '/logo.png'
export const FOTOS: string[] = fotos

/** Precarga y decodifica el logo y todas las fotos al iniciar. */
export function preloadAll() {
  ;[LOGO, ...FOTOS].forEach((src) => {
    const img = new Image()
    img.decoding = 'async'
    img.src = src
    img.decode?.().catch(() => undefined)
  })
}

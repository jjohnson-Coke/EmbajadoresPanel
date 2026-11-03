// Importa fotos.zip → public/fotos/foto-XX.jpg y el logo → public/logo.png
// Uso: npm run fotos   (requiere `unzip` e ImageMagick `convert`)
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const zip = path.join(root, 'fotos.zip')
const tmp = path.join(root, '.fotos-tmp')
const out = path.join(root, 'public', 'fotos')
const MAX_BYTES = 1024 * 1024
const IMG = /\.(jpe?g|png|heic|heif|webp|avif|gif|bmp|tiff?)$/i

if (!fs.existsSync(zip)) {
  console.error('No se encontró fotos.zip en la raíz del proyecto.')
  process.exit(1)
}

fs.rmSync(tmp, { recursive: true, force: true })
fs.mkdirSync(tmp, { recursive: true })
execFileSync('unzip', ['-q', zip, '-d', tmp])

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name === '__MACOSX' || e.name.startsWith('.')) return []
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })

const all = walk(tmp).filter((f) => IMG.test(f))
const isLogo = (f) => /logo|escudo/i.test(path.basename(f))
const logo = all.find(isLogo)
const fotos = all.filter((f) => !isLogo(f)).sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))

fs.rmSync(out, { recursive: true, force: true })
fs.mkdirSync(out, { recursive: true })

fotos.forEach((src, i) => {
  const dest = path.join(out, `foto-${String(i + 1).padStart(2, '0')}.jpg`)
  // Primero convierte a JPG; si pesa más de 1 MB, reduce a máx. 1600 px de ancho.
  execFileSync('convert', [src + '[0]', '-auto-orient', '-strip', '-background', 'white', '-flatten', '-quality', '85', dest])
  if (fs.statSync(dest).size > MAX_BYTES || fs.statSync(src).size > MAX_BYTES) {
    execFileSync('convert', [dest, '-resize', '1600x>', '-quality', '82', dest])
  }
  const kb = Math.round(fs.statSync(dest).size / 1024)
  console.log(`${path.basename(src)} → ${path.basename(dest)} (${kb} KB)`)
})

if (logo) {
  execFileSync('convert', [logo, '-trim', '+repage', '-resize', '800x800>', path.join(root, 'public', 'logo.png')])
  console.log(`Logo: ${path.basename(logo)} → public/logo.png`)
} else if (!fs.existsSync(path.join(root, 'public', 'logo.png'))) {
  console.warn('⚠ No se encontró el logo en el zip ni en public/logo.png')
}

fs.rmSync(tmp, { recursive: true, force: true })
console.log(`\n${fotos.length} fotos en public/fotos/`)

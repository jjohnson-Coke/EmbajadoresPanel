import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/** Expone `virtual:fotos` con la lista de imágenes en /public/fotos (se actualiza al agregar o quitar fotos). */
function fotosPlugin(): Plugin {
  const id = 'virtual:fotos'
  const resolved = '\0' + id
  const dir = path.resolve(process.cwd(), 'public/fotos')
  const list = () => {
    try {
      return fs
        .readdirSync(dir)
        .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
        .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))
        .map((f) => `/fotos/${f}`)
    } catch {
      return []
    }
  }
  return {
    name: 'fotos-manifest',
    resolveId: (source) => (source === id ? resolved : undefined),
    load: (moduleId) => (moduleId === resolved ? `export default ${JSON.stringify(list())}` : undefined),
    configureServer(server) {
      server.watcher.add(dir)
      const refresh = (file: string) => {
        if (!file.startsWith(dir)) return
        const mod = server.moduleGraph.getModuleById(resolved)
        if (mod) server.moduleGraph.invalidateModule(mod)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), fotosPlugin()],
})

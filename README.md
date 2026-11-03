# Visión y Evolución · Embajadores Tec

Presentación web (Vite + React + TypeScript + Tailwind + Framer Motion).

```bash
npm install
npm run dev      # servidor local
npm run build    # compilación de producción
npm run fotos    # re-importa fotos.zip → public/fotos/foto-XX.jpg (+ logo)
```

Controles: → / Espacio / PageDown / clic en la mitad derecha = siguiente · ← / PageUp = anterior ·
Home / End = primera / última · F = pantalla completa.

## Deploy en Cloudflare

El proyecto está configurado como Worker con assets estáticos (`wrangler.jsonc`).

**Opción A — Desde el dashboard (recomendada):** Workers & Pages → Create → Import a repository →
elige este repo. Build command: `npm run build` · Deploy command: `npx wrangler deploy`.
Cada push a `main` se publica automáticamente.

**Opción B — Desde tu terminal:**

```bash
npx wrangler login
npm run deploy
```

**Si prefieres Cloudflare Pages:** framework preset `Vite`, build command `npm run build`,
output directory `dist`. El archivo `public/_headers` funciona en ambos.

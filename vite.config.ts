import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

function mapPublishPlugin(): Plugin {
  return {
    name: 'map-publish',
    configureServer(server) {
      server.middlewares.use('/__publish-map-data', (req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        const chunks: Buffer[] = []
        req.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
        req.on('end', async () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
            const dataDir = path.resolve(process.cwd(), 'public', 'data')
            await mkdir(dataDir, { recursive: true })
            const updatedAt = body.updatedAt || new Date().toISOString()
            if (Array.isArray(body.points) && body.points.length > 0) {
              await writeFile(
                path.join(dataDir, 'festival-points.json'),
                JSON.stringify({ version: 3, updatedAt, points: body.points }, null, 2),
                'utf8',
              )
            }
            if (Array.isArray(body.zones) && body.zones.length > 0) {
              await writeFile(
                path.join(dataDir, 'building-zones.json'),
                JSON.stringify({ version: 3, updatedAt, zones: body.zones }, null, 2),
                'utf8',
              )
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, updatedAt }))
          } catch (error) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: String(error) }))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mapPublishPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

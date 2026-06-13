import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vitePrerender from 'vite-plugin-prerender'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/'],
    }),
  ],
})

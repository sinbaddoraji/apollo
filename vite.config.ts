import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Note: babel-plugin-react-compiler disabled - it requires React 19
    // We're using React 18 for @react-three/fiber compatibility
  ],
})

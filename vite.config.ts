import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      "@infrastructure/http": path.resolve(__dirname, "src/infrastructure/http"),
      "@use-cases/vehicles": path.resolve(__dirname, "src/use-cases/vehicles"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },

})
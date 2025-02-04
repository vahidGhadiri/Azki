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
      "@adapters/user": path.resolve(__dirname, "src/adapters/user"),
      "@components": path.resolve(__dirname, "src/components"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@config": path.resolve(__dirname, "src/config"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets")
    },
  },

})
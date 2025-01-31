import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react-swc'
import path from "path"

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Pastikan output ke folder dist
    rollupOptions: {
      input: "index.html", // Pastikan Vite tahu di mana entry file
    }
  }
})

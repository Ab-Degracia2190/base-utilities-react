import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss(), dts({ tsconfigPath: './tsconfig.app.json', outDir: 'dist' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/exports/index.ts'),
      name: 'BaseUtilitiesReact',
      fileName: (format) => `base-utilities-react.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import { config } from '@repo/app-config'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  base: config.webApp.path,
  plugins: [
    react(),
    svgr(),
    federation({
      name: config.appName,
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {},
      shared: ['react', 'react-dom', 'zustand', '@tanstack/react-query', 'axios']
    })
  ],
  server: {
    port: config.webApp.port,
    strictPort: true,
    open: true,
    host: 'localhost',
    proxy: {
      [config.api.path]: {
        target: config.apiSimulator.url,
        rewrite: (path: string) => path.replace(config.api.path, '/graphql')
      }
    }
  },

  preview: {
    port: config.webApp.port,
    strictPort: true,
    open: false,
    host: true,
    proxy: {
      [config.api.path]: {
        target: config.apiSimulator.url,
        rewrite: (path: string) => path.replace(config.api.path, '/graphql')
      }
    }
  },

  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})

import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Custom Vite plugin ensuring strict JavaScript MIME types.
 * Prevents HTML5 strict MIME checking rejection ('application/octet-stream') on Windows.
 */
function strictMimeTypePlugin(): Plugin {
  return {
    name: 'strict-mime-type',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] || '';
        if (url.endsWith('.js') || url.endsWith('.mjs') || url.endsWith('.ts') || url.endsWith('.tsx')) {
          res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] || '';
        if (url.endsWith('.js') || url.endsWith('.mjs')) {
          res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), strictMimeTypePlugin()],
  server: {
    port: 3000,
    open: false,
  },
  preview: {
    port: 3000,
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
});

import { defineConfig } from 'vite';
import { builtinModules } from 'module';

// https://vitejs.dev/config
export default defineConfig({
  optimizeDeps: {
    exclude: ['dockerode']
  },
  build: {
    rollupOptions: {
      external: [
        'dockerode',
        ...builtinModules,
      ]
    }
  },
  resolve: {
    // Tell Vite to ignore .node files
    conditions: ['node'],
  },
});

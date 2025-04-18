import { defineConfig } from 'vite';
import { builtinModules } from 'module';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        'dockerode',
        ...builtinModules,
      ]
    }
  },
  resolve: {
    // Tell Vite to handle node imports properly
    conditions: ['node'],
  },
});

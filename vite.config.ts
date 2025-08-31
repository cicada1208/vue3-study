import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueDevTools(), vue(), vueJsx()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/main.scss';`
      }
    }
  }
});

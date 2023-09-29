import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import pkg from '../package.json';

// 預設自動從 .env 取出 VITE_ 開頭環境參數
console.log('VITE_APP_RUN:', import.meta.env.VITE_APP_RUN);

import.meta.env.VITE_APP_VERSION = pkg.version;
console.log('VITE_APP_VERSION:', import.meta.env.VITE_APP_VERSION);

console.log('import.meta.env.MODE:', import.meta.env.MODE); // development
console.log('NODE_ENV:', process.env.NODE_ENV); // development

console.log('import.meta.url:', import.meta.url); // http://localhost:5173/src/main.ts?t=1676475192919

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

//test rebase 1

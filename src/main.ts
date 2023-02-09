import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';

console.log('VITE_APP_RUN:', import.meta.env.VITE_APP_RUN);
// import.meta.env.MODE = process.env.NODE_ENV
console.log('import.meta.env.MODE:', import.meta.env.MODE);
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';

console.log('VITE_APP_RUN:', import.meta.env.VITE_APP_RUN);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

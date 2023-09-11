import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import router from './router';
import vuexStore from './store/vuex';
import { createPinia } from 'pinia'


const pinia = createPinia();

createApp(App)
    .use(vuexStore)
    .use(pinia)
    .use(router)
    .mount('#app');

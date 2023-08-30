import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import router from './router';
import vuexStore from './store/vuex';


createApp(App)
    .use(vuexStore)
    .use(router)
    .mount('#app');

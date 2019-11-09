import Vue from 'vue';
import router from './router';
import App from './components/App';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

require('./bootstrap');
Vue.use(VueAxios, axios);
window.axios = axios;
axios.defaults.baseURL = process.env.MIX_APP_API_URL;

const app = new Vue({
    el: '#app',
    components: {
        App
    },
    router,
    vuetify
});

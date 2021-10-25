import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Vue from 'vue';
import App from './App.vue';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import axios from 'axios';
import router from './router';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
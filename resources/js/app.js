import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Vue from 'vue';
import App from './App.vue';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import axios from 'axios';
import router from './router';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import locale from 'view-design/dist/locale/en-US';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(ViewUI,
    {
    locale,
    transfer: true,
    size: 'default', //small default large
    capture: false,
    select: {
        arrow: 'md-arrow-dropdown',
        arrowSize: 20
    }
});

const app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
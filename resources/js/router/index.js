import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '../views/Index.vue'
import Dashboard from '../views/Dashboard.vue';
 
Vue.use(VueRouter);

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Index
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: Dashboard
    }
];

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: 'active',
});

export default router;


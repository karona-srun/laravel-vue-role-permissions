import Vue from 'vue';
import VueRouter from 'vue-router';

import SignIn from '../views/auth/SignIn.vue';
import SignUp from '../views/auth/SignUp.vue';
import Index from '../views/Index.vue'
import Dashboard from '../views/Dashboard.vue';
import NotAuthorized from '../views/NotAuthorized.vue';

Vue.use(VueRouter);

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Index
    },
    {
        name: 'SignIn',
        path: '/sign-in',
        component: SignIn,
        meta: {
            guest: true
        }
    },
    {
        name: 'SignUp',
        path: '/sign-up',
        component: SignUp,
        meta: {
            guest: true
        }
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '*',
        component: NotAuthorized
    }
];

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/sign-in',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.is_admin == 1) {
                    next()
                } else {
                    next({ path: '/dashboard' })
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next({ path: '/dashboard' })
        }
    } else {
        next()
    }
})

export default router;


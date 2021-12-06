import Vue from 'vue';
import VueRouter from 'vue-router';

import SignIn from '../views/auth/SignIn.vue';
import SignUp from '../views/auth/SignUp.vue';
import ForgotPassword from '../views/auth/ForgotPassword.vue';
import ResetPasswordForm from '../views/auth/ResetPasswordForm.vue';
import Layout from '../views/Layout.vue'
import Home from '../views/Home.vue';
import LayoutAdmin from '../views/LayoutAdmin.vue';
import Dashboard from '../views/Dashboard.vue';

import UserList from '../views/users/Index.vue';
import CreateUser from '../views/users/Create.vue';
import EditUser from '../views/users/Edit.vue';

import RoleList from '../views/roles/Index.vue';
import CreateRole from '../views/roles/Create.vue';
import EditRole from '../views/roles/Edit.vue';
import ShowRole from '../views/roles/Show.vue';

import ShowUser from '../views/users/Show.vue';
import NotAuthorized from '../views/NotAuthorized.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
        {
            name: 'Home',
            path: '/',
            component: Home,
            meta: {
                guest: true
            }
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
            path: '/password/email', 
            name: 'Reset-Password', 
            component: ForgotPassword, 
            meta: {
                guest: true
            } 
        },
        { 
            path: '/password/reset/:token', 
            name: 'Reset-Password-Form', 
            component: ResetPasswordForm, 
            meta: {
                guest: true
            } 
        }]
    },
    {
        path: '/dashboard',
        component: LayoutAdmin,
        children: [
            {
                path: '/',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/users',
                component: UserList,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/create-user',
                component: CreateUser,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/users/edit-user/:id',
                component: EditUser,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/users/user-detail/:id',
                component: ShowUser,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/roles',
                component: RoleList,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/create-role',
                component: CreateRole,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/role/edit-role/:id',
                component: EditRole,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/show-role/:id',
                component: ShowRole,
                meta: {
                    requiresAuth: true
                }
            },
        ]
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


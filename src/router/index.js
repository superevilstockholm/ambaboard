// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '@/views/IndexView.vue';

import { auth } from '@/firebase/config';

const routes = [
    // Public routes
    {
        path: '/',
        name: 'index',
        component: IndexView,
    },
    {
        path: '/features',
        name: 'features',
        component: () => import('@/views/FeaturesView.vue'),
    },
    // Auth Routes
    {
        path: '/log-in',
        name: 'login',
        component: () => import('@/views/Auth/LoginView.vue'),
        meta: {
            showNavbar: false,
            showFooter: false,
            isAuthRoute: true,
        },
    },
    {
        path: '/sign-up',
        name: 'signup',
        component: () => import('@/views/Auth/SignupView.vue'),
        meta: {
            showNavbar: false,
            showFooter: false,
            isAuthRoute: true,
        },
    },
    // Protected Routes
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/IndexView.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/boards',
        name: 'boards',
        component: () => import('@/views/Protected/BoardsView.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/board/:id',
        name: 'board',
        component: () => import('@/views/Protected/BoardView.vue'),
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta.requiresAuth;
    const isAuthRoute = to.meta.isAuthRoute;
    const currentUser = auth.currentUser;
    if (requiresAuth && !currentUser) {
        next('/log-in');
    } else if (currentUser && isAuthRoute) {
        if (to.path !== '/boards') {
            next('/boards');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;

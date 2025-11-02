// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '@/views/IndexView.vue';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';

const routes = [
    // Public routes
    {
        path: '/',
        name: 'index',
        component: IndexView,
        meta: {
            showNavbar: true,
            showFooter: true,
        }
    },
    {
        path: '/features',
        name: 'features',
        component: () => import('@/views/FeaturesView.vue'),
        meta: {
            showNavbar: true,
            showFooter: true,
        }
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
        meta: {
            requiresAuth: true,
            showNavbar: true,
            showFooter: true,
        },
    },
    {
        path: '/boards',
        name: 'boards',
        component: () => import('@/views/Protected/BoardsView.vue'),
        meta: {
            requiresAuth: true,
            showNavbar: true,
            showFooter: true,
        },
    },
    {
        path: '/board/:id',
        name: 'board',
        component: () => import('@/views/Protected/BoardView.vue'),
        meta: {
            requiresAuth: true,
            showNavbar: true,
            showFooter: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
};

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.meta.requiresAuth;
    const isAuthRoute = to.meta.isAuthRoute;
    const currentUser = await getCurrentUser();

    if (requiresAuth && !currentUser) {
        next({ name: 'login' });
    } else if (isAuthRoute && currentUser) {
        next({ name: 'boards' });
    } else {
        next();
    }
});

export default router;

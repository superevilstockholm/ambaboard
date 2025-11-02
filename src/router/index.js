// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '@/views/IndexView.vue';

const routes = [
    {
        path: '/',
        name: 'index',
        component: IndexView
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

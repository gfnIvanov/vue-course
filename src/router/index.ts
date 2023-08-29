import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '@/pages/Catalog.vue';


const routes = [
    {
        path: '/',
        name: 'Catalog',
        component: Catalog
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: () => import('@/pages/Contacts.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/NotFound.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
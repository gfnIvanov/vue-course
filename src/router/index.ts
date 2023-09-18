import Catalog from '@/pages/Catalog.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { getLocalProducts } from '@/services/getLocalProducts';
import { empty } from '@/services/utils';

const routes = [
    {
        path: '/',
        name: 'Catalog',
        component: Catalog,
    },
    {
        path: '/product:id',
        name: 'Product',
        component: () => import('@/pages/Product.vue'),
        beforeEnter: async (to: any, _: any, next: any) => {
            const { payload, error } = await getLocalProducts(to.params.id);
            if (!empty(error)) {
                next(new Error(error));
                return;
            }
            to.params.data = payload;
            next();
        },
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: () => import('@/pages/Contacts.vue'),
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/pages/Admin.vue'),
    },
    {
        path: '/basket',
        name: 'Basket',
        component: () => import('@/pages/Basket.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/NotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;

import { empty } from '@/services/utils';
import { createStore } from 'vuex';
import type { ProductData, StateUserData } from '@/types';

type User = StateUserData | undefined;

const vuexStore = createStore({
    state: {
        user: undefined as User,
        productsInBasket: [] as ProductData[],
    },
    getters: {
        user(state) {
            return state.user || {};
        },
        login(state) {
            return state.user?.login;
        },
        admin(state) {
            return state.user?.admin;
        },
        basket(state) {
            return state.productsInBasket;
        },
        fullPrice(state) {
            const result = state.productsInBasket.reduce((sum, item) => {
                return +item.price + sum;
            }, 0);
            return result.toFixed(2);
        },
    },
    mutations: {
        setUser(state, user: User) {
            state.user = user;
        },
        addProductInBasket(state, product: ProductData) {
            state.productsInBasket.push(product);
        },
        clearBasket(state) {
            state.productsInBasket = [];
        },
    },
    actions: {
        setUser({ commit }, userData: User) {
            const fromStorage = localStorage.getItem('auth');
            if (empty(fromStorage) && !empty(userData)) {
                localStorage.setItem(
                    'auth',
                    JSON.stringify({
                        id: userData?.id,
                        login: userData?.login,
                        admin: userData?.admin,
                    }),
                );
                commit('setUser', userData);
            } else {
                commit('setUser', JSON.parse(fromStorage as string));
            }
        },
        delUser({ commit }) {
            localStorage.removeItem('auth');
            commit('setUser');
        },
        addProductInBasket({ commit }, product: ProductData) {
            commit('addProductInBasket', product);
        },
        clearBasket({ commit }) {
            commit('clearBasket');
        },
    },
});

export default vuexStore;

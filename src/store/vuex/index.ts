import { empty } from '@/services/utils';
import { createStore } from 'vuex';
import type { ProductData, StateUserData } from '@/types';


type User = StateUserData | undefined;

const vuexStore = createStore({
    state: {
        user: undefined as User,
        productsInBucket: [] as ProductData[]
    },
    getters: {
        login(state) {
            return state.user?.login;
        },
        admin(state) {
            return state.user?.admin;
        },
        bucket(state) {
            return state.productsInBucket;
        },
        bucketQuant(state) {
            return state.productsInBucket.length;
        }
    },
    mutations: {
        setUser(state, user: User) {
            state.user = user;
        },
        addProductInBucket(state, product: ProductData) {
            state.productsInBucket.push(product);
        }
    },
    actions: {
        setUser({ commit }, userData: User) {
            const fromStorage = localStorage.getItem('auth');
            if (empty(fromStorage) && !empty(userData)) {
                localStorage.setItem('auth', JSON.stringify({ 
                    login: userData?.login, 
                    admin: userData?.admin
                }));
                commit('setUser', userData);
            } else {
                commit('setUser', JSON.parse(fromStorage as string));
            }
        },
        delUser({ commit }) {
            localStorage.removeItem('auth');
            commit('setUser');
        },
        addProductInBucket({ commit }, product: ProductData) {
            commit('addProductInBucket', product);
        }
    }
});

export default vuexStore;
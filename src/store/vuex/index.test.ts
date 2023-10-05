import { describe, expect, test, afterEach } from '@jest/globals';
import vuexStore from './index';

describe('Testing Vuex store', () => {
    afterEach(() => {
        vuexStore.dispatch('clearBasket');
    });
    test('Should return an array of items added to cart', () => {
        const data = {
            title: '',
            price: 150,
            description: '',
            category: '',
            image: '',
        };
        vuexStore.dispatch('addProductInBasket', data);
        expect(vuexStore.getters.basket).toEqual([data]);
    });
    test('Should return the total cost of the items in the cart', () => {
        const product1 = {
            title: '',
            price: 150,
            description: '',
            category: '',
            image: '',
        };
        const product2 = {
            title: '',
            price: 50,
            description: '',
            category: '',
            image: '',
        };
        const product3 = {
            title: '',
            price: 100,
            description: '',
            category: '',
            image: '',
        };
        vuexStore.dispatch('addProductInBasket', product1);
        vuexStore.dispatch('addProductInBasket', product2);
        vuexStore.dispatch('addProductInBasket', product3);
        expect(vuexStore.getters.fullPrice).toBe('300.00');
    });
});

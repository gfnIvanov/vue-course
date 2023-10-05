import { setActivePinia, createPinia } from 'pinia';
import { describe, expect, test, beforeEach } from '@jest/globals';
import { useBasketStore } from './basket';

describe('Testing Pinia basket store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    test('Should return an array of items added to cart', () => {
        const store = useBasketStore();
        const data = {
            title: '',
            price: 150,
            description: '',
            category: '',
            image: '',
        };
        store.addProductInBasket(data);
        expect(store.basket).toEqual([data]);
    });
    test('Should return the total cost of the items in the cart', () => {
        const store = useBasketStore();
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
        store.addProductInBasket(product1);
        store.addProductInBasket(product2);
        store.addProductInBasket(product3);
        expect(store.fullPrice).toBe('300.00');
    });
    test('Must remove all items from cart', () => {
        const store = useBasketStore();
        const data = {
            title: '',
            price: 150,
            description: '',
            category: '',
            image: '',
        };
        store.addProductInBasket(data);
        store.clearBasket();
        expect(store.basket).toEqual([]);
    });
});

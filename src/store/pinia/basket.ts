import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ProductData } from '@/types';

export const useBasketStore = defineStore('basket', () => {
    const productsInBasket = ref<ProductData[]>([]);

    const basket = computed(() => {
        return productsInBasket.value;
    });
    const fullPrice = computed(() => {
        const result = productsInBasket.value.reduce((sum, item) => {
            return +item.price + sum;
        }, 0);
        return result.toFixed(2);
    });

    function addProductInBasket(product: ProductData) {
        productsInBasket.value.push(product);
    }
    function clearBasket() {
        productsInBasket.value = [];
    }

    return {
        productsInBasket,
        basket,
        fullPrice,
        addProductInBasket,
        clearBasket,
    };
});

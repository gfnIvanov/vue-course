<script setup lang="ts">
import CardProduct from './common/CardProduct.vue'
import { ref, onMounted } from 'vue';
import { getProducts } from '../services/getProducts';
import type { ProductData } from './types';
import SearchField from './common/SearchField.vue';

let products = ref([] as ProductData[]);


onMounted(async () => {
    products.value = await getProducts();
});
</script>

<template>
    <div class="catalog">
        <div class="mt-10">
            <SearchField />
        </div>
        <div v-if="products.length === 0" class="sys-message">No products</div>
        <CardProduct v-for="product in products" :key="product.id" :data="product" />
    </div>
</template>

<style scoped lang="scss">
    .catalog {
        position: relative;
        top: 82px;
    }
</style>
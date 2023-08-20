<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { ProductData } from './types';

let products = ref({} as Array<ProductData>);
const getProducts = async function() {
    try {
        const res = await axios.get('https://fakestoreapi.com/products?limit=5');
        return res.data;
    } catch(e) {
        console.log(e);
    }
};

onMounted(async () => {
    products.value = await getProducts();
});
</script>

<template>
    <div class="catalog">
        <div class="card" v-for="product in products" :key="product.id">{{ product.title }}</div>
    </div>
</template>

<style scoped lang="scss">
    .catalog {
        position: relative;
        top: 82px;

        .card {
            padding: 5px;
            text-align: center;
        }
    }
</style>
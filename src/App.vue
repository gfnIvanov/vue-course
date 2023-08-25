<script setup lang="ts">
import Header from './components/Header.vue'
import Catalog from './pages/Catalog.vue'
import { ref } from 'vue';

let productCount = ref(0);
</script>

<template>
    <div>
        <Header :product-count="productCount"/>
        <Catalog @add-product="productCount += 1"/>
    </div>
</template>

<style scoped>
</style>

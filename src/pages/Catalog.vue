<script setup lang="ts">
import CardProduct from '@/components/common/CardProduct.vue'
import SearchField from '@/components/common/SearchField.vue';
import { ref, onMounted } from 'vue';
import { getProducts } from '@/services/getProducts';
import type { ProductData } from '@/types.js';

let productsOrigin: ProductData[];
let productsMutable = ref([] as ProductData[]);

const emit = defineEmits(['addProduct']);

const addProduct = function(data: ProductData) {
    emit('addProduct', data)
};

const filterProducts = function(text: string) {
    let regexp = new RegExp(text, 'i');
    productsMutable.value = productsMutable.value.filter(data => regexp.test(data.title.toLowerCase()));
};

const getAllProducts = function() {
    productsMutable.value = productsOrigin;
};

onMounted(async () => {
    const res = await getProducts();
    productsOrigin = res;
    productsMutable.value = res;
});
</script>

<template>
    <div class="catalog">
        <div class="mt-10">
            <SearchField @search-products="filterProducts" @get-all="getAllProducts" />
        </div>
        <div v-if="productsMutable.length === 0" class="sys-message">No products</div>
        <CardProduct v-for="product in productsMutable" :key="product.id" :data="product" @add-product="addProduct" />
    </div>
</template>

<style scoped lang="scss">
    .catalog {
        position: relative;
        top: 82px;
    }
</style>
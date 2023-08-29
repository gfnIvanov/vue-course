<script setup lang="ts">
import CardProduct from '@/components/common/CardProduct.vue';
import SearchField from '@/components/common/SearchField.vue';
import Button from '@/components/common/Button.vue';
import Filter from '@/components/Filter.vue';
import { ref, onMounted } from 'vue';
import { getProducts } from '@/services/getProducts';
import { removeSpanTags } from '@/services/utils';
import type { FilterFields, ProductData } from '@/types.js';
import { _useFilter, _searchProducts } from '@/services/filterProducts';


let productsOrigin: ProductData[];
const productsMutable = ref([] as ProductData[]);
const showFilter = ref(false);
const beforeProducts = ref('Loading...');
const categories = new Set<string>();

const emit = defineEmits(['addProduct']);

const addProduct = function(data: ProductData) {
    emit('addProduct', data)
};

const searchProducts = function(text: string) {
    productsMutable.value = _searchProducts(text, productsMutable.value);
};

const useFilter = function(filter: FilterFields) {
    productsMutable.value = _useFilter(filter, productsOrigin);
};

const getAllProducts = function() {
    productsMutable.value.forEach(data => {
        data.title = removeSpanTags(data.title);
    });
    productsMutable.value = productsOrigin.slice(0);
};

onMounted(async () => {
    let res = await getProducts();
    beforeProducts.value = 'No products';
    productsOrigin = res;
    productsMutable.value = res;
    res.forEach(data => {
        categories.add(data.category);
    });
});
</script>

<template>
    <div class="catalog">
        <div class="mt-10">
            <SearchField @search-products="searchProducts" @get-all="getAllProducts" />
        </div>
        <div>
            <Button
                :text="showFilter ? 'Hide filter' : 'Show filter'" 
                @click="showFilter = !showFilter" 
                :no-pad="true" 
            />
        </div>
        <Filter v-if="showFilter" :categories="categories" @use-filter="useFilter" />
        <div v-if="productsMutable.length === 0" class="sys-message">{{ beforeProducts }}</div>
        <CardProduct 
            v-for="product in productsMutable" 
            :key="product.id" 
            :data="product" 
            @add-product="addProduct" 
        />
    </div>
</template>

<style scoped lang="scss">
    @import '@/style.scss';

    .catalog {
        @include content;

        .button-block {
            height: 20px;
            font-size: 10px;
            text-align: center;
            color: gray;
            padding: 5px;
        }
    }
</style>
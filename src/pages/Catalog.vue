<script setup lang="ts">
import CardProduct from '@/components/common/CardProduct.vue';
import SearchField from '@/components/common/SearchField.vue';
import Button from '@/components/common/Button.vue';
import Filter from '@/components/Filter.vue';
import { ref, onMounted } from 'vue';
import { getProducts } from '@/services/getProducts';
import { empty, removeSpanTags } from '@/services/utils';
import { getLocalProducts } from '@/services/getLocalProducts';
import { _useFilter, _searchProducts } from '@/services/filterProducts';
import type { FilterFields, ProductData } from '@/types.js';

let productsOrigin: ProductData[];
const productsMutable = ref([] as ProductData[]);
const showFilter = ref(false);
const beforeProducts = ref('Loading...');
const categories = new Set<string>();

const searchProducts = function (text: string) {
    productsMutable.value = _searchProducts(text, productsMutable.value);
};

const useFilter = function (filter: FilterFields) {
    productsMutable.value = _useFilter(filter, productsOrigin);
};

const getAllProducts = function () {
    productsMutable.value.forEach(data => {
        data.title = removeSpanTags(data.title);
    });
    productsMutable.value = productsOrigin.slice(0);
};

onMounted(async () => {
    let products = await getProducts();
    const { payload, error } = await getLocalProducts();
    if (empty(error)) {
        products = products.concat(payload as []);
    }
    beforeProducts.value = 'No products';
    productsOrigin = products;
    productsMutable.value = products;
    products.forEach(data => {
        categories.add(data.category);
    });
});
</script>

<template>
    <div class="catalog">
        <div class="mt-10">
            <SearchField
                @search-products="searchProducts"
                @get-all="getAllProducts"
            />
        </div>
        <div>
            <Button
                :text="showFilter ? 'Hide filter' : 'Show filter'"
                :no-pad="true"
                @click="showFilter = !showFilter"
            />
        </div>
        <Filter
            v-if="showFilter"
            :categories="categories"
            @use-filter="useFilter"
        />
        <div v-if="productsMutable.length === 0" class="sys-message">
            {{ beforeProducts }}
        </div>
        <CardProduct
            v-for="product in productsMutable"
            :key="product.id"
            :data="product"
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

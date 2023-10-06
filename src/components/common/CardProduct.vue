<script setup lang="ts">
import Button from './Button.vue';
import vuexStore from '@/store/vuex';
import type { ProductData } from '@/types.js';

const props = defineProps<{ data: ProductData }>();

const btnOnClick = function () {
    vuexStore.dispatch('addProductInBasket', props.data);
};
</script>

<template>
    <div class="card" data-testid="card-product">
        <div>
            <img :src="data.image" width="200" height="220" vspace="50" />
        </div>
        <RouterLink :to="{ name: 'Product', params: { id: data.id } }">
            <div v-html="data.title"></div>
        </RouterLink>
        <div class="flexbox pt-15">
            <div class="pr-20">
                <b>${{ data.price }}</b>
            </div>
            <Button
                text="ToBasket"
                image="shopping-cart.svg"
                :no-pad="true"
                @click="btnOnClick"
            />
        </div>
        <fieldset>
            <legend>Description</legend>
            <div>{{ data.description }}</div>
        </fieldset>
    </div>
</template>

<style scoped lang="scss">
.card {
    width: 600px;
    padding: 5px;
    text-align: center;
    border-bottom: 2px solid gainsboro;
    margin: auto;

    a {
        color: black;
    }

    fieldset {
        border: 1px solid gainsboro;
    }
}

.flexbox {
    justify-content: center;
}
</style>

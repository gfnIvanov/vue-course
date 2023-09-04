<script setup lang="ts">
import Button from './Button.vue';
import vuexStore from '@/store/vuex';
import type { ProductData } from '@/types.js';


const props = defineProps<{ data: ProductData }>();

const btnOnClick = function() {
    vuexStore.dispatch('addProductInBucket', props.data);
};
</script>

<template>
    <div class="card">
        <div><img :src="data.image" width="200" height="220" vspace="50" /></div>
        <div v-html="data.title"></div>
        <div class="flexbox pt-15">
            <div class="pr-20"><b>${{ data.price }}</b></div>
            <Button text="ToBasket" @click="btnOnClick" image="shopping-cart.svg" :no-pad="true" />
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

    fieldset {
        border: 1px solid gainsboro;
    }
}

.flexbox {
    justify-content: center;
}
</style>
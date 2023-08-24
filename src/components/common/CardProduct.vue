<script setup lang="ts">
import Button from './Button.vue';
import type { ProductData } from '../types.js'

defineProps<{ data: ProductData }>();
</script>

<template>
    <div class="card">
        <div><img :src="data.image" width="200" height="220" vspace="50" /></div>
        <div>{{ data.title }}</div>
        <div class="flexbox pt-15">
            <div class="pr-20"><b>${{ data.price }}</b></div>
            <div><Button text="ToBasket" image="shopping-cart.svg" :no-pad="true" /></div>
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
</style>
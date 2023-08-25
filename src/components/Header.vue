<script setup lang="ts">
import Button from './common/Button.vue';
import Counter from './common/Counter.vue';
import { empty } from '@/services/utils';

defineProps<{ productCount: number }>();
</script>

<template>
    <div class="header">
        <div class="catalog"><Button text="Catalog" /></div>
        <div class="contacts"><Button text="Contacts" /></div>
        <div class="basket"><Button text="Basket" image="shopping-cart.svg" :count="productCount" />
            <Counter v-if="!empty(productCount)" :count="productCount"/>
        </div>
        <div class="log-in"><Button text="Log in" /></div>
        <div class="line" />
    </div>
</template>

<style scoped lang="scss">
@mixin common-btn {
    align-self: center;
    padding: 5px;
}

.header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    display: flex;
    background-color: white;
    z-index: 1000;

    .catalog {
        @include common-btn;
        margin-left: 100px;
    }

    .contacts {
        @include common-btn;
    }

    .basket {
        @include common-btn;
        margin-left: auto;
    }

    .log-in {
        @include common-btn;
        margin-right: 100px;
    }

    .line {
        position: inherit;
        width: 100%;
        top: 80px;
        height: 2px;
        margin: 0px 30px;
        background-color: gray;
    }
}


</style>
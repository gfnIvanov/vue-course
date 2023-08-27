<script setup lang="ts">
import Button from './common/Button.vue';
import Counter from './common/Counter.vue';
import { empty } from '@/services/utils';
import type { HeaderProps } from '@/types';

const props = defineProps<HeaderProps>();

const emit = defineEmits(['showModal', 'logout']);

const setLoginLogout = function() {
    if (props.logBtnText === 'Log out') {
        emit('logout');
        return;
    }
    emit('showModal');
};
</script>

<template>
    <div class="header">
        <div class="catalog">
            <Button text="Catalog" />
        </div>
        <div class="contacts">
            <Button text="Contacts" />
        </div>
        <div class="basket">
            <Button text="Basket" image="shopping-cart.svg">
                <Counter v-if="!empty(productCount)" :count="productCount"/>
            </Button>
        </div>
        <div class="log-in">
            <Button :text="logBtnText" @click="setLoginLogout" />
        </div>
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
        width: 150px;
        text-align: center;
    }

    .line {
        position: inherit;
        width: 100%;
        top: 80px;
        height: 2px;
        background-color: gray;
    }
}
</style>
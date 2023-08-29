<script setup lang="ts">
import Button from './common/Button.vue';
import Counter from './common/Counter.vue';
import { ref } from 'vue';
import { empty } from '@/services/utils';
import type { HeaderProps, MenuButtons } from '@/types';


const props = defineProps<HeaderProps>();

const emit = defineEmits(['showLogin', 'logout']);

const btnsActive = ref<MenuButtons>({
    'Catalog': true,
    'Contacts': false
});

const setBtnActive = function(btnName: keyof MenuButtons) {
    for (const key in btnsActive.value) {
        btnsActive.value[key as keyof MenuButtons] = (key === btnName);
    }
};

const setLoginLogout = function() {
    if (props.logBtnText === 'Log out') {
        localStorage.removeItem('auth');
        emit('logout');
        return;
    }
    emit('showLogin');
};
</script>

<template>
    <div class="header">
        <div class="catalog">
            <RouterLink :to="{ name: 'Catalog' }">
                <Button 
                    text="Catalog" 
                    @click="setBtnActive('Catalog')" 
                    :active="btnsActive['Catalog']" 
                />
            </RouterLink>
        </div>
        <div class="contacts">
            <RouterLink :to="{ name: 'Contacts' }">
                <Button 
                    text="Contacts" 
                    @click="setBtnActive('Contacts')" 
                    :active="btnsActive['Contacts']" 
                />
            </RouterLink>
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
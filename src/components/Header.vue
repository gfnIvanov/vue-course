<script setup lang="ts">
import Button from './common/Button.vue';
import Counter from './common/Counter.vue';
import vuexStore from '@/store/vuex';
import { useUserStore } from '../store/pinia/user';
import { computed, ref } from 'vue';
import { empty } from '@/services/utils';
import type { HeaderProps, MenuButtons } from '@/types';


const btnsActive = ref<MenuButtons>({
    'Catalog': true,
    'Contacts': false,
    'Admin': false,
    'Basket': false
});

const store = useUserStore();

const productsInBasket = computed(() => vuexStore.getters.basket);

const props = defineProps<HeaderProps>();

const emit = defineEmits(['showLogin', 'logout']);

const setBtnActive = function(btnName: keyof MenuButtons) {
    for (const key in btnsActive.value) {
        btnsActive.value[key as keyof MenuButtons] = (key === btnName);
    }
};

const setLoginLogout = function() {
    if (props.logBtnText === 'Log out') {
        store.$reset();
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
        <div v-if="store.admin" class="admin">
            <RouterLink :to="{ name: 'Admin' }">
                <Button
                    text="Admin"
                    @click="setBtnActive('Admin')"
                    :active="btnsActive['Admin']"
                />
            </RouterLink>
        </div>
        <div class="basket">
            <RouterLink :to="{ name: 'Basket' }">
                <Button
                    text="Basket"
                    image="shopping-cart.svg"
                    @click="setBtnActive('Basket')"
                ><Counter v-if="!empty(productsInBasket)" :count="productsInBasket.length"/>
                </Button>
            </RouterLink>
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

    .contacts, .admin {
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
<script setup lang="ts">
import Grid from '@/components/common/Grid/Grid.vue';
import Button from '@/components/common/Button.vue';
import Order from '@/components/Order.vue';
import Alert from '@/components/Alert.vue';
import vuexStore from '@/store/vuex';
import { useUserStore } from '../store/pinia/user';
import { ref, computed } from 'vue';
import { empty } from '@/services/utils';


const showAddOrder = ref(false);
const showSuccessMessage = ref(false);

const productsInBasket = computed(() => vuexStore.getters.basket);

const store = useUserStore();

const addSuccess = function() {
    showSuccessMessage.value = true;
    vuexStore.commit('clearBasket');
};
</script>

<template>
    <div class="basket">
        <div v-for="product in productsInBasket" :key="product.id">
            <Grid
                :data="product"
                :keys="['image', 'title', 'price']"
            />
        </div>
        <span v-if="empty(productsInBasket)">No items added</span>
        <div v-else class="mt-10" style="margin:10px">
            <div style="text-align:right"><b>${{ vuexStore.getters.fullPrice }}</b></div>
            <div class="line" />
            <Button text="Checkout" @click="showAddOrder = true" />
        </div>
    </div>
    <Teleport to="body">
        <Alert
            :show="showSuccessMessage"
            @close="showSuccessMessage = false"
            text="Order successfully completed"
        />
        <Alert
            v-if="empty(store.login)"
            :show="showAddOrder"
            @close="showAddOrder = false"
            text="You must be logged in to place an order"
        />
        <Order
            v-else
            :show="showAddOrder"
            @close="showAddOrder = false"
            @add-success="addSuccess()"
        />
    </Teleport>
</template>

<style scoped lang="scss">
@import '@/style.scss';

.basket {
    @include content;
    text-align: center;
    padding: 20px 80px 100px;

    .line {
        margin-top: 10px;
        border-bottom: 1px solid gainsboro;
    }

    .button-block {
        height: 30px;
        margin-top: 15px;
        font-size: 14px;
    }
}
</style>
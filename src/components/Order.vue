<script setup lang="ts">
import Button from './common/Button.vue';
import Email from './common/Inputs/Email.vue';
import Phone from './common/Inputs/Phone.vue';
import Base from './common/Inputs/Base.vue';
import vuexStore from '@/store/vuex';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { addOrder } from '@/services/addOrder';
import { empty } from '@/services/utils';
import type { ProductData, OrderData } from '@/types';


const isLoading = ref(false);

defineProps<{ show: boolean }>();

const emit = defineEmits(['close', 'addSuccess']);

const { setErrors, handleSubmit } = useForm();

const onSubmit = handleSubmit(async formData => {
    const orderData = formData;
    orderData.user = vuexStore.getters.user.id;
    const compound = vuexStore.getters.basket.map((product: ProductData) => {
        return {
            title: product.title,
            price: product.price,
            category: product.category
        }
    });
    orderData.compound = JSON.stringify(compound);
    orderData.summ = vuexStore.getters.fullPrice;
    isLoading.value = true;
    const { error } = await addOrder(orderData as OrderData);
    isLoading.value = false;
    if (!empty(error)) {
        setErrors({
            address: error as string
        });
        return;
    }
    emit('addSuccess');
    emit('close');
});
</script>

<template>
    <div v-if="show" class="modal-mask">
        <div class="modal-container">
            <div class="close-btn-wrap">
                <Button text="close" @click="$emit('close')" image="close.svg" :no-pad="true" />
            </div>
            <form @submit="onSubmit">
                <Base
                    name="name"
                    p-holder="Name"
                    :is-dis="isLoading"
                    :required="true"
                />
                <Phone
                    name="phone"
                    p-holder="Phone"
                    :is-dis="isLoading"
                />
                <Email
                    name="email"
                    p-holder="Email"
                    :is-dis="isLoading"
                />
                <Base
                    name="address"
                    p-holder="Address"
                    :is-dis="isLoading"
                    :required="true"
                />
                <div class="button-wrap">
                    <Button :text="isLoading ? 'Loading...' : 'Create order'" :no-pad="true" />
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal-container {
    width: 500px;
}
</style>
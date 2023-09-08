<script setup lang="ts">
import Button from './common/Button.vue';
import Base from './common/Inputs/Base.vue';
import Price from './common/Inputs/Price.vue';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { addProduct } from '@/services/addProduct';
import { empty } from '@/services/utils';
import type { ProductData } from '@/types';


const isLoading = ref(false);

defineProps<{ show: boolean }>();

const emit = defineEmits(['close', 'addSuccess']);

const { setErrors, handleSubmit } = useForm();

const onSubmit = handleSubmit(async formData => {
    isLoading.value = true;
    const { error } = await addProduct(formData as ProductData);
    isLoading.value = false;
    if (!empty(error)) {
        setErrors({
            image: error as string
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
                    name="title"
                    p-holder="Title"
                    :is-dis="isLoading"
                    :required="true"
                />
                <Price
                    name="price"
                    p-holder="Price"
                    :is-dis="isLoading"
                    :required="true"
                />
                <Base
                    name="category"
                    p-holder="Category"
                    :is-dis="isLoading"
                    :required="true"
                />
                <Base
                    name="description"
                    p-holder="Description"
                    :is-dis="isLoading"
                    :t-area="true"
                    :rows="4"
                />
                <Base
                    name="image"
                    p-holder="Image URL"
                    :is-dis="isLoading"
                />
                <div class="button-wrap">
                    <Button :text="isLoading ? 'Loading...' : 'Add'" :no-pad="true" />
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
<script setup lang="ts">
import Button from './common/Button.vue';
import Base from './common/Inputs/Base.vue';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { addComment } from '@/services/addComment';
import { empty } from '@/services/utils';


const isLoading = ref(false);

const props = defineProps<{ show: boolean, product: number, user: number }>();

const emit = defineEmits(['close', 'addSuccess']);

const { setErrors, handleSubmit } = useForm();

const onSubmit = handleSubmit(async (formData) => {
    const commentData = {
        product: props.product,
        user: props.user,
        text: formData.comment
    };
    isLoading.value = true;
    const { error } = await addComment(commentData);
    isLoading.value = false;
    if (!empty(error)) {
        setErrors({
            comment: error as string
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
                    name="comment"
                    p-holder="Comment"
                    :is-dis="isLoading"
                    :required="true"
                    :t-area="true"
                    :rows="5"
                />
                <div class="button-wrap">
                    <Button :text="isLoading ? 'Loading...' : 'Send'" :no-pad="true" />
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
 .modal-container {
    width: 500px;

    .input-block {
        width: 500px;
        border: 1px solid gainsboro;
    }
}
</style>
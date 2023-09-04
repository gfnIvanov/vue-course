<script setup lang="ts">
import Button from './common/Button.vue';
import * as yup from 'yup';
import InputBlock from './common/InputBlock.vue';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { addProduct } from '@/services/addProduct';
import { empty } from '@/services/utils';


const isLoading = ref(false);

defineProps<{ show: boolean }>();

const emit = defineEmits(['close', 'addSuccess']);

const { setValues, setErrors, errors, handleSubmit, defineInputBinds } = useForm({
    initialValues: {
        title: '',
        price: '' as unknown as number,
        category: '',
        description: '',
        image: ''
    },
    validationSchema: yup.object({
        title: yup.string().required(),
        price: yup.number().required(),
        category: yup.string().required(),
        image: yup.string().url()
    }),
});

const onSubmit = handleSubmit(async formData => {
    isLoading.value = true;
    const { error } = await addProduct(formData);
    isLoading.value = false;
    if (!empty(error)) {
        setErrors({
            image: error as string
        });
        return;
    }
    
    emit('addSuccess');
    closeForm();
});

const closeForm = function() {
    setValues({
        title: '',
        price: '' as unknown as number,
        category: '',
        description: '',
        image: ''
    });
    emit('close');
};

const title = defineInputBinds('title');
const price = defineInputBinds('price');
const category = defineInputBinds('category');
const description = defineInputBinds('description');
const image = defineInputBinds('image');
</script>

<template>
    <div v-if="show" class="modal-mask">        
        <div class="add-product">
            <div class="close-btn-wrap">
                <Button text="close" @click="closeForm()" image="close.svg" :no-pad="true" />
            </div>
            <form @submit="onSubmit">
                <InputBlock 
                    block-type="input" 
                    p-holder="Title" 
                    :is-dis="isLoading" 
                    :bind-var="title" 
                    :error="errors.title"
                />
                <InputBlock 
                    block-type="input" 
                    p-holder="Price" 
                    :is-dis="isLoading" 
                    :bind-var="price" 
                    :error="errors.price"
                />
                <InputBlock 
                    block-type="input" 
                    p-holder="Category" 
                    :is-dis="isLoading" 
                    :bind-var="category" 
                    :error="errors.category"
                />
                <InputBlock
                    block-type="textarea" 
                    :rows="4"
                    p-holder="Description" 
                    :is-dis="isLoading" 
                    :bind-var="description" 
                />
                <InputBlock 
                    block-type="input" 
                    p-holder="Image URL" 
                    :is-dis="isLoading" 
                    :bind-var="image" 
                    :error="errors.image"
                />
                <span class="warn">{{ errors.image }}</span>
                <div class="button-wrap">
                    <Button :text="isLoading ? 'Loading...' : 'Add'" :no-pad="true" />
                </div>
            </form>           
        </div>
    </div>
</template>

<style scoped lang="scss">        
.add-product {
    width: 500px;
    margin: auto;            
    padding: 10px 30px 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;

    .close-btn-wrap {
        padding: 5px 0px;
        text-align: right;
    }

    .button-wrap {
        height: 30px;
        padding-top: 15px;
        text-align: center;
    }
}
</style>
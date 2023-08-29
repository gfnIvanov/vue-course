<script setup lang="ts">
import Button from './common/Button.vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { ref } from 'vue';


const isLoading = ref(false);

defineProps<{ show: boolean }>();

const emit = defineEmits(['close', 'login']);

const { setValues, errors, handleSubmit, defineInputBinds } = useForm({
    initialValues: {
        login: '',
        password: '',
    },
    validationSchema: yup.object({
        login: yup.string().required(),
        password: yup.string().min(6).required(),
    }),
});

const onSubmit = handleSubmit(formData => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        localStorage.setItem('auth', formData.login);
        setValues({
            login: '',
            password: '',
        });
        emit('login');
        emit('close');
    }, 1500);
});

const login = defineInputBinds('login');
const password = defineInputBinds('password');
</script>

<template>
    <div v-if="show" class="modal-mask">        
        <div class="login-container">
            <div class="close-btn-wrap">
                <Button text="close" @click="$emit('close')" image="close.svg" :no-pad="true" />
            </div>
            <form @submit="onSubmit">
                <div class="input-block">
                    <input placeholder="Login" v-bind="login" :disabled="isLoading">
                </div>
                <span class="warn">{{ errors.login }}</span>
                <div class="input-block mt-10">
                    <input type="password" placeholder="Password" v-bind="password" :disabled="isLoading">
                </div>
                <span class="warn">{{ errors.password }}</span>
                <div class="button-wrap">
                    <Button :text="isLoading ? 'Loading...' : 'Log in'" :no-pad="true" />
                </div>
            </form>           
        </div>
    </div>
</template>

<style scoped lang="scss">        
.login-container {
    width: 300px;
    margin: auto;            
    padding: 10px 30px 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;

    .input-block {
        width: 300px;
        border: 1px solid gainsboro;
    }

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
<script setup lang="ts">
import Button from './common/Button.vue';
import * as yup from 'yup';
import vuexStore from '@/store/vuex';
import InputBlock from './common/InputBlock.vue';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { checkUser } from '@/services/checkUser';
import { empty } from '@/services/utils';


const isLoading = ref(false);

defineProps<{ show: boolean }>();

const emit = defineEmits(['close', 'login']);

const { setValues, setErrors, errors, handleSubmit, defineInputBinds } = useForm({
    initialValues: {
        login: '',
        password: '',
    },
    validationSchema: yup.object({
        login: yup.string().required(),
        password: yup.string().min(6).required(),
    }),
});

const onSubmit = handleSubmit(async formData => {
    isLoading.value = true;
    const { payload, error } = await checkUser(formData);
    isLoading.value = false;
    if (!empty(error)) {
        setErrors({
            password: error as string
        });
        return;
    }
    const userData = { 
        login: formData.login, 
        admin: payload?.admin 
    };
    vuexStore.dispatch('setUser', userData);
    setValues({
        login: '',
        password: '',
    });
    emit('login');
    emit('close');
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
                <InputBlock 
                    block-type="input" 
                    p-holder="Login" 
                    :is-dis="isLoading" 
                    :bind-var="login" 
                    :error="errors.login"
                />
                <InputBlock 
                    type="password"
                    block-type="input" 
                    p-holder="Password" 
                    :is-dis="isLoading" 
                    :bind-var="password" 
                    :error="errors.password"
                />
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
<script setup lang="ts">
import Button from './common/Button.vue';
import InputBlock from './common/InputBlock.vue';
import * as yup from 'yup';
import vuexStore from '@/store/vuex';
import { useForm } from 'vee-validate';
import { ref } from 'vue';


const mailFromAuth = ref<string | null>('');
const isLoading = ref(false);

defineProps<{ show: boolean }>();

const emit = defineEmits(['close', 'login']);

const { setValues, errors, handleSubmit, defineInputBinds } = useForm({
    initialValues: {
        email: '',
        message: '',
    },
    validationSchema: yup.object({
        email: yup.string().email().required(),
        message: yup.string().required(),
    }),
});

const validateFromAuthSchema = yup.object({
    emailFromAuth: yup.string().email()
});

const onSubmit = handleSubmit(() => {
    isLoading.value = true;
    setTimeout(() => {
        setValues({
            email: '',
            message: '',
        });
        isLoading.value = false;
        emit('close');
    }, 1500);
});

const email = defineInputBinds('email');
const message = defineInputBinds('message');

const getEmailFromAuth = function() {
    let mailName = vuexStore.getters.login;
    mailFromAuth.value = mailName;
    return validateFromAuthSchema.isValidSync({ 
        emailFromAuth: mailName
    });
}; 
</script>

<template>
    <div v-if="show" class="modal-mask">        
        <div class="feedback-container">
            <div class="close-btn-wrap">
                <Button text="close" @click="$emit('close')" image="close.svg" :no-pad="true" />
            </div>
            <form @submit="onSubmit">
                <InputBlock 
                    block-type="input" 
                    p-holder="Message" 
                    :is-dis="isLoading" 
                    :bind-var="email" 
                    :error="errors.email"
                    bind-list="authMail"
                />
                <datalist v-if="getEmailFromAuth()" id="authMail">
                    <option>{{ mailFromAuth }}</option>
                </datalist>
                <span class="warn">{{ errors.email }}</span>
                <InputBlock 
                    block-type="textarea" 
                    :rows="5"
                    p-holder="Message" 
                    :is-dis="isLoading" 
                    :bind-var="message" 
                    :error="errors.message"
                />
                <div class="button-wrap">
                    <Button :text="isLoading ? 'Loading...' : 'Send'" :no-pad="true" />
                </div>
            </form>           
        </div>
    </div>
</template>

<style scoped lang="scss">
 .feedback-container {
    width: 500px;
    margin: auto;            
    padding: 10px 30px 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;

    .input-block {
        width: 500px;
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
<script setup lang="ts">
import Button from './common/Button.vue';
import InputBlock from './common/InputBlock.vue';
import Email from './common/Inputs/Email.vue';
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
        message: '',
    },
    validationSchema: yup.object({
        message: yup.string().required(),
    }),
}); // оставить useForm() чтобы заработали проверки в компоненте

const validateFromAuthSchema = yup.object({
    emailFromAuth: yup.string().email()
});

const onSubmit = handleSubmit(() => {
    isLoading.value = true;
    setTimeout(() => {
        setValues({
            message: '',
        });
        isLoading.value = false;
        emit('close');
    }, 1500);
});

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
        <div class="modal-container">
            <div class="close-btn-wrap">
                <Button text="close" @click="$emit('close')" image="close.svg" :no-pad="true" />
            </div>
            <form @submit="onSubmit">
                <Email
                    name="email"
                    p-holder="Email"
                    :is-dis="isLoading"
                    bind-list="authMail"
                />
                <datalist v-if="getEmailFromAuth()" id="authMail">
                    <option>{{ mailFromAuth }}</option>
                </datalist>
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
 .modal-container {
    width: 500px;

    .input-block {
        width: 500px;
        border: 1px solid gainsboro;
    }
}
</style>
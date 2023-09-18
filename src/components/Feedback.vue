<script setup lang="ts">
import Button from './common/Button.vue';
import Email from './common/Inputs/Email.vue';
import Base from './common/Inputs/Base.vue';
import * as yup from 'yup';
import vuexStore from '@/store/vuex';
import { useForm } from 'vee-validate';
import { ref } from 'vue';

const mailFromAuth = ref<string | null>('');
const isLoading = ref(false);

defineProps<{ show: boolean }>();

const emit = defineEmits(['close', 'login']);

const { handleSubmit } = useForm();

const validateFromAuthSchema = yup.object({
    emailFromAuth: yup.string().email(),
});

const onSubmit = handleSubmit(() => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        emit('close');
    }, 1500);
});

const getEmailFromAuth = function () {
    let mailName = vuexStore.getters.login;
    mailFromAuth.value = mailName;
    return validateFromAuthSchema.isValidSync({
        emailFromAuth: mailName,
    });
};
</script>

<template>
    <div v-if="show" class="modal-mask">
        <div class="modal-container">
            <div class="close-btn-wrap">
                <Button
                    text="close"
                    image="close.svg"
                    :no-pad="true"
                    @click="$emit('close')"
                />
            </div>
            <form @submit="onSubmit">
                <Email
                    name="email"
                    p-holder="Email"
                    :is-dis="isLoading"
                    :required="true"
                    bind-list="authMail"
                />
                <datalist v-if="getEmailFromAuth()" id="authMail">
                    <option>{{ mailFromAuth }}</option>
                </datalist>
                <Base
                    name="message"
                    p-holder="Message"
                    :is-dis="isLoading"
                    :required="true"
                    :t-area="true"
                    :rows="5"
                />
                <div class="button-wrap">
                    <Button
                        :text="isLoading ? 'Loading...' : 'Send'"
                        :no-pad="true"
                    />
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

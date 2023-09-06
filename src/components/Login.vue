<script setup lang="ts">
import Button from './common/Button.vue';
import vuexStore from '@/store/vuex';
import Base from './common/Inputs/Base.vue';
import Password from './common/Inputs/Password.vue';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { checkUser } from '@/services/checkUser';
import { empty } from '@/services/utils';
import type { UserData } from '@/types';


const isLoading = ref(false);

defineProps<{ show: boolean, modalType: 'Add user' | 'Log in' }>();

const emit = defineEmits(['close', 'login']);

const { setErrors, handleSubmit } = useForm();

const onSubmit = handleSubmit(async formData => {
    isLoading.value = true;
    const { payload, error } = await checkUser(formData as UserData);
    isLoading.value = false;
    if (!empty(error)) {
        setErrors({
            password: error as string
        });
        return;
    }
    const userData = {
        id: payload?.id,
        login: formData.login,
        admin: payload?.admin
    };
    vuexStore.dispatch('setUser', userData);
    emit('login');
    emit('close');
});
</script>

<template>
    <div v-if="show" class="modal-mask">
        <div class="modal-container">
            <div class="close-btn-wrap">
                <Button
                    text="close"
                    @click="$emit('close')"
                    image="close.svg"
                    :no-pad="true"
                />
            </div>
            <form @submit="onSubmit">
                <Base
                    name="login"
                    p-holder="Login"
                    :is-dis="isLoading"
                    :required="true"
                />
                <Password
                    name="password"
                    p-holder="Password"
                    :is-dis="isLoading"
                />
                <slot></slot>
                <div class="button-wrap">
                    <Button :text="isLoading ? 'Loading...' : modalType" :no-pad="true" />
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal-container {
    width: 300px;
}
</style>
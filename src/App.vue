<script setup lang="ts">
import Header from './components/Header.vue';
import Login from './components/Login.vue';
import Footer from './components/Footer.vue';
import Feedback from './components/Feedback.vue';
import { useUserStore } from './store/pinia/user';
import { onBeforeMount, ref } from 'vue';
import { empty } from './services/utils';
import { useRouter } from 'vue-router';

const router = useRouter();
const showLogin = ref(false);
const showFeedback = ref(false);
const logBtnText = ref(
    empty(localStorage.getItem('auth')) ? 'Log in' : 'Log out',
);

const store = useUserStore();

const logIn = function () {
    logBtnText.value = 'Log out';
};

const logOut = function () {
    toCatalogPage();
    logBtnText.value = 'Log in';
};

const toCatalogPage = function () {
    router.push({ name: 'Catalog' });
};

onBeforeMount(() => {
    store.setUser();
    toCatalogPage();
});
</script>

<template>
    <div>
        <Header
            :log-btn-text="logBtnText"
            @show-login="showLogin = true"
            @logout="logOut"
        />
        <RouterView />
        <Teleport to="body">
            <Login
                :show="showLogin"
                modal-type="Log in"
                @close="showLogin = false"
                @login="logIn"
            />
        </Teleport>
        <Teleport to="body">
            <Feedback :show="showFeedback" @close="showFeedback = false" />
        </Teleport>
        <Footer @show-feedback="showFeedback = true" />
    </div>
</template>

<style scoped></style>

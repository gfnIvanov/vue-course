<script setup lang="ts">
import Header from './components/Header.vue';
import Login from './components/Login.vue';
import Footer from './components/Footer.vue';
import Feedback from './components/Feedback.vue';
import { ref } from 'vue';
import { empty } from './services/utils';


const productCount = ref(0);
const showLogin = ref(false);
const showFeedback = ref(false);
const logBtnText = ref(empty(localStorage.getItem('auth')) ? 'Log in' : 'Log out');

const logIn = function() {
    logBtnText.value = 'Log out';
};

const logOut = function() {
    logBtnText.value = 'Log in';
};
</script>

<template>
    <div>
        <Header 
            :product-count="productCount" 
            :log-btn-text="logBtnText" 
            @show-login="showLogin = true" 
            @logout="logOut" 
        />
        <RouterView @add-product="productCount += 1" />
        <Teleport to="body">
            <Login :show="showLogin" @close="showLogin = false" @login="logIn" />
        </Teleport>
        <Teleport to="body">
            <Feedback :show="showFeedback" @close="showFeedback = false" />
        </Teleport>
        <Footer @show-feedback="showFeedback = true" />
    </div>
</template>

<style scoped>
</style>

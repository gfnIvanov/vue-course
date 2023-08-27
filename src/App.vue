<script setup lang="ts">
import Header from './components/Header.vue'
import Catalog from './pages/Catalog.vue'
import Login from './components/Login.vue'
import { ref } from 'vue';

const productCount = ref(0);
const showModal = ref(false);
const logBtnText = ref('Log in');

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
            @show-modal="showModal = true" 
            @logout="logOut" 
        />
        <Catalog @add-product="productCount += 1" />
        <Teleport to="body">
            <Login :show="showModal" @close="showModal = false" @login="logIn" />
        </Teleport>
    </div>
</template>

<style scoped>
</style>

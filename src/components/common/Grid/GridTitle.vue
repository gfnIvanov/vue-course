<script setup lang="ts">
defineProps<{ keys: string[] }>();
</script>

<template>
    <div class="grid-title">
        <div 
            class="grid-cell" 
            v-for="key in keys" 
            :key="key"
        >{{ key }}</div>
    </div>
</template>

<style scoped lang="scss">
@import './style.scss'
</style>
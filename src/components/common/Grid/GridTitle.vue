<script setup lang="ts">
defineProps<{ keys: string[] }>();
</script>

<template>
    <div class="grid-title">
        <div v-for="key in keys" :key="key" class="grid-cell">{{ key }}</div>
    </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>

<script setup lang="ts">
defineProps<{ count?: number }>();
</script>

<template>
    <div class="counter" data-testid="counter">{{ count }}</div>
</template>

<style scoped lang="scss">
.counter {
    position: absolute;
    top: 45px;
    right: 278px;
    width: 18px;
    height: 18px;
    background-color: red;
    border-radius: 18px;
    color: white;
    text-align: center;
    font-size: 11.5px;
    font-weight: bold;
}
</style>

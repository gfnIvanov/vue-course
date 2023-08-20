<script setup lang="ts">
import { ButtonProps } from '../types.js'

defineProps<ButtonProps>();
</script>

<template>
    <dev>
        <button>
            <img v-if="image !== undefined" :src="`src/assets/${image}`" :alt="text" />
            <span v-else>{{ text }}</span>
        </button>
    </dev>
</template>

<style scoped lang="scss">
button {
    border: 0;
    border-radius: 0;
    background-color: white;
    padding: 0.5em 1.1em;
    font-size: 1.3em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.3s;
}
button:hover {
    border-bottom: 2px solid gainsboro;
}
button:active {
    border-bottom: 2px solid gainsboro;
}
button:focus,
button:focus-visible {
    border-bottom: 2px solid gainsboro;
    outline: 4px auto -webkit-focus-ring-color;
}
</style>
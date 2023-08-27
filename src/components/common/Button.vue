<script setup lang="ts">
import { computed } from 'vue';
import { empty } from '@/services/utils';
import type { ButtonProps } from '@/types.js'

const props = defineProps<ButtonProps>();

const getClasses = computed(() => {
    const btnClasses = []
    if (empty(props.image)) {
        btnClasses.push('underline');
    } 
    if (props.noPad) {
        btnClasses.push('no-pad');
    }
    return btnClasses;
});

</script>

<template>
    <div class="button-block">
        <button :class="getClasses">
            <img v-if="!empty(image)" :src="`src/assets/${image}`" :alt="text" />
            <span v-else>{{ text }}</span>
        </button>
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
button {
    border: 0;
    border-radius: 0;
    background-color: white;
    padding: 0.5em 1.1em;
    font-size: 1.3em;
    font-weight: 360;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.3s;
}

button:active {
    opacity: 0.5;
}

button.no-pad {
    padding: 0;
}

button.underline:hover {
    border-bottom: 2px solid gainsboro;
}

button.underline:active {
    border-bottom: 2px solid gainsboro;
}

button.underline:focus,
button.stylize:focus-visible {
    border-bottom: 2px solid gainsboro;
    outline: 4px auto -webkit-focus-ring-color;
}
</style>
<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';

const text = ref('');

const emit = defineEmits(['searchProducts', 'getAll']);

const inputKeyUp = function (event: KeyboardEvent) {
    if (text.value.length > 2) {
        emit('searchProducts', text.value);
    }
    if (text.value.length < 3 && event.key === 'Backspace') {
        emit('getAll');
    }
};
</script>

<template>
    <div class="search-field">
        <form>
            <div class="flexbox">
                <div class="input-block">
                    <input
                        v-model="text"
                        type="text"
                        placeholder="Search here..."
                        @keyup="inputKeyUp"
                    />
                </div>
                <Button text="Basket" image="search.svg" :no-pad="true" />
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
.search-field {
    border: 1px solid gainsboro;
    width: 600px;
    margin: 0 auto;

    .input-block {
        width: 570px;
    }

    .button-block {
        margin-top: 12px;
        opacity: 0.5;
    }
}
</style>

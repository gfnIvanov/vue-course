<script setup lang="ts">
import Button from './common/Button.vue';


defineProps<{ show: boolean, text: string }>();
</script>

<template>
    <div v-if="show" class="modal-mask">
        <div class="modal-container">
            <div class="close-btn-wrap">
                <Button text="close" @click="$emit('close')" image="close.svg" :no-pad="true" />
            </div>
            <div class="line" />
            <div class="text-block">{{ text }}</div>
            <div class="line" />
            <div class="button-wrap">
                <Button text="Continue" @click="$emit('close')" :no-pad="true" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal-container {
    width: 300px;

    .text-block {
        margin: 10px 0px;
        text-align: center;
    }

    .line {
        border-bottom: 1px solid gainsboro;
    }
}
</style>
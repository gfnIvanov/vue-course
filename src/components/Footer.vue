<script setup lang="ts">
import Button from './common/Button.vue';
import { github } from '../../conf.json';
</script>

<template>
    <div class="footer">
        <div class="line" />
        <a :href="github.link" target="_blank">
            <Button class="github" text="GitHub" image="github.svg" />
        </a>
        <Button class="writetous" text="Write to us" @click="$emit('showFeedback')" />
    </div>
</template>

<style scoped lang="scss">
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    background-color: white;
    z-index: 1000;

    .line {
        position: inherit;
        width: 100%;
        bottom: 60px;
        height: 2px;
        background-color: gray;
    }

    .github {
        margin-top: 6px;
    }

    .writetous {
        font-size: 12px;
        margin: 12px;
    }
}
</style>
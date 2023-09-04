<script setup lang="ts">
import type { GridProps, GridDataType } from '@/types';


const props = defineProps<GridProps>();
</script>

<template>
    <div class="grid">
        <div 
            class="grid-cell-content"
            v-for="key in keys" 
            :key="key"
        >{{ props.data[key as keyof GridDataType] }}</div>
    </div>
</template>

<style scoped lang="scss">
@import './style.scss'
</style>
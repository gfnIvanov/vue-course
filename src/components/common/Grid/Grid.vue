<script setup lang="ts">
import type { GridProps, GridDataType } from '@/types';

const props = defineProps<GridProps>();
</script>

<template>
    <div class="grid">
        <div v-for="key in keys" :key="key" class="grid-cell-content">
            <img
                v-if="key === 'image'"
                :src="
                    props.data[key as keyof GridDataType] as unknown as string
                "
                width="50"
                height="50"
                vspase="10"
            />
            <div v-else>{{ props.data[key as keyof GridDataType] }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>

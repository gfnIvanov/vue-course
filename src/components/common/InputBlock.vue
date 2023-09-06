<script setup lang="ts">
import { empty } from '@/services/utils';
import type { InputBlockProps } from '@/types';


defineProps<InputBlockProps>();
</script>

<template>
    <div class="input-block">
        <input
            v-if="blockType === 'input'"
            :type="type"
            :placeholder="pHolder"
            v-bind="bindVar"
            :disabled="isDis"
            :list="bindList"
        />
        <textarea
            v-if="blockType === 'textarea'"
            :rows="rows"
            :placeholder="pHolder"
            v-bind="bindVar"
            :disabled="isDis"
        />
    </div>
    <span v-if="!empty(error)" class="warn">{{ error }}</span>
</template>

<style scoped lang="scss">
.input-block {
    width: 100%;
    border: 1px solid gainsboro;
    margin-top: 10px;;
}
</style>
<script setup lang="ts">
import { useField } from 'vee-validate';
import type { BaseInputProps } from '@/types';

const props = defineProps<BaseInputProps>();

const requiredChecker = function (value: string) {
    if (props.required && !value) {
        return 'this is required field';
    }
    return true;
};

const { value, errorMessage } = useField<string>(
    () => props.name,
    requiredChecker,
);
</script>

<template>
    <div class="input-field">
        <textarea
            v-if="tArea"
            v-model="value"
            :rows="rows"
            :placeholder="pHolder"
            :disabled="isDis"
        />
        <input
            v-else
            v-model="value"
            type="text"
            :placeholder="pHolder"
            :disabled="isDis"
            :list="bindList"
        />
    </div>
    <span class="warn">{{ errorMessage }}</span>
</template>

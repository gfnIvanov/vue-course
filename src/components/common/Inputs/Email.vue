<script setup lang="ts">
import * as yup from 'yup';
import { useField } from 'vee-validate';
import type { BaseInputProps } from '@/types';

defineProps<BaseInputProps>();

const { value, errorMessage } = useField<string>(
    'email',
    yup.string().email().required(),
);
</script>

<template>
    <div class="input-field">
        <input
            v-model="value"
            type="text"
            :placeholder="pHolder"
            :disabled="isDis"
            :list="bindList"
        />
    </div>
    <span class="warn">{{ errorMessage }}</span>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useField } from 'vee-validate';
import type { BaseInputProps } from '@/types';

const props = defineProps<BaseInputProps>();

const { value, errorMessage } = useField<string>(
    () => props.name,
    yup.string().required().min(6),
);
</script>

<template>
    <div class="input-field">
        <input
            v-model="value"
            type="password"
            :placeholder="pHolder"
            :disabled="isDis"
        />
    </div>
    <span class="warn">{{ errorMessage }}</span>
</template>

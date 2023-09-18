<script setup lang="ts">
import * as yup from 'yup';
import { useField } from 'vee-validate';
import type { BaseInputProps } from '@/types';

const props = defineProps<BaseInputProps>();

const { value, errorMessage } = useField<number>(
    () => props.name,
    yup.number().positive().required(),
);
</script>

<template>
    <div class="input-field">
        <input v-model="value" :placeholder="pHolder" :disabled="isDis" />
    </div>
    <span class="warn">{{ errorMessage }}</span>
</template>

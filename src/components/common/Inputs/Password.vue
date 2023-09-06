<script setup lang="ts">
import * as yup from 'yup';
import { useField } from 'vee-validate';
import type { BaseInputProps } from '@/types';


const props = defineProps<BaseInputProps>();

const { value, errorMessage } = useField<string>(() => props.name, yup.string().min(6).required());
</script>

<template>
    <div class="input-field">
        <input
            type="password"
            :placeholder="pHolder"
            v-model="value"
            :disabled="isDis"
            :list="bindList"
        />
    </div>
    <span class="warn">{{ errorMessage }}</span>
</template>

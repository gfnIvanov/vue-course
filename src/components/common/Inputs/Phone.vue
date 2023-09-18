<script setup lang="ts">
import { useField } from 'vee-validate';
import { empty } from '@/services/utils';
import type { BaseInputProps } from '@/types';

defineProps<BaseInputProps>();

const phoneChecker = function (value: string) {
    const isNum = new RegExp(/[^\d-()+]/);
    if (!value) {
        return 'this is required field';
    }
    const firstSymb = value[0];
    if (
        value.length < 11 ||
        isNum.test(value) ||
        !['7', '8', '+'].includes(firstSymb)
    ) {
        return 'this must be a valid phone';
    }
    return true;
};

const { value, errorMessage } = useField<string>('phone', phoneChecker);

const onBlur = function () {
    if (empty(errorMessage.value) && !empty(value.value)) {
        const newValues = value.value.split('').map((symb, i) => {
            if (i === 0) return '+7';
            if (i === 1) return '(' + symb;
            if (i === 3) return symb + ')';
            if (i === 7 || i === 9) return '-' + symb;
            return symb;
        });
        value.value = newValues.join('');
    }
};
</script>

<template>
    <div class="input-field">
        <input
            v-model="value"
            type="text"
            :placeholder="pHolder"
            :disabled="isDis"
            @blur="onBlur()"
        />
    </div>
    <span class="warn">{{ errorMessage }}</span>
</template>

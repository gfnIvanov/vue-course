<script setup lang="ts">
import Button from './common/Button.vue';
import { ref } from 'vue';
import { FilterFields } from '@/types';


const priceFrom = ref('');
const priceTo = ref('');
const selectCategory = ref('All');

defineProps<{ categories: Set<string> }>();
const emit = defineEmits(['useFilter']);

const useFilter = function() {
    let cat = selectCategory.value === 'All' ? '' : selectCategory.value;
    emit('useFilter', { 
        priceFrom: +priceFrom.value, 
        priceTo: +priceTo.value, 
        selectCategory: cat
    } as FilterFields);
};
</script>

<template>
    <div class="filter">
        <div class="line" />
        <div class="flexbox">
            <div><div class="mt-10">Price:</div></div>
            <div class="input-block ml-10">
                <input placeholder="From" v-model="priceFrom" />
            </div>
            <div class="input-block ml-10">
                <input placeholder="To" v-model="priceTo" />
            </div>
            <div class="ml-50">
                <div class="mt-10">Category:</div>
            </div>
            <div class="input-block ml-10" style="width:237px;">
                <select v-model="selectCategory">
                    <option>All</option>
                    <option v-for="category in categories" :value="category">{{ category }}</option>
                </select>
            </div>
        </div>
        <Button text="Apply filter" :no-pad="true" @click="useFilter" />
        <div class="line" />
    </div>
</template>

<style scoped lang="scss">
.line {
    width: 600px;
    margin: auto;
    border-bottom: 1px solid gainsboro;
}

.flexbox {
    justify-content: center;
    margin: 5px 0px 5px;
}

.input-block {
    width: 80px;
    border: 1px solid gainsboro;
    text-align: center;
}

.button-block {
    text-align: center;
    height: 20px;
    font-size: 10px;
    text-align: center;
    color: gray;
    padding: 5px;
}
</style>
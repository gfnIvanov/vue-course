<template>
    <div class="notfound">
        <h2>Page not found</h2>
        <RouterLink :to="{ name: 'Catalog' }">Back to catalog</RouterLink>
    </div>
</template>

<style scoped lang="scss">
@import '@/style.scss';

.notfound {
    @include content;
    text-align: center;
}
</style>

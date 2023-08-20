<script setup lang="ts">
import Button from './common/Button.vue'
</script>

<template>
    <div class="header">
        <div class="catalog"><Button text="Catalog" /></div>
        <div class="contacts"><Button text="Contacts" /></div>
        <div class="basket"><Button text="Basket" image="shopping-cart.svg" /></div>
        <div class="log-in"><Button text="Log in" /></div>
    </div>
    <div class="line" />
</template>

<style scoped lang="scss">
@mixin common-btn {
    align-self: center;
    padding: 5px;
}

.header {
    position: absolute;
    top: 0;
    width: 100%;
    height: 80px;
    display: flex;

    .catalog {
        @include common-btn;
        margin-left: 100px;
    }

    .contacts {
        @include common-btn;
    }

    .basket {
        @include common-btn;
        margin-left: auto;
    }

    .log-in {
        @include common-btn;
        margin-right: 100px;
    }
}

.line {
    position: relative;
    top: 80px;
    height: 2px;
    margin: 0px 30px;
    background-color: gray;
}
</style>
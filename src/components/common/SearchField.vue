<script setup lang="ts">

</script>

<template>
    <div class="search-field">
        <form>
            <input type="text" placeholder="Search here...">
            <button type="submit"></button>
        </form>
    </div>
</template>

<style scoped lang="scss">
form {
    position: relative;
    width: 600px;
    margin: 0 auto;
}
input, button {
    border: none;
    outline: none;
    background: transparent;
}
input {
    border: 1px solid gainsboro;
    width: 100%;
    height: 42px;
    padding-left: 15px;
}
button {
    height: 42px;
    width: 42px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
button:before {
    content: "\f002";
    font-family: FontAwesome;
    font-size: 16px;
    color: #F9F0DA;
}
</style>
<template>
    <div class="contacts">
        <h3 class="about">About</h3>
        <div class="info">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <h3>Address</h3>
        <div class="info">53213 South Hester, 524 Kohler Viaduct Apt. 091</div>
        <h3>Phone</h3>
        <div class="info">+35799410777</div>
        <h3>Mail</h3>
        <div class="info">gfn.ivanov@gmail.com</div>
    </div>
</template>

<style scoped lang="scss">
@import '@/style.scss';

.contacts {
    @include content;
    text-align: center;

    .about {
        margin-top: 20px;
    }

    .info {
        width: 600px;
        margin: auto;
    }
}
</style>

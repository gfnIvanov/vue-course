<script setup lang="ts">
import Button from '@/components/common/Button.vue';
import Grid from '@/components/common/Grid/Grid.vue';
import GridTitle from '@/components/common/Grid/GridTitle.vue';
import Login from '@/components/Login.vue';
import AddProduct from '@/components/AddProduct.vue';
import { ref, onMounted } from 'vue';
import { getAllUsers } from '@/services/getAllUsers';
import { empty } from '@/services/utils';
import { getLocalProducts } from '@/services/getLocalProducts';


const noUsers = ref('');
const users = ref();
const noProducts = ref('');
const products = ref();
const showAddProduct = ref(false);
const showAddUser = ref(false);

const usersKeys = ['username', 'password', 'admin'];
const productsKeys = ['id', 'title', 'price', 'category'];

const getUsersFromServer = async function() {
    const { payload, error } = await getAllUsers();
    if (!empty(error)) {
        noUsers.value = error as string;
    } else {
        users.value = payload;
    }
};

const getProductsFromServer = async function() {
    const { payload, error } = await getLocalProducts();
    if (!empty(error)) {
        noProducts.value = error as string;
    } else {
        products.value = payload;
    }
};

onMounted(() => {
    getUsersFromServer();
    getProductsFromServer();
});
</script>

<template>
    <div class="admin">
        <div class="users">
            <h3>Users</h3>
            <Button text="Add user" :no-pad="true" @click="showAddUser = true" />
            <div class="grid-block">
                <div class="line" />
                <GridTitle :keys="usersKeys" />
                <div v-for="user in users" :key="user.username">
                    <Grid
                        :data="user"
                        :keys="usersKeys"
                    />
                </div>
            </div>
            <span>{{ noUsers }}</span>
        </div>
        <div class="products">
            <h3>Products</h3>
            <Button text="Add product" :no-pad="true" @click="showAddProduct = true" />
            <div class="grid-block">
                <div class="line" />
                <GridTitle :keys="productsKeys" />
                <div v-for="product in products" :key="product.id">
                    <Grid
                        :data="product"
                        :keys="productsKeys"
                    />
                </div>
                <span>{{ noProducts }}</span>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <Login :show="showAddUser" @close="showAddUser = false" modal-type="Add user">
            <div class="mt-10">
                <input type="checkbox" style="width:15px; height:15px"/>
                <span class="ml-10">admin</span>
            </div>
        </Login>
    </Teleport>
    <Teleport to="body">
        <AddProduct
            :show="showAddProduct"
            @close="showAddProduct = false"
            @add-success="getProductsFromServer()"
        />
    </Teleport>
</template>

<style scoped lang="scss">
@import '@/style.scss';

.admin {
    @include content;
    display: flex;

    h3 {
        margin: 10px;
    }

    .users, .products {
        width: 50%;
        padding: 0px 10px 10px;
        text-align: center;
    }

    .button-block {
        height: 20px;
        font-size: 12px;
        margin: 5px 20px;
        text-align: right;
    }

    .grid-block {
        margin: 10px;

        .line {
            margin: 10px;
            border-bottom: 1px solid gainsboro;
        }
    }
}
</style>
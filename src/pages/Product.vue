<script setup lang="ts">
import CardProduct from '@/components/common/CardProduct.vue';
import Button from '@/components/common/Button.vue';
import AddComment from '@/components/AddComment.vue';
import vuexStore from '@/store/vuex';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { empty } from '@/services/utils';
import { getComments } from '@/services/getComments';
import type { ProductData } from '@/types';


const route = useRoute();

const comments = ref();
const showAddComment = ref(false);

const productData = route.params?.data[0] as unknown as ProductData;

const getCommentsFromServer = async function() {
    const { payload, error } = await getComments(productData.id as number);
    if (!empty(error)) {
        comments.value = error as string;
    } else {
        comments.value = payload;
    }
};

onMounted(() => {
    getCommentsFromServer();
});
</script>

<template>
    <div class="product">
        <CardProduct :data="productData" />
        <div class="comments">
            <Button text="Add comment" :no-pad="true" @click="showAddComment = true" />
            <fieldset>
                <legend>Comments</legend>
                <div v-if="empty(comments)">No comments</div>
                <div
                    v-for="comment in comments"
                    :id="comment.id"
                    class="flexbox"
                    style="justify-content: space-around;width:100%"
                >
                    <div style="width:20%">{{ comment.user }}</div>
                    <div style="width:60%">{{ comment.text }}</div>
                    <div style="width:20%">{{ new Date(comment.date_add).toLocaleString() }}</div>
                </div>
            </fieldset>
        </div>
    </div>
    <Teleport to="body">
        <AddComment
            :show="showAddComment"
            :user="vuexStore.getters.user.id"
            :product="(productData.id as number)"
            @close="showAddComment = false"
            @add-success="getCommentsFromServer()"
        />
    </Teleport>
</template>

<style scoped lang="scss">
@import '@/style.scss';

.product {
    @include content;
    text-align: center;

    .button-block {
        height: 20px;
        font-size: 12px;
        margin: 20px 0px;
    }

    fieldset {
        margin: 0px 80px 20px 80px;
        border: 1px solid gainsboro;
    }
}
</style>
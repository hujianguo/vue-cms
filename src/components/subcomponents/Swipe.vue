<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" :class="{full:isFull}"/>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props: ['lunbotuList', 'isFull']
    }
</script>

<style scoped lang="scss">
    .mint-swipe {
        height: 200px;
        .mint-swipe-item {
            text-align: center;

            img {
                height: 100%;
            }

            .full {
                width: 100%;
            }
        }
    }


</style>
<template>
    <div class="goodsDesc-container">
        <h3 class="title">{{goodsDesc.title}}</h3>
        <hr/>
        <div class="content" v-html="goodsDesc.content"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
                goodsDesc: {}
            }
        },
        created() {
            this.getGoodsDesc()
        },
        methods: {
            getGoodsDesc() {
                this.$http.get('vue-cms/getGoodsDesc/' + this.id).then(response => {
                    let data = response.data
                    if (data.status === '0') {
                        this.goodsDesc = data.message
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .goodsDesc-container {
        padding: 4px;
        h3 {
            font-size: 16px;
            color: #226aff;
            text-align: center;
            margin: 15px 0;
        }
        .content {
            img {
                width: 100%;
            }
        }
    }
</style>
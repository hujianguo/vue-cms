<template>
    <div class="goods-list">

        <div class="goods-item" v-for="item in list" :key="item.id" @click="goodsInfo(item.id)">
            <img :src="item.img_url" alt=""/>
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">更多评论</mt-button>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageIndex: 1,
                pageCount: 0,
                list: []
            }
        },
        created() {
            this.getGoodsList()
        },
        methods: {
            getGoodsList() {
                this.$http.get('vue-cms/getGoodsList?pageIndex=' + this.pageIndex).then(response => {
                    let data = response.data
                    if (data.status === '0') {
                        this.list = this.list.concat(data.message)
                        this.pageCount = data.pageCount
                    }
                })
            },
            getMore() {
                if (this.pageIndex < this.pageCount) {
                    this.pageIndex++
                    this.getGoodsList()
                } else {
                    this.$toast({
                        message: '已到最后一页',
                        position: 'middle',
                        duration: 3000,
                        iconClass: 'glyphicon glyphicon-remove'
                    })
                }
            },
            goodsInfo(id) {
                this.$router.push('/home/goodsInfo/' + id)
            }
        }
    }
</script>

<style scoped lang="scss">
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 7px;
        .goods-item {
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img {
                width: 100%;
            }

            .title {
                font-size: 14px;
            }

            .info {
                background-color: #eee;
                p {
                    margin: 0;
                    padding: 5px;
                }
                .price {
                    .now {
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }

                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                }
            }

        }
    }
</style>
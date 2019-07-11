<template>
    <div class="shopCart-container">
        <div class="goods-list">
            <div class="mui-card" v-for="(item,index) in goodsList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="mapProp.get(item.id).selected"
                                   @change="selectedChange(item.id,mapProp.get(item.id).selected)"></mt-switch>
                        <img :src="item.img_url"/>
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="mapProp.get(item.id).count" :goodsid="item.id"
                                        @updateGoodsInfo="updateGoodsInfo"></numbox>
                                <a href="#" @click.prevent="remove(item.id,index)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">

                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{mapTotal.get('sum')}}</span> 件， 总价 <span class="red">￥{{mapTotal.get('total')}}</span>
                        </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import numbox from "../subcomponents/shopcar_numbox.vue"
    import {mapGetters, mapActions} from 'vuex'
    import {REMOVECAR, UPDATECAR} from '../../store/car/types.js'

    export default {
        data() {
            return {
                goodsList: []
            }
        },
        computed: {
            ...mapGetters('car', ['ids', 'mapProp', 'mapTotal'])
        },
        created() {
            this.getGoodsList()
        },
        methods: {
            ...mapActions('car', [REMOVECAR, UPDATECAR]),
            getGoodsList() {
                if (this.ids === '') {
                    return;
                }
                this.$http('vue-cms/getShopCarList/' + this.ids).then(response => {
                    let data = response.data
                    if (data.status === '0') {
                        this.goodsList = data.message
                    }
                })
            },
            selectedChange(id, selected) {
                this[UPDATECAR]({id, selected})
            },
            remove(id, index) {
                this[REMOVECAR]({id, index})
                this.goodsList.splice(index, 1)
            },
            updateGoodsInfo(id, count) {
                this[UPDATECAR]({id, count})
            }
        },
        components: {
            numbox
        }
    }
</script>

<style scoped lang="scss">
    .shopCart-container {
        background-color: #eee;
        overflow: hidden;

        .goods-list {
            .mui-card-content-inner {
                display: flex;
                align-items: center;
            }
            img {
                width: 60px;
                height: 60px;
            }
            h1 {
                font-size: 13px;
            }
            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 5px;
                .price {
                    color: red;
                    font-weight: bold;
                }
            }
        }
        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>
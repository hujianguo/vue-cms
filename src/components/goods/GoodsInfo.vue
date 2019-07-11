<template>
    <div class="goodsInfo-container">

        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swipe :lunbotuList="lunbotuList" :isFull=false></swipe>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    市场价：
                    <del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：<span
                        class="now_price">￥{{goodsInfo.sell_price}}</span>
                    <p>购买数量：
                        <numbox :max="goodsInfo.stock_quantity" @getcount="getcount"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import swipe from '../subcomponents/Swipe.vue'
    import numbox from "../subcomponents/Numbox.vue"
    import {mapActions} from 'vuex'
    import {ADD2CAR} from '../../store/car/types.js'

    export default {
        data() {
            return {
                id: this.$route.params.id,
                lunbotuList: [],
                goodsInfo: {},
                ballFlag: false,
                selectedCount: 1
            }
        },
        created() {
            this.getLunbotu()
            this.getGoodsInfo()
        },
        methods: {
            ...mapActions('car',[ADD2CAR]),
            getLunbotu() {
                this.$http.get('vue-cms/getThumbs/' + this.id).then(response => {
                    let data = response.data
                    if (data.status === '0') {
                        data.message.forEach(item => {
                            item.img = item.src
                        })
                        this.lunbotuList = data.message
                    }
                })
            },
            getGoodsInfo() {
                this.$http.get('vue-cms/getGoodsInfo/' + this.id).then(response => {
                    let data = response.data
                    if (data.status === '0') {
                        this.goodsInfo = data.message
                    }
                })
            },
            goDesc(id) {
                this.$router.push({name: 'goodsDesc', params: {id}})
            },
            goComment(id) {
                this.$router.push({name: 'goodsComment', params: {id}})
            },
            getcount(current) {
                this.selectedCount = current
            },
            addToShopCar() {
                this.ballFlag = !this.ballFlag

                let car = {id:this.id,count:this.selectedCount,price:this.goodsInfo.sell_price,selected:true}
                this[ADD2CAR](car)

            },
            beforeEnter(el) {
                el.style.transform = "translate(0,0)"
            },
            enter(el, done) {
                el.offsetWidth

                // 获取小球的 在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                // 获取 徽标 在页面中的位置
                const badgePosition = document.getElementById("badge").getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.style.transform = `translate(${xDist}px,${yDist}px)`
                el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)"
                done()
            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag
            }
        },
        components: {
            swipe, numbox
        }
    }
</script>

<style scoped lang="scss">
    .goodsInfo-container {
        background: #eee;
        overflow: hidden;

        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }

        .mui-card-footer {
            display: block;
            button {
                margin: 15px 0;
            }
        }

        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 383px;
            left: 150px;
            //  transform: translate(88px,427px);
        }

    }

</style>
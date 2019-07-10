<template>
    <div>

        <swipe :lunbotuList="lunbotuList" :isFull=true></swipe>


        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newsList">
                    <img src="../../images/menu1.png"/>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photoList">
                    <img src="../../images/menu2.png"/>
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodsList">
                    <img src="../../images/menu3.png"/>
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu4.png"/>
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu5.png"/>
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu6.png"/>
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import swipe from '../subcomponents/Swipe.vue'

    export default {
        data() {
            return {
                lunbotuList: []
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.$http.get("vue-cms/getLunbotu").then((response) => {
                    let data = response.data
                    if (data.status === '0') {
                        this.lunbotuList = data.message
                    } else {
                        Toast({
                            message: '加载失败',
                            position: 'middle',
                            duration: 3000,
                            iconClass: 'glyphicon glyphicon-remove'
                        })
                    }
                })
            }
        },
        components:{
            swipe
        }
    }
</script>

<style scoped lang="scss">


    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        img {
            width: 60px;
        }

        .mui-media-body{
            font-size: 13px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
    }

</style>
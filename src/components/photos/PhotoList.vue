<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id===0?'mui-active':'']" v-for="item in cates"
                       :key="item.id" @tap="getCateImage(item.id)">
                        {{item.title}}
                    </a>

                </div>
            </div>
        </div>

        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.index" tag="li" :to="'/home/photoInfo/' + item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.content }}</div>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'

    export default {
        data() {
            return {
                cates: [],
                list: []
            }
        },
        created() {
            this.getCategory()
            this.getCateImage(0)
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            })
        },
        methods: {
            getCategory() {
                this.$http.get('vue-cms/getCategory').then(response => {
                    let data = response.data
                    if (data.status === '0') {
                        data.message.unshift({id: 0, title: '全部'})
                        this.cates = data.message
                    }
                })
            },
            getCateImage(id) {
                this.$http.get('vue-cms/getImages/' + id).then(response => {
                    let data = response.data
                    if (data.status === '0') {
                        this.list = data.message
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    * {
        touch-action: pan-y;
    }

    .photo-list {
        list-style: none;
        padding: 10px;
        margin: 0;
        padding-bottom: 0;

        li {
            background: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;

            img {
                width: 100%;
            }

            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info {
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                }
            }
        }
    }


</style>
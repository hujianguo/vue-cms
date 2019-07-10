<template>
    <div class="photoInfo-container">
        <h3>{{photoInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoInfo.add_time|dateFormat}}</span>
            <span>点击：{{photoInfo.click}}次</span>
        </p>
        <hr>
        <div class="thumbs clearfix">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>

        <div class="content" v-html="photoInfo.content"></div>

        <comment :id="id"></comment>

    </div>
</template>

<script>
    import comment from '../subcomponents/Comment.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id,
                photoInfo: {},
                slide1: []
            }
        },
        created() {
            this.getPhotoInfo()
            this.getThumbs()
        },
        methods: {
            getPhotoInfo() {
                this.$http.get('vue-cms/getImageInfo/' + this.id).then(response => {
                    let data = response.data
                    if (data.status === '0') {
                        this.photoInfo = data.message
                    }
                })
            },
            getThumbs() {
                this.$http.get('vue-cms/getThumbs/' + this.id).then(response => {
                    let data = response.data
                    if (data.status === '0') {
                        data.message.forEach((item, index) => {
                            item.alt = 'picture' + index
                            item.title = 'Image Caption ' + index
                            item.w = 600
                            item.h = 400
                        })

                        this.slide1 = data.message
                    }
                })
            },
            handleClose() {

            }
        },
        components: {
            comment
        }
    }
</script>

<style lang="scss">
    .photoInfo-container {
        padding: 3px;
        h3 {
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }

        .content {
            font-size: 13px;
            line-height: 30px;
        }

        .thumbs {
            figure {
                float: left;
            }
            img {
                margin: 10px;
                box-shadow: 0 0 8px #999;
                width: 100px;
            }
        }

        .clearfix:before,.clearfix:after {
            display: table;
            clear: both;
        }

        .clearfix{
            zoom: 1;
        }
    }
</style>
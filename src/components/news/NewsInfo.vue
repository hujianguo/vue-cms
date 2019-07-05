<template>
    <div class="newsInfo-container">
        <h3 class="title">{{newsInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{newsInfo.addTime | dateFormat}}</span>
            <span>点击:{{newsInfo.click}}次</span>
        </p>
        <hr/>
        <div class="newsInfo-content" v-html="newsInfo.content">

        </div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import comment from '../subcomponents/Comment.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id,
                newsInfo: {}
            }
        },
        created() {
            this.getNewsInfo()
        },
        methods: {
            getNewsInfo() {
                this.$http.get('vue-cms/getNewsInfo/' + this.id).then(response => {
                    let data = response.data
                    if (data.status === '0') {
                        this.newsInfo = data.message
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
        components: {
            comment
        }
    }

</script>

<style lang="scss">
    .newsInfo-container {
        padding: 0 4px;
        .title {
            font-size: 16px;
            text-align: center;
            color: red;
            margin: 15px auto;
        }

        .subtitle {
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }

        .newsInfo-content {
            img {
                width: 100%;
            }
        }
    }
</style>
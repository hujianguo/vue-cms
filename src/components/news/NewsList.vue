<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsInfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间:{{item.add_time | dateFormat }}</span>
                            <span>点击:{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>

        </ul>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                newsList: []
            }
        },
        created() {
            this.getNewsList()
        },
        methods: {
            getNewsList() {
                this.$http.get('vue-cms/getNewsList').then(response => {
                    let data = response.data
                    if (data.status === '0') {
                        this.newsList = data.message
                    } else {
                        this.$toast({
                            message: '加载失败',
                            position: 'middle',
                            duration: 3000,
                            iconClass: 'glyphicon glyphicon-remove'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .mui-table-view {
        li {
            h1 {
                font-size: 14px;
            }
            .mui-ellipsis {
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
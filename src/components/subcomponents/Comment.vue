<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr/>
        <textarea v-model="content" placeholder="请发表评论(最多120字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,index) in comments" :key="index">
                <div class="cmt-title">
                    第{{index+1}}--{{item.id}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发布时间:{{item.add_time|dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">更多评论</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        data() {
            return {
                pageIndex: 1,
                comments: [],
                content: '',
                pageCount: 0
            }
        },
        created() {
            this.getComment()
        },
        methods: {
            getComment() {
                this.$http.get('vue-cms/getComment/' + this.id + '?pageIndex=' + this.pageIndex).then(response => {
                    let data = response.data
                    if (data.status === '0') {
                        this.comments = this.comments.concat(data.message)
                        // 去重
                        this.comments = this.distinct(this.comments)

                        this.pageCount = data.pageCount
                    } else {
                        Toast({
                            message: '加载失败',
                            position: 'middle',
                            duration: 3000,
                            iconClass: 'glyphicon glyphicon-remove'
                        })
                    }
                })
            },
            getMore() {
                if (this.pageIndex < this.pageCount) {
                    this.pageIndex++
                    this.getComment()
                } else {
                    Toast({
                        message: '已到最后一页',
                        position: 'middle',
                        duration: 3000,
                        iconClass: 'glyphicon glyphicon-remove'
                    })
                }
            },
            addComment() {
                let content = this.content.trim()
                if (content === '') {
                    return Toast({
                        message: '评论不能为空',
                        position: 'middle',
                        duration: 3000,
                        iconClass: 'glyphicon glyphicon-remove'
                    })
                }

                this.$http.post('vue-cms/addComment/' + this.id + '?content=' + content)
                    .then(response => {
                        let data = response.data
                        if (data.status === '0') {
                            this.content = ''
                            this.comments.unshift(data.message)
                        }
                    })
            },
            distinct(arr) {
                let result = []
                let obj = {}

                for (let i of arr) {
                    if (!obj[i.id]) {
                        result.push(i)
                        obj[i.id] = 1
                    }
                }

                return result
            }

        },
        props: ['id']
    }
</script>

<style scoped lang="scss">
    .cmt-container {
        h3 {
            font-size: 18px;
        }

        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }

        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                .cmt-title {
                    line-height: 30px;
                    background-color: #ccc;
                }
                .cmt-body {
                    line-height: 35px;
                    text-indent: 2em;
                }

            }
        }
    }
</style>
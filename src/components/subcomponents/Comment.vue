<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr/>
        <textarea placeholder="请发表评论(最多120字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-title">
                    第1楼&nbsp;&nbsp;用户:&nbsp;&nbsp;发布时间:2019-07-04 17:00:42
                </div>
                <div class="cmt-body">
                    锄禾日当午
                </div>
            </div>
            <div class="cmt-item">
                <div class="cmt-title">
                    锄禾&nbsp;&nbsp;发布时间:2019-07-04 17:00:42
                </div>
                <div class="cmt-body">
                    锄禾日当午
                </div>
            </div>
            <div class="cmt-item">
                <div class="cmt-title">
                    锄禾&nbsp;&nbsp;发布时间:2019-07-04 17:00:42
                </div>
                <div class="cmt-body">
                    锄禾日当午
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain>更多评论</mt-button>
    </div>
</template>

<script>

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
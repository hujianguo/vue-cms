<template>
    <div class="app-container">
        <mt-header fixed title="vue项目">
            <span slot="left" @click="goBack" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>

        <transition model="out-in">
            <router-view></router-view>
        </transition>

        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-llb" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/shop-cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id="badge">{{allCount}}</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-llb" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                flag: false
            }
        },
        created() {
            this.flag = this.$route.path === '/home' ? false : true
        },
        computed: {
            ...mapGetters('car', ['allCount'])
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            }
        },
        watch: {
            "$route.path": function (newVal) {
                if (newVal === '/home') {
                    this.flag = false
                } else {
                    this.flag = true
                }
            }
        }
    }

</script>

<style scoped lang="scss">
    .app-container {
        padding-top: 40px;
        padding-bottom: 50px;
        overflow-x: hidden;
    }

    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }

    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }

    // 该类名，解决 tabbar 点击无法切换的问题
    .mui-bar-tab .mui-tab-item-llb.mui-active {
        color: #007aff;
    }

    .mui-bar-tab .mui-tab-item-llb {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>
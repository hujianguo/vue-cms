import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

// 启用路由
Vue.use(VueRouter)
// 启用axios
Vue.use(VueAxios, axios)
// axios全局设置
axios.defaults.baseURL = 'http://localhost:8080/'

// vue过滤器
Vue.filter('dataFormat', (data, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(data).format(pattern)
})

// 按需导入mint-ui组件
import {Header, Swipe, SwipeItem,Button} from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

// 导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import 'bootstrap/dist/css/bootstrap.min.css'

// 导入router
import router from './router.js'
// 导入启动页
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})
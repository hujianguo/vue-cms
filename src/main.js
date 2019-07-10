import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import MintUI from 'mint-ui'
import VuePreview from 'vue-preview'
import qs from 'qs'

// 启用路由
Vue.use(VueRouter)
// 启用axios
Vue.use(VueAxios, axios)
// axios全局设置
axios.defaults.baseURL = 'http://localhost:8080/'
axios.defaults.headers = {
    'Content-type': 'application/x-www-form-urlencoded'
}
// axios请求拦截器
axios.interceptors.request.use(
(config) => {
    if (config.method === 'post') {
        console.log(config)
        config.data = qs.stringify(config.data)
    }
    return config
}, function (err) {
    return Promise.reject(err);
});


// vue过滤器
Vue.filter('dateFormat', (data, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(data).format(pattern)
})


// 导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// 导入bootstrap样式
import 'bootstrap/dist/css/bootstrap.min.css'
// 导入mint-ui样式
import 'mint-ui/lib/style.css'

// 导入mint-ui组件
Vue.use(MintUI)
// 使用图片缩略图组件
Vue.use(VuePreview)


// 导入router
import router from './router.js'
// 导入启动页
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})
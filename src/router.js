import VueRouter from 'vue-router'

import home from './components/tabbar/Home.vue'
import member from './components/tabbar/Member.vue'
import shopCart from './components/tabbar/ShopCart.vue'
import search from './components/tabbar/Search.vue'
import newsList from './components/news/NewsList.vue'
import newsInfo from './components/news/NewsInfo.vue'

var router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: home},
        {path: '/member', component: member},
        {path: '/shop-cart', component: shopCart},
        {path: '/search', component: search},
        {path: '/home/newsList', component: newsList},
        {path: '/home/newsInfo/:id', component: newsInfo},
    ],
    linkActiveClass: 'mui-active'
})

export default router

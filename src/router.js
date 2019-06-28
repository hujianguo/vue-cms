import VueRouter from 'vue-router'

import home from './components/tabbar/Home.vue'
import member from './components/tabbar/Member.vue'
import shopCart from './components/tabbar/ShopCart.vue'
import search from './components/tabbar/Search.vue'

var router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: home},
        {path: '/member', component: member},
        {path: '/shop-cart', component: shopCart},
        {path: '/search', component: search},
    ],
    linkActiveClass: 'mui-active'
})

export default router

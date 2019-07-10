import VueRouter from 'vue-router'

import home from './components/tabbar/Home.vue'
import member from './components/tabbar/Member.vue'
import shopCart from './components/tabbar/ShopCart.vue'
import search from './components/tabbar/Search.vue'
import newsList from './components/news/NewsList.vue'
import newsInfo from './components/news/NewsInfo.vue'
import photoList from './components/photos/PhotoList.vue'
import photoInfo from './components/photos/PhotoInfo.vue'
import goodsList from './components/goods/GoodsList.vue'
import goodsInfo from './components/goods/GoodsInfo.vue'
import goodsDesc from './components/goods/GoodsDesc.vue'
import goodsComment from './components/goods/GoodsComment.vue'

var router = new VueRouter({
    routes: [
        {path: '/', redirect: '/home'},
        {path: '/home', component: home},
        {path: '/member', component: member},
        {path: '/shop-cart', component: shopCart},
        {path: '/search', component: search},
        {path: '/home/newsList', component: newsList},
        {path: '/home/newsInfo/:id', component: newsInfo},
        {path: '/home/photoList', component: photoList},
        {path: '/home/photoInfo/:id', component: photoInfo},
        {path: '/home/goodsList', component: goodsList},
        {path: '/home/goodsInfo/:id', component: goodsInfo},
        {path: '/home/goodsDesc/:id', component: goodsDesc, name: 'goodsDesc'},
        {path: '/home/goodsComment/:id', component: goodsComment, name: 'goodsComment'}
    ],
    linkActiveClass: 'mui-active'
})

export default router

import VueRouter from 'vue-router'

//引入自己的路由组件
import homeContainer from './components/tabbar/homeContainer.vue'
import memberContainer from './components/tabbar/memberContainer.vue'
import shoppingContainer from './components/tabbar/shoppingContainer.vue'
import searchContainer from './components/tabbar/searchContainer.vue'

//引进新闻列表资讯路由组件
import newsListContainer from './components/news/newsListContainer.vue'

//引进新闻详情咨询组件
import newsInfoContainer from './components/news/newsInfoContainer.vue'

//引进图片分享路由组件
import photosContainer from './components/photos/photosContainer.vue'

//引进图片详情路由组件
import photoInfo from './components/photos/photoInfo.vue'

//引进商品列表组件
import goodsList from './components/goods/goodsList.vue'

//引进商品详情组件
import goodsInfo from './components/goods/goodsInfo.vue'

//引进商品描述组件
import goodsDesc from './components/goods/goodsDesc.vue'

//引进商品评论组件
import goodsComment from './components/goods/goodsComment.vue'


//创建路由规则
var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: homeContainer },
        { path: '/member', component: memberContainer },
        { path: '/shopping', component: shoppingContainer },
        { path: '/search', component: searchContainer },
        { path: '/home/newslist', component: newsListContainer },
        { path: '/home/newsinfo/:id', component: newsInfoContainer },
        { path: '/home/photoslist', component: photosContainer },
        { path: '/home/photoinfo/:id', component: photoInfo },
        { path: '/home/goodslist', component: goodsList },
        { path: '/home/goodslist/:id', component: goodsInfo },
        { path: '/home/goodsdesc/:id', component: goodsDesc, name: 'goods_desc' },
        { path: '/home/goodscomment/:id', component: goodsComment, name: 'goods_comment' }
    ],
    linkActiveClass: 'mui-active' //覆盖路由默认的高亮的router-link-exact-active类
})

export default router
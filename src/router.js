import VueRouter from 'vue-router'
//引入自己的路由组件
import homeContainer from './components/tabbar/homeContainer.vue'
import memberContainer from './components/tabbar/memberContainer.vue'
import shoppingContainer from './components/tabbar/shoppingContainer.vue'
import searchContainer from './components/tabbar/searchContainer.vue'
//创建路由规则
var router = new VueRouter({
    routes: [
        { path: '/home', component: homeContainer },
        { path: '/member', component: memberContainer },
        { path: '/shopping', component: shoppingContainer },
        { path: '/search', component: searchContainer }
    ],
    linkActiveClass: 'mui-active' //覆盖路由默认的高亮的router-link-exact-active类
})

export default router
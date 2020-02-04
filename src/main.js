import Vue from 'vue'

import app from './App.vue'

//导入格式化时间插件
import moment from 'moment'
//定义全局时间过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
});
//引进Mint-UI组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

//引进ViewPreview组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//1.1 引进VueRouter
import VueRouter from 'vue-router';
//1.2 安装路由
Vue.use(VueRouter);
//1.3 导入自己的router.js文件
import router from './router.js'
//2.1引进VueResource组件
import VueResource from 'vue-resource'
//2.2安装VueResource
Vue.use(VueResource)
    //全局配置emulateJSON选项
Vue.http.options.emulateJSON = true
Vue.http.options.root = 'http://vue.studyit.io'
    //引进Mui组件
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'
//引进Vuex组件
import Vuex from 'vuex'
Vue.use(Vuex)
    //创建store对象
    //每次进入网站,肯定会调用main.js,需要调用本地存储显示car的值
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        getCarCount(state, goodsinfo) {
            var flag = false
            state.car.some(item => {
                if (item.id == parseInt(goodsinfo.id)) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            if (!flag) {
                state.car.push(goodsinfo);
            }
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateCarCount(state, goodsinfo) {
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateCarListSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += parseInt(item.count)
            })
            return c;
        },
        getCarCount(state) {
            var b = {}
            state.car.forEach(item => {
                b[item.id] = item.count
            })
            return b
        },
        getCarListSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getCarCountAndPrice(state) {
            var o = {
                count: 0,
                price: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.price += item.count * item.price
                    o.price = Math.floor(o.price * 100) / 100
                }
            })
            return o
        }
    }
})

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    //1.4 挂载路由对象到vm实例上
    router,
    store
})
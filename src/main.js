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

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    //1.4 挂载路由对象到vm实例上
    router
})
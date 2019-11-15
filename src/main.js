import Vue from 'vue'

import app from './App.vue'
//引进Mint-UI组件
import { Header } from 'mint-ui';

Vue.component(Header.name, Header);
//引进Mui组件
import './lib/mui/css/mui.min.css'

var vm = new Vue({
    el: '#app',
    render: c => c(app)
})
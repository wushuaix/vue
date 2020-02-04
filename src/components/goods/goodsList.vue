<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h4 class="title">{{item.title}}</h4>
            <div class="info">
                <p class="price">                   
                    <span class="new">¥{{item.sell_price}}</span>
                    <span class="old">¥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>            
        </div>
        <mt-button type="danger" size="large">加载更多</mt-button>
    </div>
</template>
<script>
import path from "path";
import { Toast } from "mint-ui";
export default {
    data(){
        return{
            //data是往自己的组件内部，挂载一些私有数据的
            goodslist:[]
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            //获取商品列表
            this.$http
                .get(path.join(__dirname, "src/datajson/goodslists/goodslist.json"))
                .then(result => {
                    if (result.body.status === 0) {
                        this.goodslist = result.body.message;
                    } else {
                        Toast("新闻列表加载失败！");
                    }
                });
        },
        goDetail(id){
            //使用JS的形式进行路由导航

            //注意，一定要区分this.$route和this.$router这两个对象
            //this.$route是路由参数对象，所有的路由参数，params，query都属于它
            //this.$router是一个路由[导航对象],用它可以方便的使用JS代码,实现路由的前进/后退/跳转到新的URL地址
            this.$router.push({path:'/home/goodslist/'+id})

        }

    }
}
</script>
<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 7px;
    .goods-item{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 328px;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        width:49%;
        .title{
            font-size: 14px;
            line-height: 20px;
            padding:0 5px
        }
        .info{
            background-color: #eee;
            p{
                padding:5px;
                margin: 0px;
            }
           
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px
            }
            .price{
                font-size: 16px;
                .new{
                    color: red;
                };
                .old{
                    text-decoration: line-through;
                    margin-left: 14px
                }
            }
        }
    }
        
    img{
        width:100%
    }
} 
</style>
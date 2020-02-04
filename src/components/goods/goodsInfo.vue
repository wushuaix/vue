<template>
  <div class="goodsinfo-container">
    <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
    >
        <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>    
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <swiper :lunbotuList="lunBoList" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{infoList.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p class="price">
                市场价: <del>¥{{infoList.market_price}}</del>&nbsp;&nbsp;销售价: <span class="now">¥{{infoList.sell_price}}</span>
            </p>
            <p>购买数量: 
                <numberbox @getcount="getSelectedCount" :max="infoList.stock_quantity"></numberbox>
            </p>
            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
            </p>            
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p>商品货号: {{infoList.goods_no}}</p>
            <p>库存情况: {{infoList.stock_quantity}}件</p>
            <p>上架时间: {{infoList.add_time}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
          <mt-button type="primary" size="large" plain @click="goodsDesc(id)">图文详情</mt-button>
          <mt-button type="danger" size="large" plain @click="goodsComment(id)">商品评价</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import path from "path";
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue";
import numberbox from "../subcomponents/goodsinfo_numbox.vue"
export default {
    data(){
        return{
            lunBoList:[],
            id:this.$route.params.id,
            infoList:{},
            ballFlag:false,
            selectedCount:1
        }
    },
    created(){
        this.getLunBo()
        this. getInfo()
    },
    destoryed(){
        window.removeEventListener("before-enter");
        window.removeEventListener("enter");
        window.removeEventListener("after-enter");
    },

    methods:{
        getLunBo(){
            this.$http
           .get(path.join(__dirname, "src/datajson/goodslists/goodslunbo_"+this.id+".json"))
           .then(result => {
                if (result.body.status === 0) {
                    result.body.message.forEach(item=>{
                        item.img=item.src
                    })
                    this.lunBoList = result.body.message;
                } else {
                    Toast("商品图片列表加载失败！");
                }
            });
        },
        getInfo(){
            this.$http
           .get(path.join(__dirname, "src/datajson/goodslists/goodsinfo_"+this.id+".json"))
           .then(result => {
                if (result.body.status === 0) {
                    this.infoList = result.body.message;
                } else {
                    Toast("商品详情加载失败！");
                }
            });
        },
        goodsDesc(id){
            this.$router.push({name:"goods_desc",params:{id}})
        },
        goodsComment(id){
            this.$router.push({name:"goods_comment",params:{id}})
        },
        addToCar(){
            this.ballFlag=!this.ballFlag;
            var goodsinfo={
                id:this.id,
                count:this.selectedCount,
                price:this.infoList.sell_price,
                selected:true
            };
            this.$store.commit("getCarCount",goodsinfo)
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,done){
            //getBoundingClientRect()用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。 
            //getBoundingClientRect()是DOM元素到浏览器可视范围的距离（不包含文档卷起的部分）。
            //该函数返回一个Object对象，该对象有6个属性：top,lef,right,bottom,width,height；  
            el.offsetWidth;
            const ballPosition=this.$refs.ball.getBoundingClientRect();
            const badgePosition=document.getElementById("shoppingCar").getBoundingClientRect();
            const xDist=badgePosition.left-ballPosition.left;
            const yDist=badgePosition.top-ballPosition.top;
            el.style.transform=`translate(${xDist}px,${yDist}px)`;
            el.style.transition="all 0.5s cubic-bezier(0.75, 0.25, 0.22, 0.78)";
            done()
        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag
        },
        getSelectedCount(data){
            this.selectedCount=parseInt(data);
        }
        
    },
    components:{
        swiper,
        numberbox
    }    
};
</script>
<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position:absolute;
        left: 141px;
        top:408px;
        z-index: 99;
    }
    .now{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
}
.mui-card-footer{
    display: block;
    button{
        margin: 10px 0
    }
}
</style>
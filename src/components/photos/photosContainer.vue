<template>
  <div>
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator
       mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id===0?'mui-active':'']" 
           v-for="item in category" :key="item.id" @tap="getPhotoListById(item.id)">{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
        <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
            <img v-lazy="item.img_url">
            <div class="info">
              <div class="info-title">{{item.title}}</div>
              <div class="info-body">{{item.zhaiyao}}</div>
            </div>
        </router-link>        
    </ul>
  </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
import {Toast} from 'mint-ui';
export default {
    data(){
        return{
             category:[],
             list:[]
        }       
    },
    created(){
        this.getCategory(),
        this.getPhotoListById(0)
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getCategory() {this.$http.get("/src/datajson/imgshare/imgshare_cate.json")
        .then(result => {
          if (result.body.status === 0) {
            this.category=result.body.message;
          } else {
            Toast("图片分类列表加载失败");
          }
        });
    },
        getPhotoListById(id){this.$http.get("/src/datajson/imgshare/image_share_"+id+".json")
        .then(result => {
          if (result.body.status == 0) {
            this.list=result.body.message
          } else {
            Toast("图片列表加载失败");
          }
        });
            
        }
    }
};
</script>
<style lang="scss" scoped>
*{
    touch-action: pan-y
}
.photo-list{
    margin:0;
    padding: 10px;
    padding-bottom: 0;
    padding-top: 5px;
    li{
      position: relative;
      
      background-color: #ccc;
      text-align: center;
      list-style: none;
      margin-bottom: 10px;
      box-shadow: 0 0 9px #999
    }    
    img[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
    }
    img{
      width:100%;
      vertical-align: middle;
    }
.info{
  color:white;
  text-align: left;
  position: absolute;
  bottom: 0;
  max-height: 82px;
  background-color:rgba(0,0,0,0.4);
  .info-title{
    font-size: 13px
  }
  .info-body{
    font-size: 12px
  }
}
  
}
</style>
<template>
    <div>
        <div class="info-title">
            <h3>{{infolist.title}}</h3>
            <div class="info-subtitle">
                <span>发表时间:{{infolist.add_time}}</span>
                <span>点击次数:{{infolist.click}}</span>
            </div>
        </div>

        <hr/>
        <div class="thumbs">
            <!-- 放置图片详情预览区   -->
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>
        <div class="content">{{infolist.zhaiyao}}</div>
        <cmt-box :id="id"></cmt-box>
        
    </div>
</template>
<script>
import {Toast} from 'mint-ui';
import comment from '../subcomponents/comment.vue'
export default {
   data(){
       return{
           id:this.$route.params.id,
           infolist:{},
           slide1:[]
       }
   },
   created(){
       this.getPhotoInfo(),
       this.getSlide1()
   },
   methods:{
       getPhotoInfo(){
        this.$http.get("/src/datajson/photoinfo/photoinfo_"+this.id+".json")
        .then(result => {
          if (result.body.status === 0) {
            this.infolist=result.body.message[0];
          } else {
            Toast("图片详情加载失败");
          }
        });
       },
       handleClose () {
        console.log('close event')
      },
      getSlide1(){
          this.$http.get("/src/datajson/imgshare/imagelist_"+this.id+".json")
        .then(result => {
          if (result.body.status === 0) {
            this.slide1=result.body.message;
          } else {
            Toast("图片列表加载失败");
          }
        });
      }
   },
   components:{
       'cmt-box':comment
   }
}
</script>
<style lang="scss">
.info-title{
    padding: 3px;
    h3{
        font-size: 15px;
        margin:15px 0;
        text-align: center;
        color:#26a2FF;
    }
    .info-subtitle{        
        margin: 5px;
        font-size:13px;
        display: flex;
        justify-content: space-between;
        
    }
    
} 
.content{
        line-height: 30px;
        font-size: 13px;
        padding: 6px;
        text-indent: 2em
    } 
.thumbs {
    .my-gallery {
        text-align:justify;   
        align-items: end;     
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        figure {
            width: 30%;
            margin:6px;
            img {
                width: 100%;
                height:22vw
            }
        }
    }
}
</style>
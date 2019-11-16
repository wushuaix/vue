<template>
    <div class="newsInfo-container"> 
       <h3 class="title">{{newsinfo[id-1].title}}</h3>
       <p class="subtitle">
            <span>发表时间：{{newsinfo[id-1].add_time | dateFormat}}</span>
            <span>点击次数：{{newsinfo[id-1].click}}</span>
        </p>

        <hr>

        <div class="content"></div>
    </div>
</template>    

<script>
import path from "path";
import { Toast } from "mint-ui";
export default {
    data(){
        return{
            id:this.$route.params.id,
            newsinfo:[]
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
        this.$http.get(`${path.join(__dirname, "src/datajson/newsinfo.json")}`)
        .then(result => {
          if (result.body.status === 0) {
            this.newsinfo = result.body.message;
          } else {
            Toast("新闻列表加载失败！");
          }
        });
        }
    }
};
</script>

<style lang="scss">
 .newsInfo-container{
     .title{
         font-size: 16px;
         margin: 10px;
         text-align: center;
         color: red
     }
     .subtitle{
         color:#226aff;
         display: flex;
         justify-content: space-between;
     }
     .content{
         img{
             width:100%
         }
     }
 }   
</style>
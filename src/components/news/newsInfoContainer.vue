<template>
  <div class="newsInfo-container">
    <h3 class="title">{{newsinfo[id-1]?newsinfo[id-1].title:''}}</h3>
    <p class="subtitle">
      <span>发表时间：{{newsinfo[id-1]?(newsinfo[id-1].add_time):''}}</span>
      <span>点击次数：{{newsinfo[id-1]?newsinfo[id-1].click:''}}</span>
    </p>

    <hr />

    <div v-html='content' class="content"></div>
    <comment-box :id="this.id"></comment-box>
    
  </div>
</template>    

<script>
import path from "path";
import { Toast } from "mint-ui";
import comment from '../subcomponents/comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: [],
      content:"",
      title:""
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http
        .get(`${path.join(__dirname, "src/datajson/newsinfo.json")}`)
        .then(result => {
          if (result.body.status === 0) {
            this.newsinfo = result.body.message;
          } else {
            Toast("新闻列表加载失败！");
          };        
        });
      this.$http.get(path.join(__dirname, "src/datajson/newshtml/content_"+this.id+".html"))
        .then(result => {
          if(result){
            this.content=result.body.toString();
            }else{
              Toast("新闻加载失败")
            }                
        })
    }
  },
  components:{
    "comment-box":comment
  },
  watch:{
    'newsinfo':function(newVal,oldVal){
        return newVal
    }
  }
};
</script>

<style lang="scss">
.newsInfo-container {
  font-family: 'Times New Roman', Times, "宋体";
  .title {    
    font-size: 16px;
    margin: 10px;
    text-align: center;
    color: red;
  }
  .subtitle {
    color: #226aff;
    display: flex;
    justify-content: space-between;
    padding:3px
  }
  .content {
    padding: 10px;
    margin: 0
  }
}
</style>
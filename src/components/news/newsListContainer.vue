<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newlist" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>{{item.add_time | dateFormat}}</span>
              <span>点击:{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    
  </div>
</template>    

<script>
import path from "path";
import { Toast } from "mint-ui";
export default {
    data(){
        return{
            newlist:[]
        }
    },
    created(){
        this.getNewList()
    },
    methods:{
        getNewList(){
        this.$http.get(path.join(__dirname, "src/datajson/newslist.json"))
        .then(result => {
          if (result.body.status === 0) {
            this.newlist = result.body.message;
          } else {
            Toast("新闻列表加载失败！");
          }
        });
        }
    }
};
</script>

<style lang="scss" scoped>
.mui-table-view {
  h1 {
    font-size: 14px;
  }
  .mui-ellipsis {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    color: skyblue;
  }
}
</style>
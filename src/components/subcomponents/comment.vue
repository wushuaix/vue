<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <textarea placeholder="欢迎来吐槽，最多BB 120个字" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in commentlist" :key="item.username">
        <div
          class="cmt-title"
        >第{{i+1}}楼&nbsp;&nbsp;用户: {{item.username}}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}</div>
        <div class="cmt-body">{{item.comment}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import path from "path";
export default {
  data() {
    return {
      commentlist: [],
      pageIndex: 1,
      msg: ""
    };
  },
  created() {
    this.getCommentList();
  },
  props: ["newsid"],
  methods: {
    getCommentList() {this.$http.get(`${path.join(__dirname,"src/datajson/comment/comment_" +this.newsid +this.pageIndex +".json")}`)
        .then(result => {
          if (result.body.status === 0) {
            this.commentlist = this.commentlist.concat(result.body.message);
          } else {
            Toast("评论加载失败");
          }
        });
    },
    getMore() {
      this.pageIndex++;
      this.getCommentList();
    },
    postComment() {
      if (this.msg.trim() === 0) {
        Toast("评论内容不能为空,请输入评论");
      } else {
        var cmt={
            username:"匿名用户"+Math.floor(Math.random()*100),
            add_time:Date.now(),
            comment:this.msg
        }
        this.commentlist.unshift(cmt);
        this.msg='';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 12px;
    height: 90px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        font-size: 11px;
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
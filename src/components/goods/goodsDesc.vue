<template>
    <div class="goodsinfo-container">
        <h3>{{info.title}}</h3>
        <div class="content" v-html="content"></div>
    </div>
</template>
<script>
import path from "path";
import { Toast } from "mint-ui";
export default {
    data(){
        return{
            id:this.$route.params.id,
            info:{},
            content:""
        }
    },
    created(){
        this.getInfo()
    },
    methods: {
        getInfo(){
           this.$http
           .get(path.join(__dirname, "src/datajson/goodslists/goodstu_"+this.id+".json"))
           .then(result => {
                if (result.body.status === 0) {
                    this.info = result.body.message[0];
                } else {
                    Toast("商品详情加载失败！");
                }
            }),
           this.$http.get(path.join(__dirname, "src/datajson/goodslists/"+this.id+".html"))
            .then(result => {
            if(result){
                this.content=result.body.toString();
            }else{
                Toast("新闻加载失败")
            }                
        })
        }
    }
}
</script>
<style lang="scss" scoped>
.goodsinfo-container{
    font-size: 16px;
    color: skyblue;
    text-align: center
}
.content{
    padding:0 3px
}
</style>
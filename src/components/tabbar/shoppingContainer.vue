<template>
  <div class="shopcar-container">
    <div class="goods-list" v-for="(item,index) in  goodsCarList" :key="item.id">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getCarListSelected[item.id]"
              @change="getCarSelectedChange(item.id,$store.getters.getCarListSelected[item.id])"
            ></mt-switch>
            <img :src="item.src" alt />
            <div class="goods-info">
              <h1 class="title">{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initCount="$store.getters.getCarCount[item.id]" :id="item.id"></numbox>
                <a href @click.prevent="removeCarListById(item.id,index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="settle-accounts">
            <div class="info">
              <p>总计（不含运费）</p>
              <p>
                已勾选商品
                <span class="red">{{$store.getters.getCarCountAndPrice.count}}</span>件，总价：
                <span class="red">￥{{$store.getters.getCarCountAndPrice.price}}</span>
              </p>
            </div>
            <mt-button type="danger" size="small">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>    

<script>
import numbox from "../subcomponents/goodscar_numberbox.vue";
import path from "path";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      goodsCarList: []
    };
  },
  created() {
    this.getCarList();
  },
  methods: {
    getCarList() {
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      if (idArr.length == 0) {
        return;
      }
      for (var i = 0; i < idArr.length; i++) {
        this.$http
          .get(
            path.join(
              __dirname,
              "src/datajson/goodslists/goodsinfo_" + idArr[i] + ".json"
            )
          )
          .then(result => {
            if (result.body.status === 0) {
              this.goodsCarList.push(result.body.message);
            } else {
              Toast("购物车信息加载失败！");
            }
          });
      }
    },
    removeCarListById(id, index) {
      this.goodsCarList.splice(index, 1);
      this.$store.commit("removeFromCar", id);
    },
    getCarSelectedChange(id, val) {
      this.$store.commit("updateCarListSelected", { id, selected: val });
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      img {
        width: 20%;
        height: 20%;
      }
      .goods-info {
        min-height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: 12px;
          font-weight: 700;
          line-height: 16px;
        }
        .price {
          color: red;
          font-weight: bold;
        }
        a {
          font-size: 14px;
        }
      }
    }
  }
  .settle-accounts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
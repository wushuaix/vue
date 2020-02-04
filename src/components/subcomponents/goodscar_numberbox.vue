<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initCount" @change="getNumber" readonly ref="number_box"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    getNumber() {
      //数量改变了
      this.$store.commit("updateCarCount",{id:this.id,count:this.$refs.number_box.value})
      
    }
  },
  props: ["initCount","id"]
};
</script>
<style lang="scss" scoped>
.mui-numbox {
  height: 23px;
  width: 108px;
  padding: 0 35px;
  button {
    width: 35px;
    padding-right: 0;
  }
}
</style>
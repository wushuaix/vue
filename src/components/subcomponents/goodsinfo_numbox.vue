<template>
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="getNumber" ref="number_box" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
  mounted(){
    mui(".mui-numbox").numbox();
  },
  methods:{
    getNumber(){
      this.$emit("getcount",this.$refs.number_box.value)
    }
  },
  props:["max"],
  watch:{
        'max':function(newValue,oldValue){
           mui(".mui-numbox").numbox().setOption('max',newValue) 
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
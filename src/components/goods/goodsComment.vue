<template>
    <div>
        <cmtbox :id="$route.params.id+70"></cmtbox>
    </div>
</template>
<script>
import cmtbox from '../subcomponents/comment.vue'
export default {
    components:{
        cmtbox
    }
}
</script>
<style lang="scss" scoped>
    
</style>
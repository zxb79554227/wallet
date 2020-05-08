<template>
  <div class="loading-page">
    <div class="loading-img">
      <img src="../../assets/img/loading.png" alt="">
      <ProgressBar 
      :val='loadingVal' 
      :max='100' 
      bar-color='#849ef8' 
      class="progress-bar" 
      text='加载中...' 
      size='medium'
      text-fg-color='rgba(51, 54, 73, 1)'
      />
   </div>
  </div>
</template>

<script>
import ProgressBar from 'vue-simple-progress'
export default {
  props:{
    loadingVal:{
        type:Number,
        default:0
      }
  },
  components:{
    ProgressBar,
  }
}
</script>

<style lang="less" scoped>
.loading-page{
  position: relative;
  height: 100vh;
  width: 100vw;
  .loading-img{
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  img{
    width: 180px;

  }
  .progress-bar{
    margin-top: 45px;
  }
}
</style>
<template>
  <div class="init-page">
      <div class="super-title-CN">找回钱包</div>
      <van-button type="primary" class="md-title-CN btn-1" @click="initNewWallet">创建钱包</van-button>
      <van-button type="info" class="md-title-CN btn-2">找回资产</van-button>
      <van-button type="warning" class="md-title-CN btn-3">导入助记词</van-button>
  </div>
</template>
<script>
 /* eslint-disable */
import WalletBuilder from './init'
export default {
  mounted(){
    if(localStorage.addr){
      this.$router.push('/')
    }
  },
  methods:{
    async initNewWallet(){
      let builder =  new WalletBuilder()
      let mnemonic =  await builder.getNewMnemonic().then((res)=>{
        localStorage.mnemonic = res
      })
      let wallet =  await builder.createWallet(localStorage.mnemonic)

    }
  }
}
</script>
<style lang="less" scoped>
@import "../../style.less";
.init-page{
  position: relative;
  .van-button{
    display: block;
    width: 75%;
    height: 85px;
    margin: 0 auto;
    border-radius: 10px;
    margin-bottom: 35px;
    border: none;
    -moz-box-shadow: 13px 8px 12px rgba(185,185,185,0.8); /* 老的 Firefox */
    box-shadow: 13px 8px 12px rgba(185,185,185,0.8);
  }
 .van-button::before{
   -moz-box-shadow: none; /* 老的 Firefox */
    box-shadow: none;
 } 
  .super-title-CN{
    color: @themeDark;
    margin-top: 45px;
    margin-left: 16px;
    margin-bottom: 100px;
    text-align: left;
  }
  .btn-1{
    background-image: url('../../assets/img/btn-1-bg.png');
    background-position: center;
    background-size: 130%;
    background-repeat: no-repeat;
  }
  .btn-2{
    background-image: url('../../assets/img/btn-2-bg.png');
    background-position: center;
    background-size: 130%;
    background-repeat: no-repeat;
  }
  .btn-3{
    background-image: url('../../assets/img/btn-3-bg.png');
    background-position: center;
    background-size: 130%;
    background-repeat: no-repeat;
  }
}
</style>
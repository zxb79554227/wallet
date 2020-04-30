<template>
  <div>
    <div class="page-head">
          <div class="title">找回钱包</div>
          <div class="comeIn-handbook" >帮助中心</div>
    </div>
    <div class="account-card">

    </div>
    <div class="coin-account-box">
        <van-tabs v-model="acountActive" swipeable  class="tabs">
          <van-tab title="钱包账户" class="text-left">
            <div class="acount-balance">
              <div class="input-tip">钱包资产折合(CNY)</div>
              <div>
            
                <span class="f-2">≈¥123</span>
              </div>
            </div>
          </van-tab>
          <van-tab title="找回钱包账户" class="text-left">
            <div class="acount-balance">
              <div class="input-tip">找回钱包资产折合(CNY)</div>
              <div>
                <span class="f-2">≈¥232</span>
              </div>
            </div>
          </van-tab>
        </van-tabs>
    </div>
    <div>
        <ul class="coin-items" v-if="acountActive===0">
            22
            <!-- <Item
            v-for="i in coinsData"
            :key="i.id"
            :id="i.coinName"
            :rmb="i.rmb"
            :balance="i.balance"
            :icon="i.icon"
            ></Item> -->
        </ul>
        <ul class="contract-items" v-else-if="acountActive===1">
           33
            <!-- <UwalletItem
            v-for="i in p_coinsData"
            :key="i.id"
            :id="i.coinName"
            :rmb="i.rmb"
            :balance="i.balance"
            :icon="i.icon"
            ></UwalletItem> -->
       </ul>
    </div>   
  </div>
</template>

<script>
export default {
    data(){
        return{
            acountActive:0
        }
    }
}
</script>

<style lang="less" scoped>

</style>
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import {WITHDRAWMAINCHAIN,getTokenBalance,getMarketData} from './chain33API/chain33apiDB'
import {INIT_FUEL_ACCOUNT_PRIKEY} from './chain33API/testConfig'
export default {
  name: "App",
  data() {
    return {
      addrExist: localStorage.mainAddress
    };
  },
  mounted() {
    // localStorage.addr = 'alsdfjlsdkj'
    this.phoneDetect();
    // this.update=setInterval(()=>{
    //     this.updateCoinsData()
    //   },15000)
    // this.testMoney()
  },
  beforeDestroy(){
    if(this.update){
      window.clearInterval(this.update)
    }
  },
  methods: {
    //测试打款
    async testMoney(){
      let params = {
          addr: localStorage.mainAddress,
          amount: 10000000000,
          execer: 'coins',
          privkey:INIT_FUEL_ACCOUNT_PRIKEY
      }
      await WITHDRAWMAINCHAIN(params)
    },

    async updateCoinsData(){
      console.log(123);
      let walletCoins = await this.db.WALLET.toArray()
      let p_walletCoins = await  this.db.P_WALLET.toArray()
      walletCoins.map(async i=>{
        let params = {
          url: 'main',
          execer:i.execer,
          asset_exec:i.execer,
          asset_symbol:i.coin
        }
        await getTokenBalance(params).then(async res=>{
          console.log(res);
          await this.db.WALLET.where('coin').equals(i.coin).modify({balance:res.result[0].balance,currency:res.result[0].currency,frozen:res.result[0].frozen})
        })
        let coin = i.coin.toUpperCase()
        await getMarketData(coin).then(async res=>{
          await this.db.WALLET.where('coin').equals(i.coin).modify({rmb:res.data[0].rmb,icon:res.data[0].icon,usd:res.data[0].usd})
        })
      })
      p_walletCoins.map(async i=>{
        let params = {
          url: 'para',
          execer:i.execer,
          asset_exec:i.execer,
          asset_symbol:i.coin
        }
        await getTokenBalance(params).then(async res=>{
          await this.db.P_WALLET.where('coin').equals(i.coin).modify({balance:res.result[0].balance,currency:res.result[0].currency,frozen:res.result[0].frozen})
        })
         let coin = i.coin.toUpperCase()
        await getMarketData(coin).then(async res=>{
          await this.db.P_WALLET.where('coin').equals(i.coin).modify({rmb:res.data[0].rmb,icon:res.data[0].icon,usd:res.data[0].usd})
        })
      })  
    },
    phoneDetect() {
      console.log(123123);
      
      if (!localStorage.isIOS || !localStorage.isAndorid) {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //判断iPhone|iPad|iPod|iOS
          localStorage.isIOS = true;
          this.db.USERINFO.update(1, {
            device: "IOS"
          });
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //判断Android
          localStorage.isAndorid = true;
          this.db.USERINFO.update(1, {
            device: "Andorid"
          });
        } else {
          return true;
        }
      }
    }
  }
};
</script>

<style>

</style>

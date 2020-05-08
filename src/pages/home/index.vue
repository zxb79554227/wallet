<template>
  <div class="home-view">
    <Loading v-if="!pageReady" :loadingVal= loadingPer></Loading>
    <div v-else>
      <transition :name="transitionName">
        <router-view v-if="pageReady" class="child-view"></router-view>
      </transition>
      <Nav></Nav>
    </div>
  </div>
</template>

<script>
import { checkWalletStatus, setCoinLimit, getTokenBalance,getMarketData } from "../../chain33API/chain33apiDB";
// import coinList from "../../coinList";
import Nav from "../../components/nav/index";
import Loading from "./loading";
export default {
  data() {
    return {
      pageReady: false,
      loadingPer: 0,
      transitionName: "slide-left"
    };
  },
  components: {
    Nav,
    Loading
  },
  watch: {
    $route(to) {
      if (to.path === "/home") {
        this.transitionName = "slide-left";
      } else if (to.path === "/setting") {
        this.transitionName = "slide-right";
      }
    },
    loadingPer:{
      handler(val){
        if(val>=100){
          this.loadingPer =100
          sessionStorage.pageLoaded = true
          setTimeout(()=>{
            this.pageReady = true
          },300)
        }else{
          this.pageReady = false
        }
      }
    }
  },
  created() {
    if(!sessionStorage.pageLoaded){
       this.setPageReady();
    }else{
      this.pageReady = true
    }
  },
  methods: {
    async setPageReady() {
      let registerCoins = await this.db.P_WALLET.toArray(res=>{
        let array = res.map(obj =>{
          return obj.coinName
        })
        return array
      });
      let walletCoins = await this.db.WALLET.toArray()
      let p_walletCoins = await  this.db.P_WALLET.toArray()
      await checkWalletStatus().then(res => {
        if (res.error === "ErrNotFound") {
          registerCoins.map(async coin => {
              await setCoinLimit(
              coin,
              100000000000,
              localStorage.privateKey
            );
          });
          setTimeout(()=>{
          this.setPageReady()
          },3500)
        } else if (!res.error && res.result) {
          let registeredCoins = res.result.assets.map(obj => {
            return obj.symbol;
          });
          let missRegister = this._.difference(registerCoins,registeredCoins)
          if(missRegister.length<1){
            registeredCoins.map(async item=>{
              await this.db.P_WALLET.where('coinName').equals(item).modify({zhaohuiCoin:'registered'})
            })
            console.log('全部币种已经注册');
            if(this.loadingPer<100){
              this.loadingPer =100
            }
            return
          }else{
            missRegister.map(async coin=>{
              console.log(coin,'还没注册');
              await setCoinLimit(
                coin,
                100000000000,
                localStorage.privateKey
              );
            })
              setTimeout(()=>{
                this.setPageReady()
              },3500)
          }
        }else{
          console.log(res);
        }
        // this.loadingPer =75
      });
      walletCoins.map(async i=>{
        let params = {
          url: 'main',
          execer:i.execer,
          asset_exec:i.execer,
          asset_symbol:i.coin
        }
        await getTokenBalance(params).then(async res=>{
          await this.db.WALLET.where('coin').equals(i.coin).modify({balance:res.result[0].balance,currency:res.result[0].currency,frozen:res.result[0].frozen})
        })
        let coin = i.coin.toUpperCase()
        await getMarketData(coin).then(async res=>{
          await this.db.WALLET.where('coin').equals(i.coin).modify({rmb:res.data[0].rmb,icon:res.data[0].icon,usd:res.data[0].usd})
        })
        if(this.loadingPer<25){
          this.loadingPer =25
        }
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
        if(this.loadingPer<50){
          this.loadingPer =50
        }
      })  
    }
  }
};
</script>

<style lang="less" scoped>
.home-view {
  width: 100%;
}
.child-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  // height: 100%;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  transition: all 0.8s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(-80px, 0);
  transform: translate(-80px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
</style>
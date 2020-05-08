<template>
  <div>
    <van-dialog
      v-model="showInitDialog"
      :showConfirmButton="false"
      closeOnClickOverlay
      class="dialog"
    >
      <div class="md-title-CN">生成新钱包</div>
      <div class="input-box">
        <div class="md-content-CN sub-title">钱包名字</div>
        <div>
          <van-field
            :maxlength="12"
            v-model="walletName"
            placeholder="请输入新钱包的名字"
            :border="false"
            bind:change="onChange"
          />
        </div>
      </div>
      <div class="input-box">
        <div class="md-content-CN sub-title">选择助记词模式</div>
        <div>
          <van-radio-group v-model="radio">
            <van-radio name="1">
              中文助记词
              <!-- <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>-->
            </van-radio>
            <van-radio name="2">
              英文助记词
              <!-- <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>-->
            </van-radio>
            <van-button type="primary" @click="doInitWallet" :disabled="initSubmitDisable">生成钱包</van-button>
          </van-radio-group>
        </div>
      </div>
    </van-dialog>
    <div class="init-page">
      <div class="super-title-CN">找回钱包</div>
      <van-button type="primary" class="md-title-CN btn-1" @click="showDialog">创建钱包</van-button>
      <van-button type="info" class="md-title-CN btn-2">找回资产</van-button>
      <van-button type="warning" class="md-title-CN btn-3">导入助记词</van-button>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import coinList from "../../coinList";
import { addBandRetrieve } from "../../chain33API/chain33apiDB";
import WalletBuilder from "./init";
export default {
  data() {
    return {
      showInitDialog: false,
      walletName: "",
      radio: "1",
      initSubmitDisable: true
    };
  },
  watch: {
    walletName: {
      handler(newValue, oldValue) {
        if (newValue.length > 0) {
          this.initSubmitDisable = false;
        } else {
          this.initSubmitDisable = true;
        }
      }
    }
  },
  mounted() {
    console.log(coinList);
    if (localStorage.mainAddress) {
      this.$router.push("/");
    }
  },
  methods: {
    showDialog() {
      this.showInitDialog = true;
    },
    async doInitWallet() {
      this.$toast({
        message: "生成钱包中...",
        type: "loading",
        forbidClick: true,
        duration: 3000,
        loadingType: "circular"
      });
      await this.initNewWallet(parseInt(this.radio), this.walletName).then(
        async rlt => {
          await this.dbCreate();
          await addBandRetrieve(
            localStorage.mainAddress,
            localStorage.privateKey
          ).then(async res => {
            localStorage.retrieveHash = res;
            localStorage.enableRetrieve = true;
            await this.db.USERINFO.update(1, {
              walletName: this.walletName,
              retrieve: "added",
              retrieveHash: res
            });
            window.location.reload();
          });
        }
      );
    },
    async dbCreate() {
      let db = this.db;
      let userInfo = await db.USERINFO.get(1);
      let bty = await db.WALLET.get(1);
      let p_bty = await db.P_WALLET.get(1);
      if (bty && p_bty && userInfo) {
        console.log("db已经存在");
      } else {
        console.log("生成db");
        await this.db.USERINFO.put({
          id: 1,
          phone: null,
          retrieve: "",
          hash: "",
          status: null
        });
        coinList.map(async i => {
          if(i === 'BTY'){
            await this.db.WALLET.put({ coin: i.toLowerCase() , execer: 'coins', coinName: 'coins.'+ i.toLowerCase()});
            await this.db.P_WALLET.put({ coin: i.toLowerCase() , execer: 'coins', coinName: 'coins.'+ i.toLowerCase()});
          }else{
            await this.db.WALLET.put({ coin: i , execer: 'token', coinName: 'token.'+ i});
            await this.db.P_WALLET.put({ coin: i , execer: 'token',coinName: 'token.'+ i });
          }
        });
        // await this.db.WALLET.put({ coinName: "BTY" });
        // await this.db.WALLET.put({ coinName: "CCNY" });
        // await this.db.P_WALLET.put({ coinName: "BTY" });
        // await this.db.P_WALLET.put({ coinName: "CCNY" });
      }
    },
    async initNewWallet(lang, acountName) {
      let builder = new WalletBuilder();
      let mnemonic = await builder.getNewMnemonic(lang);
      localStorage.mnemonic = mnemonic;
      let wallet = await builder.createWallet(mnemonic);
      let account = await builder.createAccount(wallet, acountName);
      localStorage.mainAddress = account.address;
      localStorage.privateKey = account.hexPrivateKey;
      // localStorage.pubKey = Buffer.from(this.account.publicKey).toString("hex");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../style.less";
.init-page {
  position: relative;
  .van-button {
    display: block;
    width: 75%;
    height: 85px;
    margin: 0 auto;
    border-radius: 10px;
    margin-bottom: 35px;
    border: none;
    -moz-box-shadow: 13px 8px 12px rgba(185, 185, 185, 0.8); /* 老的 Firefox */
    box-shadow: 13px 8px 12px rgba(185, 185, 185, 0.8);
  }
  .van-button::before {
    -moz-box-shadow: none; /* 老的 Firefox */
    box-shadow: none;
  }
  .super-title-CN {
    color: @themeDark;
    margin-top: 45px;
    margin-left: 16px;
    margin-bottom: 100px;
    text-align: left;
  }
  .btn-1 {
    background-image: url("../../assets/img/btn-1-bg.png");
    background-position: center;
    background-size: 130% 150%;
    background-repeat: no-repeat;
  }
  .btn-2 {
    background-image: url("../../assets/img/btn-2-bg.png");
    background-position: center;
    background-size: 130% 150%;
    background-repeat: no-repeat;
  }
  .btn-3 {
    background-image: url("../../assets/img/btn-3-bg.png");
    background-position: center;
    background-size: 130% 150%;
    background-repeat: no-repeat;
  }
}
.sub-title {
  padding-left: 10px;
}
.md-content-CN {
  opacity: 0.6;
}
</style>
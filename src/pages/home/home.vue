<template>
  <div>
    <div class="page-head">
      <div class="title super-title-CN">找回钱包</div>
      <div class="comeIn-handbook">帮助中心</div>
    </div>
    <div class="account-card">
      <div>的钱包</div>
      <div class="super-title-CN total">0.00</div>
      <div class="flex-parent">
        <div class="addr">
          {{
            mainAddress &&
              `${mainAddress.slice(0, 10)}...${mainAddress.slice(-7)}`
          }}
        </div>
        <div>
          <i>
            <img
              src="../../assets/icons/copy.png"
              id="d"
              alt="copyHash"
              class="copy-icon"
              @click="copyAddress"
              :data-Clipboard-text="mainAddress"
            />
          </i>
        </div>
      </div>
    </div>
    <div class="coin-account-box">
      <van-tabs
        v-model="acountActive"
        swipeable
        class="tabs"
        title-active-color="#fa6400"
      >
        <van-tab title="钱包账户" class="text-left">
          <div class="acount-balance">
            <div class="sm-content-CN">钱包资产折合(CNY)</div>
            <div>
              <span class="lg-content-CN">≈¥123</span>
            </div>
          </div>
        </van-tab>
        <van-tab title="找回钱包账户" class="text-left">
          <div class="acount-balance">
            <div class="sm-content-CN">找回钱包资产折合(CNY)</div>
            <div>
              <span class="lg-content-CN">≈¥232</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div>
      <ul class="coin-items" v-if="acountActive === 0">
        <!-- <Item
          v-for="i in coinsData"
          :key="i.id"
          :id="i.coinName"
          :rmb="i.rmb"
          :balance="i.balance"
          :icon="i.icon"
        ></Item> -->
      </ul>
      <ul class="coin-items" v-else-if="acountActive === 1">
        <!-- <UwalletItem
            v-for="i in p_coinsData"
            :key="i.id"
            :id="i.coinName"
            :rmb="i.rmb"
            :balance="i.balance"
            :icon="i.icon"
        ></UwalletItem>-->
      </ul>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {
      acountActive: 0,
      mainAddress: localStorage.mainAddress,
      bandingUser: false,
    };
  },
  methods: {
    copyAddress() {
      if (this.bandingUser == false) {
        this.$dialog
          .confirm({
            title: "需要绑定手机",
            messageAlign: "left",
            confirmButtonText: "去绑定",
            message: `为了保证找回功能能够正常使用，请先绑定您的手机号码`,
          })
          .then((action) => {
            if (action === "confirm") {
              this.$router.push({
                path: "/my",
                query: {
                  showDialog: true,
                },
              });
            } else {
              this.$dialog.close();
            }
          });
      } else {
        let btnCopy = new Clipboard("#d");
        btnCopy.copyValue = this.mainAddress;
        this.$toast({
          message: "复制成功",
          type: "success",
          forbidClick: true,
          duration: 1500,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  text-align: left;
}
.page-head {
  position: relative;
  padding: 15px 25px;
}
.comeIn-handbook {
  position: absolute;
  top: 32%;
  right: 0;
  padding-right: 25px;
}
.account-card {
  width: 90%;
  margin: 0 auto;
  border-radius: 6px;
  position: relative;
  padding: 25px 15px;
  text-align: left;
  box-sizing: border-box;
  background-color: #fff;
  background-image: url("../../assets/img/card.png");
  background-size: cover;
  background-position: center;
  .normal-shadow;
  color: #fff;
}
.total {
  padding: 15px 0;
}
.coin-account-box {
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
  .normal-shadow;
  border-radius: 5px;
}
.acount-balance {
  padding: 15px 10px;
  text-align: left;
}
.sm-content-CN {
  opacity: 0.6;
}
.copy-icon {
  height: 23px;
  padding-left: 15px;
}
.addr {
}
</style>

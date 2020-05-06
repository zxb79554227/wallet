<template>
  <div>
    <li @click="goDetail(id)">
      <div class="item-card">
        <van-row class="coin-box">
          <van-col span="4">
            <div class="img-box">
              <van-skeleton avatar :loading="!icon" avatar-size="35" style="paddingLeft:3.5px">
                <img :src="icon" :alt="id" />
              </van-skeleton>
            </div>
          </van-col>
          <van-col span="10" class="coin">
            <div class="title-1">
              <div v-if="!id">----</div>
              <div v-else>123</div>
              <span class="fs-1"></span>
            </div>
            <div class="fs-1">≈$123</div>
          </van-col>
          <van-col span="10" class="user">
            <div class="title-1">123</div>
            <div class="fs-1">≈¥123</div>
          </van-col>
        </van-row>
      </div>
    </li>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { floatObj } from "../utils/floatNum";

export default {
  name: "item",
  data() {
    return {
      currency: "¥",
      isDataReady: false
    };
  },
  props: {
    id: {
      default: ""
    },
    rmb: {
      default: 0
    },
    balance: {
      default: 0
    },
    icon: {
      default: ""
    }
  },
  filters: {
    showCoin: function(value) {
      if (value >= 0) {
        let numb = floatObj.divide(value, 100000000);
        return numb.toFixed(4);
      } else {
        return "0.0000";
      }
    },
    showMoney: function(value) {
      if (value >= 0) {
        let numb = floatObj.divide(value, 100000000);
        if (!numb) {
          return "0.00";
        }
        return numb.toFixed(2);
      } else {
        return "0.00";
      }
    }
  },
  computed: {
    ...mapState("appShell/appItem", ["market"])
    // showBalance() {
    //   return floatObj.divide(this.balance, 100000000).toFixed(4);
    // },
    // showTotal() {
    //   let total = floatObj.multiply(this.balance, this.value);
    //   return floatObj.divide(total, 100000000).toFixed(4);
    // }
  },
  mounted() {},
  methods: {
    goDetail(id) {
      this.$router.push(`/detail/${id}`);
      this.$emit("showId", id);
    }
  }
};
</script>

<style lang="stylus" scoped>
@require '~@/assets/stylus/variable';

.item-card {
  border-radius: $app-box-border-radius;
  box-shadow: $box-shadow;
  padding: 15px;
  text-align: left;
  background-color: #fff;
}

.coin-box {
  display: flex;
  align-self: center;
  align-content: center;
  justify-content: center;
  align-items: center;
}

.img-box>img {
  height: 32px !important;
  width: 32px !important;
}

.coin {
  text-align: left;
}

.user {
  text-align: right;
}

.item-card {
  margin-bottom: 5px;
}

.title-1 {
  margin-bottom: 5px;
  font-size: 16px;
}
</style>
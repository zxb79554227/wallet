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
              <div v-if="!id">----
              </div>
              <div v-else>
                <van-row type='flex'>
                  <van-col>
                      {{id}}
                  </van-col>
                  <van-col>
                    <van-tag color="#849EF8" class="tag-box" v-if="isPara">合约</van-tag>
                  </van-col>
                </van-row>
              </div>
              <span class="fs-1"></span>
            </div>
            <div class="fs-1">≈${{balance*rmb | showMoney}}</div>
          </van-col>
          <van-col span="10" class="user">
            <div class="title-1">{{balance | showCoin}}</div>
            <div class="fs-1">≈¥{{rmb | showMoney}}</div>
          </van-col>
        </van-row>
      </div>
    </li>
  </div>
</template>

<script>
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
    isPara:{
      type:Boolean,
      default:false
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
  methods: {
    goDetail(id) {
      this.$router.push(`/detail/${id}`);
      this.$emit("showId", id);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style.less";
.item-card {
  .normal-radius;
  .normal-shadow;
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
.tag-box {
  width: 40px;
  height: 20px;
  padding-top: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  background: rgba(132, 158, 248, 1);
  border-radius: 5px;
  overflow: hidden;
  margin-left: 5px;
}

.item-card {
  margin-bottom: 5px;
}

.title-1 {
  margin-bottom: 5px;
  font-size: 16px;
}
.title-1-left {
  width: 100%;
  display: flex;
}
</style>
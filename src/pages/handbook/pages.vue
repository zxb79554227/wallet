<template>
  <div class="bookDetail-container">
    <div class="to-back">
      <img @click="$router.back()" src="../../assets/icons/back_black.png" alt="返回" />
      <h1>{{handbook_detail.title}}</h1>
    </div>
    <!-- <h1 class="bookDetail-title" v-if="handbook_detail">{{handbook_detail.title}}</h1> -->
    <div class="bookDetail-content" v-if="handbook_detail">
      <div v-for="({subTitle, contexts, imgs}, index) in handbook_detail.content" :key="index">
        <div v-if="subTitle" class="title">{{subTitle}}</div>
        <div class="contexts-container">
          <p v-for="(context, index) in contexts" :key="index">{{context}}</p>
        </div>
        <div class="imgs-container">
          <img
            v-for="({width, height, marginBottom, img}, index) in imgs"
            :key="index"
            :src="img"
            :style="{width, height, marginBottom}"
            alt="例图"
          />
        </div>
      </div>
    </div>
    <div class="mask" v-if="!handbook_detail">
      <img src="../../assets/img/non-information.png" alt="无消息提醒图" />
      <span>暂无数据</span>
    </div>
  </div>
</template>

<script>
import { HANDBOOK_DETAILS } from "./handbook";
export default {
  data() {
    const detailId = this.$route.query.id;
    const handbook_detail = HANDBOOK_DETAILS.filter(
      item => item.id === detailId
    )[0];
    return {
      detailId,
      handbook_detail
    };
  }
};
</script>

<style lang="less" scoped>
.bookDetail-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
}

.to-back {
  height: 40px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  background: white;
}

.to-back > img {
  width: 22px;
  height: 22px;
  margin-right: calc(50vw - 37px);
}

.to-back > h1 {
  font-size: 16px;
  font-family: "PingFangSC-Medium", "PingFang SC";
  font-weight: 600;
  color: rgba(52, 54, 64, 1);
  line-height: 40px;
  transform: translate(-50%, 0%);
}

.bookDetail-title {
  padding-top: 22px;
  text-align: center;
  font-size: 16px;
  font-family: "PingFangSC-Semibold", "PingFang SC";
  font-weight: 600;
  color: rgba(52, 54, 64, 1);
  line-height: 22px;
  margin: 0px 0px 21px 0px;
}

.bookDetail-content {
  padding: 0 16px;
  text-align: left;
  height: calc(100vh - 92px);
  overflow: scroll;
}

.bookDetail-content > div {
  font-size: 14px;
  font-family: "PingFangSC-Regular", "PingFang SC";
  font-weight: 400;
  color: rgba(52, 54, 64, 1);
  line-height: 26px;
  word-break: break-all;
  margin-bottom: 20px;
}

.bookDetail-content > div > .title {
  margin-bottom: 20px;
}

.contexts-container {
}

.bookDetail-content > div > .contexts-container > p {
}

.bookDetail-content > div > .contexts-container > p:last-child {
  margin-bottom: 20px;
}

.bookDetail-content > div > .imgs-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mask {
  width: 100vw;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mask > img {
  width: 50vw;
  padding-bottom: 30px;
}

.mask > span {
  font-size: 24px;
  font-weight: 600;
  color: #8a8a8a;
}
</style>
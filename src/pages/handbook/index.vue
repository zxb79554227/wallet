<template>
  <div class="handbook-container">
    <div class="to-back">
      <img @click="$router.back()" src="../../assets/icons/back_black.png" alt="返回" />
      <h1>帮助中心</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.handbook-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f8f8fa;
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
  font-family: "PingFangSC-Medium," "PingFang SC";
  font-weight: 600;
  color: rgba(52, 54, 64, 1);
  line-height: 40px;
  transform: translate(-50%, 0%);
}

.header-container {
  height: 168px;
  background: rgba(243, 244, 246, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.header-container > img {
  width: 73px;
  transform: translate(0%, 10%);
}

.content-container {
  height: calc(100vh - 232px);
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 0 15px 0 16px;
  text-align: left;
}

.item-container {
  margin-bottom: 19px;
}

.item-container:last-child {
  margin-bottom: 0px;
}

.item-title {
  font-size: 16px;
  font-family: "PingFangSC-Semibold", "PingFang SC";
  font-weight: 600;
  color: rgba(52, 54, 64, 1);
  line-height: 22px;
  margin-bottom: 4px;
}

.item-content {
}

.item-content > li {
  width: 100%;
  height: 59px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d9dce9;
}

.item-content > li > div {
  display: flex;
  align-items: center;
}

.item-content > li > div > img {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.item-content > li > div > span {
  font-size: 14px;
  font-family: "PingFangSC-Regular", "PingFang SC";
  font-weight: 400;
  color: rgba(52, 54, 64, 1);
  line-height: 20px;
}

.item-content > li > img {
  width: 16px;
  height: 16px;
}
</style>

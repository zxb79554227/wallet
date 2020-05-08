<template>
  <div class="setting-page">
    <div class="page-head">
      <div class="title super-title-CN">我的设置</div>
      <div class="phoneLogin">
        <van-row type="flex" align="center">
          <van-col>
            <img src="../../assets/icons/unlogin.png" alt />
          </van-col>
          <van-col class="try">
            <div class="md-content-CN">绑定手机号码</div>
          </van-col>
        </van-row>
      </div>
      <!-- <div class="comeIn-handbook">帮助中心</div> -->
    </div>
    <div class="scroll-view">
      <div class="btn-list">
        <van-cell title="分享应用" is-link class="btn-box text-left" />
        <van-cell title="导出助记词" is-link class="btn-box text-left" />
        <van-cell title="联系人地址" is-link class="btn-box text-left" />
        <van-cell title="帮助中心" is-link class="btn-box text-left" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.title {
  text-align: left;
}
.page-head {
  position: relative;
  padding: 15px 25px;
  color: @themeWhite;
  background-image: url("../../assets/img/set-bg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .normal-shadow;
}
.comeIn-handbook {
  position: absolute;
  top: 32%;
  right: 0;
  padding-right: 25px;
}
.btn-list {
  width: 90%;
  margin: 0 auto;
  margin-top: 25px;
  .van-cell {
    text-align: left;
    margin-bottom: 15px;
    .normal-radius;
    padding: 15px 10px;
    .normal-shadow;
  }
}
.phoneLogin {
  text-align: left;
  padding: 28px 5px;
  img {
    min-height: 45px;
    max-height: 65px;
    width: auto;
  }
  .md-content-CN {
    padding-left: 15px;
    display: inline-block;
    height: 35px;
    line-height: 35px;
  }
}
</style>
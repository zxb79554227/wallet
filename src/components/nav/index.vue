<template>
  <div class="nav-bar">
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" @click="navBarClick">
        <img v-if="active==='home'" slot="icon" src="../../assets/icons/zichanActived.png" />
        <img v-else slot="icon" src="../../assets/icons/zichan.png" />
        <h4 :class="active === 'home' ?'actived':''">首页</h4>
      </van-tabbar-item>
      <van-tabbar-item name="setting" @click="navBarClick">
        <img v-if="active === 'setting'" slot="icon" src="../../assets/icons/woActived.png" />
        <img v-else slot="icon" src="../../assets/icons/wo.png" />
        <h4 :class="active === 'setting' ?'actived':''">我的</h4>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home"
    };
  },
  methods: {
    navBarClick() {
      if (this.$route.name !== this.active) {
        this.$router.push(`/${this.active}`);
      } else {
        return;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style.less";
// .nav-bar {
//   // position: fixed;
//   bottom: 0;
//   width: 100%;
//   border-top: 1px solid black;
// }
.van-tabbar--fixed {
  border-top: 0.5px solid rgba(51, 54, 73, 0.3);
  padding: 5px 0;
  box-shadow: -1px -1.5px 8px rgba(51, 54, 73, 0.2);
}
.van-tabbar-item {
  border-right: 0.5px solid rgba(51, 54, 73, 0.3);
}
.actived {
  color: @themeBlue;
}
</style>
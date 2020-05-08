<template>
  <div>
    <header class="header-container">
      <img src="../../assets/img/findBack.png" alt="找回钱包" @click="clearStroge" />
    </header>
    <div class="content-container">
      <div class="item-container" v-for="({ title, items }, index) in handbook_list" :key="index">
        <h2 class="item-title">{{ title }}</h2>
        <div class="item-content">
          <li
            v-for="({ id, text, logo }, index) in items"
            :id="id"
            :key="index"
            @click="goPage(id)"
          >
            <div>
              <img :src="logo" alt="logo图" />
              <span>{{ text }}</span>
            </div>
            <img src="../../assets/icons/toGo.png" alt="标志" />
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HANDBOOK_LISK } from "./handbook";
export default {
  data() {
    return {
      handbook_list: HANDBOOK_LISK,
      time: 0,
      parent: true
    };
  },
  methods: {
    toDetail(id) {
      this.$router.push(`handbook/${id}`);
    },
    goPage(id) {
      // this.navigatingTo(`/handbook/page?id=${id}`);
      this.navigatingTo({ path: "/handbook/page", query: { id } });
      console.log(this.$router);
    },
    clearStroge() {
      if (this.time < 6) {
        this.time++;
      } else {
        this.$dialog
          .confirm({
            title: "清除当前钱包",
            messageAlign: "center",
            confirmButtonText: "确认清除",
            message: `该操作可能让你丢失找回钱包内所有资产，请确认你是否继续执行`
          })
          .then(async action => {
            if (action === "confirm") {
              this.time = 0;
              this.db
                .delete()
                .then(() => {
                  localStorage.clear();
                  window.location.reload();
                })
                .catch(err => {
                  console.log("====================================");
                  console.log(err);
                  console.log("====================================");
                });
            } else {
              this.$dialog.close();
            }
          });
      }
    }
  }
};
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
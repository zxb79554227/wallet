import Vue from "vue";
import router from "./router";
import Vant from "vant";
import App from "./App.vue";
import Dexie from "dexie";
import "vant/lib/index.css";
import "./style.less";

Vue.config.productionTip = false;
var db = new Dexie("WALLET_DB");
db.version(1).stores({
  WALLET: "++id,coinName",
  P_WALLET: "++id,coinName",
  TRADELIST: "++id,method,status,time,hash,coinType",
  USERINFO: "id,createTime,lastOpen",
  CONTACTS: "id,name,initName,addr,premit,hash,onChain",
});
Vue.prototype.db = db;
Vue.use(Vant);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

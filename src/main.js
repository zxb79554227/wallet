import Vue from "vue";
import router from "./router";
import Vant from "vant";
import _ from 'lodash'
import {floatObj} from './chain33API/floatNumber'
import "@/mixins/tools"
import App from "./App.vue";
import Dexie from "dexie";
import "vant/lib/index.css";
import "./style.less";


Vue.config.productionTip = false;
var db = new Dexie("WALLET_DB");
db.version(1).stores({
  WALLET: "++id,coin,coinName",
  P_WALLET: "++id,coin,coinName",
  TRADELIST: "++id,method,status,time,hash,coinType",
  USERINFO: "id,createTime,lastOpen",
  CONTACTS: "id,name,initName,addr,premit,hash,onChain",
});
Vue.prototype.floatObj = floatObj
Vue.prototype.db = db;
Vue.prototype._ = _

Vue.use(Vant);



//filters
Vue.filter('shortAddr',(addr)=>{
  return addr.slice(0, 8) + "..." + addr.substr(addr.length - 7);
})
Vue.filter('modifyTime',  (value) => {
  if (value && value > 0) {
      var date = new Date(value * 1000); //如果date为13位不需要乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
        ":";
      var m =
        (date.getMinutes() < 10
          ? "0" + date.getMinutes()
          : date.getMinutes()) + ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    } else {
      return "---";
    }
})
Vue.filter('showCoin',(value)=>{
  let numb = floatObj.divide(value, 100000000);
  return numb.toFixed(4);
})
Vue.filter('showMoney',(value)=>{
  let numb = floatObj.divide(value, 100000000);
  return numb.toFixed(2);
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

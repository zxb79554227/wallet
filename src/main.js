import Vue from 'vue'
import router from './router'
import Vant from "vant";
import App from './App.vue'
import "vant/lib/index.css";
import './style.less'



Vue.config.productionTip = false


Vue.use(Vant);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

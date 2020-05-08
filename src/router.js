import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./pages/home";
import Init from "./pages/init";
import Handbook from "./pages/handbook/index.vue";
import HomePage from "./pages/home/home.vue";
import Setting from "./pages/home/setting.vue";
import Toturial from './pages/handbook/pages.vue'
import BookMenu from './pages/handbook/bookmenu.vue'
// import App from './App'
// import Loading from './pages/loading'
Vue.use(VueRouter);

const routes = [
  // {
  //     path: '',
  //     name:'index',
  //     redirect:()=> localStorage.getItem('addr')? '/':'/init'
  // },
  {
    path: "/",
    component: Home,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: HomePage,
      },
      {
        path: "setting",
        name: "setting",
        component: Setting,
      },
    ],
  },
  {
    path: "/init",
    name: "init",
    component: Init,
  },
  {
    path: "/handbook",
    component:Handbook,
    redirect:'/handbook/menu',
    children:[
      {
        path:'menu',
        name:'handbook-menu',
        component: BookMenu,
      },
      {
        path:'page',
        name:'handbook-page',
        component:Toturial
      }
    ]
  },

];

const router = new VueRouter({
  mode: "history",
  routes,
});
router.beforeEach((to, from, next) => {
  let addExist = localStorage.getItem("mainAddress");
  if (!addExist && to.path !== "/init") {
    next("/init");
    return;
  } else {
    next();
  }
  next();
});
export default router;

import Vue from 'vue'
import VueRouter from "vue-router";
import Home from './pages/home'
import Init from './pages/init'
import HomePage from './pages/home/home.vue'
import Setting from './pages/home/setting.vue'
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
        path:'/',
        component: Home,
        redirect:'/home',
        children:[
            {
                path:'home',
                name:'home',
                component:HomePage
            },
            {
                path:'setting',
                name:'setting',
                component:Setting
            }
        ]
    },
    {
        path:'/init',
        name:'init',
        component: Init
    }
]


const router = new VueRouter({
    mode:'history',
    routes
})
router.beforeEach((to, from, next)=>{
    let addExist = localStorage.getItem('addr')
    if(!addExist && to.path !== '/init'){
        next('/init');
        return
    }else{
        next()
    }
    next()
})
export default router
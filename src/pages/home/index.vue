<template>
<div class="home-view">
    <Loading v-if="!pageReady"></Loading>
    <div v-else>
    <transition :name="transitionName">
        <router-view v-if="pageReady" class="child-view"></router-view>     
    </transition>
    <Nav></Nav>
    </div>
</div>
</template>

<script>
import Nav from '../../components/nav/index'
import Loading from './loading'
export default {
    data(){
        return{
            pageReady:false,
            transitionName:'slide-left'
        }
    },
    watch:{
        '$route'(to){
            // const toDepth = to.path.split('/').length
            // const fromDepth = from.path.split('/').length
            if(to.path==='/home'){
                this.transitionName = 'slide-right'
            }else if(to.path === '/setting'){
                this.transitionName = 'slide-left'
            }
            // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    },
    created(){
        setTimeout(()=>{
            this.pageReady = true
        },500)
    },
    mounted(){

        
    },
    components:{
        Nav,
        Loading
    }
}
</script>

<style lang="less" scoped>
.home-view{
    width: 100%;
}
.child-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    // height: 100%;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    transition: all .8s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(-80px, 0);
    transform: translate(-80px, 0);
}
.slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

</style>
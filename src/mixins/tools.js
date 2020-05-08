import Vue from 'vue';

Vue.mixin({
    methods:{
        navigatingTo(url,query,params){
            if(typeof url === 'number'){
                this.$router.go(url)
            }else{
                if(query){
                    this.$router.push({
                        path:url,
                        query:query
                    })
                }else if(params){
                    this.$router.push({
                        path:url,
                        params:params
                    })
                }else{
                    this.$router.push(url)
                }
              
            }
        }
    }
})
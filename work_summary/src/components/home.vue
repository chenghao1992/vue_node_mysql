<template>

  <div id="home">
    <mt-header fixed title="fixed top"></mt-header>
    <div id="loginOut" @click="loginOut">退出</div>
    <router-view></router-view>
    <mt-tabbar>
      <mt-tab-item id="tab1">
        <router-link to="/home/index">
            首页
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <router-link to="/home/summary">
            总结
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="tab3">
        tab3
      </mt-tab-item>
      <mt-tab-item id="tab4">
        tab4
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted(){
      console.log(222)
    },
    methods:{
      loginOut(){
        this.$router.push({path:'/login'})
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #loginOut{
    position: absolute;
    z-index: 1;
    right: 10px;
    line-height: 40px;
  }
</style>

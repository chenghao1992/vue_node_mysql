<template>
    <div id="login">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入用密码" type="password" v-model="password"></mt-field>
      <mt-button type="primary" class="doLogin" @click="checkUser">登录</mt-button>
      <div>你还没有账号，<router-link to="/register">去注册</router-link></div>
    </div>
</template>

<script>
import {login} from '../assets/js/api.js';
import { Toast  } from 'mint-ui';
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username:'',
      password:''
    }
  },
  methods:{
    checkUser(){
      console.log(111)
      var loginData={username: this.username, pwd: this.password};
      login(loginData).then(data=>{
        console.log(data);
        if(data.code==0){
          Toast('登录成功！');
          this.$router.push({path:'./home/index'});
//          console.log(this.$router)
        }else {
          Toast(data.msg);
        }
      })
    }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #login{

  }
  .doLogin{
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>

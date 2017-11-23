<template>
  <div id="register">
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入用密码" type="password" v-model="password"></mt-field>
    <mt-field label="确认密码" placeholder="请再次输入用密码" type="rePassword" v-model="rePassword"></mt-field>
    <mt-button type="primary" class="doRegister" @click="addUser">注册</mt-button>
    <div>你已有账号，<router-link to="/login">去登录</router-link></div>
  </div>
</template>

<script>
  import {register} from '@/assets/js/api.js';
  import { Toast  } from 'mint-ui';
  export default {
    name: 'register',
    data () {
      return {
        username: '',
        password:"",
        rePassword:''
      }
    },
    methods:{
      addUser(){
        var data={username:this.username,pwd:this.password};
        register(data).then(data=>{
          if(data.code==0){
            Toast('注册成功')
            this.$router.push({path:'/login'})
          }else{
            Toast(data.msg)
          }
        })

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .doRegister{
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>

<template>
  <div id="test">
    <mt-button type="default" size="small" @click="sql('add',addParam)">增</mt-button>
    <mt-button type="primary" size="small" @click="sql('delete','name1')">删</mt-button>
    <mt-button type="danger" size="small" @click="sql('update','name2')">改</mt-button>
    <mt-button type="default" size="small" @click="sql('select')">查</mt-button>
    <mt-field label="增加" v-model="addParam"></mt-field>
  </div>
</template>

<script>
  import {sqlTest} from '@/assets/js/api.js';
  export default {
    name: 'login',
    data () {
      return {
        addParam: ''
      }
    },
    methods:{
      sql(type,name){
        console.log(type,name)
        sqlTest({type:type,name:name}).then(data=>{
          if(data.code==0){
            console.log(data)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #test{
    position: absolute;
    top:40px;
    bottom: 26px;
    margin:20px auto;
    width: 100%;
  }
</style>

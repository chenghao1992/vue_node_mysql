<template>

  <div id="index">
    index
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
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#index{
  position: absolute;
  top:40px;
  bottom: 26px;
}
</style>

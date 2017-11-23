import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import Login from '../components/login'
import Register from '../components/register.vue'
import {isLogin} from '@/assets/js/api.js';
Vue.use(Router)

const router=new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/home/index',
      children: [{
        path: '/home/index',
        name: 'index',
        component: resolve => require(['@/components/index'], resolve)
      },
        {
          path: '/home/summary',
          name: 'summary',
          component: resolve => require(['@/components/summary'], resolve)
        }
      ]
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    }
  ]
})
//判断登录态
router.afterEach((to, from) => {
  isLogin().then(data=>{
    console.log(data)
    //只有code==-1的时候登录态就失效了，这是后台规定的
    if(data.code===-1){
      if(from.path.indexOf('login')==-1){
        router.push('/login')
      }else {
        // next()
      }
    }else {
      // next()
    }
  })


  //
})
export default router;

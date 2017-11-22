import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import Login from '../components/login'
import Register from '../components/register.vue'

Vue.use(Router)

export default new Router({
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

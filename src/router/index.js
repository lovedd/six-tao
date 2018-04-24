import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList/GoodsList'
import Login from '@/views/Login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

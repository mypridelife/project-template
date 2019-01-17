import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/login/login'
import userInfo from '@/views/user/userInfo'
import index from '@/views/index/index'
import chart from '@/views/chart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: index
    },
    {
      path: '/login',
      name: 'login', // 该路由项不需要权限校验
      component: login
    },
    {
      path: '/chart',
      name: 'chart', // 该路由项不需要权限校验
      component: chart
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      meta: {
        requireAuth: true // 该路由项需要权限校验
      },
      component: userInfo
    }
  ]
})

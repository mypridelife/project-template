// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router/router'
import store from '@/store'
import axios from 'axios'

import './assets/common/css/index.css' // 引入自定义样式

import { Group, Cell, XButton, Grid, GridItem, Datetime, XInput } from 'vux'
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('x-button', XButton)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('datetime', Datetime)
Vue.component('x-input', XInput)

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 如果路由项需要权限校验
    /*
      从Vuex拿出token码，说明已登陆
    */
    if (store.state.token) {
      next() // 正常跳转页面
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
        /* 将跳转的路由地址作为参数带给登陆页，登录成功后跳转回该页面 */
      })
    }
  } else {
    // 如果不需要权限校验，直接进入路由页面
    next()
  }
})

Vue.config.productionTip = false
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

import Vue from 'vue'
import App from '@/App'
import router from '@/router/router'
import store from '@/store'
import Vant from 'vant'
import tiaoxing from './components/tiaoxingtu/index.js'
import jindu from './components/jindutiao/index.js'
import 'vant/lib/index.css'
Vue.use(Vant)
Vue.use(tiaoxing)
Vue.use(jindu)

import './assets/common/css/index.css' // 引入自定义样式

Vue.config.productionTip = false
Vue.prototype.$devicePixelRatio = window.devicePixelRatio
Vue.config.devtools = true

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

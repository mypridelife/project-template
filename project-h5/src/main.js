import Vue from 'vue'
import App from '@/App'
import router from '@/router/router'
import store from '@/store'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$devicePixelRatio = window.devicePixelRatio
Vue.config.devtools = true

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

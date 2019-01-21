import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import share from './modules/share'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    share
  },
  getters
})
export default store

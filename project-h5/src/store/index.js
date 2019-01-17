import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './action'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const state = {}

const store = new Vuex.Store({
  modules: {
    user
  },
  state,
  getters,
  actions,
  mutations
})
export default store

import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import details from './modules/details'
import board from './modules/board'
import share from './modules/share'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    details,
    board,
    share
  },
  getters
})
export default store

import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const state = {
  user: {},
  orders: [],
}

export default new Vuex.Store({
  state, 
  mutations, 
  actions, 
  getters,
  strict: process.env.NODE_ENV !== 'production'
})

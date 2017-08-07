import Vue from 'vue'

export default {
    SET_USER(state, { user }) {
      state.user = user
    },
    SET_USER_ORDERS(state, { orders }) {
      Vue.set(state.user, 'orders', orders)
    },
    SET_RESTAURANTS(state, { restaurants }) {
      Vue.set(state, 'restaurants', restaurants)
    },
    SET_ORDERS(state, { orders }) {
      Vue.set(state, 'orders', orders)
    }
}
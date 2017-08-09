import Vue from 'vue'

export default {
    SET_USER(state, { user }) {
      state.user = user
    },
    SET_ORDER(state, {key, order }) {
      order.id = key
      Vue.set(state.orders, key, order)
    },
    SET_RESTAURANT(state, { key, restaurant }) {
      restaurant.id = key
      Vue.set(state.restaurants, key, restaurant)
    },
    SET_USER_ORDER(state, { key, order }) {
      order.id = key 
      Vue.set(state.user.orders, key, order)
    },
    EMPTY_RESTAURANTS(state) {
      state.restaurants = {}
    },
    EMPTY_ORDERS(state) {
      state.orders = {}
    },
    PUSH_ERROR(state, error) {
      state.errors.push(error)
    },
    CLEAR_ERRORS(state) {
      state.errors = []
    }
}
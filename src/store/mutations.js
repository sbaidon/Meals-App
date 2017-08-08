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
    }
}
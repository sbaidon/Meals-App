import api from '../api'

export default {
  login({ commit }, { email, password }) {
    return api.login(email, password)
      .then(({ user: { uid, email, photoURL, refreshToken, displayName } }) => {
        commit('SET_USER', { user: { uid, photoURL, refreshToken, displayName, email } })
        return Promise.resolve()
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  googleLogin({ commit }) {
    return api.googleLogin()
      .then(({ user: { uid, email, photoURL, refreshToken, displayName } }) => {
        commit('SET_USER', { user: { uid, photoURL, refreshToken, displayName, email } })
        return Promise.resolve()
      }) 
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  githubLogin({ commit }) {
    return api.githubLogin()
      .then(({ user: { uid, email, photoURL, refreshToken, displayName } }) => {
        commit('SET_USER', { user: { uid, photoURL, refreshToken, displayName, email } })
        return Promise.resolve()
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  submitOrder({ commit, state }, { order, restaurant }) {
    api.saveOrder(order, state.user.uid)
    api.saveRestaurant(restaurant)
  },
  getOrders({ commit, state }) {
    api.getOrders((orders) => {
      if (orders) {
        commit('SET_ORDERS', { orders }) 
      }
    })
  },
  getUserData({ commit, state }) {
    api.getUserData(state.user.uid, ({ orders }) => {
      if (orders) {
        commit('SET_USER_ORDERS', { orders })
      }
    })
  },
  getRestaurants({ commit, state }) {
    api.getRestaurants((restaurants) => {
      if (restaurants) {
        commit('SET_RESTAURANTS', { restaurants })
      }
    })
  },
  watchData({ commit, state }) {
    api.watchData('restaurants', (key, restaurant) => {
      commit('SET_RESTAURANT', { key, restaurant })
    })
    api.watchData('orders', (key, order) => {
      commit('SET_ORDER', { key, order })
    })
  },
  updateOrder({ commit }, { order }) {
    api.updateOrder(order)
  }
}
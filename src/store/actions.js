import api from '../api'

export default {
  login({ commit }, { email, password }) {
    return api.login(email, password)
      .then(({ uid, email, refreshToken, displayName }) => {
        commit('SET_USER', { user: { uid, refreshToken, displayName, email } })
        return Promise.resolve()
      })
      .catch((error) => commit('PUSH_ERROR', error.message))
  },
  googleLogin({ commit }) {
    return api.googleLogin()
      .then(({ user: { uid, email, photoURL, refreshToken, displayName } }) => {
        commit('SET_USER', { user: { uid, photoURL, refreshToken, displayName, email } })
        return Promise.resolve()
      }) 
      .catch((error) => commit('PUSH_ERROR', error.message))
  },
  githubLogin({ commit }) {
    return api.githubLogin()
      .then(({ user: { uid, email, photoURL, refreshToken, displayName } }) => {
        commit('SET_USER', { user: { uid, photoURL, refreshToken, displayName, email } })
        return Promise.resolve()
      })
      .catch((error) => commit('PUSH_ERROR', error.message))
  },
  logout({ commit }) {
    return api.logout()
      .then(() => {
        commit('SET_USER', { user: {} })
        commit('EMPTY_ORDERS') 
        commit('EMPTY_RESTAURANTS' )
      })
      .catch((error) => commit('PUSH_ERROR', error.message))
  },
  signup({ commit }, { email, password, name }) {
    return api.signup(email, password, name)
      .then(({ uid, email, refreshToken, displayName }) => {
        commit('SET_USER', { user: { uid, refreshToken, displayName, email } })
        return Promise.resolve()
      })
      .catch((error) => commit('PUSH_ERROR', error.message))
  },
  submitOrder({ commit, state }, { order, restaurant }) {
    api.saveOrder(order, state.user.uid)
    api.saveRestaurant(restaurant)
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
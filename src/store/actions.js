import api from '../api'

export default {
  login({ commit }, { email, password }) {
    return api.login(email, password)
      .then(({ user: { uid, email, photoURL, refreshToken, displayName } }) => {
        commit('SET_USER', { user: { uid, photoURL, refreshToken, displayName } })
        return Promise.resolve()
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  googleLogin({ commit }) {
    return api.googleLogin()
      .then(({ user: { uid, email, photoURL, refreshToken, displayName } }) => {
        commit('SET_USER', { user: { uid, photoURL, refreshToken, displayName } })
        return Promise.resolve()
      }) 
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  githubLogin({ commit }) {
    return api.githubLogin()
      .then(({ user: { uid, email, photoURL, refreshToken, displayName } }) => {
        commit('SET_USER', { user: { uid, photoURL, refreshToken, displayName } })
        return Promise.resolve()
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  getNearbyRestaurants({ commit }) {
    return api.getNearbyRestaurants()
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }
}
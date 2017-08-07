import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

const config = {
  apiKey: FIREBASE_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID
}

const app = firebase.initializeApp(config)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
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

console.log(app)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

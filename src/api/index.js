import firebase from 'firebase'
import axios from 'axios'

export default {
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider() 
    return firebase.auth().signInWithPopup(provider)
  },
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return firebase.auth().signInWithPopup(provider)
  },
  saveOrder(order, uid) {
    const orderId = firebase.database().ref('orders').push().key
    firebase.database().ref(`orders/${orderId}`).set(order)
    firebase.database().ref(`users/${uid}/orders/${orderId}`).set(true)
  },
  updateOrder(order) {
    firebase.database().ref(`orders/${order.id}`).set(order)
  },
  saveRestaurant(restaurant) {
    const { id: restaurantId } = restaurant
    firebase.database().ref(`restaurants/${restaurantId}`).set(restaurant)
  },
  getOrders(callback) {
    const orders = firebase.database().ref(`/orders`)
    orders.once('value', (snapshot) => {
      callback(snapshot.val())
    })
  },
  getUserData(uid, callback) {
    const user = firebase.database().ref(`users/${uid}`)
    user.once('value', (snapshot) => {
      callback(snapshot.val())
    })
  },
  getRestaurants(callback) {
    const restaurants = firebase.database().ref('restaurants')
    restaurants.once('value', (snapshot) => {
      callback(snapshot.val())
    })
  },
  watchData(data, callback) {
    const ref = firebase.database().ref(data)
    ref.on('child_added', (snapshot) => {
      callback(snapshot.key, snapshot.val())
    }) 
  },
}
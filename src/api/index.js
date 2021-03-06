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
  signup(email, password, name) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        return user.updateProfile({
          displayName: name
        })
      })
      .then(() => Promise.resolve(firebase.auth().currentUser))
      .catch(error => Promise.reject(error))
  },
  logout() {
    return firebase.auth().signOut()
  },
  saveOrder(order, uid) {
    const orderId = firebase.database().ref('orders').push().key
    order.id = orderId
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
  watchData(data, callback) {
    const ref = firebase.database().ref(data)
    ref.on('child_added', (snapshot) => {
      callback(snapshot.key, snapshot.val())
    }) 

    ref.on('child_changed', (snapshot) => {
      callback(snapshot.key, snapshot.val())
    })
  },
}
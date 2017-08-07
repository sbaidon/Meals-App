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
  getNearbyRestaurants() {
    
  }
}
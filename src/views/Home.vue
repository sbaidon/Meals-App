<template>
  <div class="container is-fluid">
    <div class="navbar columns is-marginless is-mobile">
      <div class="column is-narrow has-text-centered">
        <figure class="image is-64x64 is-centered">
          <img class="image--round" :src="user.photoURL || defaultProfile">
        </figure>
        <p>{{ user.displayName }}</p>
      </div>
      <div class="column has-text-right">
        <a class="button is-danger" @click="logout">Logout</a>
      </div>
    </div>
    <tabs :tabs="tabs"></tabs>
    <div class="field control">
      <a class="button is-warning" @click="isModalOpen = true">Add a new order</a>
    </div>
    <router-view class="section"></router-view>
    <modal @closeModal="handleCloseModal" v-if="isModalOpen">
      <map-view @placeChanged="setRestaurant"></map-view>
      <div class="field column is-12 has-text-centered">
        <a class="button is-warning is-fullwidth" @click="submitOrder">Add Order</a>
      </div>
    </modal>
  </div>
</template>

<script>
import Tabs from '../components/Tabs.vue'
import Modal from '../components/Modal.vue'
import MapView from '../components/MapView.vue'
import firebase from 'firebase'

export default {
  name: 'home',
  components: { Tabs, Modal, MapView },
  data () {
    return {
      tabs: ['Active', 'History'],
      isModalOpen: false,
      defaultProfile: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y',
      restaurant: undefined
    }
  },
  mounted() {
    this.$store.dispatch('watchData')
  },
  computed: {
      user() {
        return this.$store.state.user
      },
      order() {
        return  {
          meals: [],
          status: 'Ordered',
          restaurant: this.restaurant.id,
          by: this.user.email
        }
      },
  },
  beforeRouteEnter (to, from, next) {
    if(firebase.auth().currentUser) {
      next()
      return
    }
    next(new Error('User must be authenticated'))
  },
  methods: {
    submitOrder() {
      if (!this.restaurant) return this.$store.commit('PUSH_ERROR', 'Please select a restaurant') 
      this.$store.dispatch('submitOrder',  { order: this.order, restaurant: this.restaurant })
      this.handleCloseModal()
    },
    setRestaurant({ photos, formatted_address: address, id, name, international_phone_number: number }) {
      let image = ''
      if (photos) {
        image = photos[0].getUrl({ maxWidth: 248, maxHeight: 248 })
      }
      this.restaurant = { image, address, id, name, number }
    },
    handleCloseModal() {
      this.isModalOpen = false
      this.resetOrder()
    },
    resetOrder() {
      this.restaurant = undefined 
    },
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/'))
    }
  }
}
</script>

<style lang='sass'>
.image--round 
  border-radius: 50%

.is-centered
  margin-right: auto
  margin-left: auto
</style>
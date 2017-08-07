<template>
  <div class="container is-fluid">
    <div class="navbar columns is-marginless">
      <div class="column has-text-centered">
        <figure class="image is-64x64">
          <img class="image--round" :src="user.photoURL">
        </figure>
      </div>
    </div>
    <tabs :tabs="tabs"></tabs>
    <div class="columns is-multiline">
      <div class="column is-narrow">
        <a class="button is-warning" @click="isModalOpen = true">Add a new order</a>
      </div>
      <div clas="column is-12" v-for="(order, index) in allOrders" :key="index">
        <p>{{ order }}</p>
      </div>
    </div>
    <modal @closeModal="isModalOpen = false" v-if="isModalOpen">
      <map-view @placeChanged="setRestaurant"></map-view>
      <div class="field column is-6">
        <label class="label has-text-white">Meal</label>
        <div class="control">
          <input class="input" type="text" placeholder="Meal" v-model="meal">
        </div>
      </div>
      <div class="field column is-6">
        <label class="label has-text-white">Price</label>
        <div class="control">
          <input class="input" type="number" placeholder="Price" v-model="price">
        </div>
      </div>
      <div class="field column is-12 has-text-centered">
        <a class="button is-warning is-fullwidth" @click="submitOrder">Submit Order</a>
      </div>
    </modal>
    <router-view></router-view>
  </div>
</template>

<script>
import Tabs from '../components/Tabs.vue'
import Modal from '../components/Modal.vue'
import MapView from '../components/MapView.vue'

export default {
  name: 'home',
  components: { Tabs, Modal, MapView },
  data () {
    return {
      tabs: ['History', 'Active'],
      isModalOpen: false,
      price: 0,
      meal: '',
      restaurant: { }
    }
  },
  mounted() {
    this.$store.dispatch('getOrders')
    this.$store.dispatch('getUserData')
    this.$store.dispatch('getRestaurants') 
  },
  computed: {
      user() {
        return this.$store.state.user
      },
      order() {
        return  {
          meal: this.meal,
          restaurant: this.restaurant.id,
          price: this.price
        }
      },
      allOrders() {
        return this.$store.getters.allOrders
      }
  },
  methods: {
    submitOrder() {
      this.$store.dispatch('submitOrder',  { order: this.order, restaurant: this.restaurant }) 
    },
    setRestaurant({ formatted_address: address, id, name, international_phone_number: number }) {
      this.restaurant = { address, id, name, number } 
    }
  }
}
</script>

<style lang='sass'>
.image--round 
  border-radius: 50%

.image--round:hover
  border: 2px solid goldenrod
</style>
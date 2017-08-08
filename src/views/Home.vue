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
    <div class="field">
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

export default {
  name: 'home',
  components: { Tabs, Modal, MapView },
  data () {
    return {
      tabs: ['History', 'Active'],
      isModalOpen: false,
      restaurant: {}
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
  methods: {
    submitOrder() {
      this.$store.dispatch('submitOrder',  { order: this.order, restaurant: this.restaurant })
      this.handleCloseModal()
    },
    setRestaurant({ photos, formatted_address: address, id, name, international_phone_number: number }) {
      let image = ''
      if (photos.length) {
        image = photos[0].getUrl({ maxWidth: 248 })
      }
      this.restaurant = { image, address, id, name, number }
    },
    handleCloseModal() {
      this.isModalOpen = false
      this.resetOrder()
    },
    resetOrder() {
      this.restaurant = {}
    },

  }
}
</script>

<style lang='sass'>
.image--round 
  border-radius: 50%

.image--round:hover
  border: 2px solid goldenrod
</style>
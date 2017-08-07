<template>
 <div class="container is-fluid">
    <div class="navbar columns is-marginless">
      <div class="column has-text-centered">
        <figure class="image is-64x64">
          <img  class="image--round" :src="user.photoURL">
        </figure>
      </div>
    </div>
    <tabs :tabs="tabs"></tabs>
    <div class="columns">
      <div class="column is-narrow">
        <a class="button is-warning" @click="isModalOpen = true">Add a new order</a>
      </div>
    </div>
    <modal @closeModal="isModalOpen = false" :isOpen="isModalOpen" v-if="isModalOpen">
      <map-view></map-view>
      <div class="field full-width">
        <p class="control">
            <input  class="input" type="text" placeholder="Meal">
        </p>
      </div> 
      <div class="field full-width">
        <p class="control">
          <input  class="input" type="number" placeholder="Price">
        </p>
      </div>
      <div class="field full-width">
        <a class="button is-warning" @click="submitOrder">Submit Order</a>
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
      isModalOpen: false
    }
  },
  mounted() {
  },
  computed: {
      user() {
        return this.$store.state.user
      }
  },
  methods: {
    submitOrder() {
      console.log('submit order...')
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
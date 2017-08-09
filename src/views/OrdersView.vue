
<template>
  <div class="orders container">
    <order v-for="(order, index) in displayedOrders" :order="order" :key="index">
      <p class="control" v-if="!hasAddedMeal(order.meals)" @click="addMeal(order)">
        <span class="icon is-small"><i class="fa fa-plus"></i></span>
      </p>
    </order>
      <modal v-if="isModalOpen" @closeModal="handleCloseModal">
        <div class="field column is-6">
          <label class="label has-text-white">Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="Name" v-model="name">
          </div>
        </div>
        <div class="field column is-6">
          <label class="label has-text-white">Price</label>
          <div class="control">
            <input class="input" type="number" placeholder="Price" v-model="price">
          </div>
        </div>
        <div class="field column is-12 has-text-centered">
          <a class="button is-warning is-fullwidth" @click="saveMeal(name, price)">Save Meal</a>
        </div>
      </modal>
   </div>
</template>


<script>
import Order from '../components/Order.vue'
import Modal from '../components/Modal.vue'

export default {
    name: 'OrdersView',
    components: { Order, Modal },
    props: ['view'],
    data() {
        return {
          isModalOpen: false,
          selectedOrder: {},
          name: '',
          price: 0,
        }
    },
    computed: {
      activeOrders() {
        return this.$store.getters.activeOrders
      },
      historyOrders() {
        return this.$store.getters.historyOrders
      },
      by() {
        return this.$store.state.user.email
      },
      user() {
        return this.$store.state.user
      },
      displayedOrders() {
        return this.view === 'active' ? this.activeOrders : this.historyOrders
      }
    },
    
    methods: {
      addMeal(order) {
        this.isModalOpen = true
        this.selectedOrder = order 
      },
      isOrderFinalized(status) {
        return status === 'Finalized'
      },
      hasAddedMeal(meals) {
        if (!meals) return false
        return meals.some(meal => meal.by === this.user.email) 
      },
      handleCloseModal() {
        this.isModalOpen = false
        this.selectedOrder = {}
        this.name = ''
        this.price = 0
      },
      saveMeal(name, price) {
        if (!this.selectedOrder.meals) {
          this.selectedOrder.meals = []
        }
        this.selectedOrder.meals.push({ name, price, by: this.by })
        this.$store.dispatch('updateOrder', { order: this.selectedOrder })
        this.handleCloseModal()
      }
    }
}

</script>

<style lang='sass'>
   .order
     overflow-y: scroll
     height: 70vh 
</style>
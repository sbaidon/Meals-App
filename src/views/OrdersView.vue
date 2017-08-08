
<template>
  <div class="section">
    <order v-for="(order, index) in allOrders" :order="order" :key="index">
      <a class="level-item" @click="addMeal(order)">
        <span class="icon is-small"><i class="fa fa-plus"></i></span>
      </a>
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
    data() {
        return {
          isModalOpen: false,
          selectedOrder: {},
          name: '',
          price: 0
        }
    },
    computed: {
      allOrders() {
        return this.$store.getters.allOrders
      },
      by() {
        return this.$store.state.user.email
      }
    },
    methods: {
      addMeal(order) {
        if (order.meals && order.meals.some(meal => meal.by === this.by)) {
          console.log('YOU ALREADY HAVE A MEAL REGISTERED')
          return
        }
        this.isModalOpen = true
        this.selectedOrder = order
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

<style>
</style>
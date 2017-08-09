
<template>
<article class="media wrap">
  <figure class="media-left">
    <p class="image is-128x128 is-clipped">
      <img :src="restaurant.image || defaultImage">
    </p>
  </figure> 
  <div class="media-content">
    <div class="content">
      <h1 class="title is-4">{{ restaurant.name }}</h1>
      <h2 class="subtitle is-6">{{ restaurant.address }}</h2>
      <p>
        <span class="icon is-small">
          <i class="fa fa-phone"></i>
        </span>
        {{ restaurant.number }}
      </p>
    </div>
    <div class="field is-grouped is-grouped-multiline">
      <div class="control tags has-addons">
        <span class="tag is-primary">Total</span>
        <span class="tag is-secondary">${{ totalAmount }}</span>
      </div>
      <slot name="tags"></slot> 
    </div>
      
    <div class="field is-grouped is-grouped-multiline">
      <div class="control select is-small">
        <select class="select is-small" @change="updateOrder" :disabled="isFinalized">
          <option v-for="(status, index) in statuses" :key="index" :value="status" :selected="order.status === status">{{ status }}</option>
        </select>
      </div>
      <p class="control" @click="isExpanded = !isExpanded" v-if="order.meals">
        <span class="icon is-small"><i class="fa fa-expand"></i></span>
      </p>
      <slot name="controls"></slot>
    </div>
    <meal v-for="(meal, index) in order.meals" :meal="meal" :key="index" v-if="isExpanded">
      <p v-if="by === meal.by && !isFinalized" slot="controls" class="control" @click="selectMeal(index)">
        <span class="icon is-small"><i class="fa fa-edit"></i></span>
      </p>
    </meal>
  </div>
  <modal v-if="isModalOpen" @closeModal="handleCloseModal">
    <div class="field column is-6">
        <label class="label has-text-white">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Name" v-model="selectedMeal.name">
        </div>
      </div>
      <div class="field column is-6">
        <label class="label has-text-white">Price</label>
        <div class="control">
          <input class="input" type="number" placeholder="Price" v-model.number="selectedMeal.price">
        </div>
      </div>
      <div class="field column is-12 has-text-centered">
        <a class="button is-warning is-fullwidth" @click="updateMeal()">Update Meal</a>
      </div>
  </modal>
</article>
</template>

<script>
import Meal from './Meal.vue'
import Modal from './Modal.vue'

export default {
  name: 'order',
  components: { Meal, Modal },
  data() {
    return {
      isExpanded: false,
      isModalOpen: false,
      defaultImage: 'http://bulma.io/images/placeholders/128x128.png',
      statuses: ['Ordered', 'Delivered', 'Finalized'],
      selectedMeal: { price: 0, name: '', by: '' }
    }
  },
  props: {
    order: {
      type: Object
    },
  },
  computed: {
    restaurant() {
      return this.$store.state.restaurants[this.order.restaurant]
    },
    isFinalized() {
      return this.order.status === 'Finalized'
    },
    disabled() {
      return this.isFinalized ? 'is-disabled' : ''
    },
    totalAmount() {
      if (this.order.meals) {
        return this.order.meals.map(meal => meal.price).reduce((a, b) => a + b)
      }
      return 0
    },
    by() {
      return this.$store.state.user.email
    }
  },
  methods: {
    updateOrder(e) {
      const updatedOrder = {}
      Object.assign(updatedOrder, this.order)
      updatedOrder.status = e.target.value
      this.$store.dispatch('updateOrder', { order: updatedOrder })
    },
    handleCloseModal() {
      this.isModalOpen = false
      this.selectedMeal = { price: 0, name: '', by: '' } 
    },
    selectMeal(index) {
      this.isModalOpen = true 
      Object.assign(this.selectedMeal, this.order.meals[index])
      this.selectedIndex = index
    },
    updateMeal() {
      const updatedOrder = {}
      Object.assign(updatedOrder, this.order)
      updatedOrder.meals = [...this.order.meals] 
      updatedOrder.meals.splice(this.selectedIndex, 1, this.selectedMeal)
      this.$store.dispatch('updateOrder', { order: updatedOrder })
      this.handleCloseModal()
    }
  }
}
</script>

<style lang='sass'>
  .wrap
    flex-flow: row wrap

</style>

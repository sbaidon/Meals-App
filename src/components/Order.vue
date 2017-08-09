
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
      <div class="tags has-addons">
        <span class="tag is-primary">By</span>
        <span class="tag is-secondary">{{ order.by }}</span>
      </div>
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
      <slot></slot>
    </div>
    
    


    
    <meal v-for="(meal, index) in order.meals" :meal="meal" :key="index" v-if="isExpanded"></meal>
  </div>
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
  },
  methods: {
    updateOrder(e) {
      const updatedOrder = {}
      Object.assign(updatedOrder, this.order)
      updatedOrder.status = e.target.value
      this.$store.dispatch('updateOrder', {
        order: updatedOrder
      })
    }
  }
}
</script>

<style lang='sass'>
  .wrap
    flex-flow: row wrap

</style>

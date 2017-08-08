<template>
  <article class="media">
  <figure class="media-left">
    <p class="image is-64x64">
      <img :src="restaurant.image">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{{ restaurant.name }}</strong> <small>{{ restaurant.address }}</small> <small>{{ restaurant.number }}</small>
      </p>
    </div>
    <nav class="level is-mobile">
      <div class="level-left">
        <a class="level-item">
          <span>Status:</span> 
        </a>
        <a class="level-item">
          <span class="tag is-primary is-medium">{{ order.status }}</span>
        </a>
        <a class="level-item">
          <span>By:</span> 
        </a>
        <a class="level-item">
          <span class="tag is-secondary is-medium">{{ order.by }}</span>
        </a>
        <a class="level-item" v-if="order.meals" @click="isExpanded = !isExpanded" :class="{'has-text-danger': isExpanded }">
          <span class="icon is-small"><i class="fa fa-expand"></i></span>
        </a>
        <slot></slot>
      </div>
    </nav>
    <meal v-for="(meal, index) in order.meals" :meal="meal" :key="index" v-if="isExpanded"></meal>
  </div>
  <div class="media-right">
    <button class="delete"></button>
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
        isModalOpen: false
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
    by() {
      
    }
  },
  methods: {
    addMeal() {
      console.log('adding meal')
    }
  }
}
</script>

<style lang='sass'>

</style>

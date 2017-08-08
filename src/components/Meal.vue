<template>
  <article class="media">
      <nav class="level is-mobile">
        <div class="level-left">
            <a class="level-item">
              <span>Name:</span> 
            </a>
            <a class="level-item">
              <span class="tag is-primary is-medium">{{ meal.name }}</span>
            </a>
            <a class="level-item">
              <span>Price:</span> 
            </a>
            <a class="level-item">
              <span class="tag is-primary is-medium">${{ meal.price }}</span>
            </a>
            <a class="level-item">
              <span>By:</span> 
            </a>
            <a class="level-item">
              <span class="tag is-secondary is-medium">{{ meal.by }}</span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-pencil"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-minus-circle"></i></span>
            </a>
        </div>
      </nav>
    </article> 
</template>

<script>
export default {
  name: 'meal', 
  props: ['meal'],
  data() {
    return {
      isExpanded: false 
    }
  },
}
</script>

<style>

</style>

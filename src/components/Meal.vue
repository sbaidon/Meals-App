<template>
  <article class="media">
      <figure class="media-left">
        <span class="icon">
          <i class="fa fa-cutlery"></i>
        </span> 
      </figure>
      <div class="media-content">
      <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <div class="tags has-addons">
            <span class="tag is-primary">Name</span>
            <span class="tag is-secondary">{{ meal.name }}</span>
          </div>
        </div>

        <div class="control">
          <div class="tags has-addons">
            <span class="tag is-primary">Price</span>
            <span class="tag is-secondary">${{ meal.price }}</span>
          </div>
        </div>

        <div class="control">
          <div class="tags has-addons">
            <span class="tag is-primary">By</span>
            <span class="tag is-secondary">{{ meal.by }}</span>
          </div>
        </div>
      </div> 
      <nav class="level is-mobile">
        <div class="level-left">
           <slot></slot> 
        </div>
      </nav>
      </div>
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

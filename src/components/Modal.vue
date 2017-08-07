<template>
  <div class="modal" :class="{ 'is-active': isOpen }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <slot></slot> 
    </div>
    <button class="modal-close is-large" @click="closeModal"></button>
  </div>
</template>

<script>

export default {
  name: 'modal',
  props: ['isOpen'],
  data() {
      return {

      }
  },
  methods: {
    closeModal() {
        this.$emit('closeModal')
    }
  }
}
</script>

<style>
  
</style>

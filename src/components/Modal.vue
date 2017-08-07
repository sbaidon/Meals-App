<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content columns is-multiline">
      <slot></slot> 
    </div>
    <button class="modal-close is-large" @click="closeModal"></button>
  </div>
</template>

<script>

export default {
  name: 'modal',
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

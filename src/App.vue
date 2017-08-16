<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <div class="error" v-if="hasErrors">
    <div class="notification is-primary is-overlay"  v-for="(error, index) in errors" :key="index">
      {{ error }} 
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  created() {
    this.$router.onError((error) => this.$store.commit('PUSH_ERROR', error.message))
  },
  computed: {
    hasErrors() {
      return this.errors.length
    },
    errors() {
      return this.$store.state.errors
    }
  },
  methods: {
    dismissError() {
      this.reset()
    },
    reset() {
      clearTimeout(this.timeout)
      this.$store.commit('CLEAR_ERRORS') 
    }
  },
  watch: {
    errors(error) {
      if (this.hasErrors) {
        this.timeout = setTimeout(() => {
          this.reset()
        }, 3000)
      }
    }
  } 
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/initial-variables"
@import url('https://fonts.googleapis.com/css?family=Asap');

$pink: #ffb3b3
$pink-invert: #fff
$family-sans-serif: 'Asap', serif; 
$primary: $pink
$primary-invert: $pink-invert
$danger: $orange
$family-primary: $family-sans-serif 

@import '~bulma'
@import '~font-awesome/css/font-awesome.css'

#app 
  height: 100vh

.navbar 
  margin-top: 10px

.slide-fade-enter-active 
  transition: all .3s ease

.slide-fade-leave-active 
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter, .slide-fade-leave-to 
  transform: translateX(10px)
  opacity: 0

.error
  position: absolute
  top: 20px
  right: 20px
  z-index: 10000
</style>

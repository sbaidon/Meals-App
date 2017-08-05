<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/initial-variables"

$blue: #72d0eb
$pink: #ffb3b3
$pink-invert: #fff
$family-serif: "Merriweather", "Georgia", serif
$primary: $pink
$primary-invert: $pink-invert
$danger: $orange
$family-primary: $family-serif

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

</style>

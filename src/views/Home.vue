<template>
 <div class="container is-fluid">
    <div class="navbar columns">
      <div class="column">
        <a class="button is-warning">Add a new order</a>
      </div>
      <div class="column has-text-centered">
        <p>User</p>        
      </div>
    </div>
    <tabs :tabs="tabs"></tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import Tabs from '../components/Tabs.vue'

export default {
  name: 'home',
  components: { Tabs },
  data () {
    return {
      tabs: ['History', 'Active'] 
    }
  }
}
</script>

<style>


</style>
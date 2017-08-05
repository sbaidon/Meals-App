<template>
  <div class="tabs is-medium">
  <ul>
    <li v-for="(tab,index) in tabs" :key="index" @click="activeTab = index" :class="{'is-active': isActive(index) }">
        <a>{{ tab }}</a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'tabs',
  props: { 
    tabs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeTab: 0
    }
  },
  methods: {
    isActive(tab) {
      return tab === this.activeTab
    }
  } 
}
</script>

<style>

</style>
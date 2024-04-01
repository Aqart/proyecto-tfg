<template>
  <div>
    <header>
      <NavbarConsumibleComponent />
    </header>
      <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import NavbarConsumibleComponent from '../components/NavbarConsumibleComponent.vue'
export default {
  components: {
      RouterView,
      NavbarConsumibleComponent
  }
}
</script>

<style>

</style>
<template>
  <div>
      <NavbarGastosComponent />
      <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import NavbarGastosComponent from '../components/NavbarGastosComponent.vue'
export default {
  components: {
      RouterView,
      NavbarGastosComponent
  }
}
</script>

<style>

</style>
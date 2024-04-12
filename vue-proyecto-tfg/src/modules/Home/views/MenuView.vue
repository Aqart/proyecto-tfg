<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:justify-between items-center">
    <ButtonMenuComponent name="Consumibles" />
    <ButtonMenuComponent name="Gastos-Generales" />
    <ButtonMenuComponent name="Maquinas" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    ButtonMenuComponent: defineAsyncComponent(() =>
      import('@/modules/Home/components/ButtonMenuComponent.vue')
    )
  }
}
</script>

<style></style>

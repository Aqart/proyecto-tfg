<template>
  <div
    class="flex flex-col gap-3 sm:flex-row justify-start sm:justify-between items-center w-full sm:w-auto"
  >
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

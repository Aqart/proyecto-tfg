<template>
  <div class="space-y-4">
    <div
      class="flex flex-col sm:grid sm:grid-cols-2 gap-3 justify-center sm:justify-start items-center sm:items-start"
    >
      <ButtonMenuComponent name="Calcular Costes" path="calculadora" class="w-full p-3" />
      <ButtonMenuComponent name="Controles horarios" path="controles-horarios" class="w-full p-3" />
    </div>
    <div
      class="flex flex-col sm:grid sm:grid-cols-3 gap-3 justify-center sm:justify-start items-center sm:items-start"
    >
      <ButtonMenuComponent name="Consumibles" path="consumibles" class="w-full p-3" />
      <ButtonMenuComponent name="Gastos-Generales" path="gastos-generales" class="w-full p-3" />
      <ButtonMenuComponent name="Maquinas" path="maquinas" class="w-full p-3" />
      <ButtonMenuComponent name="Transportes" path="transportes" class="w-full p-3" />
      <ButtonMenuComponent name="Trabajadores" path="trabajadores" class="w-full p-3" />
      <ButtonMenuComponent name="Usuarios" path="users" class="w-full p-3" />
    </div>
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
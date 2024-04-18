<template>
  <div class="space-y-4">
    <div
      class="flex flex-col sm:grid sm:grid-cols-2 gap-3 justify-center sm:justify-start items-center sm:items-start"
    >
      <ButtonMenuComponent
        name="Calcular Costes"
        path="calculadora"
        class="w-full p-3"
        :icon="['fas', 'map']"
        image="fondo-2"
      />
      <ButtonMenuComponent
        name="Controles horarios"
        path="controles-horarios"
        :icon="['fas', 'map']"
        image="fondo-9"
      />
    </div>
    <div
      class="flex flex-col sm:grid sm:grid-cols-3 gap-3 justify-center sm:justify-start items-center sm:items-start"
    >
      <ButtonMenuComponent
        name="Consumibles"
        path="consumibles"
        :icon="['fas', 'map']"
        image="fondo-9"
      />
      <ButtonMenuComponent
        name="Gastos-Generales"
        path="gastos-generales"
        :icon="['fas', 'map']"
        image="fondo-5"
      />
      <ButtonMenuComponent name="Maquinas" path="maquinas" :icon="['fas', 'map']" image="fondo-6" />
      <ButtonMenuComponent
        name="Transportes"
        path="Transportes"
        :icon="['fas', 'map']"
        image="fondo-8"
      />
      <ButtonMenuComponent
        name="Trabajadores"
        path="trabajadores"
        :icon="['fas', 'map']"
        image="fondo-3"
      />
      <ButtonMenuComponent
        name="Usuarios"
        path="users"
        class="w-full p-3"
        :icon="['fas', 'map']"
        image="fondo-4"
      />
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
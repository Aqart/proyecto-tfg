<template>
  <div class="space-y-4">
    <div
      class="flex flex-col sm:grid sm:grid-cols-2 gap-3 justify-center sm:justify-start items-center sm:items-start"
    >
      <ButtonMenuComponent
        name="Calcular Costes"
        path="calculadora"
        :icon="['fas', 'calculator']"
        image="fondo-7"
      />
      <ButtonMenuComponent
        name="Controles horarios"
        path="controles-horarios"
        :icon="['fas', 'fa-list-check']"
        image="fondo-9"
      />
    </div>
    <div
      class="flex flex-col sm:grid sm:grid-cols-3 gap-3 justify-center sm:justify-start items-center sm:items-start"
    >
      <ButtonMenuComponent
        name="Consumibles"
        path="consumibles"
        :icon="['fas', 'fa-droplet']"
        image="fondo"
      />
      <ButtonMenuComponent
        name="Gastos Energéticos"
        path="gastos-energeticos"
        :icon="['fas', 'fa-bolt']"
        image="fondo-5"
      />
      <ButtonMenuComponent
        name="Maquinas"
        path="maquinas"
        :icon="['fas', 'fa-oil-well']"
        image="fondo-6"
      />
      <ButtonMenuComponent
        name="Transportes"
        path="Transportes"
        :icon="['fas', 'fa-truck']"
        image="fondo-8"
      />
      <ButtonMenuComponent
        name="Trabajadores"
        path="trabajadores"
        :icon="['fas', 'fa-person-digging']"
        image="fondo-3"
      />
      <ButtonMenuComponent
        name="Usuarios"
        path="usuarios"
        :icon="['fas', 'fa-users']"
        image="fondo-4"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    ButtonMenuComponent: defineAsyncComponent(
      () => import('@/modules/Home/components/ButtonMenuComponent.vue')
    )
  }
}
</script>

<style></style>

<template>
  <div class="space-y-4">
    <div
      class="flex flex-col sm:grid sm:grid-cols-2 gap-3 justify-center sm:justify-start items-center sm:items-start"
    >
      <ButtonMenuComponent
        name="Calcular Costes"
        path="calculadora"
        :icon="['fas', 'calculator']"
        :image="fondo11"
      />
      <ButtonMenuComponent
        name="Controles horarios"
        path="controles-horarios"
        :icon="['fas', 'fa-list-check']"
        :image="fondo12"
      />
    </div>
    <div
      class="flex flex-col sm:grid sm:grid-cols-3 gap-3 justify-center sm:justify-start items-center sm:items-start"
    >
      <ButtonMenuComponent
        name="Maquinas"
        path="maquinas"
        :icon="['fas', 'fa-oil-well']"
        :image="fondo6"
      />
      <ButtonMenuComponent
        name="Consumibles"
        path="consumibles"
        :icon="['fas', 'fa-droplet']"
        :image="fondo"
      />
      <ButtonMenuComponent
        name="Gastos Energéticos"
        path="gastos-energeticos"
        :icon="['fas', 'fa-bolt']"
        :image="fondo5"
      />
      <ButtonMenuComponent
        name="Gastos Generales"
        path="gastos-generales"
        :icon="['fas', 'fa-euro-sign']"
        :image="fondo10"
      />
      <ButtonMenuComponent
        name="Transportes"
        path="Transportes"
        :icon="['fas', 'fa-truck']"
        :image="fondo8"
      />
      <ButtonMenuComponent
        name="Trabajadores"
        path="trabajadores"
        :icon="['fas', 'fa-person-digging']"
        :image="fondo3"
      />
      <ButtonMenuComponent
        name="Usuarios"
        path="usuarios"
        :icon="['fas', 'fa-users']"
        :image="fondo4"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import fondo from '@/assets/images/resources/fondo.jpg'
import fondo3 from '@/assets/images/resources/fondo-3.jpg'
import fondo4 from '@/assets/images/resources/fondo-4.jpg'
import fondo5 from '@/assets/images/resources/fondo-5.jpg'
import fondo6 from '@/assets/images/resources/fondo-6.jpg'
import fondo7 from '@/assets/images/resources/fondo-7.jpg'
import fondo8 from '@/assets/images/resources/fondo-8.jpg'
import fondo9 from '@/assets/images/resources/fondo-9.jpg'
import fondo10 from '@/assets/images/resources/fondo-10.jpg'
import fondo11 from '@/assets/images/resources/fondo-11.jpg'
import fondo12 from '@/assets/images/resources/fondo-12.jpg'

export default {
  data() {
    return {
      fondo,
      fondo3,
      fondo4,
      fondo5,
      fondo6,
      fondo7,
      fondo8,
      fondo9,
      fondo10,
      fondo11,
      fondo12
    }
  },
  components: {
    ButtonMenuComponent: defineAsyncComponent(() =>
      import('@/modules/Home/components/ButtonMenuComponent.vue')
    )
  }
}
</script>

<template>
  <div>
    <CalculadoraComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    CalculadoraComponent: defineAsyncComponent(
      () => import('@/modules/Calculadora/components/CalculadoraComponent.vue')
    )
  }
}
</script>

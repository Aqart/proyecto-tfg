<template>
  <div>
    <AddGastoComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AddGastoComponent: defineAsyncComponent(
      () => import('@/modules/GastosEnergeticos/components/AddGastoComponent.vue')
    )
  }
}
</script>

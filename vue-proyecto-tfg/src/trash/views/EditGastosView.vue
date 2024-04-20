<template>
  <div>
    <EditGastoComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    EditGastoComponent: defineAsyncComponent(
      () => import('@/modules/GastosEnergeticos/components/EditGastoComponent.vue')
    )
  }
}
</script>

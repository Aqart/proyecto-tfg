<template>
  <div>
    <AddConsumibleComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    AddConsumibleComponent: defineAsyncComponent(
      () => import('@/modules/Consumible/components/AddConsumibleComponent.vue')
    )
  }
}
</script>

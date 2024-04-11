<template>
  <div>
    <EditConsumibleComponent />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    EditConsumibleComponent: defineAsyncComponent(
      () => import('@/modules/Consumible/components/EditConsumibleComponent.vue')
    )
  }
}
</script>

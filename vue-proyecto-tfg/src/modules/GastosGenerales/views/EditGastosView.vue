<template>
  <div>
    <EditGastoComponent />
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue'
  
  export default {
    components: {
      EditGastoComponent: defineAsyncComponent(() => import('@/modules/GastosGenerales/components/EditGastoComponent.vue'))
    }
  }

</script>
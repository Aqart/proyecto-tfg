<template>
  <div>
    <ConsumibleComponent/>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue'
  
  export default {
    components: {
      ConsumibleComponent: defineAsyncComponent(() => import('@/modules/Consumible/components/ConsumibleComponent.vue'))
    }
  }

</script>
<template>
    <div>
      <GastosComponent />
    </div>
  </template>
  
  <script>
    import { defineAsyncComponent } from 'vue'
    
    export default {
      components: {
        GastosComponent: defineAsyncComponent(() => import('@/modules/GastosGenerales/components/GastosComponent.vue'))
      }
    }
  
  </script>
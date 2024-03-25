<template>
  <div>
    <ConsumibleComponent :title=title />
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue'
  import axios from 'axios'
  
  export default {
    data() {
      return {
        title: 'Consumibles',
        consumibles: null
      }
    },
    components: {
      ConsumibleComponent: defineAsyncComponent(() => import('@/modules/Consumible/components/ConsumibleComponent.vue'))
    },
    mounted() {
      axios
        .get('')
        .then(response => (this.consumibles = response.json()))
    }
  }

</script>
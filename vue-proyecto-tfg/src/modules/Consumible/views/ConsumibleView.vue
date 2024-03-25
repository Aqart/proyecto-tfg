<template>
  <div>
    <ConsumibleComponent :consumibles="consumibles" />
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue'
  import authApi from '@/api/stoneApi'
  
  export default {
    data() {
      return {
        consumibles: []
      }
    },
    components: {
      ConsumibleComponent: defineAsyncComponent(() => import('@/modules/Consumible/components/ConsumibleComponent.vue'))
    },
    mounted() {
        const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMTM5NzM3NCwiZXhwIjoxNzExNDExNzc0fQ.HxnY0VQoGhdiH9bsT5eppSXvDyRBYruqCcfKYj8xqE8"
        const config = {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}`}
        }
  
        async function getConsumibles() {
          try {
            const response = await authApi.get('/consumibles', config);
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        }
  
        getConsumibles().then(data => {
          this.consumibles = data;
        });
    }
  }

</script>
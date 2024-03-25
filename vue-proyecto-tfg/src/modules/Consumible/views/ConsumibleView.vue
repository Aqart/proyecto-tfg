<template>
  <div>
    <ConsumibleComponent :title=title />
    <ConsumibleComponent :consumibles=consumibles />
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue'
  import axios from 'axios'
  
  export default {
    data() {
      return {
        title: 'Consumibles',
        consumibles: []
      }
    },
    components: {
      ConsumibleComponent: defineAsyncComponent(() => import('@/modules/Consumible/components/ConsumibleComponent.vue'))
    },
    mounted() {
      const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMTM4NzI2NSwiZXhwIjoxNzExMzkwODY1fQ.PDzY-QkVDDAnhBYEIzKHGKCggQcbU8b_MvHJqL8b1Mw"
      const config = {
        headers: { Authorization: `Bearer ${AUTH_TOKEN}`}
      }

      // Específicamos los valores por defecto de cada consulta
      const instance = axios.create({
        baseURL: "http://localhost:3000",
        headers: { Authorization: `Bearer ${AUTH_TOKEN}`}
      });

      async function getConsumibles() {
        try {
          const response = await instance.get('/consumibles', config);
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
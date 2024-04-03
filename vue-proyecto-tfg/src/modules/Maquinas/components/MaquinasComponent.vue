<template>
    <TablaComponent :tableHead="getMaquinas" :tableBody="getMaquinas" />
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import { defineAsyncComponent } from 'vue';
  export default {
    components: { 
      TablaComponent: defineAsyncComponent(() => import('@/modules/shared/components/TablaComponent.vue')),
  },
      data() {
          return {
              tableBody: []
          }
      },
      computed: {
        ...mapGetters('Maquinas', ['getMaquinas']),
        ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar'])
      },
      watch: {
        getMaquinas() {
          this.fillTableBody()
        }
      },
      methods: {
        async fillTableBody() {
          this.tableBody = await this.getMaquinas.map((maquina) => ({
            nombre: maquina.nombre,
            produccion_m2: maquina.produccion_m2,
            energia_consumida: maquina.energia_consumida,
          }))
        },
      }
  
  }
  </script>
  
  <style>
  
  </style>
<template>
  <!-- foreach para mostrar los consumibles -->
  <div>
    <div v-for="gasto_general in getGastos" :key="gasto_general.id">
      <h2>{{gasto_general.nombre}}</h2>
      <p>{{gasto_general.precio}}</p>
    </div>
  </div>
  </template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters('GastosGenerales',['getGastos']),
    }
  }
</script>
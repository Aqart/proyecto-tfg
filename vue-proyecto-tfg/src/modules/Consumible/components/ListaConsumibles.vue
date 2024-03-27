<template>
  <!-- foreach para mostrar los consumibles -->
  <div v-for="consumible in getConsumibles" :key="consumible.id">
    <h2>{{consumible.nombre}}</h2>
    <p>{{consumible.precio}}</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters('Consumible',['getConsumibles']),
    }
  }
</script>
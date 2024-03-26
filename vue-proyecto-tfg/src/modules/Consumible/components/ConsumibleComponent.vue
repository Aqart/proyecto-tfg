<template>
  <div>
    <h1 class="text-5xl">{{ title }}</h1>
    <!-- foreach para mostrar los consumibles -->
    <div v-for="consumible in getConsumibles" :key="consumible.id">
      <h2>{{consumible.nombre}}</h2>
      <p>{{consumible.precio}}</p>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: "Consumibles"
    }
  },
  // data() {
  //   //consumibles: this.$store.getConsumibles();
  // },
  computed: {
    ...mapGetters('Consumible',['getConsumibles']),
  },
  // async setup() {
  //   const { getConsumibles } = await useConsumible();
  //   console.log(getConsumibles)
  // }
    
}
</script>
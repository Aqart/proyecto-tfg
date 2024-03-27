<template>
  <div>
    <h1 class="text-5xl">{{ title }}</h1>
    <!-- Botón para mostrar todos los consumibles -->
    <button @click="mostrarTodos" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver los consumibles</button>
    <button @click="anadirConsumible" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded">Añadir Consumible</button>

    <!-- Componente dinámico -->
    <component v-bind:is="vistaActual" v-if="vistaActual"></component>

  </div>
</template>

<script>

import ListaConsumibles from './ListaConsumibles.vue';
import FormularioConsumible from './FormularioConsumible.vue';

export default {
  props: {
    title: {
      type: String,
      default: "Consumibles"
    }
  },
  data() {
    return {
      vistaActual: ''
    }
  },
  components: {
    ListaConsumibles,
    FormularioConsumible
  },
  methods: {
    mostrarTodos() {
      this.vistaActual = 'ListaConsumibles';
    },
    anadirConsumible() {
      this.vistaActual = 'FormularioConsumible';
    }
  }
  // setup() {
    
  // }
    
}
</script>
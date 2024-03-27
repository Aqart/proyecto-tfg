<template>
  <div>
    <h1 class="text-5xl">{{ title }}</h1>
    <!-- Botón para mostrar todos los consumibles -->
    <button @click="mostrarTodos" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver los consumibles</button>
    <button @click="anadirConsumible" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded">Añadir Consumible</button>

    <!-- Componente dinámico -->
    <component v-bind:is="vistaActual" 
              v-if="vistaActual" 
              @actualizarVista="vistaActual = $event"
    >
    </component>
    

  </div>
</template>

<script>

import ListaConsumibles from './ListaConsumibles.vue';
import FormularioConsumible from './FormularioConsumible.vue';
import MensajesComponent from '@/modules/shared/components/MensajesComponent.vue';

export default {
  props: {
    title: {
      type: String,
      default: "Consumibles"
    }
  },
  data() {
    return {
      vistaActual: '',
      mensajeVista: ''
    }
  },
  components: {
    ListaConsumibles,
    FormularioConsumible,
    MensajesComponent,
  },
  methods: {
    mostrarTodos() {
      this.vistaActual = 'ListaConsumibles';
    },
    anadirConsumible() {
      this.vistaActual = 'FormularioConsumible';
    },
  }
  // setup() {
    
  // }
    
}
</script>
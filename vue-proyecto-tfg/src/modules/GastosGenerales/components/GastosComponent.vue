<template>
  <div>
    <h1 class="text-5xl">{{ title }}</h1>
    <!-- Botón para mostrar todos los consumibles -->
    <button @click="mostrarTodos" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver los gastos generales</button>
    <button @click="anadirGasto" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded">Añadir nuevo gasto </button>
    <div v-if="vistaActual === 'ListaGastos'">
      <ListaGastos />
    </div>
    <div v-if="vistaActual === 'FormularioGastos'">
      <FormularioGastos
        @actualizarVista="vistaActual = $event"
        @updateMessage="mensajeVista = $event"
        @updateType="typeVista = $event"/>
    </div>
    <div v-if="mensajeVista">
      <MensajesComponent 
      :message="mensajeVista"
      :type="typeVista"
      />
    </div>

  </div>
</template>

<script>

import ListaGastos from './ListaGastos.vue';
import FormularioGastos from './FormularioGastos.vue';
import MensajesComponent from '@/modules/shared/components/MensajesComponent.vue';

export default {
  props: {
    title: {
      type: String,
      default: "GastosGenerales"
    }
  },
  data() {
    return {
      vistaActual: '',
      mensajeVista: '',
      typeVista: ''
    }
  },
  components: {
    ListaGastos,
    FormularioGastos,
    MensajesComponent,
  },
  methods: {
    mostrarTodos() {
      this.vistaActual = '';
      this.vistaActual = 'ListaGastos';
    },
    anadirGasto() {
      this.vistaActual = 'FormularioGastos';
    }
  }
  // setup() {
    
  // }
    
}
</script>
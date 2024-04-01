<template>
  <div>
    <div v-if="getMensaje">
      <MensajesComponent 
      :message="getMensaje"
      :type="getTipo"
      :mostrarMensaje=true
      />
    </div>
    <!-- foreach para mostrar los consumibles -->
    <div v-for="consumible in getConsumibles" :key="consumible.id">
      <h2>{{consumible.nombre}}</h2>
      <p>{{consumible.precio}}</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import MensajesComponent from '@/modules/shared/components/MensajesComponent.vue';

  export default {
    computed: {
      ...mapGetters('Consumible',['getConsumibles', 'getMensaje', 'getTipo']),
    },
    // data() {
    //   return {
    //     mensajeVista: this.$store.state.mensajeVista,
    //     typeVista: this.$store.state.typeVista
    //   }
    // },
    components: {
      MensajesComponent
    }
  }
</script>
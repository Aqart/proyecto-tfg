<template>
  <div>
    <template>
      <MensajesComponent
        v-if="tipo === 'success'"
        :message="mensaje"
        :type="tipo"
        :mostrarMensaje="mostrar"
      />
    </template>
    <TablaComponent
      :data="getConsumibles"
      @saveData="persistData"
      @deleteSelected="deleteConsumiblesSeleccionados"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useConsumible from '@/modules/Consumible/composables/useConsumible'
// import useShared from '@/modules/shared/composables/useShared'

export default {
  data(){
    return {
      mostrar: false,
      tipo: '',
      mensaje: '',
    }
  },
  setup() {
    const { createConsumible, editConsumible, deleteConsumibles } = useConsumible()
    // const { actualizarMensaje, actualizarMostrarMensaje } = useShared()
    const persistData = async (data, type) => {
      try {
        if (type === 'Añadir nuevo') {
          const { ok, message } = await createConsumible(data)
          if (!ok) {
            this.tipo = 'error';
            this.mostrar = true;
            this.mensaje = message;
            //actualizarMensaje('error', message)
            //actualizarMostrarMensaje(true)
          } else {
            this.tipo = 'success';
            this.mostrar = true;
            this.mensaje = message;
          }

        } else if (type === 'Editar') {
          const { ok, message } = await editConsumible(data)
          if (!ok) {
            this.tipo = 'error';
            this.mostrar = true;
            this.mensaje = message;
            //actualizarMensaje('error', message)
            //actualizarMostrarMensaje(true)
          } else {
            this.tipo = 'success';
            this.mostrar = true;
            this.mensaje = message;
          }
          
        }
      } catch (error) {
        console.error('Error persisting data', error)
        // actualizarMensaje('error', 'Error guardando los datos')
        // actualizarMostrarMensaje(true)
      }
    }

    const deleteConsumiblesSeleccionados = async (arrayData) => {
      try {
        const results = await deleteConsumibles(arrayData)
        console.log('Array con los resultados del borrado', results)

        // if(!ok) {
        //   actualizarMensaje('error', message)
        //   actualizarMostrarMensaje(true)
        // } else {
        //   actualizarMensaje('success', message)
        //   actualizarMostrarMensaje(true)
        // }
      } catch (error) {
        console.error('Error deleting data', error)
        // actualizarMensaje('error', 'Error eliminando los datos')
        // actualizarMostrarMensaje(true)
      }
    }

    return {
      persistData,
      deleteConsumiblesSeleccionados
    }
  },
  computed: {
    ...mapGetters('Consumible', ['getConsumibles']),
    ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar'])
  },
  components: {
    MensajesComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/MensajesComponent.vue')
    ),
    TablaComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/TablaComponent.vue')
    )
  }
}
</script>

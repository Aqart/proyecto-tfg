<template>
  <div>
    <template v-if="getMostrar">
      <MensajesComponent
        v-if="getTipo === 'success'"
        :message="getMensaje"
        :type="getTipo"
        :mostrarMensaje="getMostrar"
      />
    </template>
    <TablaComponent
      :data="getTrabajadores"
      @saveData="persistData"
      @deleteSelected="deleteTrabajadoresSeleccionados"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useTrabajadores from '@/modules/Trabajadores/composables/useTrabajadores'
import useShared from '@/modules/shared/composables/useShared'

export default {
  setup() {
    const { createTrabajador, editTrabajador, deleteTrabajadores } = useTrabajadores()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()
    const persistData = async (data, type) => {
      try {
        if (type === 'Añadir nuevo') {
          
          const { ok, message } = await createTrabajador(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        } else if (type === 'Editar') {
          
          const { ok, message } = await editTrabajador(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        }
      } catch (error) {
        console.error('Error persisting data', error)
        actualizarMensaje('error', 'Error guardando los datos')
        actualizarMostrarMensaje(true)
      }
    }

    const deleteTrabajadoresSeleccionados = async (arrayData) => {
      
      try {
        const results = await deleteTrabajadores(arrayData)
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
        actualizarMensaje('error', 'Error eliminando los datos')
        actualizarMostrarMensaje(true)
      }
    }

    return {
      persistData,
      deleteTrabajadoresSeleccionados
    }
  },
  computed: {
    ...mapGetters('Trabajadores', ['getTrabajadores']),
    ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar'])
  },
  components: {
    MensajesComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/MensajesComponent.vue')
    ),
    TablaComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/TablaComponent.vue')
    )
  }
}
</script>

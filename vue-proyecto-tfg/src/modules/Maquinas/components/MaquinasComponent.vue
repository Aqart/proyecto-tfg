<template>
  <div>
    <div>
      <MensajesComponent 
        v-if="getTipo === 'success'"   
        :message="getMensaje" 
        :type="getTipo" 
        :mostrarMensaje="getMostrar" />
      </div>
      <TablaComponent 
        :data="getMaquinas"
        @saveData="persistData"
        @deleteSelected="deleteMaquinasSeleccionadas"
      />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useMaquina from '@/modules/Maquinas/composables/useMaquina'
import useShared from '@/modules/shared/composables/useShared'

export default {
  setup(){
    const { createMaquina, editMaquina, deleteMaquinas } = useMaquina()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()
    const persistData = async (data, type) => {
      try {
        if (type === 'Añadir nuevo') {
          console.log('Data to persist', data, type)
          const { ok, message } = await createMaquina(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        } else if (type === 'Editar') {
          console.log('Data to persist', data, type)
          const { ok, message } = await editMaquina(data)
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

    const deleteMaquinasSeleccionadas = async (arrayData) => {
      console.log('Data to delete', arrayData)
      try {
        const results = await deleteMaquinas(arrayData)
        console.log('Array con los resultados del borrado', results)
      } catch (error) {
        console.error('Error deleting data', error)
        actualizarMensaje('error', 'Error eliminando los datos')
        actualizarMostrarMensaje(true)
      }
    }

    return {
      persistData,
      deleteMaquinasSeleccionadas
    }
  },
  computed: {
    ...mapGetters('Maquinas', ['getMaquinas']),
    ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar'])
  },
  components: {
    TablaComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/TablaComponent.vue')
    ),
    MensajesComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/MensajesComponent.vue')
    )
  },
}
</script>

<style></style>

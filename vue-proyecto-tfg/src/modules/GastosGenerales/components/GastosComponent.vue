<template>
  <div>
    <template>
      <MensajesComponent :message="getMensaje" :type="getTipo" :mostrarMensaje="getMostrar" />
    </template>
    <TablaComponent :data="getGastos" @saveData="persistData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useGasto from '@/modules/GastosGenerales/composables/useGasto'
import useShared from '@/modules/shared/composables/useShared'

export default {
  setup() {
    const { createGasto, editGasto } = useGasto()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()
    const persistData = async (data, type) => {
      try {
        if (type === 'Añadir nuevo') {
          console.log('Data to persist', data, type)
          const { ok, message } = await createGasto(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        } else if (type === 'Editar') {
          const { ok, message } = await editGasto(data)
          console.log(message)
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
    return {
      persistData
    }
  },
  computed: {
    ...mapGetters('GastosGenerales', ['getGastos']),
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

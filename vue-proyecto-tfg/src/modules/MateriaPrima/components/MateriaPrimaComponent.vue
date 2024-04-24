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
      :data="getMateriasPrimas"
      @saveData="persistData"
      @deleteSelected="deleteMateriasPrimasSeleccionadas"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useMateriaPrima from '@/modules/MateriaPrima/composables/useMateriaPrima'
import useShared from '@/modules/shared/composables/useShared'

export default {
  setup() {
    const { createMateriaPrima, editMateriaPrima, deleteMateriasPrimas, getMateriaPrima } = useMateriaPrima()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()
    const persistData = async (data, type) => {
      try {
        if (type === 'Añadir nuevo') {
          const { ok, message } = await createMateriaPrima(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        } else if (type === 'Editar') {
          const { ok, message } = await editMateriaPrima(data)
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

    const deleteMateriasPrimasSeleccionadas = async (arrayData) => {
      try {
        const results = await deleteMateriasPrimas(arrayData)
        const failedResults = results.filter((result) => result.ok === false)
        if (failedResults.length > 0) {
          const dataFailedPromises = failedResults.map((result) => getMateriaPrima(result.id))
          const dataFailed = await Promise.all(dataFailedPromises)
          const nombres = dataFailed.map((result) => result.nombre).join(', ')
          actualizarMensaje(
            'error',
            `Las siguientes materias primas no se pudieron eliminar: ${nombres}`
          )
          actualizarMostrarMensaje(true)
        } else {
          const nombresSuccess = arrayData.map((result) => result.nombre).join(', ')
          console.log(nombresSuccess)
          actualizarMensaje(
            'success',
            `Las siguientes materias primas se han eliminado correctamente: ${nombresSuccess}`
          )
          actualizarMostrarMensaje(true)
        }
      } catch (error) {
        actualizarMensaje('error', 'Error eliminando los datos')
        actualizarMostrarMensaje(true)
      }
    }

    return {
      persistData,
      deleteMateriasPrimasSeleccionadas
    }
  },
  computed: {
    ...mapGetters('MateriaPrima', ['getMateriasPrimas']),
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

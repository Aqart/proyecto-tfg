<template>
  <div>
    <template v-if="getMostrar">
      <MensajesComponent
        v-if="getTipo !== 'warning'"
        :message="getMensaje"
        :type="getTipo"
        :mostrarMensaje="getMostrar"
      />
    </template>
    <TablaComponent
      :data="getUsuarios"
      @saveData="persistData"
      @deleteSelected="deleteUsuariosSeleccionados"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useUsuarios from '@/modules/Usuarios/composables/useUsuarios'
import useShared from '@/modules/shared/composables/useShared'

export default {
  setup() {
    const { createUsuario, editUsuario, deleteUsuarios, getUsuario } = useUsuarios()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()
    const persistData = async (data, type) => {
      try {
        if (type === 'Añadir nuevo') {
          const { ok, message } = await createUsuario(data)
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          } else {
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
        } else if (type === 'Editar') {
          const { ok, message } = await editUsuario(data)
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

    const deleteUsuariosSeleccionados = async (arrayData) => {
      try {
        const results = await deleteUsuarios(arrayData)
        const failedResults = results.filter((result) => result.ok === false)
        if (failedResults.length > 0) {
          const dataFailedPromises = failedResults.map(async (result) => {
            return await getUsuario(result.id)
          })
          const dataFailed = await Promise.all(dataFailedPromises)
          console.log('dataFailed: ', dataFailed[0].ok)
          if (!dataFailed[0].ok) {
            actualizarMensaje('error', 'Error accediendo a los usuarios')
            actualizarMostrarMensaje(true)
          } else {
            const nombres = dataFailed.map((result) => result.nombre).join(', ')
            actualizarMensaje(
              'error',
              `Los siguientes usuarios no se pudieron eliminar: ${nombres}`
            )
            actualizarMostrarMensaje(true)
          }
        } else {
          const nombresSuccess = arrayData.map((result) => result.nombre).join(', ')
          console.log(nombresSuccess)
          actualizarMensaje(
            'success',
            `Los siguientes usuarios se han eliminado: ${nombresSuccess}`
          )
          actualizarMostrarMensaje(true)
        }
      } catch (error) {
        console.error('Error deleting data', error)
        actualizarMensaje('error', 'Error eliminando los datos')
        actualizarMostrarMensaje(true)
      }
    }

    return {
      persistData,
      deleteUsuariosSeleccionados
    }
  },
  computed: {
    ...mapGetters('Usuarios', ['getUsuarios']),
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

<template>
  <div>
    <div>
      <MensajesComponent :message="getMensaje" :type="getTipo" :mostrarMensaje="getMostrar" />
    </div>
    <TablaComponent :data="getGastos" @saveData="persistData" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'
import useGasto from '@/modules/GastosGenerales/composables/useGasto'

export default {
  setup() {
    const { createGasto , editGasto } = useGasto()
    const persistData = async (data, type) => {
      try {
        if (type === 'Añadir nuevo') {
          console.log('Data to persist', data, type)
          const { ok, message } = await createGasto(data)
          console.log(ok, message)
        } else if(type === 'Editar'){
          console.log('Data to persist', data, type)
          const { message } = await editGasto(data)
          console.log(message)
        }
      } catch (error) {
        console.error('Error persisting data', error)
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
    MensajesComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/MensajesComponent.vue')
    ),
    TablaComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/TablaComponent.vue')
    )
  }
}
</script>

<template>
  <div>
    <div>
      <MensajesComponent :message="getMensaje" :type="getTipo" :mostrarMensaje="getMostrar" />
    </div>
    <TablaComponent :data="getConsumibles" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'

export default {
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

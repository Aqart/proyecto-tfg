<template>
  <div>
    <template>
      <MensajesComponent :message="getMensaje" :type="getTipo" :mostrarMensaje="getMostrar" />
    </template>
    <TablaComponent :data="getMaquinas" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    TablaComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/TablaComponent.vue')
    ),
    MensajesComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/MensajesComponent.vue')
    )
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapGetters('Maquinas', ['getMaquinas']),
    ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar'])
  }
}
</script>


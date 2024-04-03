<template>
  <div>
    <div>
      <MensajesComponent :message="getMensaje" :type="getTipo"
      :mostrarMensaje="getMostrar"
      />
    </div>
    <TablaComponent :tableHead="getConsumibles" :tableBody="getConsumibles" />
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
    MensajesComponent: defineAsyncComponent(() => import('@/modules/shared/components/MensajesComponent.vue')),
    //EditConsumibleComponent: defineAsyncComponent(() => import('@/modules/Consumible/components/EditConsumibleComponent.vue')),
    //ModalComponent: defineAsyncComponent(() => import('@/modules/shared/components/ModalComponent.vue')),
    TablaComponent: defineAsyncComponent(() => import('@/modules/shared/components/TablaComponent.vue'))

  },      watch: {
        getConsumibles() {
          this.fillTableBody()
        }
      },
      methods: {
        async fillTableBody() {
          this.tableBody = await this.getConsumibles.map((consumible) => ({
            nombre: consumible.nombre,
            precio: consumible.precio,
          }))
        },
      }

}
</script>

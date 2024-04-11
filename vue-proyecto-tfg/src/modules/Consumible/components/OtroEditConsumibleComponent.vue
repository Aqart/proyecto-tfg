<template>
  <ModalComponent title="Editar">
    <FormComponent
      :data="consumible"
    />
  </ModalComponent>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      showModal: true,
      consumible: {
        nombre: 'Consumible 1',
        cantidad: 10,
        precio: 100
      }
    }
  },
  components: {
    ModalComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ModalComponent.vue')
    ),
    FormComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/FormComponent.vue')
    )
  },
  computed: {
    ...mapGetters('Consumible', ['getConsumibleById']),
  },
  created() {
  console.log('Consumible', this.getConsumibleById(this.$route.params.id));
}
}
</script>

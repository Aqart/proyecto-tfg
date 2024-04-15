<template>
  <div>
    <div v-if="items.length === 0">
      <p>No hay {{ itemType }} para eliminar</p>
    </div>
    <div v-else-if="items.length === total">
      <p>Va a eliminar todos los {{ itemType }}</p>
    </div>
    <div v-else>
      <p>Confirme que va a eliminar los siguientes {{ itemType }}</p>
      <ul>
        <li v-for="(item, index) in items" :key="index">{{ item.nombre }}</li>
      </ul>
    </div>
    <div class="flex justify-between items-center">
      <ButtonComponent
        v-if="items.length !== 0"
        text="Confirmar"
        @click="confirmDelete"
        bgColor="bg-secondary"
      />
      <ButtonComponent text="Cancelar" @click="toggleModal" otherClasses="bg-red-800 text-white" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    itemType: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    )
  },
  methods: {
    confirmDelete() {
      console.log('confirmDelete', this.items)
      this.$emit('delete', this.items)
    },
    toggleModal() {
      this.$emit('close')
    }
  }
}
</script>

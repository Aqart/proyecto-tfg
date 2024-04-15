<template>
  <div class="p-4 rounded shadow flex flex-col md:grid md:grid-cols-2 md:gap-4 items-center">
    <div class="flex justify-between items-center mb-4 w-full">
      <ButtonComponent
        v-if="items.length !== 0"
        text="Confirmar"
        @click="confirmDelete"
        bgColor="bg-secondary"
      />
      <ButtonComponent text="Cancelar" @click="toggleModal" otherClasses="bg-red-800 text-white px-4 py-2 rounded shadow hover:bg-red-900" />
    </div>
    <div v-if="items.length === 0" class="text-gray-500 w-full">
      <p>No hay {{ itemType }} para eliminar</p>
    </div>
    <div v-else-if="items.length === total" class="text-red-500 w-full">
      <p>Va a eliminar todos los {{ itemType }}</p>
    </div>
    <div v-else class="text-gray-700 w-full">
      <p>Confirme que va a eliminar los siguientes {{ itemType }}</p>
      <ul class="list-disc pl-5">
        <li v-for="(item, index) in items" :key="index">{{ item.nombre }}</li>
      </ul>
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

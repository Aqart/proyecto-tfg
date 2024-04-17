<template>
  <div class="grid grid-cols-1 p-8 rounded shadow gap-10">
    <div v-if="items.length === 0" class="text-gray-500 w-full">
      <p>No hay {{ itemType }} para eliminar</p>
    </div>
    <div v-else-if="items.length === total" class="w-90 mx-auto flex items-center justify-end mb-2 relative" role="alert">
      <FontAwesomeIcon
          :icon="['far', 'circle-question']"
          class="mr-3 text-8xl hidden sm:inline-block
          text-stoneBackground-3 absolute top-3 left-10 -mt-9 -ml-0"
        />
      <div class="rounded-lg bg-stoneBackground-2 text-stoneBackground-3 p-4 w-3/4 text-center">
        <span class="sr-only">Info</span>
        <div>
          <span class="font-regular text-lg">¿Desea eliminar todos los registros de {{ itemType }}?</span>
        </div>
      </div>
    </div>
    <div v-else class="w-full sm:w-90 mx-auto items-center" role="alert">
      <div class="flex items-center">
        <FontAwesomeIcon
            :icon="['fas', 'triangle-exclamation']"
            class="mr-3 text-2xl hidden sm:inline-block
            text-stoneBackground-3"
        />
        <div class="rounded-lg bg-stoneBackground-2 text-stoneBackground-3 p-4">
          <span class="sr-only">Info</span>
          <div>
            <span class="font-regular text-md">Va a eliminar los siguientes registros de {{ itemType }}:</span>
          </div>
        </div>
      </div>
      <div>
        <ul class="grid grid-cols-2 gap-3 sm:grid-cols-3 list-none pl-0">
          <li v-for="(item, index) in items" 
              :key="index"
              class="text-center flex items-center justify-center bg-stoneBackground-4 py-3 rounded-md text-sm font-semibold text-stoneBackgroundContrast-1 max-h-12 overflow-y-auto"
              :class="{ 'col-span-2': item.nombre.length > 20 }"
          >
            {{ item.nombre }}
          </li>
        </ul>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-10 w-90 mx-auto">
      <!-- <LoadingComponent v-if="openLoader" :fullscreen="false" /> -->
      <ButtonComponent
        v-if="items.length !== 0"
        text="Confirmar"
        @click="confirmDelete"
        bgColor="bg-stoneBackground-2"
      />
      <ButtonComponent text="Cancelar" 
        @click="toggleModal" 
        bgColor="bg-stoneBackground-2 text-stoneBackgroundContrast-4"
      />
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
    },
    openLoader(){
      return this.items.length === this.total
      
    }
  }
}
</script>

<template>
  <div class="grid grid-cols-1 pt-5 p-7 rounded gap-10">
    <div v-if="listItems.length === 0" class="text-gray-500 w-full">
      <p>No hay {{ itemType }} para eliminar</p>
    </div>


    <div v-else-if="listItems.length === total" class="sm:w-90 mx-auto flex items-center justify-end mb-2 relative" role="alert">
      <FontAwesomeIcon
          :icon="['far', 'circle-question']"
          class="sm:mr-3 text-6xl sm:text-8xl sm:inline-block
          text-stoneBackgroundContrast-2 absolute left-2 -top-1 sm:top-3 sm:left-10 sm:-mt-9 sm:-ml-0"
        />
      <div class="rounded-lg bg-stoneBackground-2 text-stoneBackground-3 p-4 sm:w-3/4 w-5/6 text-center">
        <span class="sr-only">Info</span>
        <div>
          <span class="font-regular text-lg">¿Desea eliminar todos los registros de {{ itemType }}?</span>
        </div>
      </div>
    </div>
    <div v-else class="w-full sm:w-90 mx-auto items-center" role="alert">
      <div class="flex items-center pb-11">
        <FontAwesomeIcon
            :icon="['fas', 'triangle-exclamation']"
            class="mr-3 text-2xl hidden sm:inline-block
            text-stoneBackground-3"
        />
        <div class="rounded-lg bg-stoneBackground-2 text-stoneBackground-3">
          <span class="sr-only">Info</span>
          <div>
            <span class="font-regular text-md">Va a eliminar los siguientes registros de {{ itemType }}:</span>
          </div>
        </div>
      </div>
      <div class="max-h-24 sm:max-h-44 md:max-h-56 lg:max-h-64 xl:max-h-80 overflow-hidden overflow-y-scroll py-2">
        <!-- grid grid-cols-2 gap-3 sm:grid-cols-3 -->
        <ul class="grid grid-cols-2 sm:grid-cols-3 gap-3 list-none pl-0">
          <li v-for="(item, index) in listItems"
              :key="index"
              class="flex flex-col items-center justify-center text-center bg-stoneBackground-4 py-3 px-3 rounded-md text-sm font-semibold text-stoneBackgroundContrast-1"
              :class="{ 'col-span-full': (item.nombre + ' ' + (item.apellido1 || '')).length > 30 || listItems.length === 1 }"
          >
            <div class="flex justify-center w-full">
              <span class="w-90" v-if="item.apellido1">{{ item.nombre + " " + item.apellido1 }}</span>
              <span class="w-90" v-else>{{ item.nombre }}</span>
              <ButtonComponent
                type="button"
                text="X"
                bgColor="bg-transparent"
                otherClasses="h-5 w-5 rounded-md text-stoneBackgroundContrast-2 hover:scale-105"
                @click="deselectItem(item.id)"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex w-90 mx-auto gap-9 pr-5 pl-5">
      <!-- <LoadingComponent v-if="openLoader" :fullscreen="false" /> -->
      <ButtonComponent
        :hidden="listItems.length === 0"
        text="Confirmar"
        @click="confirmDelete"
        bgColor="bg-stoneBackground-2 text-stoneBackgroundContrast-4"
      />
      <ButtonComponent text="Cancelar" 
        @click="toggleModal" 
        bgColor="bg-stoneBackground-2 text-stoneBackground-3"
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
  data(){
    return {
      listItems: []
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    )
  },
  methods: {
    confirmDelete() {
      console.log('confirmDelete', this.listItems)
      this.$emit('delete', this.listItems)
    },
    toggleModal() {
      console.log(this.listItems)
      this.$emit('close')
    },
    openLoader(){
      return this.listItems.length === this.total
    },
    deselectItem(id){
      this.listItems = this.listItems.filter(item => item.id !== id);
      this.$emit('deselectItem', id)
      console.log(id)
      // this.$emit('delete', id)
    }
  },
  watch: {
    items: {
      handler: function (newVal) {
        this.listItems = newVal
      },
      immediate: true
    }
  }
}
</script>

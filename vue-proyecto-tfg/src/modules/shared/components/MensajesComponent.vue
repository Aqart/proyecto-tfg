<template>
  <div class="mb-5 flex justify-around items-center">
    <template v-if="mostrarMensaje">
      <!-- Success -->
      <div
        class="flex flex-row items-center justify-between px-4 py-3 text-sm text-green-800 border border-green-600 rounded-lg bg-green-50 bg-opacity-20 shadow-sm"
        role="alert"
        v-if="type === 'success'"
      >
        <FontAwesomeIcon
          :icon="['fas', 'square-check']"
          class="text-green-700 scale-125 flex-shrink-0 inline w-4 h-4 me-3"
        />
        <!-- <strong class="font-bold">¡Éxito!&nbsp;</strong> -->
        <span class="block sm:inline text-center text-wrap text-base sm:text-sm mr-12">{{
          message
        }}</span>
        <ButtonComponent
          type="button"
          text="X"
          bgColor="bg-transparent"
          otherClasses="h-5 w-5 rounded-md inline-flex justify-center items-center hover:scale-105"
          @click="cerrarMensaje"
        />
      </div>

      <!-- Error -->
      <div
        class="bg-red-100 border border-stoneBackgroundContrast-2 text-stoneBackgroundContrast-2 px-4 py-3 rounded-lg flex flex-row justify-between items-center bg-opacity-20 shadow-sm"
        role="alert"
        v-if="type === 'error'"
      >
        <FontAwesomeIcon
          :icon="['fas', 'circle-exclamation']"
          class="mr-3 scale-125 flex-shrink-0 inline w-4 h-4 me-3"
        />
        <span class="block sm:inline text-center text-wrap text-base sm:text-sm mr-12">{{
          message
        }}</span>
        <ButtonComponent
          type="button"
          text="X"
          bgColor="bg-transparent"
          otherClasses="h-5 w-5 rounded-md inline-flex justify-center items-center hover:scale-105"
          @click="cerrarMensaje"
        />
      </div>

      <!-- Warning -->
      <div
        class="bg-yellow-50 border border-stoneBackgroundContrast-6 text-stoneBackgroundContrast-6 px-4 py-3 rounded-lg flex flex-row justify-between items-center bg-opacity-20 shadow-sm"
        role="alert"
        v-if="type === 'warning'"
      >
        <FontAwesomeIcon
          :icon="['fas', 'triangle-exclamation']"
          class="mr-3 scale-125 hidden sm:inline-block"
        />
        <span class="block sm:inline text-center text-wrap text-base sm:text-sm mr-12">{{
          message
        }}</span>
        <ButtonComponent
          type="button"
          text="X"
          bgColor="bg-transparent"
          otherClasses="h-5 w-5 rounded-md inline-flex justify-center items-center hover:scale-105"
          @click="cerrarMensaje"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    mostrarMensaje: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      mostrar: false
    }
  },
  watch: {
    mostrarMensaje(newVal) {
      console.log(newVal)
      this.mostrar = newVal;
    }
  },
  methods: {
    cerrarMensaje() {
      this.mostrar = false;
    },
  },
  mounted() {
    setTimeout(this.cerrarMensaje, 10 * 1000)
    this.mostrar = this.mostrarMensaje;
  },
  components: {
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    )
  }
}
</script>

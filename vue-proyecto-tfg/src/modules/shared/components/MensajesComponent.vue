<template>
  <div class="mb-10 flex justify-around items-center">
    <template v-if="mostrarMensaje">

      <!-- Success -->
      <div
        class="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded relative"
        role="alert"
        v-if="type === 'success'"
      >
        <FontAwesomeIcon :icon="['fas', 'square-check']" class="text-green-600 mr-3 scale-150 hidden sm:inline-block" />
        <!-- <strong class="font-bold">¡Éxito!&nbsp;</strong> -->
        <span class="block sm:inline text-center text-wrap text-base sm:text-sm mr-12">{{ message }}</span>
        <span class="absolute top-0 right-0 sm:px-1 sm:py-1 px-3 py-4 sm:scale-100 scale-150">
          <ButtonComponent
            type="button"
            text="X"
            otherClasses="h-5 w-5 rounded-md bg-transparent inline-flex justify-center items-center hover:scale-105"
            @click="cerrarMensaje"
          />
          <!-- <svg
            @click="cerrarMensaje"
            class="fill-current h-5 w-5 text-green-600"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          > -->
          <title>Close</title>
        </span>
      </div>

      <!-- Error -->
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
        v-if="type === 'error'"
      >
        <strong class="font-bold">¡Error!&nbsp;</strong>
        <span class="block sm:inline">{{ message }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            @click="cerrarMensaje"
            class="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              fill-rule="evenodd"
              d="M14.95 5.05a.75.75 0 0 1 1.06 1.06L11.06 10l4.95 4.95a.75.75 0 1 1-1.06 1.06L10 11.06l-4.95 4.95a.75.75 0 0 1-1.06-1.06L8.94 10 4.99 5.05a.75.75 0 0 1 1.06-1.06L10 8.94l4.95-4.95z"
            ></path>
          </svg>
        </span>
      </div>

      <!-- Warning -->
      <div
        class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
        role="alert"
        v-if="type === 'warning'"
      >
        <strong class="font-bold">¡Advertencia!&nbsp;</strong>
        <span class="block sm:inline">{{ message }}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            @click="cerrarMensaje"
            class="fill-current h-6 w-6 text-yellow-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              fill-rule="evenodd"
              d="M14.95 5.05a.75.75 0 0 1 1.06 1.06L11.06 10l4.95 4.95a.75.75 0 1 1-1.06 1.06L10 11.06l-4.95 4.95a.75.75 0 0 1-1.06-1.06L8.94 10 4.99 5.05a.75.75 0 0 1 1.06-1.06L10 8.94l4.95-4.95z"
            ></path>
          </svg>
        </span>
      </div>
    </template>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import useShared from '@/modules/shared/composables/useShared'

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
  setup() {
    const { actualizarMostrarMensaje } = useShared()

    const cerrarMensaje = () => {
      actualizarMostrarMensaje(false)
    }

    return {
      cerrarMensaje
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ButtonComponent.vue')
    )
  }
}
</script>

<style></style>

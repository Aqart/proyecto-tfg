<template>
  <div>
    <!-- Success -->
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert" v-if="mostrarMensaje && type === 'success'">
      <strong class="font-bold">¡Éxito!&nbsp;</strong>
      <span class="block sm:inline">{{ message }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg @click="cerrarMensaje" class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path fill-rule="evenodd" d="M14.95 5.05a.75.75 0 0 1 1.06 1.06L11.06 10l4.95 4.95a.75.75 0 1 1-1.06 1.06L10 11.06l-4.95 4.95a.75.75 0 0 1-1.06-1.06L8.94 10 4.99 5.05a.75.75 0 0 1 1.06-1.06L10 8.94l4.95-4.95z"></path>
        </svg>
      </span>

    </div>

    <!-- Error -->
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" v-if="mostrarMensaje && type === 'error'">
      <strong class="font-bold">¡Error!&nbsp;</strong>
      <span class="block sm:inline">{{ message }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg @click="cerrarMensaje" class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path fill-rule="evenodd" d="M14.95 5.05a.75.75 0 0 1 1.06 1.06L11.06 10l4.95 4.95a.75.75 0 1 1-1.06 1.06L10 11.06l-4.95 4.95a.75.75 0 0 1-1.06-1.06L8.94 10 4.99 5.05a.75.75 0 0 1 1.06-1.06L10 8.94l4.95-4.95z"></path>
        </svg>
      </span>
    </div>

    <!-- Warning -->
    <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert" v-if="mostrarMensaje && type === 'warning'">
      <strong class="font-bold">¡Advertencia!&nbsp;</strong>
      <span class="block sm:inline">{{ message }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg @click="cerrarMensaje" class="fill-current h-6 w-6 text-yellow-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path fill-rule="evenodd" d="M14.95 5.05a.75.75 0 0 1 1.06 1.06L11.06 10l4.95 4.95a.75.75 0 1 1-1.06 1.06L10 11.06l-4.95 4.95a.75.75 0 0 1-1.06-1.06L8.94 10 4.99 5.05a.75.75 0 0 1 1.06-1.06L10 8.94l4.95-4.95z"></path>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      mostrarMensaje: true
    }
  },
  methods: {
    cerrarMensaje() {
      this.mostrarMensaje = false
    }
  }
}
</script>

<style>

</style>
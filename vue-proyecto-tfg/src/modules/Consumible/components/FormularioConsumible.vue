<template>
  <form @submit.prevent="handleSubmit">
    <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900">
      Nombre
    </label>
    <input
      v-model="consumibleForm.nombre"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      type="text"
      name="nombre"
      id="nombre"
      placeholder="Nombre del consumible"
    />
    
    <label for="precio" class="block mb-2 text-sm font-medium text-gray-900">
      Precio
    </label>
    <input
      v-model="consumibleForm.precio"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      type="number"
      name="precio"
      id="precio"
      placeholder="Precio del consumible"
      min=0
    />

    <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Añadir Consumible</button>
  </form>

</template>


<script>
import { ref } from 'vue';
import useConsumible from '@/modules/Consumible/composables/useConsumible'

  export default {
    emits: ['actualizarVista', 'mensaje'],
    setup(props, { emit }) {
      const { createConsumible } = useConsumible()

      // Define una propiedad reactiva consumibleForm
      const consumibleForm = ref({
        nombre: '',
        precio: ''
      })

      // Devuelve las propiedades y funciones para que estén disponibles en la plantilla
      return {
        consumibleForm,
        handleSubmit: async () => {
          // await createConsumible(consumibleForm.value)
          console.log(consumibleForm.value)
          // Enviar el mensaje de consumibleForm.value al componente padre y actualizar vista
          emit('actualizarVista', 'MensajesComponent')
        }
      }
    }
  }
</script>
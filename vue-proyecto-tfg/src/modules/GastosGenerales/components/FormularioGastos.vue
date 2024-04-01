<template>
  <form @submit.prevent="handleSubmit">
    <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900">
      Nombre
    </label>
    <input
      v-model="gastoForm.nombre"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      type="text"
      name="nombre"
      id="nombre"
      placeholder="Nombre del gasto general"
    />
    
    <label for="precio" class="block mb-2 text-sm font-medium text-gray-900">
      Precio
    </label>
    <input
      v-model="gastoForm.precio"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      type="number"
      name="precio"
      id="precio"
      placeholder="Precio"
      min=0
    />

    <button type="submit" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Añadir Consumible</button>
  </form>

</template>


<script>
import { ref } from 'vue';
import useGasto from '@/modules/GastosGenerales/composables/useGasto'

  export default {
    emits: [
      'actualizarVista', 
      'updateMessage',
      'updateType'
    ],
    setup(props, { emit }) {
      const { createGasto } = useGasto()

      // Define una propiedad reactiva consumibleForm
      const gastoForm = ref({
        nombre: '',
        precio: ''
      })
      

      // Devuelve las propiedades y funciones para que estén disponibles en la plantilla
      return {
        gastoForm,
        handleSubmit: async () => {
          const { ok, message } = await createGasto(gastoForm.value)

          if (!ok) {
            // Enviar el mensaje de error al componente padre y actualizar vista
            emit('updateType', 'error')
            emit('updateMessage', message)
            emit('actualizarVista', 'MensajeComponent')
          }else{
            emit('updateType', 'success')
            emit('updateMessage', message)
            emit('actualizarVista', 'MensajeComponent')

          }
          // Enviar el mensaje de consumibleForm.value al componente padre y actualizar vista
        
        }
      }
    }
  }
</script>
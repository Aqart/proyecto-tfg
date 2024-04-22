<template>
  <form @submit.prevent="handleSubmit">
    <label for="nombre" class="block mb-2 text-sm font-medium text-gray-900"> Nombre </label>
    <input
      v-model="gastoForm.nombre"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      type="text"
      name="nombre"
      id="nombre"
      placeholder="Nombre del gasto energético"
    />

    <label for="precio" class="block mb-2 text-sm font-medium text-gray-900"> Precio </label>
    <input
      v-model="gastoForm.precio"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      type="number"
      name="precio"
      id="precio"
      placeholder="Precio del gasto energético"
      step="0.01"
      min="0"
    />

    <ButtonComponent text="Añadir gasto energético" type="submit" bg-color="bg-primary" />
  </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useGasto from '@/modules/GastosEnergeticos/composables/useGasto'
import useShared from '@/modules/shared/composables/useShared'
import ButtonComponent from '@/modules/shared/components/ButtonComponent.vue'

export default {
  setup() {
    const router = useRouter()
    const { createGasto } = useGasto()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()

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

        // Guardar el tipo de mensaje y el contenido en el Store
        if (!ok) {
          actualizarMensaje('error', message)
          actualizarMostrarMensaje(true)
        } else {
          actualizarMensaje('success', message)
          actualizarMostrarMensaje(true)
        }

        router.push('/gastos-energeticos')
      }
    }
  },
  components: {
    ButtonComponent
  }
}
</script>

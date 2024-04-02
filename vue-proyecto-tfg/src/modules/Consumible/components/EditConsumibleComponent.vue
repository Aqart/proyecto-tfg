<template>
    <form @submit.prevent="handleSubmit" class="p-10">

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

      <ButtonComponent text="Añadir Consumible" type="submit" bg-color = "bg-primary" />
    </form>

</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useConsumible from '@/modules/Consumible/composables/useConsumible'
import ButtonComponent from '@/modules/shared/components/ButtonComponent.vue';

  export default {
    setup() {
      const router = useRouter()
      const { createConsumible, actualizarMensaje } = useConsumible()

      // Define una propiedad reactiva consumibleForm
      const consumibleForm = ref({
        nombre: '',
        precio: ''
      })

      // Devuelve las propiedades y funciones para que estén disponibles en la plantilla
      return {
        consumibleForm,
        handleSubmit: async () => {
          const { ok, message } = await createConsumible(consumibleForm.value)

          // Guardar el tipo de mensaje y el contenido en el Store
          if (!ok) {
            actualizarMensaje('error', message)
          }else{
            actualizarMensaje('success', message)
          }
          
          router.push('/consumibles')
        
        }
      }
    },
    components: {
      ButtonComponent
    }
  }
</script>
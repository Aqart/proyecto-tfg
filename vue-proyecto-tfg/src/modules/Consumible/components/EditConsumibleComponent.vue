<template>

  <ModalComponent :showModal="true" @close="$router.push('/consumibles')" title="Consumible">
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
        step="0.01"
        placeholder="Precio del consumible"
        min=0
      />

      <ButtonComponent text="Modificar Consumible" type="submit" bg-color = "bg-primary" />
    </form>
  </ModalComponent>

</template>


<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useConsumible from '@/modules/Consumible/composables/useConsumible'
import useShared from '@/modules/shared/composables/useShared'
import ButtonComponent from '@/modules/shared/components/ButtonComponent.vue';
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'


  export default {
    setup() {
      const router = useRouter()
      const { editConsumible, getConsumible } = useConsumible()
      const { actualizarMensaje, actualizarMostrarMensaje } = useShared()

      // Define una propiedad reactiva consumibleForm
      const consumibleForm = ref({
        nombre: '',
        precio: ''
      })

      onMounted(async () => {
        const consumible = await getConsumible(router.currentRoute.value.params.id)
        console.log('edit cons', consumible)
        consumibleForm.value.nombre = consumible.nombre
        consumibleForm.value.precio = consumible.precio
      })

      // Devuelve las propiedades y funciones para que estén disponibles en la plantilla
      return {
        consumibleForm,
        handleSubmit: async () => {
          const { ok, message } = await editConsumible(consumibleForm.value)

          // Guardar el tipo de mensaje y el contenido en el Store
          if (!ok) {
            actualizarMensaje('error', message)
            actualizarMostrarMensaje(true)
          }else{
            actualizarMensaje('success', message)
            actualizarMostrarMensaje(true)
          }
          
          router.push('/consumibles')
        
        }
      }
    },
    components: {
      ButtonComponent,
      ModalComponent
    }
  }
</script>
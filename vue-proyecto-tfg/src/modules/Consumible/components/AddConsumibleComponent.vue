<template>
  <ModalComponent :showModal="showModal" :title="'Añadir un nuevo consumible'">
  <form @submit.prevent="handleSubmit" class="p-10">
    <label for="nombre" class="block mb-2 text-xl font-medium text-gray-900">
        Nombre
      </label>
      <input
        v-model="consumibleForm.nombre"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 pb-4 mb-4"
        type="text"
        name="nombre"
        id="nombre"
        placeholder="Nombre del consumible"
      />
      
      <label for="precio" class="block mb-2 text-xl font-medium text-gray-900">
        Precio
      </label>
      <input
        v-model="consumibleForm.precio"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 pb-4 mb-4"
        type="number"
        name="precio"
        id="precio"
        step="0.01"
        placeholder="Precio del consumible"
        min=0
      />

    <ButtonComponent @click="toggleModal" text="Añadir Consumible" type="submit" bgColor="bg-secondary" />
  </form>
</ModalComponent>
</template>


<script>
import { ref, defineAsyncComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import useConsumible from '@/modules/Consumible/composables/useConsumible'
import useShared from '@/modules/shared/composables/useShared'

  export default {
    data() {
      return {
        showModal: true
      }
    },
    methods: {
      toggleModal() {
        this.showModal = !this.showModal
      }
    },
    setup() {
      const router = useRouter()
      const { createConsumible } = useConsumible()
      const { actualizarMensaje, actualizarMostrarMensaje } = useShared()

      // Define una propiedad reactiva consumibleForm
      const consumibleForm = ref({
        nombre: '',
        precio: ''
      })

      const isButtonDisabled = computed(() => {
        return (!consumibleForm.value.nombre.trim() || !consumibleForm.value.precio)
      })

      // Devuelve las propiedades y funciones para que estén disponibles en la plantilla
      return {
        consumibleForm,
        isButtonDisabled,
        handleSubmit: async () => {
          
          if(!consumibleForm.value.nombre.trim() || !consumibleForm.value.precio){
            actualizarMensaje('error', 'Todos los campos son obligatorios')
            actualizarMostrarMensaje(true)
            return
          }
          
          const { ok, message } = await createConsumible(consumibleForm.value)
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
      ButtonComponent: defineAsyncComponent(() => import('@/modules/shared/components/ButtonComponent.vue')),
      ModalComponent: defineAsyncComponent(() => import('@/modules/shared/components/ModalComponent.vue'))
    }
  }
</script>
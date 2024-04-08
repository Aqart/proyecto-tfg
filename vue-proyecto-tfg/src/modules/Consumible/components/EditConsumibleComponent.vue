<template>

  <!-- En lugar de router.back() en el ModalComponent se puede poner @close="handleClose" -->
  <ModalComponent :showModal="showModal" :title="nombreConsumible">

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

      <ButtonComponent @click="$emit('close-modal')" :disabled="isButtonDisabled" text="Modificar Consumible" type="submit" bg-color = "bg-primary" />
    </form>


  </ModalComponent>

</template>


<script>
import { ref, onMounted, defineAsyncComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import useConsumible from '@/modules/Consumible/composables/useConsumible'
import useShared from '@/modules/shared/composables/useShared'

  export default {
    data() {
      return {
        showModal: true
      }
    },
    setup() {
      const router = useRouter()
      const { editConsumible, getConsumible } = useConsumible()
      const { actualizarMensaje, actualizarMostrarMensaje } = useShared()

      // Define una propiedad reactiva consumibleForm
      const consumibleForm = ref({
        nombre: '',
        precio: '',
      })

      // Define la propiedad reactiva de los datos del consumible original
      const consumibleOriginal = ref({
        nombre: '',
        precio: '',
      })

      onMounted(async () => {
        const consumible = await getConsumible(router.currentRoute.value.params.id)
        console.log('edit cons', consumible)
        consumibleForm.value.nombre = consumible.nombre
        consumibleForm.value.precio = consumible.precio
        consumibleOriginal.value = { nombre: consumible.nombre, precio: consumible.precio }
      })

      const nombreConsumible = computed(() => { return `Editando: ${consumibleOriginal.value.nombre}` })

      // Método para habilitar/deshabilitar el botón de modificar
      const isButtonDisabled = computed(() => {
        return (consumibleForm.value.nombre.trim() === consumibleOriginal.value.nombre.trim() && 
              consumibleForm.value.precio === consumibleOriginal.value.precio)
      })

      // Devuelve las propiedades y funciones para que estén disponibles en la plantilla
      return {
        consumibleForm,
        nombreConsumible,
        isButtonDisabled,
        handleSubmit: async () => {
          // Comprueba si los campos están vacíos
          if(!consumibleForm.value.nombre.trim() || !consumibleForm.value.precio){
            actualizarMensaje('error', 'Todos los campos son obligatorios')
            actualizarMostrarMensaje(true)
            return
          }

          // Comprueba si los valores son los mismos que los originales
          if (consumibleForm.value.nombre.trim() === consumibleOriginal.value.nombre.trim() && 
              consumibleForm.value.precio === consumibleOriginal.value.precio) {
            actualizarMensaje('warning', 'No se han realizado cambios')
            actualizarMostrarMensaje(true)
            return
          }

          console.log('Datos del form', consumibleForm.value)

          const { ok, message } = await editConsumible(router.currentRoute.value.params.id, consumibleForm.value)

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
      ModalComponent: defineAsyncComponent(() => import('@/modules/shared/components/ModalComponent.vue')),
    }
  }
</script>
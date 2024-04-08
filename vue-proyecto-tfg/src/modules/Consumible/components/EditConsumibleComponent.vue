<template>

  <!-- En lugar de router.back() en el ModalComponent se puede poner @close="handleClose" -->
  <ModalComponent :showModal="showModal" :title="nombreConsumible">

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

      <ButtonComponent @click="toggleModal" text="Modificar Consumible" type="submit" bgColor="bg-secondary" />
    </form> -->
    <FormComponent :fields="consumibleForm" @submit="handleSubmit" />

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
        precio: null,
      })

      // Define la propiedad reactiva de los datos del consumible original
      const consumibleOriginal = ref({
        nombre: '',
        precio: null,
      })

      onMounted(async () => {
        const consumible = await getConsumible(router.currentRoute.value.params.id)
        console.log('edit cons', consumible)
        consumibleForm.value.nombre = consumible.nombre
        consumibleForm.value.precio = Number(consumible.precio)
        consumibleOriginal.value = { nombre: consumible.nombre, precio: Number(consumible.precio)}
      })

      const nombreConsumible = computed(() => { return `Editando: ${consumibleOriginal.value.nombre}` })

      // Método que se ejecuta cuando se envía el formulario
      const handleSubmit = async () => {
        try {
          const { message } = await editConsumible(router.currentRoute.value.params.id, consumibleForm.value)
          console.log('Lo que recibo del consumibleForm', consumibleForm.value)
          actualizarMensaje('success', message)
          actualizarMostrarMensaje(true)
          router.push('/consumibles')
        } catch (error) {
          console.error(error)
          actualizarMensaje('error', 'No se ha podido modificar el consumible')
          actualizarMostrarMensaje(true)
        }
      }

      // Devuelve las propiedades y funciones para que estén disponibles en la plantilla
      return {
        consumibleForm,
        handleSubmit,
        nombreConsumible
      }
    },
    components: {
      ModalComponent: defineAsyncComponent(() => import('@/modules/shared/components/ModalComponent.vue')),
      FormComponent: defineAsyncComponent(() => import('@/modules/shared/components/FormComponent.vue'))
    }
  }
</script>
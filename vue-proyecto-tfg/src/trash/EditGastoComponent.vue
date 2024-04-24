<template>
  <!-- En lugar de router.back() en el ModalComponent se puede poner @close="handleClose" -->
  <ModalComponent :showModal="showModal" :title="nombreGasto">
    <!-- <form @submit.prevent="handleSubmit" class="p-10">

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
        step="0.01"
        placeholder="Precio del gasto general"
        min=0
      />

      <ButtonComponent text="Modificar gasto general" type="submit" bg-color = "bg-primary" />
    </form> -->
    <FormComponent :fields="gastoForm" @submit="handleSubmit" />
  </ModalComponent>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineAsyncComponent, computed } from 'vue'
import useGasto from '@/modules/GastosEnergeticos/composables/useGasto'
import useShared from '@/modules/shared/composables/useShared'

export default {
  data() {
    return {
      showModal: true
    }
  },
  setup() {
    const router = useRouter()
    const { editGasto, getGasto } = useGasto()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()

    // Define una propiedad reactiva consumibleForm
    const gastoForm = ref({
      nombre: '',
      precio: ''
    })

    // Define la propiedad reactiva de los datos del consumible original
    const gastoOriginal = ref({
      nombre: '',
      precio: ''
    })

    onMounted(async () => {
      const gasto = await getGasto(router.currentRoute.value.params.id)

      gastoForm.value.nombre = gasto.nombre
      gastoForm.value.precio = gasto.precio
      gastoOriginal.value = { nombre: gasto.nombre, precio: gasto.precio }
    })

    const nombreGasto = computed(() => {
      return `Editando: ${gastoOriginal.value.nombre}`
    })

    // Método que se ejecuta cuando cerramos el modal
    // const handleClose = () => {
    //   router.push('/consumibles')
    // }

    // Devuelve las propiedades y funciones para que estén disponibles en la plantilla
    return {
      gastoForm,
      nombreGasto,
      handleSubmit: async () => {
        // Comprueba si los campos están vacíos
        if (!gastoForm.value.nombre.trim() || !gastoForm.value.precio) {
          actualizarMensaje('error', 'Todos los campos son obligatorios')
          actualizarMostrarMensaje(true)
          return
        }

        // Comprueba si los valores son los mismos que los originales
        if (
          gastoForm.value.nombre === gastoOriginal.value.nombre &&
          gastoForm.value.precio === gastoOriginal.value.precio
        ) {
          actualizarMensaje('warning', 'No se han realizado cambios')
          actualizarMostrarMensaje(true)
          return
        }

        // Realiza la petición para editar el consumible

        const { ok, message } = await editGasto(
          router.currentRoute.value.params.id,
          gastoForm.value
        )

        if (!ok) {
          actualizarMensaje('error', message)
          actualizarMostrarMensaje(true)
        } else {
          actualizarMensaje('success', message)
          actualizarMostrarMensaje(true)
        }

        router.push('/gastos-energeticos')
      }

      // handleClose
    }
  },
  components: {
    // ButtonComponent: defineAsyncComponent(() => import('@/modules/shared/components/ButtonComponent.vue')),
    ModalComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ModalComponent.vue')
    ),
    FormComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/FormComponent.vue')
    )
  }
}
</script>

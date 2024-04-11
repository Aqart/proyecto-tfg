<template>
  <div class="container max-w-6xl">
    <header class="mt-5">
      <NabvarComponent />
    </header>
    <main class="flex flex-col justify-center items-center mt-10">
      <MenuView v-if="$route.path === '/home'" />
      <RouterView />
    </main>
    <footer></footer>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { RouterView } from 'vue-router'
import useConsumible from '@/modules/Consumible/composables/useConsumible'
import useGasto from '@/modules/GastosGenerales/composables/useGasto'
import useMaquina from '@/modules/Maquinas/composables/useMaquina'

export default {
  components: {
    RouterView,
    NabvarComponent: defineAsyncComponent(() => import('@/modules/shared/NabvarComponent.vue')),
    MenuView: defineAsyncComponent(() => import('@/modules/Home/views/MenuView.vue'))
  },
  data() {
    return {
      token: null
    }
  },
  created() {
    this.token = localStorage.getItem('auth-token') || null
  },
  setup() {
    // Define todas las funciones relacionadas con obtener consumibles dentro de un objeto
    const obtenerConsumibles = {
      obtenerListaConsumibles: async () => {
        // Importa las funciones necesarias desde useConsumible
        const { getConsumibles } = useConsumible()
        // Llama a la función getConsumibles para obtener la lista de consumibles
        return await getConsumibles()
      }
      // Puedes agregar más funciones relacionadas con obtener consumibles aquí
    }

    const obtenerGastos = {
      obtenerListaGastos: async () => {
        // Importa las funciones necesarias desde useConsumible
        const { getGastos } = useGasto()
        // Llama a la función getConsumibles para obtener la lista de consumibles
        return await getGastos()
      }
      // Puedes agregar más funciones relacionadas con obtener consumibles aquí
    }
    const obtenerMaquinas = {
      obtenerListaMaquinas: async () => {
        // Importa las funciones necesarias desde useConsumible
        const { getMaquinas } = useMaquina()
        // Llama a la función getConsumibles para obtener la lista de consumibles
        return await getMaquinas()
      }
      // Puedes agregar más funciones relacionadas con obtener consumibles aquí
    }

    // Llama a las funciones necesarias al cargar el componente
    obtenerConsumibles.obtenerListaConsumibles()
    obtenerGastos.obtenerListaGastos()
    obtenerMaquinas.obtenerListaMaquinas()

    // Retorna los objetos que quieres exponer en el componente
    // return { obtenerConsumibles };
  }
}
</script>

<style></style>

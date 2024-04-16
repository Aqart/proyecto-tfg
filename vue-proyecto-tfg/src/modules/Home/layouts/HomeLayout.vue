<template>
  <div class="container max-w-6xl">
    <header class="mt-5">
      <NabvarComponent />
    </header>
    <main class="flex flex-col justify-between mt-10">
      <MenuView v-if="$route.path === '/home'" />
      <router-link v-else to="/home" class="text-left text-lg font-bold text-secondary mb-4"
        ><FontAwesomeIcon :icon="['fas', 'house']" />&nbsp;Volver al inicio</router-link
      >
      <LoadingComponent :fullScreen="true" size="48px" :loading="loading" />
      <RouterView class="w-full" />
    </main>
    <footer></footer>
  </div>
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import useGasto from '@/modules/GastosGenerales/composables/useGasto'
import useConsumible from '@/modules/Consumible/composables/useConsumible'
import useMaquina from '@/modules/Maquinas/composables/useMaquina'
import LoadingComponent from '@/modules/shared/components/LoadingComponent.vue'

export default {
  components: {
    RouterView,
    NabvarComponent: defineAsyncComponent(() => import('@/modules/shared/NabvarComponent.vue')),
    MenuView: defineAsyncComponent(() => import('@/modules/Home/views/MenuView.vue')),
    LoadingComponent
  },
  setup() {
    const token = localStorage.getItem('auth-token') || null
    const loading = ref(false)

    const obtenerConsumibles = async () => {
      console.log('Obteniendo consumibles...')
      const { getConsumibles } = useConsumible()
      return await getConsumibles()
    }

    const obtenerGastos = async () => {
      console.log('Obteniendo gastos...')
      const { getGastos } = useGasto()
      return await getGastos()
    }

    const obtenerMaquinas = async () => {
      console.log('Obteniendo máquinas...')
      const { getMaquinas } = useMaquina()
      return await getMaquinas()
    }

    onMounted(async () => {
      try {
        loading.value = true
        obtenerMaquinas()
        obtenerGastos()
        obtenerConsumibles()
        console.log('Datos obtenidos correctamente')
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      } finally {
        //esperar 3 segundos para que se vea el loading
        setTimeout(() => {
          loading.value = false
        }, 1000)
      }
    })

    return {
      token,
      loading
    }
  }
}
</script>


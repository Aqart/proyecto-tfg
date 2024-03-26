<template>
<div>
    <header>
    <NabvarComponent />
    </header>
    <main>
    <RouterView/>
    </main>
    <footer>
    <p class="text-6xl">Footer</p>
    </footer>
</div>

</template>

<script>
import { defineAsyncComponent } from 'vue'
import { RouterView } from 'vue-router'
import useConsumible from '@/modules/Consumible/composables/useConsumible'

export default {
    components: {
        RouterView,
        NabvarComponent: defineAsyncComponent(() => import('@/modules/shared/NabvarComponent.vue')),
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
            obtenerLista: async () => {
                // Importa las funciones necesarias desde useConsumible
                const { getConsumibles } = useConsumible();
                // Llama a la función getConsumibles para obtener la lista de consumibles
                return await getConsumibles();
            },
            // Puedes agregar más funciones relacionadas con obtener consumibles aquí
        };

        // Llama a las funciones necesarias al cargar el componente
        obtenerConsumibles.obtenerLista();

        // Retorna los objetos que quieres exponer en el componente
        // return { obtenerConsumibles };
    }
}
</script>

<style>

</style>
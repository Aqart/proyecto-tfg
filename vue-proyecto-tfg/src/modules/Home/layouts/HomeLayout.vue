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

  }
}
</script>

<style>

</style>
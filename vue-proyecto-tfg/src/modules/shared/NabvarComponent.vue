<template>
<header>
    <div class="py-10 flex flex-col items-center aling-center gap-5">
        <div class="flex flex-row gap-5">

            <LogoComponent class="w-10 h-10" />
            <h1 class="text-primaryTitle text-5xl mb-auto">
                <router-link to="/" class="mr-4">Transforstone</router-link>
            </h1>
        </div>
        <nav class="flex">
            <router-link to="/login" class="mr-4">Login</router-link>
            <router-link to="/register" class="mr-4">Register</router-link>
            <router-link to="/consumibles" class="mr-4">Consumibles</router-link>
            <router-link to="/gastos-generales" class="mr-4"> Gastos</router-link>
        </nav>
    </div>
</header>


</template>
<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: { LogoComponent: defineAsyncComponent(() => import('@/modules/shared/components/LogoComponent.vue'))},

}
</script>
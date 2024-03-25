<template>
    <div>
        <AuthComponent :title=title />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    data() {
        return {
            title: 'Registro de usuario'
        }
    },
   components: {
        AuthComponent: defineAsyncComponent(() => import('@/modules/Auth/components/AuthComponent.vue'))
    }
}
</script>

<style>

</style>
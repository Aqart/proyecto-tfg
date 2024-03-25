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
            title: 'Inicio de sesion'
        }
    },
    components: {
        AuthComponent: defineAsyncComponent(() => import('@/modules/Auth/components/AuthComponent.vue'))
    }
}
</script>

<style>

</style>
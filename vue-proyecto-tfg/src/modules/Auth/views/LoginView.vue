<template>
    <div>
        <LoginComponent :title=title />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    data() {
        return {
            title: 'Inicio de sesión'
        }
    },
    components: {
        LoginComponent: defineAsyncComponent(() => import('@/modules/Auth/components/LoginComponent.vue'))
    }
}
</script>

<style>

</style>
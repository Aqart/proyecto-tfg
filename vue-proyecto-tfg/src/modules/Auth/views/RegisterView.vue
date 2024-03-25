<template>
    <div>
        <RegisterComponent :title=title />
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
        RegisterComponent: defineAsyncComponent(() => import('@/modules/Auth/components/RegisterComponent.vue'))
    }
}
</script>

<style>

</style>
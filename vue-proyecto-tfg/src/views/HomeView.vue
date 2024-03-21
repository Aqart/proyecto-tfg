<template>
    <div>
    <NabvarComponent />
    <HomeComponent />
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    components: {
        NabvarComponent: defineAsyncComponent(() => import('@/components/NabvarComponent.vue')),
        HomeComponent: defineAsyncComponent(() => import('@/components/HomeComponent.vue'))
    }
}
</script>

<style>

</style>
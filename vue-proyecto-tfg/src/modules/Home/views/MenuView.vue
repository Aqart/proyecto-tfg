<template>
  <ButtonMenuComponent />
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    components: {
        ButtonMenuComponent: defineAsyncComponent(() => import('@/modules/Home/components/ButtonMenuComponent.vue'))
    }
}
</script>

<style>

</style>
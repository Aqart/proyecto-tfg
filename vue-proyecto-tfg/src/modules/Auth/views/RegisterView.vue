<template>
  <div class="flex flex-col items-center gap-28">
    <LogoComponent class="w-36 h-36" />
    <RegisterComponent :title="title" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  data() {
    return {
      title: 'Nuevo usuario'
    }
  },
  components: {
    LogoComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/LogoComponent.vue')
    ),
    RegisterComponent: defineAsyncComponent(
      () => import('@/modules/Auth/components/RegisterComponent.vue')
    )
  }
}
</script>

<style></style>

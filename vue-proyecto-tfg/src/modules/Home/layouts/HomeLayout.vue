<template>
<div>
    <header>
    <NabvarComponent />
    </header>
    <main>
    <RouterView/>
    </main>
    <footer>
    <p>Footer</p>
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
    }
}
</script>

<style>

</style>
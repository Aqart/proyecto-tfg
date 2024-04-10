<template>
  <header class="py-4 text-primaryTitle">
    <nav class="flex flex-col justify-between gap-10 items-center sm:items-end sm:flex-row">
      <div class="flex items-center gap-3">
        <LogoComponent class="w-10 h-10" />
        <router-link to="/" class="text-5xl font-bold text-shadow">Transforstone</router-link>
      </div>
      <!--TODO: Arreglar que se cierre cuando haces click fuera-->
      <div class="relative inline-block text-left">
        <button
          @click="open = !open"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-secondary"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Bienvenido,&nbsp;<span class="first-letter:uppercase font-bold text-blue-500"
            >#{{ getFormattedEmail }}</span
          >
          <ArrowDownComponent class="scale-x-[-1]" />
        </button>
        <div
          v-show="open"
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
        >
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <router-link
              to="/register"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              >Nuevo usuario</router-link
            >
            <router-link
              to="/logout"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              >Desconectar</router-link
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  data() {
    return {
      open: false
    }
  },
  components: {
    LogoComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/LogoComponent.vue')
    ),
    ArrowDownComponent: defineAsyncComponent(
      () => import('@/assets/images/ArrowDropDownComponent.vue')
    )
  },
  computed: {
    getFormattedEmail() {
      const formattedEmail = localStorage
        .getItem('email')

        if(formattedEmail) return formattedEmail.slice(0, localStorage.getItem('email').indexOf('@'))

      return formattedEmail
    }
  }
}
</script>

<template>
  <div class="w-full mx-auto">
    <div class="bg-white shadow-md rounded-t-xl my-6">
      <div class="border-b border-gray-200">
        <button
          @click="toggleCortabloques"
          class="flex items-center justify-between w-full px-5 py-3 text-3xl text-stoneBackground-3 bg-stoneBackground-2 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4 rounded-t-lg"
        >
          <span class="font-medium"
            ><FontAwesomeIcon :icon="['fas', 'fa-clipboard-list']" class="mr-2" />Parte:
            Cortabloques</span
          >
          <FontAwesomeIcon
            :icon="['fas', 'caret-down']"
            :class="{ 'rotate-90': isOpenCortabloques }"
          />
        </button>
        <transition name="fade">
          <div v-if="isOpenCortabloques" class="p-5">
            <FormParteCortabloques />
          </div>
        </transition>
      </div>
      <div>
        <button
          @click="togglePulidora"
          class="flex items-center justify-between w-full px-5 py-3 text-3xl text-stoneBackground-3 bg-stoneBackground-2 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4"
        >
          <span class="font-medium"
            ><FontAwesomeIcon :icon="['fas', 'fa-clipboard-list']" class="mr-2" />Parte:
            Pulidora</span
          >
          <FontAwesomeIcon :icon="['fas', 'caret-down']" :class="{ 'rotate-90': isOpenPulidora }" />
        </button>
        <transition name="fade">
          <div v-if="isOpenPulidora" class="p-5">
            <FormPartePulidora />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  data() {
    return {
      isOpenCortabloques: false,
      isOpenPulidora: false,
      fechaActual: '',
      horaActual: ''
    }
  },
  components: {
    FormParteCortabloques: defineAsyncComponent(() =>
      import('@/modules/ControlesHorarios/components/FormParteCortabloquesComponent.vue')
    ),
    FormPartePulidora: defineAsyncComponent(() =>
      import('@/modules/ControlesHorarios/components/FormPartePulidoraComponent.vue')
    )
  },
  methods: {
    toggleCortabloques() {
      this.isOpenPulidora = false
      this.isOpenCortabloques = !this.isOpenCortabloques
    },
    togglePulidora() {
      this.isOpenCortabloques = false
      this.isOpenPulidora = !this.isOpenPulidora
    }
  }
}
</script>

<style scoped>
/* Transicion cuando aparece y desaparece el modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s 0.1s, transform 0.5s, max-height 0.5s, padding 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
  max-height: 0;
  padding: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
  max-height: 1000px; /* Ajusta este valor según tus necesidades */
  padding: 1.25rem; /* Este es el valor de p-5 en Tailwind CSS */
}
/* Rotar el icono */

.rotate-90 {
  transform: rotate(90deg);
}
</style>

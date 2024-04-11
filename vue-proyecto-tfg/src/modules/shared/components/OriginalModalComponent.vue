<template>
  <transition
    name="modal"
    enter-active-class="transition ease-out duration-300"
    enter-class="transform opacity-0 scale-0"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-300"
    leave-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-0"
  >
    <div
      v-show="showModal"
      id="editConsumibleModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 flex items-center justify-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full backdrop-blur-md bg-bgFrom/30"
    >
      <div class="relative w-full max-w-2xl max-h-full bg-stone/75 rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t">
          <h3 class="text-2xl font-semibold text-secondary drop-shadow-sm">
            {{ title }}
          </h3>
          <ButtonComponent
            type="button"
            @click="handleClose"
            text="X"
            otherClasses="text-xl text-gray-400 bg-transparent rounded-lg w-6 h-6 ms-auto inline-flex justify-center items-center"
            data-modal-hide="editConsumibleModal"
          >
          </ButtonComponent>
        </div>
        <div>
          <MensajesComponent :message="getMensaje" :type="getTipo" :mostrarMensaje="getMostrar" />
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import ButtonComponent from '@/modules/shared/components/ButtonComponent.vue'
import MensajesComponent from '@/modules/shared/components/MensajesComponent.vue'
import useShared from '@/modules/shared/composables/useShared'
import { useRouter } from 'vue-router'
import { mapGetters } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    showModal: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters('Shared', ['getTipo', 'getMensaje', 'getMostrar'])
  },
  // Props y context se pasan para hacer el emit del close
  setup() {
    const router = useRouter()
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()
    const handleClose = () => {
      actualizarMensaje('', '')
      actualizarMostrarMensaje(false)
      // context.emit('close')
      router.back()
    }
    return {
      handleClose
    }
  },
  components: {
    ButtonComponent,
    MensajesComponent
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>

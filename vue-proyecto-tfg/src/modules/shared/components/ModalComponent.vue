<template>
  <div v-show="showModal" 
  id="editConsumibleModal" tabindex="-1" aria-hidden="true" 
  class="fixed inset-0 flex items-center justify-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full backdrop-blur-md bg-bgFrom/30"
  :class="{'scale-0': !showModal, 'scale-100': showModal}"
  >
    <div class="relative w-full max-w-2xl max-h-full bg-primary rounded-lg shadow">
      <!-- Modal header -->
      <div class="flex items-start justify-between p-4 border-b rounded-t">
        <h3 class="text-xl font-semibold text-gray-900">
            Editar {{ title }}
        </h3>
        <ButtonComponent type="button"
                @click="$emit('close')"
                text='X'
                otherClasses="text-xl text-gray-400 bg-transparent rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center" 
                data-modal-hide="editConsumibleModal">
          <span class="sr-only">Close modal</span>
      </ButtonComponent>
      </div>
      <slot></slot>
    </div>
  </div>
</template>


<script>
import ButtonComponent from '@/modules/shared/components/ButtonComponent.vue';


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
    components: {
      ButtonComponent
    }
  }


</script>
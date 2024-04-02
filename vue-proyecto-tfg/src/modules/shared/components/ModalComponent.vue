<template>
  <div id="editConsumibleModal" tabindex="-1" aria-hidden="true" class="fixed inset-0 flex items-center justify-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full bg-primary rounded-lg shadow">
      <!-- Modal header -->
      <div class="flex items-start justify-between p-4 border-b rounded-t">
        <h3 class="text-xl font-semibold text-gray-900">
            Editar {{ title }}
        </h3>
        <button type="button"
                @click="$emit('close')"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" 
                data-modal-hide="editConsumibleModal">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span class="sr-only">Close modal</span>
      </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>


<script>

  export default {
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }


</script>
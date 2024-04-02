<template>
  <div>
    <div v-if="getMensaje">
      <MensajesComponent :message="getMensaje" :type="getTipo" :mostrarMensaje="true" />
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div
        class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 px-4 py-4 bg-primary"
      >
        <div>
          <button
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-secondary-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5"
            type="button"
          >
            <span class="sr-only">Action button</span>
            Action
            <svg
              class="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <!-- Dropdown menu -->
          <!-- Cambiar por el botón de borrar -->
          <div
            id="dropdownAction"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Reward</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Promote</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Activate account</a
                >
              </li>
            </ul>
            <div class="py-1">
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >Delete User</a
              >
            </div>
          </div>
        </div>
        <label for="table-search" class="sr-only">Buscar</label>
        <div class="relative">
          <div
            class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-consumibles"
            class="block pt-2 pb-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Buscar consumibles"
          />
        </div>
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-secondary-500">
        <thead class="text-xs text-secondary uppercase bg-primary">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 text-secondary-600 bg-secondary-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">Nombre</th>
            <th scope="col" class="px-6 py-3">Precio</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- bucle para mostrar los consumibles -->
          <tr
            v-for="consumible in getConsumibles"
            :key="consumible.id"
            class="bg-white border-b hover:bg-gray-50"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
              <div>
                <div class="text-base font-semibold">{{ consumible.nombre }}</div>
              </div>
            </th>
            <td class="px-6 py-4">{{ consumible.precio }} €</td>
            <td class="px-6 py-4">
              <!-- Modal toggle -->
              <!-- Poner un EnlaceComponent cuando se haya creado -->
              <a
                href="#"
                type="button"
                @click.prevent="showModal = true"
                data-modal-target="editConsumibleModal"
                data-modal-show="editConsumibleModal"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Editar
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Edit Consumible modal -->
      <!--  -->
      <ModalComponent :showModal="showModal" @close="showModal = false" title="Consumible">
        <EditConsumibleComponent />
      </ModalComponent>

      <!-- MODAL HIDDEN QUE VENÍA EN LA PLANTILLA -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MensajesComponent from '@/modules/shared/components/MensajesComponent.vue'
import ModalComponent from '@/modules/shared/components/ModalComponent.vue'
import EditConsumibleComponent from '@/modules/Consumible/components/EditConsumibleComponent.vue'

export default {
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapGetters('Consumible', ['getConsumibles', 'getMensaje', 'getTipo'])
  },
  components: {
    MensajesComponent,
    EditConsumibleComponent,
    ModalComponent
  }
}
</script>

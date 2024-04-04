<template>
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
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul class="py-1 text-sm text-gray-700" aria-labelledby="dropdownActionButton">
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">Reward</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">Promote</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100">Activate account</a>
            </li>
          </ul>
          <div class="py-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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

    <div class="max-h-96">
      <table class="w-full text-sm text-left rtl:text-right text-secondary-500">
        <thead class="text-xs text-secondary uppercase bg-primary sticky top-0">
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
            <th v-for="(head, index) in data[0]" :key="index" scope="col" class="px-6 py-3">
              <div v-if="index !== 'id'">
                {{ index }}
              </div>
            </th>
            <th scope="col" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody class="h-96 overflow-y-auto">
          <!-- bucle para mostrar los consumibles -->
          <tr v-for="body in data" :key="body.id" class="bg-white border-b hover:bg-gray-50">
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>

            <template v-for="(el, index) in body">
              <th v-if="index === 'nombre'" :key="`${el}-th`" class="px-6 py-4">
                <div class="text-sm text-black-900 font-bold">
                  {{ el }}
                </div>
              </th>
              <td v-else-if="index === 'id'" :key="index">
              </td>
              <td v-else :key="`${el}-td`" class="px-6 py-4">
                <div class="text-sm text-black-900">
                  {{ el }}
                </div>
              </td>
            </template>
            <td class="px-6 py-4">
              <router-link
                :to="`${$route.path}/edit/${body.id}`"
                class="text-sm text-blue-500 hover:underline"
                @click="cerrarMensaje"
              >
                Editar
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(props, context) {
  // ...

  const cerrarMensaje = () => {
    context.emit('cerrarMensaje')
  }

  return {
    cerrarMensaje,
    // Resto del código
  }
}
}
</script>

<style></style>

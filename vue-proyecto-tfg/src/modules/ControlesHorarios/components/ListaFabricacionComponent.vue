<template>
  <div class="border border-opacity-0 rounded-lg overflow-hidden">
    <span
      class="inline-flex items-center justify-end mx-4 my-2 border border-transparent text-lg font-bold rounded-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-4 text-bold"
      @click="addNewItem"
    >
      <FontAwesomeIcon :icon="['fas', 'plus']" class="mr-1" />Añadir nuevo
    </span>
    <table class="w-full table-auto">
      <thead
        class="text-lg font-bold text-stoneBackground-5 bg-stoneBackground-2 sticky top-0 rounded-t-lg"
      >
        <tr>
          <th scope="col" class="p-4">Largo</th>
          <th scope="col" class="p-4">Ancho</th>
          <th scope="col" class="p-4">Grosor</th>
          <th scope="col" class="p-4">Número de piezas</th>
          <th scope="col" class="p-4">Acciones</th>
        </tr>
      </thead>
      <tbody class="divide-gray-200 rounded-b-lg text-center">
        <tr
          class="bg-gray-50 border-b hover:bg-gray-100"
          v-for="(item, index) in items"
          :key="index"
        >
          <td class="px-6 py-4" v-if="!item.editing">{{ item.largo }}</td>
          <td class="px-6 py-4" v-else>
            <input
              type="number"
              v-model="item.largo"
              class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 focus:border-stoneBackground-2 shadow-sm sm:text-xl"
              :style="{ width: `${item.largo.toString().length + 4}ch` }"
            />
          </td>

          <td class="px-6 py-4" v-if="!item.editing">{{ item.ancho }}</td>
          <td class="px-6 py-4" v-else>
            <input
              type="number"
              v-model="item.ancho"
              class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 focus:border-stoneBackground-2 shadow-sm sm:text-xl"
              :style="{ width: `${item.ancho.toString().length + 4}ch` }"
            />
          </td>

          <td class="px-6 py-4" v-if="!item.editing">{{ item.grosor }}</td>
          <td class="px-6 py-4" v-else>
            <input
              type="number"
              v-model="item.grosor"
              class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 focus:border-stoneBackground-2 shadow-sm sm:text-xl"
              :style="{ width: `${item.grosor.toString().length + 4}ch` }"
            />
          </td>

          <td class="px-6 py-4" v-if="!item.editing">{{ item.numeroPiezas }}</td>
          <td class="px-6 py-4" v-else>
            <input
              type="number"
              v-model="item.numeroPiezas"
              class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 focus:border-stoneBackground-2 shadow-sm sm:text-xl"
              :style="{ width: `${item.numeroPiezas.toString().length + 4}ch` }"
            />
          </td>

          <td class="px-6 py-4 flex flex-col gap-2 justify-center items-center">
            <span
              v-if="!item.editing"
              class="text-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-5 cursor-pointer group"
              @click="startEdit(item)"
            >
              <FontAwesomeIcon :icon="['fas', 'pen-to-square']" />
              <span class="ml-2 transition-all duration-100 ease-in-out">Editar</span>
            </span>
            <span
              v-else
              class="text-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-5 cursor-pointer group"
              @click="saveAndDeleteEmptyItems(item)"
            >
              <FontAwesomeIcon :icon="['fas', 'check-square']" />
              <span class="ml-2 transition-all duration-100 ease-in-out">Guardar</span>
            </span>
            <span
              v-if="item.editing"
              class="text-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-5 cursor-pointer group ml-2"
              @click="cancelEdit(item)"
            >
              <FontAwesomeIcon :icon="['fas', 'times-circle']" />
              <span class="ml-2 transition-all duration-100 ease-in-out">Cancelar</span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    // Carga los elementos desde el localStorage cuando se crea el componente
    const storedItems = localStorage.getItem('items')
    if (storedItems) {
      this.items = JSON.parse(storedItems)
    }
  },
  methods: {
    startEdit(item) {
      // Guarda una copia del estado original antes de comenzar la edición
      item.copy = JSON.parse(JSON.stringify(item))
      item.editing = true
    },
    saveAndDeleteEmptyItems(item) {
      // Guarda los cambios de la copia en el original
      Object.assign(item, item.copy)
      item.editing = false
      delete item.copy
      // Guarda los elementos en el localStorage cuando se guardan los cambios
      localStorage.setItem('items', JSON.stringify(this.items))
      this.deleteEmptyItems()
    },
    cancelEdit(item) {
      // Elimina la copia y sale del modo de edición
      delete item.copy
      item.editing = false
      this.deleteEmptyItems()
    },
    deleteEmptyItems() {
      this.items = this.items.filter(
        (item) => item.largo && item.ancho && item.grosor && item.numeroPiezas
      )
      localStorage.setItem('items', JSON.stringify(this.items))
    },
    addNewItem() {
      this.items.push({ largo: '', ancho: '', grosor: '', numeroPiezas: '', editing: true })
    }
  }
}
</script>
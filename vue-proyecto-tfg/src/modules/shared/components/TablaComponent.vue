<template>
  <div class="relative w-full shadow-md flex flex-col mb-10">
    <div class="flex flex-row flex-wrap bg-stone/75 rounded-t-lg">
      <h1 class="text-4xl font-bold text-center p-10 text-secondary flex-grow text-shadow-sm">
        Listado de {{ formattedRoute }}
      </h1>
      <span
        class="inline-flex items-center justify-center mx-4 my-2 border border-transparent text-lg font-bold rounded-md text-secondary/80 hover:text-secondary text-bold"
        @click="toggleModalOpenNew()"
      >
        <FontAwesomeIcon :icon="['fas', 'plus']" class="mr-1" />Añadir nuevo
      </span>
    </div>
    <div
      class="flex gap-4 items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 px-4 py-4 bg-stone/75"
    >
      <div class="relative inline-block text-left flex-shrink-0">
        <a
          class="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-5 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:ring-2 hover:ring-secondary"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <FontAwesomeIcon :icon="['fas', 'trash-can']" class="mr-2 hover:text-secondary" />
          Eliminar seleccionados
          <span v-if="selectedCheckboxes.length > 0">&nbsp;({{ selectedCheckboxes.length }})</span>
        </a>
      </div>
      <label for="table-search-consumibles" class="sr-only">Buscar</label>
      <div class="relative flex-grow">
        <div
          class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <SearchIconComponent
            :class="'w-4 h-4 text-gray-500 focus:text-secondary transition-colors duration-200'"
          />
        </div>
        <div v-if="show">
          <input
            type="text"
            id="table-search-consumibles"
            class="block pt-2 pb-2 px-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none shadow-sm"
            placeholder="Buscar consumibles"
            v-model="searchQuery"
          />
        </div>
      </div>
    </div>

    <div class="flex-grow overflow-auto">
      <table class="min-w-full divide-y divide-gray-200 text-left">
        <thead class="text-lg font-bold text-secondary bg-stone/75 sticky top-0">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  @change="selectAllCheckboxes"
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 text-secondary-600 bg-secondary-100 border-gray-300 rounded focus:ring-secondary"
                />
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <th v-for="key in filteredHeader" :key="key" scope="col" class="px-6 py-3">
              <button @click="sortTable(key)" class="flex items-center justify-start w-full">
                <div v-html="formatIndex(key)"></div>
                <div v-show="sortField === key" class="relative ml-2">
                  <FontAwesomeIcon
                    :icon="['fas', 'sort-up']"
                    class="absolute w-4 h-4 bottom-[-.4rem]"
                    :class="{ 'opacity-50': sortDirection === -1 }"
                  />
                  <FontAwesomeIcon
                    :icon="['fas', 'sort-down']"
                    class="absolute w-4 h-4 top-[-.4rem]"
                    :class="{ 'opacity-50': sortDirection === 1 }"
                  />
                </div>
              </button>
            </th>
            <th scope="col" class="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 max-h-screen overflow-auto">
          <!-- bucle para mostrar los consumibles -->

          <tr
            v-for="body in searchFilteredData"
            :key="body.id"
            class="bg-white border-b hover:bg-gray-50"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  :value="body.id"
                  v-model="selectedCheckboxes"
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
              <td v-else-if="index !== 'id'" :key="`${el}-td`" class="px-6 py-4">
                <div class="text-sm text-black-900">
                  {{ el }}
                </div>
              </td>
            </template>
            <td class="px-6 py-4">
              <span
                class="text-md text-blue-900 hover:text-secondary cursor-pointer"
                @click="toggleModalOpenEdit(body.id)"
                :data-id="body.id"
              >
                <FontAwesomeIcon :icon="['fas', 'pen-to-square']" />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalComponent :title="modalTitle" :modalActive="showModal" @close="toggleModalClose">
      <FormComponent :data="item || {}" @send="getNewData" :tipo="modalTitle" @close="toggleModalClose" />
    </ModalComponent>
  </div>
</template>

<script>
import useShared from '@/modules/shared/composables/useShared'
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
//import editConsumible from '@/modules/Consumible/composables/useConsumible'

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      modalTitle: '',
      searchQuery: '',
      show: true,
      selectedCheckboxes: [],
      showModal: false,
      itemId: null,
      item: null,
      newData: {},
      formType: 'Editar',
      sortField: null,
      sortDirection: 1
    }
  },
  components: {
    SearchIconComponent: defineAsyncComponent(() =>
      import('@/assets/images/SearchIconComponent.vue')
    ),
    ModalComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ModalComponent.vue')
    ),
    FormComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/FormComponent.vue')
    )
  },
  setup() {
    const { actualizarMostrarMensaje } = useShared()

    const cerrarMensaje = () => {
      console.log('Cerrar Mensaje se está haciendo')
      actualizarMostrarMensaje(false)
    }

    const formatIndex = (index) => {
      let formattedIndex = index.replace('_', ' ')
      formattedIndex =
        formattedIndex.charAt(0).toUpperCase() + formattedIndex.slice(1).toLowerCase()

      if (formattedIndex.includes('m2')) {
        formattedIndex = formattedIndex.replace('m2', 'm<sup>2</sup>')
      }

      if (formattedIndex.includes('m3')) {
        formattedIndex = formattedIndex.replace('m3', 'm<sup>3</sup>')
      }

      return formattedIndex
    }
    const showDropdown = ref(false)

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value
    }

    return {
      cerrarMensaje,
      formatIndex,
      showDropdown,
      toggleDropdown
    }
  },
  methods: {
    sortTable(field) {
      if (this.sortField === field) {
        this.sortDirection *= -1
      } else {
        this.sortField = field
        this.sortDirection = 1
      }
    },
    handleFormType(type) {
      this.formType = type
    },
    getNewData(data) {
      if (data) {
        this.newData = data
        this.$emit('saveData', this.newData, this.modalTitle)
        console.log('getNewData', this.newData)
      }
    },
    selectAllCheckboxes(event) {
      if (event.target.checked) {
        this.selectedCheckboxes = this.data.map((item) => item.id)
      } else {
        this.selectedCheckboxes = []
      }
    },
    modalName(name) {
      return (this.modalTitle = name)
    },
    toggleModalOpenNew() {
      this.cerrarMensaje()
      this.modalTitle = 'Añadir nuevo'
      console.log('toggleModalOpenNew', this.data[0])
      if (this.data.length > 0) {
        // Obtener el tipo de dato de cada elemento en data
        this.item = Object.keys(this.data[0]).reduce((obj, key) => {
          console.log(typeof this.data[0][key])
          if (typeof this.data[0][key] == 'string') {
            obj[key] = ''
          } else if (typeof this.data[0][key] == 'number') {
            obj[key] = null
          }

          console.log('dataTypes', obj)
          return obj
        }, {})

        this.showModal = !this.showModal
      }
    },
    toggleModalOpenEdit(id) {
      this.cerrarMensaje()
      this.modalTitle = 'Editar'
      this.itemId = id
      this.getItemById(this.itemId)
      this.showModal = !this.showModal
    },
    toggleModalClose() {
      this.cerrarMensaje()
      this.showModal = !this.showModal
      this.itemId = null
      this.item = null
    },
    getItemById(id) {
      this.item = this.data.find((item) => item.id === id)
    }
  },
  computed: {
    sortedData() {
      if (!this.sortField) {
        return this.data
      }

      return [...this.data].sort((a, b) => {
        const aValue = a[this.sortField] || ''
        const bValue = b[this.sortField] || ''

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return (aValue - bValue) * this.sortDirection
        }
        if (aValue < bValue) {
          return -1 * this.sortDirection
        }
        if (aValue > bValue) {
          return 1 * this.sortDirection
        }
        return 0
      })
    },
    formattedRoute() {
      return this.$route.path.slice(1).charAt(0).toUpperCase() + this.$route.path.slice(2)
    },
    filteredHeader() {
      if (this.data && this.data.length > 0) {
        return Object.keys(this.data[0]).filter((key) => key !== 'id')
      } else {
        return []
      }
    },
    searchFilteredData() {
      let result = this.data

      if (this.searchQuery) {
        result = result.filter((item) => {
          // Asegúrate de adaptar esta lógica a tu caso específico
          return Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        })
      }

      if (this.sortField) {
        const sortDirection = this.sortDirection
        result = [...result].sort((a, b) => {
          const aValue = a[this.sortField] || ''
          const bValue = b[this.sortField] || ''

          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return (aValue - bValue) * sortDirection
          }
          if (aValue < bValue) {
            return -1 * sortDirection
          }
          if (aValue > bValue) {
            return 1 * sortDirection
          }
          return 0
        })
      }

      return result
    }
  }
}
</script>
<style scoped>
.table-body-enter-active,
.table-body-leave-active {
  transition: opacity 0.5s;
}
.table-body-enter,
.table-body-leave-to {
  opacity: 0;
}
</style>

<template>
  <div class="relative w-full shadow-md flex flex-col mb-10">
    <div class="flex flex-row flex-wrap bg-stone/75 rounded-t-lg">
      <h1 class="text-4xl font-bold text-center p-10 text-secondary flex-grow">
        Listado de {{ formattedRoute }}
      </h1>
      <span
        class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-lg font-bold rounded-md text-secondary/80 hover:text-secondary"
        @click="toggleModalOpenNew()"
      >
        Añadir nuevo
      </span>
    </div>
    <div
      class="flex gap-4 items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 px-4 py-4 bg-stone/75"
    >
      <div class="relative inline-block text-left flex-shrink-0">
        <a
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-5 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-secondary"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Eliminar seleccionados
          <span v-if="selectedCheckboxes.length > 0">&nbsp;({{ selectedCheckboxes.length }})</span>
        </a>
      </div>
      <label for="table-search-consumibles" class="sr-only">Buscar</label>
      <div class="relative flex-grow">
        <div
          class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <SearchIconComponent />
        </div>
        <div v-if="show">
          <input
            type="text"
            id="table-search-consumibles"
            class="block pt-2 pb-2 px-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
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
                  class="w-4 h-4 text-secondary-600 bg-secondary-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <th v-for="key in filteredHeader" :key="key" scope="col" class="px-6 py-3">
              <div v-html="formatIndex(key)"></div>
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
                class="text-md text-blue-500 hover:underline"
                @click="toggleModalOpenEdit(body.id)"
                :data-id="body.id"
              >
                Editar
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalComponent :title="modalTitle" :modalActive="showModal" @close="toggleModalClose">
      <FormComponent :data="item" @send="getNewData" :tipo="modalTitle" />
    </ModalComponent>
  </div>
</template>

<script>
import useShared from '@/modules/shared/composables/useShared'
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import editConsumible from '@/modules/Consumible/composables/useConsumible'

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
      showModal: null,
      itemId: null,
      item: null,
      newData: {},
      formType: 'Editar'
    }
  },
  components: {
    SearchIconComponent: defineAsyncComponent(
      () => import('@/assets/images/SearchIconComponent.vue')
    ),
    ModalComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ModalComponent.vue')
    ),
    FormComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/FormComponent.vue')
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
    handleFormType(type) {
      this.formType = type
    },
    getNewData(data) {
      if (data) {
        this.newData = data
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
      this.modalTitle = 'Añadir nuevo'
      if (this.data.length > 0) {
        // Obtener el tipo de dato de cada elemento en data
        const dataTypes = Object.keys(this.data[0]).reduce((obj, key) => {
          obj[key] = typeof this.data[0][key]
          console.log('dataTypes', typeof obj)
          return obj
        }, {})

        // Crear un nuevo objeto con las mismas claves que el primer objeto en data,
        // pero con todos los valores establecidos en null y respetando el tipo de dato
        this.item = Object.keys(this.data[0]).reduce((obj, key) => {
          if (typeof dataTypes[key] === 'number') {
            obj[key] = null
          } else if (typeof dataTypes[key] === 'string') {
            obj[key] = ''
          }

          return obj
        }, {})

        this.showModal = !this.showModal
      }
    },
    toggleModalOpenEdit(id) {
      this.modalTitle = 'Editar'
      this.itemId = id
      this.getItemById(this.itemId)
      this.showModal = !this.showModal
    },
    toggleModalClose() {
      this.showModal = !this.showModal
      this.itemId = null
      this.item = null
    },
    getItemById(id) {
      this.item = this.data.find((item) => item.id === id)
    }
  },
  computed: {
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
      return this.data.filter((row) => {
        return Object.values(row).some((value) => {
          return String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
        })
      })
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
